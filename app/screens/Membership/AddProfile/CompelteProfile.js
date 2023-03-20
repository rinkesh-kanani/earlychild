import { View, SafeAreaView, Platform, FlatList } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import storage from '@react-native-firebase/storage';
import svgs from '../../../assets/svg';
import s from './styles';
import TextView from '../../../components/TextView';
import HeaderButton from '../../../components/HeaderButton';
import { colors } from '../../../styles';
import AppStyles from '../../../styles/AppStyles';
import Card from '../../../components/Card';
import { Button, Touchable } from '../../../components/Button';
import screens from '../../../constants/screens';
import { useDispatch, useSelector } from 'react-redux';
import AppAvtar from '../../../components/Avtar/AppAvtar';
import { calculateAge, getUniqueId } from '../../../helpers/helpers';
import { CHILDPROFILEPATH } from '../../../constants/constant';
import { createChildNewDocument } from '../../../services/childService';
import { CommonActions } from '@react-navigation/native';
import { appInit } from '../../../helpers/appInitHelpers';

const CompelteProfileScreen = ({ navigation }) => {
  const authSelector = useSelector((state) => state.auth);
  const { onBoarding } = authSelector;
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerRow}>
          <HeaderButton
            type={1}
            iconName={'arrow-left'}
            color={colors.textColor}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
            onPress={navigation.goBack}
          />
        </View>
      ),

      headerStyle: AppStyles.hederTwoStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  const renderChildItem = useCallback(
    ({ item }) => {
      const age = calculateAge(item?.birthDay);
      return (
        <Card style={s.cardList}>
          <View style={s.cardRow}>
            <View style={s.leftRow}>
              <AppAvtar
                Imgsrc={item?.profile ? `data:${item?.profile?.mime};base64,${item?.profile?.data}` : undefined}
                Name={item?.firstName}
                Size={56}
                TextType={'title'}
              />
              <View style={s.textWrap}>
                <TextView text={item?.firstName} type={'head-line'} style={s.childName} />
                <TextView text={age} type={'body-two'} style={s.years} />
              </View>
            </View>
            <Touchable
              onPress={
                loading
                  ? null
                  : () => {
                      navigation.push(screens.KidsProfile, { item });
                    }
              }>
              <SvgIcon svgs={svgs} name={'edit-icon'} width={18} height={18} />
            </Touchable>
          </View>
        </Card>
      );
    },
    [loading, navigation],
  );

  const createChild = useCallback(
    async (item) => {
      await dispatch(createChildNewDocument(item));
    },
    [dispatch],
  );

  const addChildsData = useCallback(async () => {
    setLoading(true);
    const promises = [];

    await onBoarding?.child?.map(async (child) => {
      let newChild = {
        ...child,
        birthDay: new Date(child?.birthDay)?.toUTCString(),
        profile: undefined,
      };
      const myPromise = new Promise(function (myResolve, myReject) {
        if (child?.profile) {
          const filename = getUniqueId();
          const task = storage()
            .ref(CHILDPROFILEPATH + '/' + filename)
            .putString(child?.profile?.data, 'base64', { contentType: child?.profile?.mime });

          task.on(
            'state_changed',
            null,
            (error) => myReject(error),
            (snapshot) => {
              snapshot.ref.getDownloadURL().then(async (downloadURL) => {
                newChild.profileLink = downloadURL;
                myResolve(newChild);
              });
            },
          );
        } else {
          myResolve(newChild);
        }
      });
      promises.push(myPromise);
    });
    try {
      await Promise.all(promises).then((list) => {
        list?.map(async (item) => {
          await createChild(item);
        });
      });
    } catch (error) {
      console.log('error', error);
    }
  }, [createChild, onBoarding?.child]);

  const onClickContinue = useCallback(async () => {
    try {
      setLoading(true);
      await addChildsData();
      await dispatch(appInit());
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: screens.NavigationRoot,
            },
          ],
        }),
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [addChildsData, dispatch, navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={s.root}>
        <View style={[s.paddingWrap, s.paddingTop]}>
          <View>
            <TextView text={'Great!'} style={s.titleText} />
            <TextView text={'Now add your kids.'} style={s.titleText} />
            <View style={s.stepWrapper}>
              <View style={s.wrapCenter}>
                <SvgIcon svgs={svgs} name={'step-completed'} width={28} height={28} />
                <TextView text={'You'} type={'caps'} style={s.stepText} />
              </View>
              <View style={s.dividerLeft}></View>
              <View style={s.wrapCenter}>
                <SvgIcon svgs={svgs} name={'step-completed'} width={28} height={28} />
                <TextView text={'Your Kids'} type={'caps'} style={s.stepText} />
              </View>
              <View style={s.dividerRight}></View>
              <View style={s.wrapCenter}>
                <View style={s.unactiveStep}>
                  <TextView text={'3'} type={'caps'} style={s.activeText} />
                </View>
                <TextView text={'Complete'} type={'caps'} style={s.stepText} />
              </View>
            </View>
          </View>
          <View style={s.cardWrap}>
            <FlatList
              showsVerticalScrollIndicator={false}
              // refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => loadData(true)} />}
              keyExtractor={(item, index) => `Child_Item_${item?.id}_index_${index}`}
              renderItem={renderChildItem}
              data={onBoarding?.child}
              ListEmptyComponent={
                <View>
                  <TextView text={'Child not Found'} type={'body-head'} style={s.headText} />
                </View>
              }
            />
            {/* <Card style={s.cardList}>
                <View style={s.cardRow}>
                  <View style={s.leftRow}>
                    <Image
                      source={require('../../../assets/image/bhuro.png')}
                      resizeMode='contain'
                      style={s.profileImg}
                    />
                    <View style={s.textWrap}>
                      <TextView text={'Darcy'} type={'head-line'} style={s.childName} />
                      <TextView text={'3 years'} type={'body-two'} style={s.years} />
                    </View>
                  </View>
                  <RoundIcon icon='edit-2' type='feather' iconColor={colors.black} size={28} />
                </View>
              </Card>
              <Card style={s.cardList}>
                <View style={s.cardRow}>
                  <View style={s.leftRow}>
                    <Image
                      source={require('../../../assets/image/bhuro.png')}
                      resizeMode='contain'
                      style={s.profileImg}
                    />
                    <View style={s.textWrap}>
                      <TextView text={'Darcy'} type={'head-line'} style={s.childName} />
                      <TextView text={'3 years'} type={'body-two'} style={s.years} />
                    </View>
                  </View>
                  <RoundIcon icon='edit-2' type='feather' iconColor={colors.black} size={28} />
                </View>
              </Card> */}
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
    </SafeAreaView>
  );
};

export default CompelteProfileScreen;
