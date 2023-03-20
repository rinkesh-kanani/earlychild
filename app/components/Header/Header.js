import React, { useCallback, useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalBox from 'react-native-modalbox';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../assets/svg';
import { isIOS } from '../../constants/constant';
import { colors } from '../../styles';
import AppStyles from '../../styles/AppStyles';
import { Button } from '../Button';
import HeaderButton from '../HeaderButton';
import TextView from '../TextView';
import s from './Styles';

const Header = ({ navigation }) => {
  const [isOpenMultiUser, setIsMultiUser] = useState(false);
  const [userProfileSelect, setUserProfileSelect] = useState(1);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerRow}>
          <TouchableOpacity onPress={onOpenUserModal}>
            <Image source={require('../../assets/image/profileedit.png')} resizeMode='contain' style={s.imgDp} />
          </TouchableOpacity>
          <TextView text={'Kai Hunter'} type={'body'} style={s.headerText} />
          <HeaderButton
            type={1}
            iconName={'chevron-down'}
            color={colors.textColor}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity style={s.rightHeadView}>
          <SvgIcon svgs={svgs} name={'menu-icon'} width={24} height={24} />
        </TouchableOpacity>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation, onOpenUserModal]);

  const onCloseUserModal = useCallback(() => {
    setIsMultiUser(false);
  }, []);

  const onOpenUserModal = useCallback(() => {
    setIsMultiUser(true);
  }, []);

  return (
    <ModalBox
      style={s.modal}
      isOpen={isOpenMultiUser}
      entry={'bottom'}
      position={'bottom'}
      coverScreen={true}
      backdrop={true}
      swipeToClose={true}
      backButtonClose={true}
      backdropOpacity={0.5}
      backdropColor={colors.modalbg}
      backdropPressToClose={true}
      onClosed={onCloseUserModal}>
      <KeyboardAvoidingView style={s.modalContainer} behavior={isIOS && 'padding'}>
        <View style={s.modalWrapper}>
          <View style={s.rectView}></View>
          <View style={s.modalCardWarpper}>
            <ScrollView
              keyboardShouldPersistTaps={'handled'}
              contentContainerStyle={s.mainView}
              showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                style={s.RowlistModal}
                onPress={() => {
                  setUserProfileSelect(1);
                }}>
                <View style={s.rowWrap}>
                  <Image
                    source={require('../../assets/image/profileedit.png')}
                    resizeMode='contain'
                    style={s.userModal}
                  />
                  <View style={s.modalText}>
                    <TextView text={'Kai Hunter'} type={'body-one'} style={s.userName} />
                    <TextView text={'24 months'} type={'caps'} style={s.userYear} />
                  </View>
                </View>
                {userProfileSelect === 1 && (
                  <SvgIcon svgs={svgs} name={'checked-icon'} width={18} height={18} style={s.checkIcon} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={s.RowlistModal}
                onPress={() => {
                  setUserProfileSelect(2);
                }}>
                <View style={s.rowWrap}>
                  <Image
                    source={require('../../assets/image/profileedit.png')}
                    resizeMode='contain'
                    style={s.userModal}
                  />
                  <View style={s.modalText}>
                    <TextView text={'Darcy Hunter'} type={'body-one'} style={s.userName} />
                    <TextView text={'3.5 years'} type={'caps'} style={s.userYear} />
                  </View>
                </View>
                {userProfileSelect === 2 && (
                  <SvgIcon svgs={svgs} name={'checked-icon'} width={18} height={18} style={s.checkIcon} />
                )}
              </TouchableOpacity>
              <View>
                <Button ButtonText='Add a Child' textStyle={AppStyles.buttonText} style={s.btnModal} />
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ModalBox>
  );
};

export default Header;
