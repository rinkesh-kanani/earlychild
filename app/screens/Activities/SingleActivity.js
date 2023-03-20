import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../assets/svg';
import TextView from '../../components/TextView';
import AppStyles from '../../styles/AppStyles';
import s from './style';
import HeaderButton from '../../components/HeaderButton';
import { colors } from '../../styles';
import Icon from '../../components/Icon';
import Share from 'react-native-share';
import ScrollableAvoidKeyboard from '../../components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';
import { Button } from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getActivityItem } from '../../services/activityservice';
import { setActivityItem } from '../../actions/activityActions';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Markdown from 'react-native-markdown-display';
import RNFetchBlob from 'react-native-blob-util';
import { isEmpty, isToday, toastNotification } from '../../helpers/helpers';
import screens from '../../constants/screens';
import Loading from '../../components/Loading';
import {
  createFavoriteActivityNewDocument,
  deleteFavoriteActivityDocument,
  getAllFavoriteActivityDocuments,
  getFavoriteActivityData,
} from '../../services/favoriteActivityservice';
import { updateFavoriteActivity } from '../../actions/favoriteActivityaction';
import { halfindent } from '../../styles/dimensions';

const SingleActivityScreen = ({ navigation, route }) => {
  const activitySelector = useSelector((state) => state.activity);
  const completedActivityselector = useSelector((state) => state.completedActivity);
  const favoriteActivitySelector = useSelector((state) => state.favoriteActivity);

  const { favoriteActivity } = favoriteActivitySelector;
  const { completeActivityList } = completedActivityselector;
  const { activityItem } = activitySelector;
  const { params } = route;
  const { slug } = params;
  const { width } = useWindowDimensions();

  const [loading, setLoading] = useState(false);

  const [isCompleted, setIsCompleted] = useState(false);
  const [isCompletedBefore, setIsCompletedBefore] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await dispatch(getActivityItem(slug));
      if (result) {
        dispatch(updateFavoriteActivity({ propsName: 'activityId', value: result?.sys?.id }));

        const activityIndex = completeActivityList?.findIndex((activity) => {
          return activity?.activityid === result?.sys?.id && isToday(activity?.compltedDatetime);
        });
        if (activityIndex !== -1) {
          setIsCompleted(true);
          setIsCompletedBefore(true);
        } else {
          const completedactivityIndex = completeActivityList?.findIndex((activity) => {
            return activity?.activityid === result?.sys?.id;
          });
          if (completedactivityIndex !== -1) setIsCompletedBefore(true);
        }

        const favoriteActivityData = await dispatch(getFavoriteActivityData());
        const favoriteActivityIndex = favoriteActivityData?.findIndex((x) => x?.activityId === result?.sys?.id);
        if (favoriteActivityIndex !== -1) {
          setIsFavorite(true);

          dispatch(
            updateFavoriteActivity({
              propsName: 'documentId',
              value: favoriteActivityData?.[favoriteActivityIndex]?.id,
            }),
          );
        }
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [completeActivityList, dispatch, slug]);

  const addFavoriteActivity = useCallback(async () => {
    const activityId = favoriteActivity?.activityId;
    const result = await dispatch(createFavoriteActivityNewDocument({ activityId }));
    await dispatch(updateFavoriteActivity({ propsName: 'documentId', value: result?.id }));
  }, [dispatch, favoriteActivity?.activityId]);

  const onSave = useCallback(
    async (isSave, documentId) => {
      try {
        if (isSave) {
          addFavoriteActivity();
          setIsFavorite(true);
          await dispatch(getAllFavoriteActivityDocuments());
          return true;
        } else {
          await dispatch(deleteFavoriteActivityDocument(documentId));
          await dispatch(updateFavoriteActivity({ propsName: 'documentId', value: null }));

          await dispatch(getAllFavoriteActivityDocuments());
          setIsFavorite(false);

          return false;
        }
      } catch (error) {
        console.log('error', error);
      }
    },
    [addFavoriteActivity, dispatch],
  );

  useEffect(() => {
    loadData();
    return () => {
      dispatch(setActivityItem(null));
      setIsFavorite(false);
    };
  }, [dispatch, loadData]);

  useEffect(() => {
    navigation.setOptions({
      title: isScroll ? activityItem?.title : '',
      navigation: navigation,
      headerLeft: () => (
        <View style={s.headerActivity}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            color={colors.textColor}
            style={s.addIcon}
            iconSize={28}
            isFeather={Platform.OS === 'ios' ? false : true}
            onPress={navigation.goBack}
          />
        </View>
      ),
      headerRight: () => (
        <View style={s.headerActivity}>
          {/* <HeaderButton
            type={1}
            iconName={'heart'}
            color={colors.textColor}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          /> */}
          <TouchableOpacity style={s.headerIcon} onPress={() => onSave(!isFavorite, favoriteActivity?.documentId)}>
            <SvgIcon
              svgs={svgs}
              name={isFavorite ? 'heartcardfill-icon' : 'heartoutline-icon'}
              width={23}
              height={20}
              style={s.checkIcon}
            />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: isScroll ? AppStyles.headerScroll : AppStyles.headerStyleLast,
      headerTitleStyle: AppStyles.headerTitleTwo,
    });
  }, [
    activityItem?.title,
    favoriteActivity.activityId,
    favoriteActivity?.documentId,
    isFavorite,
    isScroll,
    navigation,
    onSave,
  ]);

  const activitySubjectListView = useCallback((subjectList) => {
    return subjectList?.map((item, index) => {
      return (
        <View style={s.tagWrap} key={`activitysubjectlistview_index_${index}`}>
          <View style={[s.labelcard, { backgroundColor: item?.color }]}>
            <TextView text={item?.title} style={s.todayTagTwo} />
          </View>
        </View>
      );
    });
  }, []);

  const instructionStepList = useMemo(() => {
    const instructionList = activityItem?.instruction?.split(/(\(\(.*\)\).*)/);
    let newinstructionList = [];
    instructionList?.forEach((item, index) => {
      if (item?.match(/(\(\(.*\)\).*)/)) {
        const instructionStep = instructionList[index + 1]?.split(/(!\[.*].*)/);

        let newItem = {};
        if (instructionStep.length === 1) newItem = { para: instructionStep[0] };
        else {
          newItem = { image: instructionStep[1], para: instructionStep[2] };
        }
        newinstructionList?.push(newItem);
      }
    });

    return newinstructionList;
  }, [activityItem?.instruction]);

  const instructionListView = useMemo(() => {
    const instructionSteps = instructionStepList;
    return instructionSteps?.map((item, index) => {
      return (
        <View style={s.intrWrap} key={`instructionlistview_index_${index}`}>
          <View style={s.numView}>
            <TextView text={index + 1} type={'body-two'} style={s.stepNum} />
          </View>
          <View style={[s.imginsWrap, { paddingVertical: isEmpty(item?.image) ? 0 : halfindent }]}>
            {!isEmpty(item?.image) && (
              <Markdown defaultImageHandler={'https:'} style={s.instructionImg}>
                {item?.image}
              </Markdown>
            )}
            <View>
              <Markdown style={s.insCaps}>{item?.para}</Markdown>
            </View>
          </View>
        </View>
      );
    });
  }, [instructionStepList]);

  const activityImageView = useMemo(() => {
    return (
      <View style={s.imgActivity}>
        <Image source={{ uri: activityItem?.banner?.url }} style={s.acitvitymainImg} />
        {isCompletedBefore && <SvgIcon svgs={svgs} name={'Select-icon'} width={26} height={26} style={s.selectIcon} />}
      </View>
    );
  }, [activityItem?.banner?.url, isCompletedBefore]);

  const activityTitleView = useMemo(() => {
    if (activityItem?.title)
      return (
        <View style={s.singleactivityWrap}>
          <TextView text={activityItem?.title} type={'head-line'} style={s.activityTitleImg} numberOfLines={2} />
        </View>
      );
    return null;
  }, [activityItem?.title]);

  const activityDescriptionView = useMemo(() => {
    if (activityItem?.description)
      return (
        <View style={s.blogWrap}>
          <TextView text={activityItem?.description} style={s.blogText} />
        </View>
      );
    return null;
  }, [activityItem?.description]);

  const activityMaterialsView = useMemo(() => {
    const systemFonts = ['Navigo-Regular', ...defaultSystemFonts];
    if (activityItem?.material?.json)
      return (
        <RenderHtml
          contentWidth={width}
          source={{ html: `${documentToHtmlString(activityItem?.material?.json)}` }}
          systemFonts={systemFonts}
          tagsStyles={s.materialTag}
        />
      );
    return null;
  }, [activityItem?.material?.json, width]);

  const activityNotesView = useMemo(() => {
    if (activityItem?.notes) return <TextView text={activityItem?.notes} style={s.notesText} />;
    return null;
  }, [activityItem?.notes]);

  const onDownloadPdf = useCallback((url) => {
    try {
      if (Platform.OS === 'ios') {
        let imagePath = null;
        let base64Type;
        const { config, fs } = RNFetchBlob;
        let filetype = url?.substring(url?.lastIndexOf('.') + 1);

        base64Type = `application/${filetype}`;
        config({
          fileCache: true,
        })
          .fetch('GET', url)
          // the image is now dowloaded to device's storage
          .then((resp) => {
            imagePath = resp.path();
            return resp.readFile('base64');
          })
          .then((base64Data) => {
            // here's base64 encoded image
            var imageUrl = 'data:' + base64Type + ';base64,' + base64Data;
            let shareImage = {
              url: imageUrl,
            };
            Share.open(shareImage)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                err && console.log('err', err);
              });
            // remove the file from storage
            return fs.unlink(imagePath);
          });
      } else {
        toastNotification('download started please wait...');
        // Image URL which we want to download
        let fileURL = url;
        // Getting the extention of the file
        let fileName = url?.substring(url?.lastIndexOf('/') + 1);
        // Get config and fs from RNFetchBlob
        // config: To pass the downloading related options
        // fs: Directory path where we want our image to download
        const { config, fs } = RNFetchBlob;
        let DownloadDir = fs.dirs.DownloadDir;
        let options = {
          fileCache: true,
          addAndroidDownloads: {
            // Related to the Android only
            useDownloadManager: true,
            notification: true,
            path: `${DownloadDir}/${fileName}`,
          },
        };
        config(options)
          .fetch('GET', fileURL)
          .then((res) => {
            // Showing alert after successful downloading
            console.log('res -> ', JSON.stringify(res));
            toastNotification('File Downloaded Successfully.');
          });
      }
    } catch (error) {
      console.log('error', error);
    }
  }, []);

  const downloadPdfView = useMemo(() => {
    if (!isEmpty(activityItem?.pdfCollection?.items))
      return (
        <View style={s.actBox}>
          <TextView text={'Downloads'} style={s.boxTitle} />
          {activityItem?.pdfCollection?.items?.map((item, index) => {
            return (
              <View style={s.downloadWrap} key={`pdfdownload_index_${index}`}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(screens.PdfView, { item });
                  }}>
                  <TextView text={item?.title} style={s.linkText} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    onDownloadPdf(item?.url);
                  }}>
                  <Icon name={'download'} color={colors.textColor} size={22} />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      );
    return null;
  }, [activityItem?.pdfCollection?.items, navigation, onDownloadPdf]);

  const onComplete = useCallback(() => {
    navigation.navigate(screens.ActivityComplete, {
      activity: activityItem,
      isFavoriteActivity: isFavorite,
      onSaveActivity: async (isSave, documentId) => {
        const result = await onSave(isSave, documentId);
        return result;
      },
    });
  }, [activityItem, isFavorite, navigation, onSave]);

  const onScroll = useCallback((event) => {
    if (event.nativeEvent.contentOffset.y >= 1) setIsScroll(true);
    else setIsScroll(false);
  }, []);

  return (
    <View style={s.root}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ScrollableAvoidKeyboard style={s.scrollRoot} showsVerticalScrollIndicator={false} onScroll={onScroll}>
            <View style={[s.spaceRoot, !activityItem?.instruction && s.spaceRootMargin]}>
              {activityImageView}
              {activityTitleView}
              <View style={s.labelSug}>
                <View style={s.labelCard}>{activitySubjectListView(activityItem?.subjectCollection?.items)}</View>
              </View>
              {activityDescriptionView}
              {downloadPdfView}
              {activityItem?.material?.json && (
                <View style={s.actBox}>
                  <TextView text={'Materials'} type={'body-one'} style={s.boxTitle} />
                  <View>{activityMaterialsView}</View>
                </View>
              )}
              {activityItem?.notes && (
                <View style={s.actBox}>
                  <TextView text={'Notes'} style={s.boxTitle} />
                  {activityNotesView}
                </View>
              )}
            </View>
            {activityItem?.instruction && (
              <View>
                <TextView text={'Instructions'} style={s.boxTitleTwo} />
                <ScrollView style={s.horizontalscroll} showsHorizontalScrollIndicator={false}>
                  <View style={s.instCard}>{instructionListView}</View>
                </ScrollView>
              </View>
            )}
          </ScrollableAvoidKeyboard>
          <ImageBackground source={require('../../assets/image/linearImg.png')} style={s.linearImg}>
            {isCompleted ? (
              <Button style={s.btnComplate}>
                <SvgIcon svgs={svgs} name={'cmpbtn-icon'} width={24} height={24} />
                <TextView text={'Completed!'} type={'body-head'} style={s.cmpText} />
              </Button>
            ) : (
              <View>
                <Button
                  ButtonText={'Complete'}
                  style={s.btnCenter}
                  textStyle={AppStyles.buttonRegular}
                  onPress={onComplete}
                />
              </View>
            )}
          </ImageBackground>
        </>
      )}
    </View>
  );
};

export default SingleActivityScreen;
