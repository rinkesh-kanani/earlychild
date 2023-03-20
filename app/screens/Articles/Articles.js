import { Image, ScrollView, TouchableOpacity, View, Platform, SafeAreaView } from 'react-native';
import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './styles';
import TextView from '../../components/TextView';
import Card from '../../components/Card';
import ScrollableAvoidKeyboard from '../../components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';
import screens from '../../constants/screens';
import { getArticleData, getArticleList, getArticleTagList } from '../../services/articleService';
import { ARTICLE_TAG } from '../../constants/constant';
import { setFilterArticleList } from '../../actions/articleActions';
import Loading from '../../components/Loading';
import { isEmpty } from '../../helpers/helpers';
import HeaderButton from '../../components/HeaderButton';
import { colors } from '../../styles';
import Icon from '../../components/Icon';
import { TextInput } from 'react-native-gesture-handler';

const ArticlesScreen = ({ navigation }) => {
  const articleSelector = useSelector((state) => state.article);
  const { articleTagList, filterArticleList } = articleSelector;
  const [currentTag, setCurrentTag] = useState(ARTICLE_TAG.ALL);
  const [searchText, setSearchText] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const dispatch = useDispatch();

  const setArticleFilterData = useCallback(
    async (searchQuery, tag) => {
      const articleDataList = await dispatch(getArticleData());
      let articleSearchList = [];
      if (tag === ARTICLE_TAG.ALL) {
        articleDataList?.forEach((item) => {
          item?.list?.forEach((article) => articleSearchList?.push(article));
        });
      } else {
        const index = articleDataList?.findIndex((item) => item?.tagSlug === tag);
        if (index !== -1) articleSearchList = articleDataList?.[index]?.list;
      }
      const list = articleSearchList;
      if (!isEmpty(searchQuery) && searchQuery)
        articleSearchList = list?.filter((item) => item?.title?.toLowerCase().includes(searchQuery?.toLowerCase()));

      dispatch(setFilterArticleList(articleSearchList));
    },
    [dispatch],
  );

  const loadData = useCallback(
    async (isLoad = true) => {
      try {
        setLoading(true);
        if (isLoad) {
          await dispatch(getArticleTagList());
          await dispatch(getArticleList());
          setArticleFilterData(undefined, ARTICLE_TAG?.ALL);
        }
      } catch (error) {
        console.log('error', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, setArticleFilterData],
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onSearchQueryChange = useCallback(
    (value) => {
      setSearchText(value);
      setArticleFilterData(value, currentTag);
    },
    [currentTag, setArticleFilterData],
  );

  const searchbarView = useMemo(() => {
    return (
      <>
        <View style={s.searchbarStyle}>
          <View style={s.inputRow}>
            <TextInput
              placeholder={'Search articles by keyword'}
              style={s.inputstyle}
              placeholderTextColor={colors.placeholder}
              value={searchText}
              onChangeText={onSearchQueryChange}
              returnKeyType={'next'}
            />
            <Icon name={'search'} size={22} color={colors.textColor} style={s.searchIcon} />
            <TouchableOpacity
              style={s.cancelIcon}
              onPress={() => (searchText ? onSearchQueryChange(undefined) : setIsSearch(false))}>
              <Icon name={'x'} color={colors.gray} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }, [onSearchQueryChange, searchText]);

  const onChangeArticleTag = useCallback(
    (tag) => {
      setCurrentTag(tag);
      setArticleFilterData(undefined, tag);
    },
    [setArticleFilterData],
  );

  const firstTagView = useMemo(() => {
    return (
      <TouchableOpacity
        style={currentTag === ARTICLE_TAG.ALL ? s.activeWrap : s.unactiveWrap}
        onPress={() => {
          onChangeArticleTag(ARTICLE_TAG.ALL);
        }}>
        <TextView text={'ALL'} style={currentTag === ARTICLE_TAG.ALL ? s.activeTab : s.unactiveTab} />
      </TouchableOpacity>
    );
  }, [currentTag, onChangeArticleTag]);

  const articleTagListView = useMemo(() => {
    return articleTagList?.map((item, index) => {
      return (
        <TouchableOpacity
          style={currentTag === item?.slug ? s.activeWrap : s.unactiveWrap}
          key={`articletaglistview_index_${index}`}
          onPress={() => {
            onChangeArticleTag(item?.slug);
          }}>
          <TextView text={item?.title} style={currentTag === item?.slug ? s.activeTab : s.unactiveTab} />
        </TouchableOpacity>
      );
    });
  }, [articleTagList, currentTag, onChangeArticleTag]);

  const allArticleTagListView = useMemo(() => {
    return (
      <>
        {firstTagView}
        {articleTagListView}
      </>
    );
  }, [articleTagListView, firstTagView]);

  const articleListView = useMemo(() => {
    if (!isEmpty(filterArticleList))
      return filterArticleList?.map((item, index) => {
        return (
          <View style={s.wrapCard} key={`articlelistview_index_${index}`}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(screens.ArticlesDetail, { item });
              }}
              activeOpacity={0.9}
              style={s.boxShadow}>
              <View style={s.imgWrap}>
                <Image source={{ uri: item?.banner?.url }} style={s.imgArticles} />
              </View>
              <Card style={s.cardWrap}>
                <View>
                  <TextView text={item?.tag?.title} style={s.smallTitle} />
                  <TextView text={item?.title} type={'body-head'} style={s.titleArticles} />
                  <View style={s.leftbmborder}>
                    <TextView text={'READ ARTICLE'} style={s.linkTag} />
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          </View>
        );
      });

    return (
      <View>
        <TextView text={'No Data Available'} />
      </View>
    );
  }, [filterArticleList, navigation]);

  const totalArticlesView = useMemo(() => {
    if (!isEmpty(filterArticleList))
      return <TextView text={`${filterArticleList?.length} Articles`} type={'body-two'} style={s.Tag} />;
    return null;
  }, [filterArticleList]);

  return (
    <SafeAreaView style={s.root}>
      <View style={s.root}>
        <View>
          {isSearch ? (
            <View style={s.searchview}>{searchbarView}</View>
          ) : (
            <View style={s.headerWrap}>
              <View style={s.headerRow}>
                <HeaderButton
                  type={1}
                  iconName={'chevron-left'}
                  color={colors.black}
                  style={s.addIcon}
                  isFeather={Platform.OS === 'ios' ? false : true}
                  onPress={navigation.goBack}
                />
                <TextView text={'Articles'} type={'sub-title'} style={s.pageTitle} />
              </View>
              <View style={s.headerRowRight}>
                <TouchableOpacity style={s.searchWrap} onPress={() => setIsSearch(true)}>
                  <Icon name={'search'} size={19} color={colors.textColor} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={s.tabSlide}>{allArticleTagListView}</View>
          </ScrollView>
        </View>
        <ScrollableAvoidKeyboard showsVerticalScrollIndicator={false}>
          {loading ? (
            <Loading />
          ) : (
            <View style={s.articleListWrap}>
              {totalArticlesView}
              {articleListView}
            </View>
          )}
        </ScrollableAvoidKeyboard>
      </View>
    </SafeAreaView>
  );
};

export default ArticlesScreen;
