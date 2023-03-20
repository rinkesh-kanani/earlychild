import { View, SafeAreaView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../../assets/svg';
import s from './styles';
import TextView from '../../../components/TextView';
import HeaderButton from '../../../components/HeaderButton';
import { colors } from '../../../styles';
import AppStyles from '../../../styles/AppStyles';
import Card from '../../../components/Card';
import Icon from '../../../components/Icon';
import { Button, Touchable } from '../../../components/Button';
import screens from '../../../constants/screens';
import { useSelector } from 'react-redux';
import AppAvtar from '../../../components/Avtar/AppAvtar';
import { calculateAge } from '../../../helpers/helpers';

const AddChildsScreen = ({ navigation }) => {
  const authSelector = useSelector((state) => state.auth);
  const { onBoarding } = authSelector;

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
    (item) => {
      const age = calculateAge(item?.birthDay);

      return (
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
            onPress={() => {
              navigation.push(screens.KidsProfile, { item });
            }}>
            <SvgIcon svgs={svgs} name={'edit-icon'} width={18} height={18} />
          </Touchable>
        </View>
      );
    },
    [navigation],
  );
  const childListView = useMemo(() => {
    return onBoarding?.child?.map((item, index) => {
      return (
        <Card style={s.cardList} key={`child_item_${item?.id}_index_${index}`}>
          {renderChildItem(item)}
        </Card>
      );
    });
  }, [onBoarding?.child, renderChildItem]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={s.root}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
                  <View style={s.activeStep}>
                    <TextView text={'2'} type={'caps'} style={s.activeText} />
                  </View>
                  <TextView text={'Your Kids'} type={'caps'} style={s.stepText} />
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
            <View style={s.cardWrap}>
              {childListView}
              <TouchableOpacity
                style={s.addWrapper}
                onPress={() => {
                  navigation.push(screens.KidsProfile);
                }}>
                <View style={s.iconBg}>
                  <Icon name={'plus'} color={colors.primary} size={16} />
                </View>
                <TextView text={'Add Another Child'} type={'body-head'} style={s.addChild} />
              </TouchableOpacity>
            </View>
            <View style={s.btnwrap}>
              <Button
                ButtonText='Continue'
                textStyle={s.btnText}
                onPress={() => {
                  navigation.navigate(screens.CompleteProfile);
                }}
              />
              <Button
                ButtonText='Back'
                style={AppStyles.backbtn}
                textStyle={AppStyles.backbtnText}
                onPress={() => {
                  navigation.navigate(screens.KidsProfile);
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddChildsScreen;
