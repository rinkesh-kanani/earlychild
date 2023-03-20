import { Image, Platform, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import Modal from 'react-native-modalbox';
import s from './styles';
import svgs from '../../assets/svg';
import TextView from '../../components/TextView';
import Icon from '../../components/Icon';
import { colors } from '../../styles';
import screens from '../../constants/screens';
import Card from '../../components/Card';
import ScrollableAvoidKeyboard from '../../components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';
import RoundIcon from '../../components/RoundIcon';
import { Button } from '../../components/Button';
import MindfulModal from './MindfulModal';
import AppStyles from '../../styles/AppStyles';
import MindfulInfoModal from './MindfulInfoModal';
import { useSelector, useDispatch } from 'react-redux';
import { getFeaturedArticleList } from '../../services/articleService';
import Loading from '../../components/Loading';
import { useIsFocused } from '@react-navigation/native';
import AppAvtar from '../../components/Avtar/AppAvtar';
import { setCurrentChildData } from '../../services/childService';
import { isEmpty, isToday, } from '../../helpers/helpers';
import { createMindfulPlaytimeNewDocument, getMindfulPlaytimeAllDocument } from '../../services/mindfulPlayTimeService';
import { getQuoteList } from '../../services/quoteService';
import { getTodayActivityList } from '../../services/activityservice';
import { setIsNavigateHomeToMilestone } from '../Milestones/Milestones';
import CustomStatusBarColor from '../../components/CustomStatusBarColor';

const HomeScreen = ({ navigation }) => {
  const [isOpenMindfulModal, setIsOpenMindfulModal] = useState(false);
  const [isOpenMindfulInfoModal, setIsOpenMindfulInfoModal] = useState(false);
  const articleSelector = useSelector((state) => state.article);
  const childSelector = useSelector((state) => state.child);
  const mindfulPlayTimeSelector = useSelector((state) => state.mindfulPlaytime);
  const completedActivityselector = useSelector((state) => state.completedActivity);
  const quoteselector = useSelector((state) => state.quote);
  const activitySelector = useSelector((state) => state.activity);
  const appSelector = useSelector((state) => state.app);

  const { profileRoot } = appSelector;
  const { childList } = childSelector;
  const { featuredArticleList } = articleSelector;
  const { mindfulPlaytimeList, streakOfThisMonth } = mindfulPlayTimeSelector;
  const { TotalCompletedActivityOfThisMonth, completeActivityList } = completedActivityselector;
  const { quoteList } = quoteselector;
  const { todayActivityList } = activitySelector;

  const [loading, setLoading] = useState(false);
  const [milestoneLoading, setMilestoneLoading] = useState(false);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const onOpenMindfulModal = useCallback(() => {
    setIsOpenMindfulModal(true);
  }, []);

  const onCloseMindfulModal = useCallback(() => {
    setIsOpenMindfulModal(false);
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

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      await dispatch(getFeaturedArticleList());
      await dispatch(getQuoteList());
      await dispatch(getTodayActivityList(childList[0]?.birthDay));
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [childList, dispatch]);

  useEffect(() => {
    loadData();
  }, [dispatch, loadData]);

  const articleListView = useMemo(() => {
    if (featuredArticleList)
      return featuredArticleList?.map((item, index) => {
        return (
          <View style={s.wrapWorkCard} key={`featuredarticlelistview_index_${index}`}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(screens.ArticlesDetail, { item: item?.content });
              }}
              activeOpacity={0.9}>
              <View style={s.imgWrap}>
                <Image source={{ uri: item?.content?.banner?.url }} style={s.imgVideo} />
              </View>
              <Card style={s.cardWrap}>
                <View>
                  <TextView text={item?.content?.tag?.title} style={s.smallTitle} />
                  <TextView text={item?.content?.title} numberOfLines={2} type={'body-head'} style={s.titleArticles} />
                  <View style={s.leftbmborder}>
                    <TextView text={'READ ARTICLE'} style={s.linkTag} />
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          </View>
        );
      });
    return null;
  }, [featuredArticleList, navigation]);

  const onTapChild = useCallback(
    async (child) => {
      await dispatch(setCurrentChildData(child));
      await setIsNavigateHomeToMilestone(true);
      navigation.navigate(screens.MilestonesRoot);
    },
    [dispatch, navigation],
  );

  const milestoneView = useMemo(() => {
    return childList?.map((item, index) => {
      return (
        <Card style={s.cardList} key={`milestoneview_index_${index}`}>
          <TouchableOpacity onPress={() => onTapChild(item)} style={s.cardRow}>
            <View style={s.leftRow}>
              <AppAvtar
                Imgsrc={item?.profileLink ? item?.profileLink : undefined}
                Name={item?.firstName}
                Size={56}
                TextType={'title'}
              />
              <View style={s.textWrap}>
                <TextView text={item?.firstName} type={'head-line'} style={s.childName} />
                <TextView text={item?.age} type={'body-two'} style={s.years} />
              </View>
            </View>
            <RoundIcon icon='chevron-right' type='feather' iconColor={colors.black} size={28} />
          </TouchableOpacity>
        </Card>
      );
    });
  }, [childList, onTapChild]);


  const createNewDocument = useCallback(async () => {
    const playTimeDate = new Date().toISOString();
    const result = await dispatch(createMindfulPlaytimeNewDocument({ playTimeDate }));
    if (result) {
      setMilestoneLoading(false);
      onOpenMindfulModal();
      await dispatch(getMindfulPlaytimeAllDocument());
    }
  }, [dispatch, onOpenMindfulModal]);

  const isCheckInToday = useMemo(() => {
    const lisstIndex = mindfulPlaytimeList?.findIndex((item) => {
      const today = isToday(item?.playTimeDate);
      return today;
    });
    return lisstIndex === -1 || lisstIndex === undefined ? false : true;
  }, [mindfulPlaytimeList]);

  const onClickCheckInToday = useCallback(async () => {
    try {
      setMilestoneLoading(true);

      if (isEmpty(mindfulPlaytimeList)) await createNewDocument();
      else {
        if (!isCheckInToday) await createNewDocument();
      }
    } catch (error) {
      console.log('error', error);
      setMilestoneLoading(false);
    } finally {
      setMilestoneLoading(false);
    }
  }, [createNewDocument, isCheckInToday, mindfulPlaytimeList]);

  const completedActivityView = useMemo(() => {
    return <TextView text={TotalCompletedActivityOfThisMonth} type={'header'} style={s.activityNum} />;
  }, [TotalCompletedActivityOfThisMonth]);

  const activitySubjectListView = useCallback((subjectList) => {
    return subjectList?.map((item, index) => {
      return (
        <View style={s.tagWrap} key={`activitysubjectlistview_index_${index}`}>
          <View style={[s.labelcard, { backgroundColor: item?.color }]}>
            <TextView text={item?.title} style={s.todayTag} />
          </View>
        </View>
      );
    });
  }, []);

  const isCompletedActivity = useCallback(
    (id) => {
      const activityIndex = completeActivityList?.findIndex((activity) => activity?.activityid === id);
      if (activityIndex !== -1) return true;
      return false;
    },
    [completeActivityList],
  );

  const todayActivityListView = useMemo(() => {
    if (!isEmpty(todayActivityList))
      return todayActivityList?.map((item, index) => {
        const isCompleted = isCompletedActivity(item?.sys?.id);
        return (
          <View style={s.wrapCardToday} key={`todayactivity_index_${index}`}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(screens.SingleActivity, { slug: item?.slug });
              }}
              style={s.boxShadow}
              activeOpacity={0.9}>
              <View style={s.imgWrapToday}>
                <Image source={{ uri: `${item?.banner?.url}?q=50` }} style={s.imgToday} />
                {isCompleted && (
                  <SvgIcon svgs={svgs} name={'Select-icon'} width={26} height={26} style={s.selectIcon} />
                )}
                {item?.isPrintable && (
                  <View style={s.labelWrap}>
                    <TextView text={'PRINTABLE'} style={s.labelText} />
                  </View>
                )}
              </View>

              <Card style={s.cardWrapToday}>
                <View>
                  <TextView text={`AGE ${item?.age}+`} style={s.todayTitle} />
                  <TextView text={item?.title} numberOfLines={1} type={'body-head'} style={s.titleSkills} />
                  <View style={s.wrapLast}>
                    <View style={s.labelCard}>{activitySubjectListView(item?.subjectCollection?.items)}</View>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          </View>
        );
      });
    return null;
  }, [activitySubjectListView, isCompletedActivity, navigation, todayActivityList]);

  return (
    <>
      {isFocused && <CustomStatusBarColor backgroundColor={colors.white} barStyle='dark-content' />}
      <SafeAreaView style={s.root}>
        <ScrollableAvoidKeyboard style={s.scrollContain} showsVerticalScrollIndicator={false}>
          <View style={s.paddingbt}>
            {/* <View style={s.topNav}>
              <Image source={require('../../assets/image/bgtoplogo.png')} style={s.imgToplogo} />
              <SvgIcon svgs={svgs} name={'early-icon'} width={101} height={24} style={s.ealrylogo} />
            </View> */}
            {loading ? (
              <Loading />
            ) : (
              <>
                <View style={s.thisMonthWrap}>
                  <View style={[s.monthWrapper, s.mbmargin]}>
                    <TextView text={'THIS MONTH'} style={s.monthText} />
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate(profileRoot ? screens.PlayTime : screens.ProfileRoot);
                      }}
                      style={s.rightArrowWrap}>
                      <TextView text={'View all stats'} type={'caps'} style={s.viewState} />
                      <Icon name={'chevron-right'} size={15} color={colors.textColor} style={s.moreIcon} />
                    </TouchableOpacity>
                  </View>
                  <View style={s.firstWrap}>
                    <TouchableOpacity activeOpacity={0.7} style={s.atCompleted}>
                      <View style={s.rowactivity}>
                        {completedActivityView}
                        <SvgIcon svgs={svgs} name={'acti-icon'} width={35} height={35} />
                      </View>
                      <TextView text={'Activities Completed'} type={'caps'} style={s.titlebox} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={s.mpCompleted}>
                      <View style={s.rowactivity}>
                        <TextView text={streakOfThisMonth} type={'header'} style={s.activityNum} />
                        <SvgIcon svgs={svgs} name={'streak-icon'} width={35} height={35} />
                      </View>
                      <TextView text={'Mindful Playtime Streak'} type={'caps'} style={s.titlebox} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <View style={s.ActivityToday}>
                    <View style={s.monthWrapper}>
                      <TextView text={'Today for you'} type={'head-line'} style={s.todayText} />

                      <TouchableOpacity
                        style={s.rightArrowWrap}
                        onPress={() => {
                          navigation.navigate(screens.ExploreActivities);
                        }}>
                        <TextView text={'More activities'} type={'caps'} style={s.viewState} />
                        <Icon name={'chevron-right'} size={15} color={colors.textColor} style={s.moreIcon} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <ScrollView horizontal={true} style={s.horizontalscroll} showsHorizontalScrollIndicator={false}>
                    <View style={s.todaysWrapper}>{todayActivityListView}</View>
                  </ScrollView>
                </View>
                {/* {inspirationTextView} */}

                <View style={s.milestoneWrap}>
                  <TextView text={'Milestones'} type={'head-line'} style={s.milesText} />
                  <View>{milestoneView}</View>
                </View>
                <View style={s.midfulPlay}>
                  <Image source={require('../../assets/image/birds.png')} style={s.birdsImg} />
                  <View style={s.mindContain}>
                    <TextView text={'Mindful Playtime'} type={'sub-title'} style={s.mindfulText} />
                    <TextView text={quoteList?.mindfulPlayTimeText} style={s.mindCaps} />
                    <Button
                      ButtonText={isCheckInToday ? 'You have checked in today' : 'Check in today'}
                      textStyle={AppStyles.buttonRegular}
                      onPress={onClickCheckInToday}
                      disabled={milestoneLoading || isCheckInToday}
                      isLoading={milestoneLoading}
                    />
                    <View style={s.btmBorder}>
                      <TextView
                        text={'LEARN MORE ABOUT MINDFUL PLAYTIME'}
                        onPress={onOpenMindfulInfoModal}
                        style={s.btnText}
                      />
                    </View>
                  </View>
                </View>
                <View style={s.workShopWrap}>
                  <View style={s.ReadingToday}>
                    <View style={s.monthWrapper}>
                      <TextView text={'Recommended Reading'} type={'head-line'} style={s.todayText} />
                      <TouchableOpacity
                        style={s.rightArrowWrap}
                        onPress={() => {
                          navigation.navigate(screens.Articles);
                        }}>
                        <TextView text={'All articles'} type={'caps'} style={s.viewState} />
                        <Icon name={'chevron-right'} size={15} color={colors.textColor} style={s.moreIcon} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {articleListView}
                </View>
              </>
            )}
          </View>
        </ScrollableAvoidKeyboard>
      </SafeAreaView>
      <Modal
        animationType='slide'
        transparent={true}
        style={s.mindfulModal}
        isOpen={isOpenMindfulModal}
        backdrop={true}
        entry={'center'}
        animationDuration={200}
        backdropColor={colors.black}
        backdropOpacity={0.6}
        coverScreen={true}
        backButtonClose={true}
        swipeArea={1}
        onClosed={onCloseMindfulModal}>
        <MindfulModal onRequestClose={onCloseMindfulModal} navigation={navigation} />
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

export default HomeScreen;
