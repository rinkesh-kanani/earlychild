import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import { StyleSheet, View, ViewPropTypes, Platform, Modal } from 'react-native';
import { Picker as RPicker } from '@react-native-picker/picker';
import Touchable from '../molecules/Touchable';
import Icon from '../Icon';
import TextView from '../TextView';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../assets/svg';
import { borderWidth, indent, InputVerticalPadding } from '../../styles/dimensions';
import { colors } from '../../styles';

const Picker = ({
  containerStyle,
  selectedValue,
  onValueChange,
  label,
  data,
  itemKeyField,
  itemValueField,
  labelStyle,
  pickerInputStyle,
  enabled = true,
  style,
  ...props
}) => {
  const [isVisibleModal, setVisibleModal] = useState(false);
  const [selecedValueLabelIOS, setPickerLabelIOS] = useState('');
  const onToggleModal = () => {
    setVisibleModal(!isVisibleModal);
  };
  const onSelectIOS = (value) => {
    setPickerLabelIOS(value);
  };
  useEffect(() => {
    let item = data?.find((x) => x[itemKeyField] === selectedValue);
    if (item) setPickerLabelIOS(item[itemValueField]);
  }, [data, itemKeyField, itemValueField, selectedValue]);

  if (Platform.OS == 'android') {
    return (
      <View style={[s.wrapper, containerStyle]}>
        <RPicker selectedValue={selectedValue} style={s.androidPicker} onValueChange={onValueChange} {...props}>
          <RPicker.Item label={label} value='' color={colors.grey} />
          {data?.map((item) => {
            return (
              <RPicker.Item
                key={item[itemKeyField]}
                label={item[itemValueField]}
                value={item[itemKeyField]}
                color={colors.grey}
                icon={() => <Icon name={'chevron-down'} />}
              />
            );
          })}
        </RPicker>
      </View>
    );
  } else {
    return (
      <View style={containerStyle}>
        <View style={[s.inputWrapper, style, pickerInputStyle]}>
          <Touchable onPress={onToggleModal} disabled={!enabled}>
            <View style={s.SelectButton}>
              <TextView
                text={selecedValueLabelIOS ? selecedValueLabelIOS : label}
                numberOfLines={1}
                type={'body'}
                style={selecedValueLabelIOS ? s.selectedValue : labelStyle}
              />
              {/* <Icon name={'chevron-down'} color={colors.grey} size={20} style={s.pickerArrow} /> */}
              <SvgIcon svgs={svgs} name={'picker-icon'} width={7} height={10} style={s.pickerArrow} />
            </View>
          </Touchable>
        </View>
        <Modal animationType='fade' transparent={true} visible={isVisibleModal} onRequestClose={onToggleModal}>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.lightBlackOpacity,
            }}>
            <Touchable onPress={onToggleModal} style={s.IOSCloseBtn} />
            <View
              style={{
                backgroundColor: colors.white,
                width: '100%',
                zIndex: 99,
                marginTop: 'auto',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Touchable
                  style={{
                    padding: 0,
                  }}
                  onPress={() => {
                    //show selected value in label
                    if (selectedValue && data) {
                      //Get object by id to show its details
                      let item = data?.find((x) => x[itemKeyField] === selectedValue);
                      if (item) onSelectIOS(item[itemValueField]);
                      else onSelectIOS();
                    } else onSelectIOS();

                    onToggleModal();
                  }}>
                  <TextView text={'Select'} type={'body'} style={s.selectText} />
                </Touchable>
              </View>
              <RPicker selectedValue={selectedValue} onValueChange={onValueChange} {...props}>
                {data?.map((item) => {
                  return (
                    <RPicker.Item
                      key={item[itemKeyField]}
                      label={item[itemValueField]}
                      value={item[itemKeyField]}
                      color={colors.grey}
                    />
                  );
                })}
              </RPicker>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
};

const s = StyleSheet.create({
  androidPicker: {
    width: '100%',
  },
  wrapper: {
    borderBottomWidth: borderWidth,
    borderBottomColor: colors.borderColor,
  },
  inputWrapper: {
    borderBottomWidth: borderWidth,
    borderBottomColor: colors.borderColor,
    ...Platform.select({
      ios: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    }),
  },
  SelectButton: {
    flex: 1,
    paddingVertical: InputVerticalPadding,
    flexDirection: 'row',
    paddingRight: indent,
    alignItems: 'center',
    justifyContent: 'flex-end',
    ...Platform.select({
      ios: {
        width: '100%',
      },
    }),
  },
  pickerArrow: {
    ...Platform.select({
      ios: {
        marginLeft: 'auto',
      },
    }),
  },
});
Picker.propTypes = {
  containerStyle: ViewPropTypes.style,
  selectedValue: T.string,
  onValueChange: T.func.isRequired,
  label: T.string.isRequired,
  data: T.any.isRequired,
  itemKeyField: T.string.isRequired,
  itemValueField: T.string.isRequired,
  isVisibleModal: T.bool,
  onToggleModal: T.func,
  onSelectIOS: T.func,
  selecedValueLabelIOS: T.string,
};

export default Picker;
