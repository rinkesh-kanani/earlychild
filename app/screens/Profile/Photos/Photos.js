import React, { useCallback, useMemo, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modalbox';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useSelector } from 'react-redux';
import ScrollableAvoidKeyboard from '../../../components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';
import TextView from '../../../components/TextView';
import screens from '../../../constants/screens';
import { isEmpty } from '../../../helpers/helpers';
import s from './styles';
import Loading from '../../../components/Loading';
import { colors } from '../../../styles';
import moment from 'moment';
import Icon from '../../../components/Icon';

const PhotosScreen = ({ navigation }) => {
  const completedActivitySelector = useSelector((state) => state.completedActivity);
  const { sortedCompleteActivityList } = completedActivitySelector;
  const [isShowImage, setIsShowImage] = useState(false);
  const [image, setImage] = useState([]);
  const [imageData, setImageData] = useState({});
  const [isPhotos, setIsPhotos] = useState(false);
  const onClickImage = useCallback((url, item) => {
    setImage([{ url }]);
    setImageData(item);
    setIsShowImage(true);
  }, []);

  const renderFooterComponent = useCallback(() => {
    return (
      <View style={s.imgTextWrap}>
        <TextView text={imageData?.title} type={'body-one'} style={s.ImgHead} />
        <TextView
          text={`Uploaded ${moment(imageData?.dateTime).format('MMMM D, YYYY')}`}
          type={'caps'}
          style={s.imgDate}
        />
      </View>
    );
  }, [imageData?.dateTime, imageData?.title]);

  const loadingComponent = useCallback(() => {
    return (
      <View>
        <Loading />
      </View>
    );
  }, []);

  const completedActivityImageView = useCallback(
    (itemList) => {
      let newItemList = JSON.parse(JSON.stringify(itemList));
      newItemList?.sort((a, b) => new Date(b?.compltedDatetime) - new Date(a?.compltedDatetime));

      return newItemList?.map((activity) => {
        return activity?.images?.map((item, index) => {
          return (
            <View style={s.rowcards} key={`completedimage_${activity?.id}_index_${index}`}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(screens.KidsEdit);
                }}>
                <View style={s.cardItem}>
                  <TouchableOpacity
                    style={s.imgView}
                    onPress={() => {
                      onClickImage(item, { title: activity?.activityTitle, dateTime: activity?.compltedDatetime });
                    }}>
                    <Image source={{ uri: item }} style={s.ImgList} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          );
        });
      });
    },
    [navigation, onClickImage],
  );

  const activityView = useMemo(() => {
    if (!isEmpty(sortedCompleteActivityList))
      return sortedCompleteActivityList?.map((item, index) => {
        const imageList = Array.from(item?.list, (activity) => activity?.images).filter((x) => x !== undefined);

        if (!isEmpty(imageList)) {
          setIsPhotos(true);
          return (
            <View key={`completeactvity_index_${index}`}>
              <View>
                <TextView text={item?.date} type={'body-two'} style={s.monthText} />
              </View>
              <View style={s.cardList}>{completedActivityImageView(item?.list)}</View>
            </View>
          );
        }

        return null;
      });
  }, [completedActivityImageView, sortedCompleteActivityList]);

  return (
    <View style={s.root}>
      <ScrollableAvoidKeyboard showsVerticalScrollIndicator={false}>
        <View style={s.paddingWrap}>
          {isEmpty(sortedCompleteActivityList) || !isPhotos ? (
            <View style={s.EmptyWrap}>
              <Image source={require('../../../assets/image/camera.png')} style={s.cmrimg} />
              <TextView
                text={`You don’t have any photos yet. 
Complete an activity and upload a photo to capture the memory.`}
                type={'caption'}
                style={s.emptyCaps}
              />
            </View>
          ) : (
            activityView
          )}
        </View>
      </ScrollableAvoidKeyboard>

      <Modal
        coverScreen={true}
        swipeToClose={true}
        position={'bottom'}
        style={s.unitmodal}
        isOpen={isShowImage}
        backdrop={true}
        transparent={true}
        backButtonClose={true}
        entry={'center'}
        onClosed={() => setIsShowImage(false)}>
        <View style={s.wrapModal}>
          <ImageViewer
            imageUrls={image}
            saveToLocalByLongPress={false}
            loadingRender={loadingComponent}
            backgroundColor={colors.transparent}
            renderIndicator={() => {}}
            renderHeader={() => {
              return (
                <TouchableOpacity style={s.closeWrap} onPress={() => setIsShowImage(false)}>
                  <Icon name={'x'} color={colors.textColor} size={20} />
                </TouchableOpacity>
              );
            }}
            renderFooter={renderFooterComponent}
            style={s.viewImg}
          />
        </View>
      </Modal>
    </View>
  );
};

export default PhotosScreen;
