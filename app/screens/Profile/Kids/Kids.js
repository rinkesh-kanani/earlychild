import React, { useCallback } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import { setChildData } from '../../../actions/childActions';
import AppAvtar from '../../../components/Avtar/AppAvtar';
import { Touchable } from '../../../components/Button';
import Card from '../../../components/Card';
import Icon from '../../../components/Icon';
import svgs from '../../../assets/svg';
import TextView from '../../../components/TextView';
import screens from '../../../constants/screens';
import { colors } from '../../../styles';
import s from './styles';
import { setCurrentChildData } from '../../../services/childService';
import { setIsNavigateHomeToMilestone } from '../../Milestones/Milestones';

const KidsScreen = ({ navigation }) => {
  const childSelector = useSelector((state) => state.child);
  const { childList } = childSelector;

  const dispatch = useDispatch();
  const onClickEditChild = useCallback(
    async (child) => {
      await dispatch(setChildData(child));
      navigation.navigate(screens.KidsEdit);
    },
    [dispatch, navigation],
  );

  const onTapChild = useCallback(
    async (child) => {
      await dispatch(setCurrentChildData(child));
      await setIsNavigateHomeToMilestone(true);
      navigation.navigate(screens.MilestonesRoot);
    },
    [dispatch, navigation],
  );

  const renderChildItem = useCallback(
    (item) => {
      const child = item?.item;
      return (
        <Card style={s.cardList}>
          <View style={s.cardRow}>
            <TouchableOpacity
              onPress={() => {
                onTapChild(child);
              }}>
              <View style={s.leftRow}>
                <AppAvtar
                  Imgsrc={child?.profileLink ? child?.profileLink : undefined}
                  Name={child?.firstName}
                  Size={56}
                  TextType={'title'}
                />
                <View style={s.textWrap}>
                  <TextView text={child?.firstName} type={'head-line'} style={s.childName} />
                  <TextView text={child?.age} type={'body-one'} style={s.years} />
                </View>
              </View>
            </TouchableOpacity>
            <Touchable onPress={() => onClickEditChild(child)} style={s.touchStyle}>
              <SvgIcon svgs={svgs} name={'edit-icon'} width={18} height={18} />
            </Touchable>
          </View>
        </Card>
      );
    },
    [onClickEditChild, onTapChild],
  );

  return (
    <View style={s.root}>
      <View style={s.marginWrap}>
        <FlatList
          showsVerticalScrollIndicator={false}
          // refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => loadData(true)} />}
          keyExtractor={(item, index) => `Child_Item_${item?.id}_index_${index}`}
          renderItem={renderChildItem}
          data={childList}
          ListEmptyComponent={
            <View>
              <TextView text={'Child not Found'} type={'body-one'} style={s.headText} />
            </View>
          }
          ListFooterComponent={
            <View style={s.addWrapper}>
              <TouchableOpacity
                onPress={() => navigation.navigate(screens.KidsEdit)}
                style={s.addWrappertwo}
                activeOpacity={0.7}>
                <View style={s.iconBg}>
                  <Icon name={'plus'} color={colors.textColor} size={16} />
                </View>
                <TextView text={'Add Another Child'} type={'body-head'} style={s.addChild} />
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </View>
  );
};

export default KidsScreen;
