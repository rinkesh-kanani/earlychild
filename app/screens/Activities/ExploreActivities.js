import { Image, Platform, View, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../assets/svg';
import HeaderButton from '../../components/HeaderButton';
import TextView from '../../components/TextView';
import AppStyles from '../../styles/AppStyles';
import { colors } from '../../styles';
import s from './style';
import Icon from '../../components/Icon';
import screens from '../../constants/screens';
import Card from '../../components/Card';
import ScrollableAvoidKeyboard from '../../components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';
import { getActivityData, sortByMostRelevant } from '../../services/activityservice';
import FilterModal from './FilterModal';
import ShortByModal from './ShortByModal';
import { isEmpty } from 'lodash';
import { setFilterActivityList } from '../../actions/activityActions';
import { SORT_ACTIVITY_MENU, TYPE_OF_ACTIVITY } from '../../constants/constant';
import Loading from '../../components/Loading';
import {
  createFavoriteActivityNewDocument,
  deleteFavoriteActivityDocument,
  getAllFavoriteActivityDocuments,
} from '../../services/favoriteActivityservice';

const ExploreActivitiesScreen = ({ navigation }) => {
  const activitySelector = useSelector((state) => state.activity);
  const favoriteActivitySelector = useSelector((state) => state.favoriteActivity);
  const childSelector = useSelector((state) => state.child);
  const completedActivityselector = useSelector((state) => state.completedActivity);

  const { completeActivityList } = completedActivityselector;
  const { childList } = childSelector;
  const { favoriteActivityList } = favoriteActivitySelector;
  const { activityList, filterActivityList } = activitySelector;
  const [filterData, setFilterData] = useState();
  const [searchText, setSearchText] = useState(undefined);
  const [sortValue, setSortValue] = useState(SORT_ACTIVITY_MENU?.MOSTRELEVANT);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false);
  const [isOpenShortByModal, setIsOpenShortByModal] = useState(false);

  const onOpenFilterModal = useCallback(() => {
    setIsOpenFilterModal(true);
  }, []);
  const onCloseFilterModal = useCallback(() => {
    setIsOpenFilterModal(false);
  }, []);
  const onOpenShortByModal = useCallback(() => {
    setIsOpenShortByModal(true);
  }, []);
  const onCloseShortByModal = useCallback(() => {
    setIsOpenShortByModal(false);
  }, []);

  const setSortActivityData = useCallback(
    (value, list) => {
      let newList = JSON.parse(JSON.stringify(list)) || [];
      if (newList) {
        if (value === SORT_ACTIVITY_MENU?.MOSTRELEVANT) {
          const milestone = Array.from(childList, (image) => image.milestone);
          newList = sortByMostRelevant(newList, milestone);
        }
        if (value === SORT_ACTIVITY_MENU?.NEWESTOOLDEST) {
          newList.sort((firstItem, secondItem) => new Date(secondItem?.date) - new Date(firstItem?.date));
        }

        if (value === SORT_ACTIVITY_MENU?.OLDESTONEWEST) {
          newList.sort((firstItem, secondItem) => new Date(firstItem?.date) - new Date(secondItem?.date));
        }

        if (value === SORT_ACTIVITY_MENU?.ASC) {
          newList.sort((firstItem, secondItem) => {
            if (firstItem?.title < secondItem?.title) {
              return -1;
            }
            if (firstItem?.title > secondItem?.title) {
              return 1;
            }
            return 0;
          });
        }

        if (value === SORT_ACTIVITY_MENU?.DESC) {
          newList.sort((firstItem, secondItem) => {
            if (firstItem?.title > secondItem?.title) {
              return -1;
            }
            if (firstItem?.title < secondItem?.title) {
              return 1;
            }
            return 0;
          });
        }

        dispatch(setFilterActivityList(newList));
      }
    },
    [childList, dispatch],
  );

  const onChangeSortValue = useCallback(
    (value) => {
      setSortValue(value);
      setSortActivityData(value, filterActivityList);
    },
    [filterActivityList, setSortActivityData],
  );

  const setActivityFilterData = useCallback(
    (searchQuery, list) => {
      let activitySearchList = list;
      if (!isEmpty(searchQuery) && searchQuery) {
        activitySearchList = list?.filter((item) => item?.title?.toLowerCase().includes(searchQuery?.toLowerCase()));
      }
      if (filterData) {
        if (!isEmpty(filterData?.activityType)) {
          activitySearchList = activitySearchList.filter(
            (item) =>
              (filterData?.activityType?.indexOf(TYPE_OF_ACTIVITY.PRINTABLE_PDF) !== -1 && item?.isPrintable) ||
              (filterData?.activityType?.indexOf(TYPE_OF_ACTIVITY.NO_PRINT) !== -1 && !item?.isPrintable),
          );
        }

        if (!isEmpty(filterData?.subject)) {
          activitySearchList = activitySearchList.filter((item) =>
            item?.subjectCollection?.items?.some((element) => {
              return filterData?.subject?.includes(element?.slug);
            }),
          );
        }

        if (!isEmpty(filterData?.age)) {
          activitySearchList = activitySearchList.filter((item) => {
            return filterData?.age?.includes(Number(item?.age));
          });
        }
      }
      dispatch(setFilterActivityList(activitySearchList));
      setSortActivityData(sortValue, activitySearchList);
    },
    [dispatch, filterData, setSortActivityData, sortValue],
  );

  const onChangeFilterData = useCallback(
    (value) => {
      setFilterData(value);
      setActivityFilterData(searchText, activityList);
    },
    [activityList, searchText, setActivityFilterData],
  );

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await dispatch(getActivityData());
      if (result) {
        setActivityFilterData(searchText, result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, searchText, setActivityFilterData]);

  useEffect(() => {
    loadData();
  }, [dispatch, loadData]);

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
          <TextView text={'Explore Activities'} type={'title'} style={s.headerText} />
        </View>
      ),
      headerStyle: AppStyles.headerStyleLast,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  const totalResultView = useMemo(() => {
    if (!loading && !isEmpty(filterActivityList))
      return <TextView text={`${filterActivityList?.length} Results`} type={'body-two'} style={s.resultText} />;
    return <TextView text={`Results`} type={'body-two'} style={s.resultText} />;
  }, [filterActivityList, loading]);

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

  const isCompletedActivity = useCallback(
    (id) => {
      const activityIndex = completeActivityList?.findIndex((activity) => activity?.activityid === id);
      if (activityIndex !== -1) return true;
      return false;
    },
    [completeActivityList],
  );

  const activityListView = useMemo(() => {
    return filterActivityList?.map((item, index) => {
      const activityIndex = favoriteActivityList?.findIndex((x) => x?.slug === item?.slug);
      const isfavorite = activityIndex !== -1 ? true : false;
      const documentId = activityIndex !== -1 ? favoriteActivityList?.[activityIndex]?.id : undefined;
      const isCompleted = isCompletedActivity(item?.sys?.id);
      return (
        <View style={s.wrapWorkCard} key={`activitylistview_index_${index}`}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(screens.SingleActivity, { slug: item?.slug });
            }}
            style={s.shadowColor}
            activeOpacity={0.8}>
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
                <TextView text={item?.title} type={'body-head'} numberOfLines={1} style={s.titleArticles} />
                <View style={s.wrapLast}>
                  <View style={s.labelCard}>{activitySubjectListView(item?.subjectCollection?.items)}</View>
                  <TouchableOpacity
                    onPress={() => onSave({ isSave: !isfavorite, activityId: item?.sys?.id, documentId })}
                    activeOpacity={0.5}>
                    <SvgIcon
                      svgs={svgs}
                      name={isfavorite ? 'heartcardfill-icon' : 'heartoutline-icon'}
                      width={23}
                      height={20}
                      style={s.checkIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        </View>
      );
    });
  }, [activitySubjectListView, favoriteActivityList, filterActivityList, isCompletedActivity, navigation, onSave]);

  const onSearchQueryChange = useCallback(
    (value) => {
      setSearchText(value);
      setActivityFilterData(value, activityList);
    },
    [activityList, setActivityFilterData],
  );

  const searchbarView = useMemo(() => {
    return (
      <SearchBar
        style={s.searchflexTwo}
        placeholder={'Search by keyword'}
        lightTheme={true}
        value={searchText}
        onChangeText={onSearchQueryChange}
        inputContainerStyle={s.inputstyleTwo}
        searchIcon={<SvgIcon svgs={svgs} name={'Search-icon'} width={22} height={22} style={s.IconSearch} />}
        inputStyle={s.searchInputTextStyleTwo}
        containerStyle={s.searchInputTwo}
        rightIconContainerStyle={s.righticon}
        clearIcon={s.iconClear}
      />
    );
  }, [onSearchQueryChange, searchText]);

  const sortHeadingTextView = useMemo(() => {
    return <TextView text={sortValue} type={'body-two'} style={s.resultText} />;
  }, [sortValue]);

  return (
    <>
      <View style={s.root}>
        <View style={s.headSearchWrap}>
          <View style={s.rowSearch}>
            {searchbarView}
            <TouchableOpacity onPress={onOpenFilterModal} style={s.shortByView} activeOpacity={0.7}>
              <SvgIcon svgs={svgs} name={'filter-icon'} width={28} height={28} style={s.checkIcon} />
            </TouchableOpacity>
          </View>
          <View style={s.rowFilterWrap}>
            {totalResultView}
            <TouchableOpacity onPress={onOpenShortByModal} style={s.filterWrap} activeOpacity={0.5}>
              {sortHeadingTextView}
              <Icon name={'chevron-down'} size={18} color={colors.textColor} style={s.moreIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={s.exploreRoot}>
          <ScrollableAvoidKeyboard style={s.scrollSpace} showsVerticalScrollIndicator={false}>
            {loading ? <Loading /> : activityListView}
          </ScrollableAvoidKeyboard>
        </View>
      </View>
      <Modal
        style={s.modal}
        isOpen={isOpenFilterModal}
        entry={'bottom'}
        position={'bottom'}
        swipeToClose={true}
        backdrop={true}
        coverScreen={true}
        backdropOpacity={0.7}
        backdropColor={'#030509'}
        backButtonClose={true}
        backdropPressToClose={true}
        onClosed={onCloseFilterModal}>
        <FilterModal
          onRequestClose={onCloseFilterModal}
          filterData={filterData}
          onChangeFilterData={onChangeFilterData}
        />
      </Modal>
      <Modal
        style={s.modal}
        isOpen={isOpenShortByModal}
        entry={'bottom'}
        position={'bottom'}
        swipeToClose={true}
        backdrop={true}
        coverScreen={true}
        backdropOpacity={0.7}
        backdropColor={'#030509'}
        backButtonClose={true}
        backdropPressToClose={true}
        onClosed={onCloseShortByModal}>
        <ShortByModal
          onRequestClose={onCloseShortByModal}
          onChangeSortValue={onChangeSortValue}
          sortValue={sortValue}
        />
      </Modal>
    </>
  );
};

export default ExploreActivitiesScreen;
