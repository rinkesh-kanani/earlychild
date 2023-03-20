import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import Modal from 'react-native-modalbox';
import TextView from '../../components/TextView';
import { colors } from '../../styles';
import s from './styles';
import svgs from '../../assets/svg';
import AppStyles from '../../styles/AppStyles';
import Icon from '../../components/Icon';
import Card from '../../components/Card';
import ScrollableAvoidKeyboard from '../../components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';
import SelectProfileModal from './SelectProfileModal';
import SingleMilestonesModal from './SingleMilestonesModal';
import { getCurrentMilestone, getMilestoneTaskList } from '../../services/milestoneservice';
import { useDispatch, useSelector } from 'react-redux';
import { setMilestoneTask, setMilestoneTaskList, updateMilestoneTaskList } from '../../actions/milestoneActions';
import Loading from '../../components/Loading';
import AppAvtar from '../../components/Avtar/AppAvtar';
import MoreProfileModal from './MoreProfileModal';
import { isEmpty } from '../../helpers/helpers';
import asyncStorageHelpers from '../../helpers/asyncStorageHelpers';
import MilestonesInfoModal from './MilestonesInfoModal';
import { Touchable } from '../../components/Button';

let isNavigateHomeToMilestone = false;
export const setIsNavigateHomeToMilestone = (value) => {
  isNavigateHomeToMilestone = value;
};

