import { View, Platform, Image, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import HeaderButton from '../../components/HeaderButton';
import { colors } from '../../styles';
import TextView from '../../components/TextView';
import AppStyles from '../../styles/AppStyles';
import s from './style';
import ScrollableAvoidKeyboard from '../../components/ScrollableAvoidKeyboard/ScrollableAvoidKeyboard';
import { Button } from '../../components/Button';

const SingleActivitySimpleScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: '',
      navigation: navigation,
      header: () => (
        <View style={s.headerActivity}>
          <HeaderButton
            type={1}
            iconName={'chevron-left'}
            color={colors.textColor}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
          <TextView text={'Stacking Blocks'} numberOfLines={2} type={'body-one'} style={s.headerActivityText} />
          <HeaderButton
            type={1}
            iconName={'heart'}
            color={colors.textColor}
            style={s.addIcon}
            isFeather={Platform.OS === 'ios' ? false : true}
          />
        </View>
      ),
      headerStyle: AppStyles.headerStyle,
      headerTitleStyle: AppStyles.headerTitleStyle,
    });
  }, [navigation]);
  return (
    <View style={s.root}>
      <ScrollableAvoidKeyboard style={s.scrollRoot} showsVerticalScrollIndicator={false}>
        <View style={s.spaceRootSimple}>
          <View style={s.imgActivity}>
            <Image source={require('../../assets/image/blocks.png')} style={s.acitvitymainImg} />
          </View>
          <View style={s.singleactivityWrap}>
            <TextView
              text={'Caterpillar with Paper Circles'}
              type={'head-line'}
              style={s.activityTitleImg}
              numberOfLines={2}
            />
          </View>
          <View style={s.labelSug}>
            <View style={s.labelCard}>
              <View style={s.tagWrap}>
                <TextView text={'MOTOR'} style={s.todayTag} />
              </View>
              <View style={s.tagWrap}>
                <TextView text={'ART'} style={s.artTag} />
              </View>
            </View>
          </View>
          <View style={s.blogWrap}>
            <TextView
              text={`Nullam id dolor id nibh ultricies vehicula ut id elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus mollis interdum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec sed odio dui.`}
              type={'body-two'}
              style={s.blogText}
            />
          </View>
          <View style={s.actBox}>
            <TextView text={'Materials'} type={'body-one'} style={s.boxTitle} />
            <View>
              <View style={s.ulView}>
                <View style={s.dot}></View>
                <TextView text={'Construcion Paper'} type={'body-two'} style={s.meterialName} />
              </View>
            </View>
          </View>
          <View style={s.actBox}>
            <TextView text={'Product Links'} type={'body-one'} style={s.boxTitle} />
            <View style={s.downloadWrap}>
              <TextView text={'Printable PDF'} type={'body-two'} style={s.linkText} />
            </View>
          </View>
          <View style={s.actBox}>
            <TextView text={'Notes'} type={'body-one'} style={s.boxTitle} />
            <TextView
              text={`Etiam porta sem malesuada magna mollis euismod. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. `}
              type={'body-two'}
              style={s.noteCaps}
            />
          </View>
        </View>
      </ScrollableAvoidKeyboard>
      <ImageBackground source={require('../../assets/image/linearImg.png')} style={s.linearImg}>
        <Button ButtonText='Complete' style={s.btnCenter} textStyle={AppStyles.buttonRegular} />
      </ImageBackground>
    </View>
  );
};

export default SingleActivitySimpleScreen;
