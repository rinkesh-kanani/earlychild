import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../assets/svg';
import s from './style';
import { colors } from '../../styles';
import TextView from '../../components/TextView';
import Icon from '../../components/Icon';
import AppStyles from '../../styles/AppStyles';
import ScrollableAvoidKeyboard from '../../components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';
import { getChildActivityList, getJustActivityList } from '../../services/activityservice';
import { getSubjectList } from '../../services/subjectService';
import { getFeaturedThemeList, getThemeList } from '../../services/themeService';
import screens from '../../constants/screens';
import Loading from '../../components/Loading';
import { isEmpty } from '../../helpers/helpers';
import { SUBJECT, THEME } from '../../constants/constant';

const ActivitiesScreen = ({ navigation }) => {
  const activitySelector = useSelector((state) => state.activity);
  const subjectSelector = useSelector((state) => state.subject);
  const themeSelector = useSelector((state) => state.theme);
  const childSelector = useSelector((state) => state.child);
  const appSelector = useSelector((state) => state.app);
  const completedActivityselector = useSelector((state) => state.completedActivity);
  const { completeActivityList } = completedActivityselector;
  const { profileRoot } = appSelector;
  const { justAddedActivityList, childActivityList } = activitySelector;
  const { subjectList } = subjectSelector;
  const { featuredThemeList } = themeSelector;
  const { childList } = childSelector;

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      // const data = await dispatch(getActivityList());
      await dispatch(getChildActivityList(childList));
      await dispatch(getSubjectList());
      await dispatch(getThemeList());
      await dispatch(getFeaturedThemeList());
      await dispatch(getJustActivityList());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [childList, dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerRow}>
          <TextView text={'Activities'} style={s.pageTitle} />
        </View>
      ),
      headerRight: () => (
        <View style={s.headerRowRight}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(profileRoot ? screens.Saved : screens.ProfileRoot, { screen: screens.Saved })
            }
            style={s.searchWrap}
            activeOpacity={0.5}>
            <SvgIcon svgs={svgs} name={'heartoutline-icon'} width={21} height={21} />
          </TouchableOpacity>
        </View>
      ),

      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation, profileRoot]);

  const isCompletedActivity = useCallback(
    (id) => {
      const activityIndex = completeActivityList?.findIndex((activity) => activity?.activityid === id);
      if (activityIndex !== -1) return true;
      return false;
    },
    [completeActivityList],
  );

  const childActivityListView = useCallback(
    (list) => {
      return list?.map((item, index) => {
        const isCompleted = isCompletedActivity(item?.sys?.id);
        return (
          <View style={s.wrapColumImg} key={`childactivitylistview_index_${index}`}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(screens.SingleActivity, { slug: item?.slug });
              }}
              activeOpacity={0.8}>
              <View style={s.imgWrap}>
                <Image source={{ uri: `${item?.banner?.url}?q=10` }} style={s.imgRow} />
                {/* {item?.isPrintable && (
                  <View style={s.imgLabel}>
                    <SvgIcon svgs={svgs} name={'print-icon'} width={16} height={16} style={s.iconOpa} />
                  </View>
                )} */}
                {isCompleted && (
                  <SvgIcon svgs={svgs} name={'Select-icon'} width={16} height={16} style={s.selectIconActivity} />
                )}
              </View>
              <TextView text={item?.title} type={'body-two'} numberOfLines={2} style={s.imgText} />
            </TouchableOpacity>
          </View>
        );
      });
    },
    [isCompletedActivity, navigation],
  );

  const newAddedActivityListView = useMemo(() => {
    return justAddedActivityList?.map((item, index) => {
      const isCompleted = isCompletedActivity(item?.sys?.id);
      return (
        <View style={s.wrapColumImg} key={`newaddedactivitylistview_indexd_${index}`}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(screens.SingleActivity, { slug: item?.slug });
            }}
            activeOpacity={0.9}>
            <View style={s.imgWrap}>
              <Image source={{ uri: `${item?.banner?.url}?q=10` }} style={s.imgRow} />
              {/* {item?.isPrintable && (
                <View style={s.imgLabel}>
                  <SvgIcon svgs={svgs} name={'print-icon'} width={16} height={16} style={s.iconOpa} />
                </View>
              )} */}
              {isCompleted && (
                <SvgIcon svgs={svgs} name={'Select-icon'} width={16} height={16} style={s.selectIconActivity} />
              )}
            </View>
            <TextView text={item?.title} type={'body-two'} style={s.imgText} />
          </TouchableOpacity>
        </View>
      );
    });
  }, [justAddedActivityList, isCompletedActivity, navigation]);

  const kidsActivityView = useMemo(() => {
    return childActivityList?.map((item, index) => {
      if (!isEmpty(item?.list))
        return (
          <View style={s.ActivitisWrapone} key={`Child_Item_${item?.id}_index_${index}`}>
            <View style={s.labelActivity}>
              <TextView text={`For ${item?.firstName}`} type={'head-line'} style={s.activityTitle} />
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={s.imgSecWrap}>{childActivityListView(item?.list)}</View>
            </ScrollView>
          </View>
        );
    });
  }, [childActivityList, childActivityListView]);

  return (
    <SafeAreaView style={s.root}>
      <ScrollableAvoidKeyboard showsVerticalScrollIndicator={false}>
        <View style={s.rootpadding}>
          <View style={s.searchMainWrap}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(screens.ExploreActivities);
              }}
              activeOpacity={0.9}
              style={s.activityWrap}>
              <View style={s.rowview}>
                <SvgIcon svgs={svgs} name={'Search-icon'} width={22} height={22} />
                <TextView text={'Explore all activities'} type={'body'} style={s.textExplore} />
              </View>
              <Icon name={'chevron-right'} color={colors.textColor} size={20} />
            </TouchableOpacity>
          </View>
          {loading ? (
            <Loading />
          ) : (
            <>
              {kidsActivityView}
              <View style={s.ActivitisWrapTwo}>
                <View style={s.labelActivity}>
                  <TextView text={'Just Added!'} type={'head-line'} style={s.activityTitle} />
                  <View style={s.labelWrap}>
                    <TextView text={'NEW!'} style={s.labelTag} />
                  </View>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  <View style={s.imgSecWrap}>
                    {newAddedActivityListView}
                    {/* <View style={s.wrapColumImg}>
                  <View style={s.imgWrap}>
                    <Image source={require('../../assets/image/skill.png')} resizeMode='contain' style={s.imgRow} />
                  </View>
                  <TextView text={'Spring Scavenger Hunt'} type={'body-two'} style={s.imgText} />
                </View>
                <View style={s.wrapColumImg}>
                <View style={s.imgWrap}>
                <Image source={require('../../assets/image/skill.png')} resizeMode='contain' style={s.imgRow} />
                </View>
                <TextView text={'My Emotions Check In and Traffic Light'} type={'body-two'} style={s.imgText} />
                </View>
                <View style={s.wrapColumImg}>
                  <View style={s.imgWrap}>
                    <Image source={require('../../assets/image/skill.png')} resizeMode='contain' style={s.imgRow} />
                  </View>
                  <TextView text={'Dramatic'} type={'body-two'} style={s.imgText} />
                </View> */}
                  </View>
                </ScrollView>
              </View>
            </>
          )}
        </View>
      </ScrollableAvoidKeyboard>
    </SafeAreaView>
  );
};

export default ActivitiesScreen;
