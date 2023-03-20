import React from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import SvgIcon from 'react-native-svg-icon/lib/components/SvgIcon';
import svgs from '../../assets/svg';
import s from './styles';
import TextView from '../../components/TextView';

const MindfulInfoModal = ({ onRequestClose }) => {
  return (
    <KeyboardAvoidingView style={s.keyBord}>
      <View style={s.modalWrapper}>
        <Text style={s.closeModal} onPress={onRequestClose}></Text>
        <View style={s.rectView}></View>
        <View style={s.modalBox}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback>
              <View style={s.paddingModal}>
                <TextView text={'Mindful Playtime'} type={'header'} style={s.playTimeText} />
                <View style={s.spendTime}>
                  <TextView
                    text={
                      'Spending at least 10 mins a day being present while engaging in play is proven to strengthen your child’s intellectual, physical and emotional development.'
                    }
                    type={'body-two'}
                    style={s.spendCaption}
                  />
                </View>
                <View style={s.playTimeCard}>
                  <TextView
                    text={'How will my child benefit from mindful playtime?'}
                    type={'body-head'}
                    style={s.cardTitle}
                  />
                  <View style={s.listRow}>
                    <SvgIcon svgs={svgs} name={'list-icon'} width={10} height={9} style={s.selectTik} />
                    <TextView text={'Strengthen relationship'} type={'caption'} style={s.listText} />
                  </View>
                  <View style={s.listRow}>
                    <SvgIcon svgs={svgs} name={'list-icon'} width={10} height={9} style={s.selectTik} />
                    <TextView text={'Fewer tantrums, better behavior'} type={'caption'} style={s.listText} />
                  </View>
                  <View style={s.listRow}>
                    <SvgIcon svgs={svgs} name={'list-icon'} width={10} height={9} style={s.selectTik} />
                    <TextView text={'Confidence'} type={'caption'} style={s.listText} />
                  </View>
                  <View style={s.listRow}>
                    <SvgIcon svgs={svgs} name={'list-icon'} width={10} height={9} style={s.selectTik} />
                    <TextView text={'Independence'} type={'caption'} style={s.listText} />
                  </View>
                  <View style={s.listRow}>
                    <SvgIcon svgs={svgs} name={'list-icon'} width={10} height={9} style={s.selectTik} />
                    <TextView text={'New skills'} type={'caption'} style={s.listText} />
                  </View>
                  <View style={s.listRow}>
                    <SvgIcon svgs={svgs} name={'list-icon'} width={10} height={9} style={s.selectTik} />
                    <TextView text={'Growth mindset'} type={'caption'} style={s.listText} />
                  </View>
                </View>
                <View style={s.blogCaps}>
                  <TextView
                    text={`More details about mindful playtime. Donec sed odio dui. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas faucibus mollis interdum. Aenean lacinia bibendum nulla sed consectetur. Maecenas faucibus mollis interdum. Nullam id dolor id nibh ultricies vehicula ut id elit.`}
                    type={'body-two'}
                    style={s.blogText}
                  />
                </View>
                <View style={s.blogCaps}>
                  <TextView
                    text={`More details about mindful playtime. Donec sed odio dui. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas faucibus mollis interdum. Aenean lacinia bibendum nulla sed consectetur. Maecenas faucibus mollis interdum. Nullam id dolor id nibh ultricies vehicula ut id elit.`}
                    type={'body-two'}
                    style={s.blogText}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MindfulInfoModal;
