import React, { useMemo } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import ScrollableAvoidKeyboard from '../../../components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';
import TextView from '../../../components/TextView';
import screens from '../../../constants/screens';
import { isEmpty } from '../../../helpers/helpers';
import s from './styles';

const SavedScreen = ({ navigation }) => {
  const favoriteActivitySelector = useSelector((state) => state.favoriteActivity);
  const { favoriteActivityList } = favoriteActivitySelector;

  const favoriteactivityListView = useMemo(() => {
    if (!isEmpty(favoriteActivityList))
      return favoriteActivityList?.map((item, index) => {
        return (
          <View style={s.rowcards} key={`favoriteactivity_index_${index}`}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(screens.SingleActivity, { slug: item?.slug });
              }}>
              <View style={s.cardItem}>
                <View style={s.imgView}>
                  <Image source={{ uri: item?.banner?.url }} style={s.ImgList} />
                </View>
                <TextView text={item?.title} type={'body-two'} style={s.darkText} />
              </View>
            </TouchableOpacity>
          </View>
        );
      });
  }, [favoriteActivityList, navigation]);
  return (
    <View style={s.root}>
      <ScrollableAvoidKeyboard showsVerticalScrollIndicator={false}>
        <View style={s.paddingWrap}>
          {!isEmpty(favoriteActivityList) ? (
            <View style={s.cardList}>{favoriteactivityListView}</View>
          ) : (
            <View style={s.emptyWrap}>
              <Image source={require('../../../assets/image/savedempty.png')} style={s.emptyImg} />
              <TextView
                text={`You don’t have any saved activities yet. 
Saved activities will appear here.`}
                type={'caption'}
                style={s.emptycaps}
              />
            </View>
          )}
        </View>
      </ScrollableAvoidKeyboard>
    </View>
  );
};

export default SavedScreen;