const MilestonesScreen = ({ navigation }) => {
  const milestoneSelector = useSelector((state) => state.milestone);
  const childSelector = useSelector((state) => state.child);

  const { currentChild } = childSelector;
  const { currentMilestone, milestoneTaskList, milestoneList } = milestoneSelector;

  const [isOpenProfileModal, setIsProfileModal] = useState(false);
  const [isOpenMilestoneModal, setIsMilestoneModal] = useState(false);
  const [isOpenInfoModal, setIsInfoModal] = useState(false);

  // const [isOpenMoreProfileModal, setIsMoreProfileModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();


  const onOpenProfileModal = useCallback(() => {
    if (Platform.OS === 'ios') {
      setTimeout(() => {
        setIsProfileModal(true);
      }, 500);
    } else {
      setIsProfileModal(true);
    }
  }, []);

  const onCloseProfileModal = useCallback(() => {
    setIsProfileModal(false);
  }, []);

  const onOpenMoreProfileModal = useCallback(() => {
    setIsProfileModal(true);
  }, []);

  const onCloseMoreProfileModal = useCallback(() => {
    setIsProfileModal(false);
  }, []);
  const onOpenInfoModal = useCallback(() => {
    setIsInfoModal(true);
  }, []);

  const onCloseInfoModal = useCallback(() => {
    setIsInfoModal(false);
  }, []);
  const onOpenMilestoneModal = useCallback(
    (item) => {
      dispatch(setMilestoneTask(item));
      setIsMilestoneModal(true);
    },
    [dispatch],
  );

  const onCloseMilestoneModal = useCallback(() => {
    setIsMilestoneModal(false);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: isEmpty(currentChild)
        ? null
        : () => (
            <TouchableOpacity style={s.headerRow} onPress={onOpenMoreProfileModal} activeOpacity={0.7}>
              <View style={s.rowList}>
                <AppAvtar
                  Imgsrc={currentChild?.profileLink ? currentChild?.profileLink : undefined}
                  Name={currentChild?.firstName}
                  Size={48}
                  TextType={'sub-head'}
                />
                <View style={s.headerTextWrap}>
                  <View style={s.rowList}>
                    <TextView
                      text={`${currentChild?.firstName} ${currentChild?.lastName}`}
                      type={'body-head'}
                      style={s.headerText}
                    />
                    <Touchable onPress={onOpenMoreProfileModal} style={s.profileIcon}>
                      <Icon name={'chevron-down'} color={colors.textColor} size={22} />
                    </Touchable>
                  </View>
                  <TextView text={currentChild?.age} type={'body-two'} style={s.cildMonth} />
                </View>
              </View>
            </TouchableOpacity>
          ),
      headerRight: isEmpty(currentChild)
        ? null
        : () => (
            <TouchableOpacity style={s.rightHeadView} activeOpacity={0.5} onPress={onOpenInfoModal}>
              <SvgIcon svgs={svgs} name={'help-icon'} width={16} height={16} />
            </TouchableOpacity>
          ),
      headerStyle: AppStyles.milesRowHeader,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [
    currentChild,
    currentChild?.age,
    currentChild?.firstName,
    currentChild?.lastName,
    currentChild?.profileLink,
    isOpenProfileModal,
    navigation,
    onOpenInfoModal,
    onOpenMoreProfileModal,
    onOpenProfileModal,
  ]);

  const onFocusTab = useCallback(async () => {
    const isModalAlreadyOpen = await asyncStorageHelpers.getIsSelectChildModalOpenToday();
    if (!isModalAlreadyOpen && !isNavigateHomeToMilestone) {
      onOpenProfileModal();
      await asyncStorageHelpers.setIsSelectChildModalOpenToday();
    }
    if (isNavigateHomeToMilestone) {
      setIsNavigateHomeToMilestone(false);
    }
  }, [onOpenProfileModal]);

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      onFocusTab();
    });
    return () => {
      if (focusListener) focusListener();
    };
  }, [currentChild, dispatch, navigation, onFocusTab, onOpenProfileModal]);

  const loadData = useCallback(
    async (milestoneSlug) => {
      try {
        setLoading(true);
        const slug = milestoneSlug ? milestoneSlug : currentChild?.milestone;
        await dispatch(getCurrentMilestone(slug));
        await dispatch(getMilestoneTaskList(currentChild?.id, slug));
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    [currentChild?.id, currentChild?.milestone, dispatch],
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onChangeMilestoneTaskOpen = useCallback(
    (item) => {
      const newMilestoneTaskItem = { ...item, isOpen: !item?.isOpen };
      dispatch(updateMilestoneTaskList({ slug: item?.slug, item: newMilestoneTaskItem }));
    },
    [dispatch],
  );

  const milestoneTitleView = useMemo(() => {
    if (currentMilestone) return <TextView text={currentMilestone?.title} style={s.yearText} />;
    return null;
  }, [currentMilestone]);

  const milestoneDescriptionView = useMemo(() => {
    if (currentMilestone?.description)
      return (
        <View style={s.cardDetails}>
          <TextView text={currentMilestone?.description} type={'body-two'} style={s.cardText} />
        </View>
      );
    return null;
  }, [currentMilestone?.description]);

  const milestoneTaskListView = useCallback(
    (list) => {
      return list?.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => onOpenMilestoneModal(item)}
            style={[s.rowTask, { backgroundColor: item?.isCheck ? '#E8F1F7' : '' }]}
            key={`milestonetasklistview_index_${index}`}>
            <SvgIcon
              svgs={svgs}
              name={item?.isCheck ? 'toggle-fill' : 'toggle-unfill'}
              width={20}
              height={20}
              style={s.selectTik}
            />
            <TextView text={item?.title} type={'body-one'} style={s.taskText} />
          </TouchableOpacity>
        );
      });
    },
    [onOpenMilestoneModal],
  );

  const milestoneSubjectListView = useMemo(() => {
    return milestoneTaskList?.map((item, index) => {
      const noOfTaskCheck = item?.tasks?.filter((x) => x?.isCheck).length;
      return (
        <Card style={s.cardShadow} key={`milestonesubjectlistView_index_${index}`}>
          <TouchableOpacity
            onPress={() => onChangeMilestoneTaskOpen(item)}
            style={[s.cardRow, item?.isOpen && { borderBottomWidth: 1, borderColor: colors.borderColor }]}>
            <View style={s.leftCardWrap}>
              <TextView text={item?.subject} style={s.cardHead} />
              <View style={s.taskWrapValue}>
                <TextView text={`${noOfTaskCheck}/${item?.tasks?.length}`} type={'caps'} style={s.value} />
                <SvgIcon svgs={svgs} name={'card-check'} width={16} height={16} />
              </View>
            </View>

            <Icon name={'chevron-down'} color={colors.textColor} size={20} />
          </TouchableOpacity>
          {item?.isOpen && milestoneTaskListView(item?.tasks)}
        </Card>
      );
    });
  }, [milestoneTaskList, milestoneTaskListView, onChangeMilestoneTaskOpen]);

  const onPressPrevious = useCallback(async () => {
    const slug = currentMilestone?.slug;
    const milestonelength = milestoneList?.length;
    const currentMilestoneIndex = milestoneList?.findIndex((x) => x?.milestone?.slug === slug);
    const firstIndex = 0;
    if (currentMilestoneIndex !== -1 && currentMilestoneIndex <= milestonelength - 1) {
      if (currentMilestoneIndex !== firstIndex) {
        const nextMileStone = milestoneList[currentMilestoneIndex - 1];
        await dispatch(getCurrentMilestone(nextMileStone?.milestone?.slug));
        if (!isEmpty(nextMileStone?.milestoneTaskList)) loadData(nextMileStone?.milestone?.slug);
        else dispatch(setMilestoneTaskList());
      }
    }
  }, [currentMilestone?.slug, dispatch, loadData, milestoneList]);

  const onPressNext = useCallback(async () => {
    const slug = currentMilestone?.slug;
    const milestonelength = milestoneList?.length;
    const currentMilestoneIndex = milestoneList?.findIndex((x) => x?.milestone?.slug === slug);
    const lastIndex = milestonelength - 1;
    if (currentMilestoneIndex !== -1 && currentMilestoneIndex <= milestonelength - 1) {
      if (currentMilestoneIndex !== lastIndex) {
        const nextMileStone = milestoneList[currentMilestoneIndex + 1];
        await dispatch(getCurrentMilestone(nextMileStone?.milestone?.slug));
        if (!isEmpty(nextMileStone?.milestoneTaskList)) loadData(nextMileStone?.milestone?.slug);
        else dispatch(setMilestoneTaskList());
      }
    }
  }, [currentMilestone?.slug, dispatch, loadData, milestoneList]);

  const renderContent = useMemo(() => {
    if (isEmpty(currentChild)) return null;
    return (
      <ScrollableAvoidKeyboard showsVerticalScrollIndicator={false}>
        <View style={s.rootpadding}>
          {currentChild?.milestone === currentMilestone?.slug && (
            <TextView text={'CURRENT STAGE'} style={s.milestoneText} />
          )}
          <View
            style={[
              s.firstWrap,
              currentChild?.milestone === currentMilestone?.slug ? { paddingTop: 0 } : { paddingTop: 14 },
            ]}>
            <TouchableOpacity onPress={onPressPrevious}>
              <Icon name={'chevron-left'} color={colors.textColor} size={25} />
            </TouchableOpacity>
            <View style={s.centerWrap}>{milestoneTitleView}</View>
            <TouchableOpacity onPress={onPressNext}>
              <Icon name={'chevron-right'} color={colors.textColor} size={25} />
            </TouchableOpacity>
          </View>
          {milestoneDescriptionView}
          {/* <View style={s.bmborder}>
                <TextView text={'MILESTONE CHART'} type={'caps'} style={s.chartText} />
              </View> */}
        </View>
        {loading ? (
          <Loading />
        ) : (
          <>
            <View style={s.cardWrap}>{milestoneSubjectListView}</View>
          </>
        )}
      </ScrollableAvoidKeyboard>
    );
  }, [currentChild, currentMilestone?.slug, loading, milestoneDescriptionView, milestoneSubjectListView, milestoneTitleView, onPressNext, onPressPrevious]);

  return (
    <>
      <View style={s.root}>{renderContent}</View>
      <Modal
        style={s.modal}
        isOpen={isOpenProfileModal}
        entry={'bottom'}
        position={'bottom'}
        swipeToClose={false}
        backdrop={true}
        coverScreen={true}
        backdropOpacity={0.7}
        backdropColor={'#030509'}
        backButtonClose={true}
        backdropPressToClose={true}
        onClosed={onCloseProfileModal}>
        <SelectProfileModal onRequestClose={onCloseProfileModal} navigation={navigation} />
      </Modal>
      <Modal
        style={s.modal}
        isOpen={isOpenMilestoneModal}
        entry={'bottom'}
        position={'bottom'}
        swipeToClose={true}
        backdrop={true}
        coverScreen={true}
        backdropOpacity={0.7}
        backdropColor={'#030509'}
        backButtonClose={true}
        backdropPressToClose={true}
        onClosed={onCloseMilestoneModal}>
        <SingleMilestonesModal
          onRequestClose={onCloseMilestoneModal}
          onLoadData={loadData}
          navigation={navigation}
          childId={currentChild?.id}
          childName={currentChild?.firstName}
        />
      </Modal>
      <Modal
        style={s.PopupModal}
        isOpen={false}
        entry={'top'}
        position={'top'}
        swipeToClose={true}
        backdrop={true}
        coverScreen={true}
        backdropOpacity={0.1}
        backdropColor={'#030509'}
        backButtonClose={true}
        backdropPressToClose={true}
        onClosed={onCloseMoreProfileModal}>
        <MoreProfileModal onRequestClose={onCloseMoreProfileModal} />
      </Modal>
      <Modal
        animationType='slide'
        transparent={true}
        style={s.mindfulModal}
        isOpen={isOpenInfoModal}
        backdrop={true}
        entry={'center'}
        animationDuration={200}
        backdropColor={colors.black}
        backdropOpacity={0.6}
        coverScreen={true}
        backButtonClose={true}
        swipeArea={1}
        onClosed={onCloseInfoModal}>
        <MilestonesInfoModal onRequestClose={onCloseInfoModal} />
      </Modal>
    </>
  );
};
export default MilestonesScreen;
