import React from 'react';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import { TextInput, RadioButton } from 'react-native-paper';
import s from './styles';
import svgs from '../../../assets/svg';
import TextView from '../../../components/TextView';
import AppStyles from '../../../styles/AppStyles';
import { colors } from '../../../styles';
import DatePicker from '../../../components/molecules/DatePicker';
import Button from '../../../components/Button/Button';

const AddChildScreen = () => {
  const [checked, setChecked] = React.useState('first');
  return (
    <View style={[AppStyles.rootStyle, s.mainView]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.profileWrap}>
          <Image source={require('../../../assets/image/profile.png')} style={s.profileImg} />
          <TextView text={'Change Picture'} type={'caption'} style={s.textBtn} />
        </View>
        <View>
          <View style={s.inputWrap}>
            <TextInput
              dense={true}
              theme={{ roundness: 8 }}
              mode='outlined'
              label='Name'
              placeholder='Enter your Full Name'
              style={s.inputStyle}
              selectionColor={colors.primary}
              outlineColor={colors.borderColor}
              activeOutlineColor={colors.primary}
              placeholderTextColor={colors.litegrey}
            />
          </View>
          <View style={s.inputWrap}>
            <DatePicker placeholder={'DD/MM/YYYY'} labelText={'Date Of Birth'} place style={s.datePicker} />
          </View>
          <View style={s.inputWrap}>
            <TextView text={'Was Your Child Born Premature?'} type={'body-two'} style={s.labelText} />
            <View style={s.radioMainWrap}>
              <View style={s.radioWrap}>
                <RadioButton
                  value='first'
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('first')}
                  color={colors.primary}
                />
                <TextView text={'No'} type={'body-two'} style={s.radioText} />
              </View>
              <View style={s.radioWrap}>
                <RadioButton
                  value='second'
                  status={checked === 'second' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('second')}
                  color={colors.primary}
                />
                <TextView text={'Yes'} type={'body-two'} style={s.radioText} />
              </View>
            </View>
          </View>
          <View style={s.inputWrapTwo}>
            <TextInput
              dense={true}
              theme={{ roundness: 8 }}
              mode='outlined'
              label='How Premature?'
              style={s.inputStyle}
              selectionColor={colors.primary}
              outlineColor={colors.borderColor}
              activeOutlineColor={colors.primary}
              placeholderTextColor={colors.litegrey}
            />
          </View>
          <View style={s.inputWrap}>
            <TextView text={'Gender'} type={'body-two'} style={s.labelText} />
            <View style={s.genderWrap}>
              <TouchableOpacity style={s.focusstatus}>
                <SvgIcon svgs={svgs} name={'boy-icon'} width={35} height={35} />
                <TextView text={'Boy'} type={'body-two'} style={s.focusText} />
                <SvgIcon svgs={svgs} name={'select-icon'} width={14} height={14} style={s.selctIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={s.notfocus}>
                <SvgIcon svgs={svgs} name={'girl-icon'} width={35} height={35} />
                <TextView text={'Girl'} type={'body-two'} style={s.notfocusText} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={s.btnWrap}>
          <Button ButtonText='ADD' style={s.btnStyle} />
          <TouchableOpacity style={s.textbtnWrap}>
            <TextView text={'Add  Another Child'} type={'body-two'} style={s.btnText} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddChildScreen;
