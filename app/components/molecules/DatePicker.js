import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Modal from 'react-native-modalbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from '../../components/Icon';
import moment from 'moment';
import TextView from '../TextView';
import { colors } from '../../styles';
import Typography from '../../styles/Typography';
import { borderWidth, indent } from '../../styles/dimensions';
import { isIOS } from '../../constants/constant';

const DatePicker = ({
  labelText,
  iconName = 'calendar',
  value = new Date(),
  mode = 'date',
  is24Hour = false,
  display = isIOS ? 'spinner' : 'calendar',
  placeholder,
  isShowIcon = true,
  onChange,
}) => {
  const [isShow, setShow] = useState(false);
  const [tempDate, setTempDate] = useState(value);

  const onChangeDate = useCallback(
    (event, date) => {
      setShow(false);
      if (onChange) onChange(date);
    },
    [setShow, onChange],
  );

  const onChangeiosDateDate = (event, date) => {
    if (onChange) setTempDate(date);
  };

  return (
    <>
      <View>
        {labelText && <TextView numberOfLines={1} type={'caption'} text={labelText} style={styles.DateTitle} />}
        {isShow && Platform.OS === 'android' && (
          <DateTimePicker value={value} mode={mode} is24Hour={is24Hour} display={display} onChange={onChangeDate} />
        )}
        <TouchableOpacity
          onPress={() => {
            setShow(true);
          }}
          activeOpacity={1}>
          <View style={[styles.inputAndIcon, isShowIcon && styles.isShowBorder]}>
            {isShowIcon && (
              <Icon name={iconName} size={20} style={styles.iconPosition} color={colors.black} isFeather={false} />
            )}
            <TextView
              style={styles.dateText}
              text={
                placeholder
                  ? placeholder
                  : mode === 'time'
                  ? moment(value).utcOffset('+05:30').format('hh:mm a')
                  : moment(value).format('D/M/YYYY')
              }
            />
          </View>
        </TouchableOpacity>
      </View>
      {Platform.OS === 'ios' && (
        <Modal
          backdrop={true}
          backdropColor={'rgba(0, 0, 0, 0.6)'}
          //   easing={Easing.ease}
          animationDuration={400}
          backButtonClose={true}
          swipeArea={1}
          position={'bottom'}
          coverScreen={true}
          animationType='fade'
          style={styles.modalDate}
          isOpen={isShow}>
          <View style={styles.dateWrapper}>
            <View style={styles.actionButton}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setShow(false);
                }}>
                <TextView style={styles.text} text={'Cancel'} type={'body'} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  onChangeDate('', tempDate);
                }}>
                <TextView style={styles.text} text={'Select'} type={'body'} />
              </TouchableOpacity>
            </View>
            <DateTimePicker
              value={tempDate}
              mode={mode}
              is24Hour={is24Hour}
              display={display}
              onChange={onChangeiosDateDate}
            />
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  isShowBorder: {
    borderColor: colors.inputBorder,
    borderWidth: 1,
    backgroundColor: colors.white,
  },
  inputAndIcon: {
    fontFamily: 'Navigo-Medium',
    ...Typography.bodyHead,
    lineHeight: 15,
    width: '100%',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 19,
    position: 'relative',
  },
  iconPosition: {
    position: 'absolute',
    right: 12,
    top: '58%',
  },
  DateTitle: {
    fontFamily: 'Navigo-Regular',
    position: 'absolute',
    top: -12,
    left: 7,
    backgroundColor: colors.white,
    zIndex: 2,
    paddingHorizontal: 5,
    color: colors.textColor,
    ...Typography.caption,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: indent,
    paddingVertical: indent,
    borderBottomWidth: borderWidth,
    borderBottomColor: colors.inputBorder,
  },
  text: {
    color: colors.primary,
    fontFamily: 'Navigo-Medium',
  },
  modalDate: {
    height: null,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  dateWrapper: {
    paddingBottom: indent,
  },
  dateText: {
    fontFamily: 'Navigo-Regular',
    color: colors.textColor,
    ...Typography.bodyTwo,
  },
});

export default DatePicker;
