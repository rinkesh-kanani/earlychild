import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, Platform, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modalbox';
import { Button } from '../../../components/Button';
import Icon from '../../../components/Icon';
import ScrollableAvoidKeyboard from '../../../components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';
import TextView from '../../../components/TextView';
import asyncStorageHelpers from '../../../helpers/asyncStorageHelpers';
import { colors } from '../../../styles';
import AppStyles from '../../../styles/AppStyles';
import MindfulInfoModal from '../../Home/MindfulInfoModal';
import MindfulModal from './MindfulModal';
import s from './styles';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  createMindfulPlaytimeNewDocument,
  getMindfulPlaytimeAllDocument,
} from '../../../services/mindfulPlayTimeService';
import { dateToYMD, isToday } from '../../../helpers/helpers';

const PlayTimeScreen = ({ navigation }) => {
  const mindfulPlayTimeSelector = useSelector((state) => state.mindfulPlaytime);
  const completedActivityselector = useSelector((state) => state.completedActivity);

  const { TotalCompletedActivityOfThisMonth, TotalCompletedActivity } = completedActivityselector;

  const {
    mindfulPlaytimeList,
    loading,
    TotalMindfulPlaytimeOfThisMonth,
    TotalMindfulPlaytime,
    streakOfAllTime,
    streakOfThisMonth,
  } = mindfulPlayTimeSelector;

  const [isOpenMindfulModal, setIsOpenMindfulModal] = useState(false);
  const [isShowAlertBox, setIsShowAlertBox] = useState(true);
  const [isOpenMindfulInfoModal, setIsOpenMindfulInfoModal] = useState(false);
  const [selectDay, setSelectDay] = useState(new Date());
  const [selectDate, setSelectDate] = useState(new Date());

  const [compleltedPlayTime, setCompleltedPlayTime] = useState();

  const dispatch = useDispatch();

  const onOpenMindfulModal = useCallback(() => {
    setIsOpenMindfulModal(true);
  }, []);

  const onCloseMindfulModal = useCallback(() => {
    setIsOpenMindfulModal(false);
    setSelectDay(new Date());
    setSelectDate(new Date());
  }, []);

  const loadData = useCallback(async () => {
    const isAlert = await asyncStorageHelpers.getIsPlaytimeDismiss();
    if (!isAlert) {
      setIsShowAlertBox(isAlert);
    }
    const result = await dispatch(getMindfulPlaytimeAllDocument());
    const today = dateToYMD(new Date());
    const data = {
      [today]: {
        marked: true,
        dotColor: '#3B73B6',
        customStyles: {
          text: {
            color: '#000000',
            fontWeight: 'bold',
          },
        },
      },
    };
    if (result) {
      result?.forEach((item) => {
        const formattedDate = dateToYMD(new Date(item?.playTimeDate));
        const today = isToday(item?.playTimeDate);
        if (today) {
          data[formattedDate] = {
            disabled: true,
            marked: true,
            dotColor: '#3B73B6',
            customStyles: {
              container: {
                backgroundColor: '#E8F1F7',
              },
              text: {
                color: '#3B73B6',
                fontWeight: 'bold',
              },
            },
          };
        } else {
          data[formattedDate] = {
            disabled: true,
            customStyles: {
              container: {
                backgroundColor: '#E8F1F7',
              },
              text: {
                color: '#3B73B6',
                fontWeight: 'bold',
              },
            },
          };
        }
      });
    }
    setCompleltedPlayTime(data);
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      loadData();
    });
    return () => {
      if (focusListener) focusListener();
    };
  }, [dispatch, loadData, navigation]);

  const onDismiss = useCallback(async () => {
    await asyncStorageHelpers.setIsPlaytimeDismiss(true);
    const isAlert = await asyncStorageHelpers.getIsPlaytimeDismiss();
    if (isAlert) {
      setIsShowAlertBox(isAlert);
    }
  }, []);

  const onOpenMindfulInfoModal = useCallback(() => {
    onCloseMindfulModal();
    if (Platform.OS === 'ios') {
      setTimeout(() => {
        setIsOpenMindfulInfoModal(true);
      }, 500);
    } else {
      setIsOpenMindfulInfoModal(true);
    }
  }, [onCloseMindfulModal]);

  const onCloseMindfulInfoModal = useCallback(() => {
    setIsOpenMindfulInfoModal(false);
  }, []);

  const onPressDay = useCallback(
    (item) => {
      let complelted = JSON.parse(JSON.stringify(compleltedPlayTime));
      const selected = new Date(item?.timestamp);

      setSelectDay(item?.dateString);
      setSelectDate(selected);
      const today = isToday(selected);
      if (selectDate) {
        const today = isToday(selectDate);
        if (!today) {
          if (complelted[selectDay] !== undefined) {
            delete complelted[selectDay];
          }
        }
      }
      if (!today) {
        complelted[item?.dateString] = {
          customStyles: {
            container: {
              borderWidth: 1,
              borderColor: '#3B73B6',
            },
          },
        };
      }

      setCompleltedPlayTime(complelted);
    },
    [compleltedPlayTime, selectDate, selectDay],
  );

  const onPressCheckIn = useCallback(async () => {
    const today = isToday(selectDate);
    if (today) {
      const todayIndex = mindfulPlaytimeList?.findIndex((item) => {
        const today = isToday(item?.playTimeDate);
        if (today) return true;
        return false;
      });
      if (todayIndex !== -1) {
        onOpenMindfulModal();
        return;
      }
    }
    const playTimeDate = selectDate.toISOString();
    const result = await dispatch(createMindfulPlaytimeNewDocument({ playTimeDate }));
    if (result) {
      onOpenMindfulModal();
      loadData();
    }
  }, [dispatch, loadData, mindfulPlaytimeList, onOpenMindfulModal, selectDate]);

  const checkedDay = useMemo(() => {
    const formattedDate = dateToYMD(selectDate);
    const today = isToday(selectDate);
    return today ? 'today' : moment(formattedDate).format('MMMM Do');
  }, [selectDate]);

  const isSelectedAnotherDay = useMemo(() => {
    const today = isToday(selectDate);
    return today ? false : true;
  }, [selectDate]);

  const isCheckInToday = useMemo(() => {
    const lisstIndex = mindfulPlaytimeList?.findIndex((item) => {
      const today = isToday(item?.playTimeDate);
      return today;
    });
    return lisstIndex === -1 || lisstIndex === undefined ? false : true;
  }, [mindfulPlaytimeList]);

  return (
    <>
      <View style={s.root}>
        <ScrollableAvoidKeyboard showsVerticalScrollIndicator={false}>
          <View style={s.paddingWrap}>
            <TextView text={'Mindful Playtime'} type={'sub-title'} style={s.playHead} />
            {!isShowAlertBox && (
              <View style={s.spendWrap}>
                <TextView
                  text={`Spending as little as 10 minutes a day being present  while engaging in play is proven to strengthen your child’s intellectual, physical and emotional development.`}
                  type={'body-one'}
                  style={s.spendText}
                />
                <TextView
                  text={`Complete an activity and you will automatically check yourself in today.`}
                  type={'body-one'}
                  style={s.spendText}
                />
                <View>
                  <TouchableOpacity style={s.bmborder} onPress={onOpenMindfulInfoModal}>
                    <TextView text={'LEARN MORE ABOUT MINDFUL PLAYTIME'} style={s.btnText} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onDismiss}>
                    <TextView text={'Dismiss'} type={'caps'} style={s.dismiss} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <View style={s.cardList}>
              <View style={s.firstCard}>
                <View style={s.cardRow}>
                  <View style={s.centerView}>
                    <TextView text={TotalMindfulPlaytimeOfThisMonth} style={s.numbText} />
                    <TextView text={'This month'} type={'caps'} style={s.cardCaps} />
                  </View>
                  <View style={s.imgWrap}>
                    <TextView text={'DAYS TRACKED'} style={s.cardTitle} />
                    <Image
                      source={require('../../../assets/image/firstcard.png')}
                      resizeMode='cover'
                      style={s.cardImg}
                    />
                  </View>
                  <View style={s.centerView}>
                    <TextView text={TotalMindfulPlaytime} style={s.numbText} />
                    <TextView text={'All time'} type={'caps'} style={s.cardCaps} />
                  </View>
                </View>
              </View>
              <View style={s.secondCard}>
                <View style={s.cardRow}>
                  <View style={s.centerView}>
                    <TextView text={streakOfThisMonth} style={s.numbText} />
                    <TextView text={'This month'} type={'caps'} style={s.cardCaps} />
                  </View>
                  <View style={s.imgWrap}>
                    <TextView text={'STREAK'} style={s.cardTitle} />
                    <Image
                      source={require('../../../assets/image/secondcard.png')}
                      resizeMode='cover'
                      style={s.cardImg}
                    />
                  </View>
                  <View style={s.centerView}>
                    <TextView text={streakOfAllTime} style={s.numbText} />
                    <TextView text={'All time'} type={'caps'} style={s.cardCaps} />
                  </View>
                </View>
              </View>
              <View style={s.thirdCard}>
                <View style={s.cardRow}>
                  <View style={s.centerView}>
                    <TextView text={TotalCompletedActivityOfThisMonth} style={s.numbText} />
                    <TextView text={'This month'} type={'caps'} style={s.cardCaps} />
                  </View>
                  <View style={s.imgWrap}>
                    <TextView text={'EARLYCHILD ACTIVITIES'} style={s.cardTitle} />
                    <Image
                      source={require('../../../assets/image/thirdcard.png')}
                      resizeMode='cover'
                      style={s.cardImg}
                    />
                  </View>
                  <View style={s.centerView}>
                    <TextView text={TotalCompletedActivity} style={s.numbText} />
                    <TextView text={'All time'} type={'caps'} style={s.cardCaps} />
                  </View>
                </View>
              </View>
            </View>
            <View style={s.calendarWrap}>
              <Calendar
                disabledByDefault={false}
                onDayPress={onPressDay}
                hideArrows={false}
                renderArrow={(direction) => {
                  if (direction === 'left') return <Icon name='chevron-left' size={18} color={colors.textColor} />;
                  if (direction === 'right') return <Icon name='chevron-right' size={18} color={colors.textColor} />;
                }}
                hideExtraDays={true}
                hideDayNames={false}
                showWeekNumbers={false}
                onPressArrowLeft={(subtractMonth) => subtractMonth()}
                onPressArrowRight={(addMonth) => addMonth()}
                disableArrowLeft={false}
                disableArrowRight={false}
                disableAllTouchEventsForDisabledDays={true}
                markingType={'custom'}
                markedDates={compleltedPlayTime}
                maxDate={dateToYMD(new Date())}
                initialDate={dateToYMD(new Date())}
                enableSwipeMonths={true}
                style={s.calendarContain}
                theme={{
                  todayTextColor: '#000000',
                  todayTextFontWeight: '600',
                  calendarBackground: 'transparent',
                  dayTextColor: '#3A3F42',
                  monthTextColor: '#333333',
                  backgroundColor: 'transparent',
                  textDayFontWeight: '600',
                  textDayFontSize: 16,
                  textDayHeaderFontSize: 12,
                  textMonthFontSize: 20,
                  textMonthFontFamily: 'Navigo-Regular',
                  textMonthFontWeight: '400',
                  weekVerticalMargin: 3,
                }}
              />
            </View>
            <View style={s.btnWrap}>
              <Button
                ButtonText={
                  !isSelectedAnotherDay && isCheckInToday ? 'You have checked in today' : `Check in ${checkedDay}`
                }
                onPress={onPressCheckIn}
                textStyle={AppStyles.buttonRegular}
                disabled={loading || (!isSelectedAnotherDay && isCheckInToday)}
                isLoading={loading}
              />
              <TextView text={'SELECT ANOTHER DAY TRACK A PAST DAY'} style={s.btnBottom} />
            </View>
          </View>
        </ScrollableAvoidKeyboard>
      </View>
      <Modal
        animationType='slide'
        transparent={true}
        style={s.mindfulModal}
        isOpen={isOpenMindfulModal}
        backdrop={true}
        entry={'center'}
        animationDuration={200}
        backdropColor={'rgba(0, 0, 0, 0.6)'}
        coverScreen={true}
        backButtonClose={true}
        swipeArea={1}
        onClosed={onCloseMindfulModal}>
        <MindfulModal onRequestClose={onCloseMindfulModal} checkedDay={checkedDay} />
      </Modal>
      <Modal
        style={s.modal}
        isOpen={isOpenMindfulInfoModal}
        entry={'bottom'}
        position={'bottom'}
        coverScreen={true}
        backdrop={true}
        swipeToClose={true}
        backdropColor={colors.black}
        backdropOpacity={0.6}
        backdropPressToClose={true}
        onClosed={onCloseMindfulInfoModal}>
        <MindfulInfoModal onRequestClose={onCloseMindfulInfoModal} />
      </Modal>
    </>
  );
};

export default PlayTimeScreen;
