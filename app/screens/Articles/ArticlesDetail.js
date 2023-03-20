import { View, Platform, Image, useWindowDimensions, Share } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
import HeaderButton from '../../components/HeaderButton';
import { colors } from '../../styles';
import TextView from '../../components/TextView';
import s from './styles';
import AppStyles from '../../styles/AppStyles';
import ScrollableAvoidKeyboard from '../../components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';
import { toastNotification } from '../../helpers/helpers';

const ArticlesDetailScreen = ({ navigation, route }) => {
  const { width } = useWindowDimensions();
  const { params } = route;
  const { item: article } = params;

  const onShare = useCallback(async () => {
    try {
      const message = article?.link;
      const result = await Share.share({
        message: message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // toastNotification('Share');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Dismiss');
      }
    } catch (error) {
      toastNotification(error.message);
    }
  }, [article?.link]);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerRow}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            color={colors.black}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
            onPress={navigation.goBack}
          />
        </View>
      ),
      headerRight: () => (
        <View style={s.headerRowRight}>
          {article?.link && (
            <HeaderButton
              type={1}
              iconName={'share'}
              color={colors.black}
              style={s.addIcon}
              isFeather={Platform.OS === 'ios' ? false : true}
              onPress={onShare}
            />
          )}
        </View>
      ),

      headerStyle: AppStyles.headerStyleLast,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [article?.link, navigation, onShare]);

  const articleBannerView = useMemo(() => {
    return <Image source={{ uri: article?.banner?.url }} style={s.imgArticlesDetail} />;
  }, [article?.banner?.url]);

  const articleHeaderView = useMemo(() => {
    return <TextView text={article?.tag?.title} style={s.imgName} />;
  }, [article?.tag?.title]);

  const articleDescriptionView = useMemo(() => {
    const systemFonts = ['Navigo-Regular', ...defaultSystemFonts];
    return (
      <View style={s.descriptionWrap}>
        <RenderHtml
          contentWidth={width}
          source={{ html: `${documentToHtmlString(article?.body?.json)}` }}
          tagsStyles={s.tagsStyles}
          systemFonts={systemFonts}
          enableExperimentalMarginCollapsing={true}
        />
      </View>
    );
  }, [article?.body?.json, width]);

  return (
    <View style={s.root}>
      <ScrollableAvoidKeyboard showsVerticalScrollIndicator={false}>
        <View style={s.paddingWrap}>
          <View>
            {articleBannerView}
            {articleHeaderView}
          </View>
          <View style={s.detailWrap}>
            <TextView text={article?.title} type={'head-line'} style={s.detailTitle} />
          </View>
          {articleDescriptionView}
        </View>
      </ScrollableAvoidKeyboard>
    </View>
  );
};

export default ArticlesDetailScreen;
