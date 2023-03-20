import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Image, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import storage from '@react-native-firebase/storage';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../../assets/svg';
import { Button } from '../../../components/Button';
import ScrollableAvoidKeyboard from '../../../components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';
import TextView from '../../../components/TextView';
import { COMPLETEDACTIVITYIMAGEPATH } from '../../../constants/constant';
import { getUniqueId, isEmpty, openFilePicker } from '../../../helpers/helpers';
import { colors } from '../../../styles';
import AppStyles from '../../../styles/AppStyles';
import s from './styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCompletedActivityImage,
  deleteCompletedActivityImage,
  setCompletedActivityImageList,
} from '../../../actions/completedActivityActions';
import {
  createCompletedActivityNewDocument,
  getAllCompletedActivityDocuments,
} from '../../../services/completedActivityService';
import screens from '../../../constants/screens';

const ActivityCompletedScreen = ({ navigation, route }) => {
  const completedActivityselector = useSelector((state) => state.completedActivity);
  const mindfulPlayTimeSelector = useSelector((state) => state.mindfulPlaytime);

  const { imageList, TotalCompletedActivityOfThisMonth } = completedActivityselector;
  const { TotalMindfulPlaytimeOfThisMonth, streakOfThisMonth } = mindfulPlayTimeSelector;

  const favoriteActivitySelector = useSelector((state) => state.favoriteActivity);

  const { favoriteActivity } = favoriteActivitySelector;
  const { activity, isFavoriteActivity, onSaveActivity } = route?.params;

  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(isFavoriteActivity);

  const dispatch = useDispatch();
  const onSave = useCallback(async () => {
    const result = await onSaveActivity(!isFavorite, favoriteActivity?.documentId);
    setIsFavorite(result);
  }, [favoriteActivity?.documentId, isFavorite, onSaveActivity]);

  useEffect(() => {
    return () => {
      dispatch(setCompletedActivityImageList(null));
    };
  }, [dispatch]);

  const slides = useMemo(() => {
    return [
      {
        key: 1,
        title: 'Title 1',
        text: 'Earlychild Activities Completed',
        image: require('../../../assets/image/mindful.png'),
        monthText: TotalCompletedActivityOfThisMonth,
        moths: 'this month',
        img: require('../../../assets/image/rightsilde.png'),
        backgroundColor: colors.primary,
      },
      {
        key: 2,
        title: 'Title 2',
        text: 'DAYS OF MINDFUL PLAYTIME TRACKED',
        image: require('../../../assets/image/secondbg.png'),
        monthText: TotalMindfulPlaytimeOfThisMonth,
        moths: 'this month',
        img: require('../../../assets/image/leftImg.png'),
        backgroundColor: colors.litePink,
      },
      {
        key: 3,
        title: 'Rocket guy',
        text: 'BEST STREAK',
        image: require('../../../assets/image/lastbg.png'),
        monthText: streakOfThisMonth,
        moths: 'this month',
        img: require('../../../assets/image/wright.png'),
        backgroundColor: colors.redBg,
      },
    ];
  }, [TotalCompletedActivityOfThisMonth, TotalMindfulPlaytimeOfThisMonth, streakOfThisMonth]);

  const renderItem = ({ item, index }) => {
    let imageClass = s.toprightImg;
    if (index === 1) {
      imageClass = s.topLeftImg;
    } else if (index === 2) {
      imageClass = s.rightTopImg;
    }

    return (
      <View style={[s.slideWrap, { backgroundColor: item?.backgroundColor }]}>
        <TextView text={item?.text} style={s.titleSlide} />
        <View>
          <ImageBackground resizeMode='contain' source={item?.image} style={s.slideImg}>
            <TextView text={item?.monthText} style={s.dateSlide} />
            <TextView text={item?.moths} type={'body-one'} style={s.slideMonth} />
            <Image source={item?.img} style={imageClass} resizeMode='contain' />
          </ImageBackground>
        </View>
      </View>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      header: () => (
        <SafeAreaView style={s.headerRow}>
          <TextView text={activity?.title} style={s.headerText} />
          <View style={s.iconRow}>
            <TouchableOpacity style={s.headerIcon} onPress={() => onSave()}>
              <SvgIcon
                svgs={svgs}
                name={isFavorite ? 'heartcardfill-icon' : 'heartoutline-icon'}
                width={23}
                height={20}
                style={s.heartIcon}
              />
            </TouchableOpacity>
            {/* <HeaderButton
              type={1}
              iconName={'x'}
              color={colors.textColor}
              style={s.addIcon}
              onPress={navigation.goBack}
              isFeather={Platform.OS === 'ios' ? false : true}
            /> */}
          </View>
        </SafeAreaView>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [activity?.title, isFavorite, navigation, onSave]);

  const openImagePicker = useCallback(
    async (isMultiple = false, isCrop = true) => {
      const images = await openFilePicker(isMultiple, isCrop);
      if (isMultiple) await dispatch(setCompletedActivityImageList(images));
      else await dispatch(addCompletedActivityImage({ item: images }));
    },
    [dispatch],
  );

  const deleteImage = useCallback(
    async (index) => {
      await dispatch(deleteCompletedActivityImage({ index }));
    },
    [dispatch],
  );

  const completedImageView = useMemo(() => {
    if (imageList) {
      return imageList?.map((item, index) => {
        return (
          <View style={s.workWrap} key={`activityimage_index_${index}`}>
            <Image source={{ uri: `data:${item?.mime}};base64,${item?.data}` }} style={s.uploadImg} />
            <TouchableOpacity onPress={() => deleteImage(index)} style={s.closeIcon}>
              <SvgIcon svgs={svgs} name={'closeblack-icon'} width={16} height={16} />
            </TouchableOpacity>
          </View>
        );
      });
    }
    return null;
  }, [deleteImage, imageList]);

  const uploadImages = useCallback(async () => {
    let imageUrlList = [];
    const promises = [];

    if (!isEmpty(imageList)) {
      imageList?.map((item) => {
        const filename = getUniqueId();
        let myPromise = new Promise(function (myResolve, myReject) {
          const task = storage()
            .ref(COMPLETEDACTIVITYIMAGEPATH + '/' + filename)
            .putString(item?.data, 'base64', { contentType: item?.mime });

          task.on(
            'state_changed',
            null,
            (error) => myReject(error),
            (snapshot) => {
              snapshot.ref.getDownloadURL().then(async (downloadURL) => {
                imageUrlList.push(downloadURL);
                myResolve(downloadURL);
              });
            },
          );
        });

        promises.push(myPromise);
      });
    }
    try {
      await Promise.all(promises);
      return imageUrlList;
    } catch (error) {
      console.log('error', error);
    }
  }, [imageList]);

  const onClickDone = useCallback(async () => {
    try {
      setLoading(true);
      let item = {
        activityid: activity?.sys?.id,
        activityTitle: activity?.title,
        compltedDatetime: new Date().toUTCString(),
      };
      if (!isEmpty(imageList)) {
        const images = await uploadImages();
        item['images'] = images;
      }
      const result = await dispatch(createCompletedActivityNewDocument(item));
      if (result) {
        await dispatch(getAllCompletedActivityDocuments());
        navigation.navigate(screens.SingleActivity, { slug: activity?.slug });
      }
    } catch (error) {
      setLoading(false);
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  }, [activity?.slug, activity?.sys?.id, activity?.title, dispatch, imageList, navigation, uploadImages]);

  const subjectText = useMemo(() => {
    if (isEmpty(activity?.subjectCollection?.items)) return null;
    return Array.from(activity?.subjectCollection?.items, (item) => item?.title).join(', ');
  }, [activity?.subjectCollection]);

  return (
    <View style={s.root}>
      <ScrollableAvoidKeyboard showsVerticalScrollIndicator={false}>
        <View style={s.sliderWrap}>
          <AppIntroSlider
            dotStyle={s.inactivedot}
            activeDotStyle={s.activedot}
            data={slides}
            renderItem={renderItem}
            showSkipButton={false}
            showNextButton={false}
            showDoneButton={false}
            showPrevButton={false}
            style={s.sliderMobile}
            // renderPagination={(activeIndex) => {
            //   setActiveIndex(activeIndex);
            // }}
          />
        </View>
        <View style={s.complateWrap}>
          <View style={s.complateCard}>
            <TextView text={'Activity Completed!'} style={s.cardTitle} />
            <View style={s.skillWrap}>
              <TextView text={'SKILLS STRENGTHENED'} style={s.skilllabel} />
              <TextView text={subjectText} type={'body-two'} style={s.socialText} />
            </View>
          </View>
          <TextView
            text={'By completing this activity you’ve contributed to daily Mindful Playtime with your child.'}
            type={'body-two'}
            style={s.mindcaps}
          />

          {isEmpty(imageList) ? (
            <>
              <TextView text={'Took a photo? Add it to your Scrapbook.'} style={s.scarapbook} />
              <View style={s.btnWrap}>
                <Button style={s.btnRow} onPress={() => openImagePicker(true)}>
                  <SvgIcon svgs={svgs} name={'img-icon'} width={24} height={24} style={s.selectTik} />
                  <TextView text={'Add a photo'} type={'body-one'} style={s.btnText} />
                </Button>
                <Button
                  ButtonText='Done'
                  textStyle={AppStyles.buttonRegular}
                  onPress={onClickDone}
                  isLoading={loading}
                  disabled={loading}
                />
              </View>
            </>
          ) : (
            <>
              <View style={s.imgWrap}>
                <View style={s.rowImgWrap}>{completedImageView}</View>
              </View>
              <View style={s.secBtnWrap}>
                <TouchableOpacity onPress={() => openImagePicker(false, false)} style={s.addWrap}>
                  <SvgIcon svgs={svgs} name={'img-icon'} width={20} height={20} style={s.selectTik} />
                </TouchableOpacity>

                <View style={s.rightBtn}>
                  <Button
                    ButtonText='Done'
                    textStyle={AppStyles.buttonRegular}
                    onPress={onClickDone}
                    isLoading={loading}
                    disabled={loading}
                  />
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollableAvoidKeyboard>
    </View>
  );
};

export default ActivityCompletedScreen;
