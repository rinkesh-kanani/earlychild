import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
} from 'react-native';
import svgs from '../../assets/svg';
import { useDispatch, useSelector } from 'react-redux';
import { getMilestoneTaskActivityList } from '../../services/activityservice';
import { Button } from '../../components/Button';
import RoundButton from '../../components/RoundButton';
import TextView from '../../components/TextView';
import { colors } from '../../styles';
import AppStyles from '../../styles/AppStyles';
import s from './styles';
import screens from '../../constants/screens';
import { isEmpty } from '../../helpers/helpers';
import { setMilestoneTaskActivityList } from '../../actions/activityActions';
import {
  createChildSkillNewDocument,
  deleteChildSkillDocument,
  getChildSkillAllDocument,
} from '../../services/childSkillService';
import { updateMilestoneTask } from '../../actions/milestoneActions';
import SvgIcon from 'react-native-svg-icon';

const SingleMilestonesModal = ({ navigation, onRequestClose, childId, onLoadData }) => {
  const milestoneSelector = useSelector((state) => state.milestone);
  const activitySelector = useSelector((state) => state.activity);
  const { milestoneTask, currentMilestone } = milestoneSelector;
  const { milestoneTaskActivityList } = activitySelector;
  const completedActivityselector = useSelector((state) => state.completedActivity);
  const { completeActivityList } = completedActivityselector;
  const [loading, setLoading] = useState(false);
  const [activtyLoading, setActivityLoading] = useState(false);
  const [isNotYet, setIsNotYet] = useState(false);

  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      await dispatch(
        getMilestoneTaskActivityList(
          milestoneTask?.milestone?.slug,
          milestoneTask?.subject?.slug,
          milestoneTask?.sys?.id,
        ),
      );
      setLoading(false);
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [dispatch, milestoneTask?.milestone?.slug, milestoneTask?.subject?.slug, milestoneTask?.sys?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addChildSkill = useCallback(async () => {
    const newItem = {
      childId,
      milestoneSkillId: milestoneTask?.sys?.id,
      subject: milestoneTask?.subject?.title,
    };

    const result = await dispatch(createChildSkillNewDocument(newItem));
    await dispatch(updateMilestoneTask({ propsName: 'skillId', value: result?.id }));
  }, [childId, dispatch, milestoneTask?.subject?.title, milestoneTask?.sys?.id]);

  const onSelectYes = useCallback(async () => {
    try {
      setActivityLoading(true);
      setIsNotYet(false);
      await addChildSkill();
      await dispatch(getChildSkillAllDocument(childId));
      await loadData();

      await dispatch(updateMilestoneTask({ propsName: 'isCheck', value: true }));
      onLoadData(currentMilestone?.slug);
    } catch (error) {
      console.log('error', error);
      setActivityLoading(false);
    } finally {
      setActivityLoading(false);
    }
  }, [addChildSkill, childId, currentMilestone?.slug, dispatch, loadData, onLoadData]);

  useEffect(() => {
    return () => {
      dispatch(setMilestoneTaskActivityList(null));
    };
  }, [dispatch]);

  const milestoneTitleView = useMemo(() => {
    return <TextView text={`MILESTONE — ${milestoneTask?.milestone?.title}`} style={s.headMilesTone} />;
  }, [milestoneTask?.milestone?.title]);

  const milestoneSubjectView = useMemo(() => {
    if (milestoneTask?.subject?.title)
      return (
        <View style={[s.WrapLabel, { backgroundColor: milestoneTask?.subject?.color }]}>
          <TextView text={milestoneTask?.subject?.title} style={s.labelWrap} />
        </View>
      );
    return null;
  }, [milestoneTask?.subject?.color, milestoneTask?.subject?.title]);

  const milestoneTaskTitleView = useMemo(() => {
    if (milestoneTask?.title)
      return (
        <TextView
          text={milestoneTask?.isCheck ? `${milestoneTask?.title}` : milestoneTask?.title}
          type={'head-line'}
          style={s.noticeCaps}
        />
      );
    return null;
  }, [milestoneTask?.isCheck, milestoneTask?.title]);

  const isCompletedActivity = useCallback(
    (id) => {
      const activityIndex = completeActivityList?.findIndex((activity) => activity?.activityid === id);
      if (activityIndex !== -1) return true;
      return false;
    },
    [completeActivityList],
  );

  const activityListView = useCallback(
    (list) => {
      return list?.map((item, index) => {
        const isCompleted = isCompletedActivity(item?.sys?.id);
        return (
          <View style={s.rowcards} key={`activitylist_index_${index}`}>
            <TouchableOpacity
              onPress={() => {
                onRequestClose();
                navigation.navigate(screens.SingleActivity, { slug: item?.slug });
              }}>
              <View style={s.cardItem}>
                <View style={s.imgView}>
                  <Image source={{ uri: item?.banner?.url }} style={s.ImgList} />
                  {isCompleted && (
                    <SvgIcon svgs={svgs} name={'Select-icon'} width={20} height={20} style={s.selectIconActivity} />
                  )}
                </View>
                <TextView text={item?.title} type={'body-one'} style={s.darkText} />
              </View>
            </TouchableOpacity>
          </View>
        );
      });
    },
    [isCompletedActivity, navigation, onRequestClose],
  );

  const recommendedActivityTextView = useMemo(() => {
    return (
      <View style={s.activityWrap}>
        <Image source={require('../../assets/image/activity.png')} resizeMode='contain' style={s.activityImg} />
        <TextView text={'RECOMMENDED ACTIVITIES'} style={s.recActivity} />
        <TextView
          text={`Check off where your child is at to see recommended activities that will build or strengthen that skill.`}
          type={'body-one'}
          style={s.NoteText}
        />
      </View>
    );
  }, []);

  const onClickNotYet = useCallback(async () => {
    try {
      setActivityLoading(true);
      if (milestoneTask?.isCheck) {
        await dispatch(deleteChildSkillDocument(milestoneTask?.skillId));
        await dispatch(getChildSkillAllDocument(childId));
        await dispatch(updateMilestoneTask({ propsName: 'isCheck', value: false }));
        await dispatch(updateMilestoneTask({ propsName: 'skillId', value: '' }));
        setIsNotYet(true);
        onLoadData(currentMilestone?.slug);
      }
    } catch (error) {
      console.log('error', error);
      setActivityLoading(false);
    } finally {
      setActivityLoading(false);
    }
  }, [childId, currentMilestone?.slug, dispatch, milestoneTask?.isCheck, milestoneTask?.skillId, onLoadData]);

  const onNotYet = useCallback(async () => {
    setIsNotYet(true);
    if (milestoneTask?.isCheck) await onClickNotYet();
    else await dispatch(updateMilestoneTask({ propsName: 'isCheck', value: false }));
  }, [dispatch, milestoneTask?.isCheck, onClickNotYet]);

  return (
    <KeyboardAvoidingView style={s.keyBord}>
      <View style={s.modalWrapper}>
        <Text style={s.closeModal} onPress={onRequestClose}></Text>
        <View style={s.rectView}></View>
        <View style={s.modalBoxTwo}>
          <View style={s.milesRow}>
            {milestoneTitleView}
            <RoundButton icon={'x'} iconColor={colors.textColor} iconSize={20} size={24} onPress={onRequestClose} />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback>
              <View style={s.topWrapModal}>
                {milestoneSubjectView}
                {milestoneTaskTitleView}
                <View style={s.btnWrap}>
                  <View style={s.btnView}>
                    {/* <Button
                      ButtonText='Not yet'
                      style={s.btnStyle}
                      textStyle={s.btnText}
                      onPress={milestoneTask?.isCheck ? onClickNotYet : onRequestClose}
                      isLoading={milestoneTask?.isCheck && loading}
                      spinnerColor={colors.primary}
                    /> */}
                    <Button
                      ButtonText='Not yet'
                      style={!isNotYet && s.btnStyle}
                      textStyle={!isNotYet ? s.btnText : AppStyles.buttonRegular}
                      onPress={onNotYet}
                      isLoading={isNotYet && isEmpty(milestoneTask?.isCheck) && activtyLoading}
                      disabled={isNotYet && isEmpty(milestoneTask?.isCheck) && activtyLoading}
                      spinnerColor={colors.white}
                    />
                  </View>
                  <View style={s.btnView}>
                    <Button
                      ButtonText='Yes'
                      style={!milestoneTask?.isCheck && s.btnStyle}
                      textStyle={!milestoneTask?.isCheck ? s.btnText : AppStyles.buttonRegular}
                      onPress={milestoneTask?.isCheck ? null : onSelectYes}
                      isLoading={isNotYet === false && isEmpty(milestoneTask?.isCheck) && activtyLoading}
                      disabled={isNotYet === false && isEmpty(milestoneTask?.isCheck) && activtyLoading}
                      spinnerColor={colors.white}
                    />
                  </View>
                </View>

                {milestoneTask?.isCheck ? (
                  !isEmpty(milestoneTaskActivityList?.activityForYesCollection?.items) ? (
                    <View style={s.recommedWrap}>
                      <TextView text={'Recommended Activities'} type={'head-line'} style={s.activityText} />
                      <View style={s.cardList}>
                        {activityListView(milestoneTaskActivityList?.activityForYesCollection?.items)}
                      </View>
                    </View>
                  ) : (
                    recommendedActivityTextView
                  )
                ) : milestoneTask?.isCheck === false ? (
                  !isEmpty(milestoneTaskActivityList?.activityforNotYetCollection?.items) ? (
                    <View style={s.recommedWrap}>
                      <TextView text={'Recommended Activities'} type={'head-line'} style={s.activityText} />
                      <View style={s.cardList}>
                        {activityListView(milestoneTaskActivityList?.activityforNotYetCollection?.items)}
                      </View>
                    </View>
                  ) : (
                    recommendedActivityTextView
                  )
                ) : (
                  recommendedActivityTextView
                )}
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SingleMilestonesModal;
