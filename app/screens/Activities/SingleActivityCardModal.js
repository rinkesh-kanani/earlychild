import { View, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import React from 'react';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import { isIOS } from '../../constants/constant';
import TextView from '../../components/TextView';
import s from './styles';
import svgs from '../../assets/svg';
import { Button, Touchable } from '../../components/Button';
import AppStyles from '../../styles/AppStyles';

const SingleActivityCardModal = () => {
  return (
    <KeyboardAvoidingView style={s.modalContainer} behavior={isIOS && 'padding'}>
      <View style={s.modalTrial}>
        <View style={s.rectView}></View>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={s.mainView}
          showsVerticalScrollIndicator={false}>
          <Touchable>
            <View style={s.modalCardWarpper}>
              <TextView text={'No Bake Play Dough'} type={'head-line'} style={s.singleTitle} />
              <View style={s.labelWrapper}>
                <View style={s.wraplabel}>
                  <TextView text={'Motor'} style={s.orangeLabel} />
                  <TextView text={'Age 1+'} style={s.AgeTag} />
                </View>
                <SvgIcon svgs={svgs} name={'heartblank-icon'} width={24} height={24} style={s.checkIcon} />
              </View>
              <View style={s.ImagWrapper}>
                <Image source={require('../../assets/image/artview.png')} resizeMode='contain' style={s.imgArt} />
                <TextView
                  text={
                    'Overview. Nullam id dolor id nibh ultricies vehicula ut id elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.'
                  }
                  type={'body-two'}
                  style={s.capsOverView}
                />
                <View style={s.playBtn}>
                  <SvgIcon svgs={svgs} name={'play-icon'} width={14} height={16} />
                </View>
              </View>
              <View style={s.yellowCardtwo}>
                <TextView text={'Materials'} type={'body-head'} style={s.cardTitle} />
                <View>
                  <View style={s.listView}>
                    <View style={s.bulletView}></View>
                    <TextView text={'Flour'} type={'body-two'} style={s.materialList} />
                  </View>
                  <View style={s.listView}>
                    <View style={s.bulletView}></View>
                    <TextView text={'Corn Starch'} type={'body-two'} style={s.materialList} />
                  </View>
                  <View style={s.listView}>
                    <View style={s.bulletView}></View>
                    <TextView text={'Water'} type={'body-two'} style={s.materialList} />
                  </View>
                  <View style={s.listView}>
                    <View style={s.bulletView}></View>
                    <TextView text={'Food Coloring (Optional)'} type={'body-two'} style={s.materialList} />
                  </View>
                </View>
              </View>
              <View style={s.introSection}>
                <TextView text={'Instructions'} type={'body-head'} style={s.introTitle} />
                <View style={s.introRow}>
                  <TextView text={'1.'} type={'body-two'} style={s.rowNum} />
                  <TextView
                    text={'Praesent commodo cursus magna,velscelerisque nisl consectetur et.'}
                    type={'body-two'}
                    style={s.introCaps}
                  />
                </View>
                <View style={s.introRow}>
                  <TextView text={'2.'} type={'body-two'} style={s.rowNum} />
                  <TextView
                    text={'In condimentum arcu urna magna in. Elit non aliquam adipiscing tristique pretium habitant.'}
                    type={'body-two'}
                    style={s.introCaps}
                  />
                </View>
              </View>
              <View style={s.btnWrap}>
                <Button ButtonText='Done' textStyle={AppStyles.buttonText} />
              </View>
            </View>
          </Touchable>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SingleActivityCardModal;
