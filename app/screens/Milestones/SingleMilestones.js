import { ScrollView, View } from 'react-native';
import React from 'react';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import s from './styles';
import svgs from '../../assets/svg';
import TextView from '../../components/TextView';
import Header from '../../components/Header/Header';

const SingleMilestonesScreen = ({ navigation }) => {
  return (
    <View style={s.root}>
      <Header navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.rootpadding}>
          <TextView type={'head-line'} text='Milestones' style={s.titleText} />
          <View style={s.overView}>
            <TextView
              text={
                'Tell me what’s going on at a high level at 1 years of age. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus mollis interdum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.'
              }
              type={'body-two'}
              style={s.capsDetail}
            />
          </View>
          <View style={s.cardList}>
            <View style={s.socialWrap}>
              <TextView text={'Social - Emotional'} type={'caps'} style={s.noteHead} />
              <View style={s.noteRow}>
                <SvgIcon svgs={svgs} name={'checked-icon'} width={18} height={18} style={s.checkIcon} />
                <TextView
                  text={'Moves away from you, but looks to make sure you are close by'}
                  type={'body-one'}
                  style={s.textNote}
                />
              </View>
              <View style={s.noteRow}>
                <SvgIcon svgs={svgs} name={'unchecked-icon'} width={18} height={18} style={s.checkIcon} />
                <TextView text={'Points to show you something interesting'} type={'body-one'} style={s.textNote} />
              </View>
            </View>
            <View style={s.socialWrapTwo}>
              <TextView text={'LITERACY'} type={'caps'} style={s.noteHead} />
              <View style={s.noteRow}>
                <SvgIcon svgs={svgs} name={'checked-icon'} width={18} height={18} style={s.checkIcon} />
                <TextView text={'Looks at a few pages in a book  with you.'} type={'body-one'} style={s.textNote} />
              </View>
              <View style={s.noteRow}>
                <SvgIcon svgs={svgs} name={'unchecked-icon'} width={18} height={18} style={s.checkIcon} />
                <TextView text={'Looks at a few pages in a book  with you.'} type={'body-one'} style={s.textNote} />
              </View>
              <View style={s.noteRow}>
                <SvgIcon svgs={svgs} name={'unchecked-icon'} width={18} height={18} style={s.checkIcon} />
                <TextView text={'Looks at a few pages in a book  with you.'} type={'body-one'} style={s.textNote} />
              </View>
            </View>
            <View style={s.socialWrapThree}>
              <TextView text={'LITERACY'} type={'caps'} style={s.noteHead} />
              <View style={s.noteRow}>
                <SvgIcon svgs={svgs} name={'checked-icon'} width={18} height={18} style={s.checkIcon} />
                <TextView text={'Looks at a few pages in a book  with you.'} type={'body-one'} style={s.textNote} />
              </View>
              <View style={s.noteRow}>
                <SvgIcon svgs={svgs} name={'unchecked-icon'} width={18} height={18} style={s.checkIcon} />
                <TextView text={'Looks at a few pages in a book  with you.'} type={'body-one'} style={s.textNote} />
              </View>
              <View style={s.noteRow}>
                <SvgIcon svgs={svgs} name={'unchecked-icon'} width={18} height={18} style={s.checkIcon} />
                <TextView text={'Looks at a few pages in a book  with you.'} type={'body-one'} style={s.textNote} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SingleMilestonesScreen;
