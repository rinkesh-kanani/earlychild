import { Image, View, TouchableOpacity, Platform } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../assets/svg';
import AppStyles from '../../styles/AppStyles';
import TextView from '../../components/TextView';
import s from './style';
import ScrollableAvoidKeyboard from '../../components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';
import screens from '../../constants/screens';
import Card from '../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { getActivityListOfTheme } from '../../services/activityservice';
import { setThemeActivityList } from '../../actions/activityActions';
import Loading from '../../components/Loading';
import { isEmpty } from '../../helpers/helpers';
import {
  createFavoriteActivityNewDocument,
  deleteFavoriteActivityDocument,
  getAllFavoriteActivityDocuments,
} from '../../services/favoriteActivityservice';
import HeaderButton from '../../components/HeaderButton';
import { colors } from '../../styles';

const ActivitiesThemeScreen = ({ navigation, route }) => {
  const activitySelector = useSelector((state) => state.activity);
  const favoriteActivitySelector = useSelector((state) => state.favoriteActivity);
  const completedActivityselector = useSelector((state) => state.completedActivity);

  const { completeActivityList } = completedActivityselector;
  const { favoriteActivityList } = favoriteActivitySelector;
  const { themeActivityList } = activitySelector;
  const { params } = route;
  const { type, slug, title } = params;
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await dispatch(getActivityListOfTheme(type, slug));
      if (result) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, slug, type]);

  useEffect(() => {
    loadData();
    return () => {
      dispatch(setThemeActivityList(null));
    };
  }, [dispatch, loadData]);

  const rightHeadView = useMemo(() => {
    if (!isEmpty(themeActivityList))
      return (
        <View style={s.rightHeadView}>
          <TextView text={`${themeActivityList?.length} Activities`} type={'body-one'} style={s.headerRight} />
        </View>
      );
  }, [themeActivityList]);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerRow}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            color={colors.textColor}
            style={s.expBack}
            isFeather={Platform.OS === 'ios' ? false : true}
            onPress={navigation.goBack}
          />
          <TextView text={title} type={'title'} style={s.headerText} />
        </View>
      ),
      headerRight: () => rightHeadView,
      headerStyle: AppStyles.headerStyleLast,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation, rightHeadView, title]);

  const activitySubjectListView = useCallback((subjectList) => {
    return subjectList?.map((item, index) => {
      return (
        <View style={s.tagWrap} key={`activitysubjectlistview_index_${index}`}>
          <View style={[s.labelList, { backgroundColor: item?.color }]}>
            <TextView text={item?.title} style={s.todayTag} />
          </View>
        </View>
      );
    });
  }, []);

  const addFavoriteActivity = useCallback(
    async (activityId) => {
      await dispatch(createFavoriteActivityNewDocument({ activityId }));
    },
    [dispatch],
  );

  const onSave = useCallback(
    async ({ isSave, activityId, documentId }) => {
      try {
        if (isSave) {
          addFavoriteActivity(activityId);
          await dispatch(getAllFavoriteActivityDocuments());
          return true;
        } else {
          await dispatch(deleteFavoriteActivityDocument(documentId));
          await dispatch(getAllFavoriteActivityDocuments());
          return false;
        }
      } catch (error) {
        console.log('error', error);
      }
    },
    [addFavoriteActivity, dispatch],
  );

  const isFavoriteActivity = useCallback(
    (slug) => {
      const activityIndex = favoriteActivityList?.findIndex((x) => x?.slug === slug);
      const isfavorite = activityIndex !== -1 ? true : false;
      const documentId = activityIndex !== -1 ? favoriteActivityList?.[activityIndex]?.id : undefined;
      return { isfavorite, documentId };
    },
    [favoriteActivityList],
  );
  const isCompletedActivity = useCallback(
    (id) => {
      const activityIndex = completeActivityList?.findIndex((activity) => activity?.activityid === id);
      if (activityIndex !== -1) return true;
      return false;
    },
    [completeActivityList],
  );
  const themeActivityListView = useMemo(() => {
    return themeActivityList?.map((item, index) => {
      const { isfavorite, documentId } = isFavoriteActivity(item?.slug);
      const isCompleted = isCompletedActivity(item?.sys?.id);
      return (
        <View style={s.wrapWorkCard} key={`themeactivitylistview_index_${index}`}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(screens.SingleActivity, { slug: item?.slug });
            }}
            activeOpacity={0.9}>
            <View style={s.imgWrapCard}>
              <Image source={{ uri: item?.banner?.url }} style={s.imgVideo} />
              {isCompleted && <SvgIcon svgs={svgs} name={'Select-icon'} width={26} height={26} style={s.selectIcon} />}
              {item?.isPrintable && (
                <View style={s.labelWrapExplore}>
                  <TextView text={'PRINTABLE'} style={s.labelText} />
                </View>
              )}
            </View>

            <Card style={s.cardWrap}>
              <View>
                <TextView text={`AGE ${item?.age}+`} style={s.smallTitle} />
                <TextView text={item?.title} numberOfLines={1} type={'body-head'} style={s.titleArticlesTheam} />
                <View style={s.wrapLast}>
                  <View style={s.labelCard}>{activitySubjectListView(item?.subjectCollection?.items)}</View>
                  <TouchableOpacity
                    onPress={() => onSave({ isSave: !isfavorite, activityId: item?.sys?.id, documentId })}
                    activeOpacity={0.7}>
                    <SvgIcon
                      svgs={svgs}
                      name={isfavorite ? 'heartcardfill-icon' : 'heartoutline-icon'}
                      width={23}
                      height={20}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        </View>
      );
    });
  }, [activitySubjectListView, isCompletedActivity, isFavoriteActivity, navigation, onSave, themeActivityList]);

  return (
    <View style={s.root}>
      <ScrollableAvoidKeyboard style={s.scrollSpace} showsVerticalScrollIndicator={false}>
        {!loading && themeActivityList?.length === 0 && (
          <View style={s.EmptyWrap}>
            <TextView text={`No Data Found`} type={'caption'} style={s.emptyCaps} />
          </View>
        )}
        {loading ? <Loading /> : themeActivityListView}
      </ScrollableAvoidKeyboard>
    </View>
  );
};

export default ActivitiesThemeScreen;
