import { Image, Platform, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import s from './styles';
import ScrollableAvoidKeyboard from '../../../components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';
import screens from '../../../constants/screens';
import TextView from '../../../components/TextView';
import AppStyles from '../../../styles/AppStyles';
import HeaderButton from '../../../components/HeaderButton';
import { colors } from '../../../styles';
import { useDispatch, useSelector } from 'react-redux';
import { getThemeList } from '../../../services/themeService';
import { THEME } from '../../../constants/constant';
import { isEmpty } from 'lodash';

const MoreThemesScreen = ({ navigation }) => {
  const themeSelector = useSelector((state) => state.theme);
  const { themeList } = themeSelector;

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      await dispatch(getThemeList());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

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
          <TextView text={'More Themes'} type={'title'} style={s.headerText} />
        </View>
      ),
      headerStyle: AppStyles.headerStyleLast,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);

  const themeListView = useMemo(() => {
    return themeList?.map((item, index) => {
      if (isEmpty(item?.banner.url)) return null;
      return (
        <View style={s.rowcards} key={`themelistview_index_${index}`}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(screens.ActivitiesTheme, { type: THEME, slug: item?.slug, title: item?.title });
            }}
            activeOpacity={0.9}>
            <View style={s.cardBg}>
              <Image source={{ uri: item?.banner.url ?? '' }} style={s.theamImg} />
              <View style={s.textTheamWrap}>
                <TextView text={item?.title} type={'body-two'} style={s.themesText} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    });
  }, [navigation, themeList]);

  return (
    <View style={s.root}>
      <ScrollableAvoidKeyboard showsVerticalScrollIndicator={false}>
        <View style={s.paddingTheam}>
          <View style={s.cardList}>{themeListView}</View>
        </View>
      </ScrollableAvoidKeyboard>
    </View>
  );
};

export default MoreThemesScreen;
