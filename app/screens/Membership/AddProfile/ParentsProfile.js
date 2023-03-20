import { SafeAreaView, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import storage from '@react-native-firebase/storage';
import s from './styles';
import svgs from '../../../assets/svg';
import TextView from '../../../components/TextView';
import Button from '../../../components/Button/Button';
import screens from '../../../constants/screens';
import { useDispatch, useSelector } from 'react-redux';
import { updateOnBoardingUser } from '../../../actions/authActions';
import { getUniqueId, isEmpty, openFilePicker, toastNotification } from '../../../helpers/helpers';
import AppAvtar from '../../../components/Avtar/AppAvtar';
import { getCurrentUserId, getUserDocId, updateUserDocument } from '../../../services/userService';
import { colors } from '../../../styles';
import { USERPROFILEPATH } from '../../../constants/constant';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ParentsProfileScreen = ({ navigation }) => {
  const authSelector = useSelector((state) => state.auth);
  const { onBoarding } = authSelector;
  const lastNameRef = useRef();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onChangeUserInfo = useCallback(
    (propsName, value) => {
      dispatch(updateOnBoardingUser({ propsName, value }));
    },
    [dispatch],
  );

  const checkUserData = useCallback(async () => {
    const userId = getCurrentUserId();
    if (!onBoarding?.uid) {
      if (userId) {
        dispatch(updateOnBoardingUser({ propsName: 'uid', value: userId }));
      }
    }
    if (!onBoarding?.id) {
      const userDocId = await dispatch(getUserDocId(userId));
      dispatch(updateOnBoardingUser({ propsName: 'id', value: userDocId }));
    }
  }, [dispatch, onBoarding?.id, onBoarding?.uid]);

  useEffect(() => {
    checkUserData();
  }, [checkUserData]);

  const updateUserData = useCallback(
    async (item) => {
      await dispatch(updateUserDocument(onBoarding?.uid, onBoarding?.id, item));
    },
    [dispatch, onBoarding?.id, onBoarding?.uid],
  );

  const addUserData = useCallback(async () => {
    const promises = [];

    let newUser = {
      firstName: onBoarding?.firstName,
      lastName: onBoarding?.lastName,
    };
    if (onBoarding?.userProfile) {
      const filename = getUniqueId();
      const myPromise = new Promise(function (myResolve, myReject) {
        const task = storage()
          .ref(USERPROFILEPATH + '/' + filename)
          .putString(onBoarding?.userProfile?.data, 'base64', { contentType: onBoarding?.userProfile?.mime });

        task.on(
          'state_changed',
          null,
          (error) => myReject(error),
          (snapshot) => {
            snapshot.ref.getDownloadURL().then(async (downloadURL) => {
              newUser.userProfile = downloadURL;
              myResolve(downloadURL);
            });
          },
        );
      });
      promises.push(myPromise);
    }

    try {
      await Promise.all(promises);
      await updateUserData(newUser);
      navigation.navigate(screens.KidsProfile);
    } catch (error) {
      console.log('error', error);
    }
  }, [navigation, onBoarding?.firstName, onBoarding?.lastName, onBoarding?.userProfile, updateUserData]);

  const onClickContinue = useCallback(async () => {
    try {
      setLoading(true);
      if (isEmpty(onBoarding?.firstName)) {
        toastNotification('please enter first Name');
        return;
      }
      if (isEmpty(onBoarding?.lastName)) {
        toastNotification('please enter last Name');
        return;
      }
      await addUserData();
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [addUserData, onBoarding?.firstName, onBoarding?.lastName]);

  const openImagePicker = useCallback(async () => {
    const image = await openFilePicker();
    onChangeUserInfo('userProfile', image);
  }, [onChangeUserInfo]);

  return (
    <SafeAreaView style={s.wrapProfile}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.contentContainer}>
        <View style={s.root}>
          <View style={s.paddingWrap}>
            <View style={s.topWrapper}>
              <TextView text={'Welcome!'} style={s.titleText} />
              <TextView text={'Let’s get started.'} style={s.titleText} />
              <View>
                <View style={s.stepWrapper}>
                  <View style={s.wrapCenter}>
                    <View style={s.activeStep}>
                      <TextView text={'1'} type={'caps'} style={s.activeText} />
                    </View>
                    <TextView text={'You'} type={'caps'} style={s.stepText} />
                  </View>
                  <View style={s.dividerLeft}></View>
                  <View style={s.wrapCenter}>
                    <View style={s.unactiveStep}>
                      <TextView text={'2'} type={'caps'} style={s.unactiveText} />
                    </View>
                    <TextView text={'Your Kids'} type={'caps'} style={s.nonstepText} />
                  </View>
                  <View style={s.dividerRight}></View>
                  <View style={s.wrapCenter}>
                    <View style={s.unactiveStep}>
                      <TextView text={'3'} type={'caps'} style={s.unactiveText} />
                    </View>
                    <TextView text={'Complete'} type={'caps'} style={s.nonstepText} />
                  </View>
                </View>
              </View>
            </View>

            <View style={s.bottmWrap}>
              <View style={s.imgWrap}>
                <View style={s.profileWrap}>
                  {onBoarding?.userProfile ? (
                    <AppAvtar
                      Imgsrc={`data:${onBoarding?.userProfile?.mime};base64,${onBoarding?.userProfile?.data}`}
                      Size={91}
                      TextType={'title'}
                    />
                  ) : (
                    <SvgIcon svgs={svgs} name={'profile-img'} width={112} height={112} style={s.secondtp} />
                  )}

                  <TouchableOpacity onPress={openImagePicker} style={s.addimg}>
                    <SvgIcon svgs={svgs} name={'camera-icon'} width={17} height={17} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={s.inputWrap}>
                <TextInput
                  placeholder='Your first name'
                  value={onBoarding?.firstName}
                  style={s.inputStyle}
                  placeholderTextColor={colors.placeholder}
                  onChangeText={(firstName) => onChangeUserInfo('firstName', firstName)}
                  returnKeyType={'next'}
                  onSubmitEditing={() => {
                    lastNameRef.current.focus();
                  }}
                />
                <TextInput
                  ref={lastNameRef}
                  placeholder='Your last name'
                  value={onBoarding?.lastName}
                  style={s.inputStyle}
                  placeholderTextColor={colors.placeholder}
                  onChangeText={(lastName) => onChangeUserInfo('lastName', lastName)}
                  returnKeyType={'done'}
                  onSubmitEditing={onClickContinue}
                />
              </View>
              <View style={s.btnwrap}>
                <Button
                  ButtonText='Continue'
                  textStyle={s.btnText}
                  onPress={onClickContinue}
                  isLoading={loading}
                  disabled={loading}
                />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ParentsProfileScreen;
