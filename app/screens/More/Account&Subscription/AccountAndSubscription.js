import { View, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Modal from 'react-native-modalbox';
import storage from '@react-native-firebase/storage';
import HeaderButton from '../../../components/HeaderButton';
import { colors } from '../../../styles';
import screens from '../../../constants/screens';
import TextView from '../../../components/TextView';
import AppStyles from '../../../styles/AppStyles';
import s from './styles';
import ScrollableAvoidKeyboard from '../../../components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';
import ManageSubModal from './ManageSubModal';
import { useDispatch, useSelector } from 'react-redux';
import AppAvtar from '../../../components/Avtar/AppAvtar';
import { setUserData } from '../../../actions/userActions';
import { updateUserDocument } from '../../../services/userService';
import { getUniqueId, isEmpty, openFilePicker } from '../../../helpers/helpers';
import { USERPROFILEPATH, USER_PROFILE_FIELD } from '../../../constants/constant';

const AccountAndSubscriptionScreen = ({ navigation }) => {
  const userSelector = useSelector((state) => state.user);
  const { user } = userSelector;

  const [isOpenManageModal, setIsOpenManageModal] = useState();
  const [profileLoading, setProfileLoading] = useState(false);

  const dispatch = useDispatch();
  const onOpenManageModal = useCallback(() => {
    setIsOpenManageModal(true);
  }, []);
  const onCloseManageModal = useCallback(() => {
    setIsOpenManageModal(false);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: 'Account & Subscription',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerRow}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            color={colors.textColor}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      ),
      headerRight: () => <View></View>,
      headerStyle: s.headerStyle,
      headerTitleStyle: AppStyles.settingHeader,
    });
  }, [navigation]);

  const userFirstNameView = useMemo(() => {
    return <TextView text={user?.firstName} type={'body-one'} style={s.valueText} />;
  }, [user?.firstName]);

  const userlastNameView = useMemo(() => {
    return <TextView text={user?.lastName} type={'body-one'} style={s.valueText} />;
  }, [user?.lastName]);

  const userEmailView = useMemo(() => {
    return <TextView text={user?.email} type={'body-one'} style={s.valueText} />;
  }, [user?.email]);

  const userPasswordView = useMemo(() => {
    const passwordLenth = user?.password?.length;
    return <TextView text={'*'.repeat(passwordLenth)} type={'body-one'} style={s.valueText} />;
  }, [user?.password?.length]);

  const onSaveUserInfo = useCallback(
    async (item) => {
      try {
        const result = await dispatch(updateUserDocument(user?.uid, user?.id, item));
        await dispatch(setUserData(result));
      } catch (error) {
        console.log('error', error);
      }
    },
    [dispatch, user?.id, user?.uid],
  );

  const openImagePicker = useCallback(async () => {
    try {
      const promises = [];
      let item = {};
      const filename = getUniqueId();
      const image = await openFilePicker();
      if (!isEmpty(image)) {
        setProfileLoading(true);
        const myPromise = new Promise(function (myResolve, myReject) {
          const task = storage()
            .ref(USERPROFILEPATH + '/' + filename)
            .putString(image?.data, 'base64', { contentType: image?.mime });

          task.on(
            'state_changed',
            null,
            (error) => myReject(error),
            (snapshot) => {
              snapshot.ref.getDownloadURL().then(async (downloadURL) => {
                item.userProfile = downloadURL;
                myResolve(downloadURL);
              });
            },
          );
        });
        promises.push(myPromise);

        await Promise.all(promises);
        await onSaveUserInfo(item);
      }
    } catch (error) {
      console.log('error', error);
      setProfileLoading(false);
    } finally {
      setProfileLoading(false);
    }
  }, [onSaveUserInfo]);

  return (
    <>
      <View style={s.root}>
        <ScrollableAvoidKeyboard showsVerticalScrollIndicator={false}>
          <View style={s.imgWrap}>
            <View style={s.avtar}>
              {profileLoading ? (
                <ActivityIndicator size='large' color={colors.primary} />
              ) : (
                <AppAvtar
                  Imgsrc={user?.userProfile ? user?.userProfile : undefined}
                  Name={user?.firstName}
                  Size={108}
                  TextType={'header'}
                  style={s.profileImg}
                />
              )}
            </View>
            <TextView text={'CHANGE'} style={s.chText} onPress={openImagePicker} />
          </View>
          <View>
            <View style={s.rowWrap}>
              <View style={s.leftWrap}>
                <TextView text={'First name'} type={'body-two'} style={s.labelText} />
                {userFirstNameView}
              </View>

              <TextView
                text={'EDIT'}
                style={s.editText}
                onPress={() =>
                  navigation.navigate(screens.EditProfile, {
                    field: USER_PROFILE_FIELD.FIRSTNAME,
                    fieldValue: user?.firstName,
                  })
                }
              />
            </View>
            <View style={s.rowWrap}>
              <View>
                <TextView text={'Last name'} type={'body-two'} style={s.labelText} />
                {userlastNameView}
              </View>

              <TextView
                text={'EDIT'}
                style={s.editText}
                onPress={() =>
                  navigation.navigate(screens.EditProfile, {
                    field: USER_PROFILE_FIELD.LASTNAME,
                    fieldValue: user?.lastName,
                  })
                }
              />
            </View>
            <View style={s.rowWrap}>
              <View>
                <TextView text={'Email address'} type={'body-two'} style={s.labelText} />
                {userEmailView}
              </View>
              <TextView
                text={'EDIT'}
                style={s.editText}
                onPress={() =>
                  navigation.navigate(screens.EditProfile, {
                    field: USER_PROFILE_FIELD.EMAIL,
                    fieldValue: user?.email,
                  })
                }
              />
            </View>
            <View style={s.rowWrap}>
              <View>
                <TextView text={'Password'} type={'body-two'} style={s.labelText} />
                {userPasswordView}
              </View>
              <TextView text={'EDIT'} style={s.editText} onPress={() => navigation.navigate(screens.ChangePassword)} />
            </View>
            <View style={s.rowWrap}>
              <View>
                <TextView text={'Subscription'} type={'body-two'} style={s.labelText} />
                <TextView text={'Valid until September 12, 2022'} type={'body-one'} style={s.valueText} />
              </View>
              <TouchableOpacity onPress={onOpenManageModal}>
                <TextView text={'MANAGE'} style={s.editText} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollableAvoidKeyboard>
      </View>
      <Modal
        style={s.modal}
        isOpen={isOpenManageModal}
        entry={'bottom'}
        position={'bottom'}
        swipeToClose={true}
        backdrop={true}
        coverScreen={true}
        backdropOpacity={0.7}
        backdropColor={'#030509'}
        backButtonClose={true}
        backdropPressToClose={true}
        onClosed={onCloseManageModal}>
        <ManageSubModal onRequestClose={onCloseManageModal} />
      </Modal>
    </>
  );
};

export default AccountAndSubscriptionScreen;
