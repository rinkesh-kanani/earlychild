import { View, Text, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Platform } from 'react-native';
import React from 'react';
import HeaderButton from '../../../components/HeaderButton';
import { colors } from '../../../styles';
import s from './Styles';
import TextView from '../../../components/TextView';

const TermsOfServiceModal = ({ onRequestClose }) => {
  return (
    <KeyboardAvoidingView style={s.keyBord}>
      <View style={s.modalWrapper}>
        <Text style={s.closeModal} onPress={onRequestClose}></Text>
        <View style={s.rectView}></View>
        <View style={s.modalBox}>
          <View style={s.closeIcon}>
            <HeaderButton
              type={1}
              iconName={'x'}
              color={colors.textColor}
              isFeather={Platform.OS === 'ios' ? false : true}
              onPress={onRequestClose}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback>
              <View style={s.modalInfoWrap}>
                <View style={s.paddingWrap}>
                  <TextView text={'Terms & Conditions'} style={s.TextHead} />
                  <TextView text={'1.1 General Terms & Conditions'} type={'caption'} style={s.point} />
                  <TextView
                    text={`Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec id elit non mi porta gravida at eget metus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.


Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Curabitur blandit tempus porttitor.


Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec sed odio dui. Maecenas faucibus mollis interdum. Nullam id dolor id nibh ultricies vehicula ut id elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec id elit non mi porta gravida at eget metus. Donec ullamcorper nulla non metus auctor fringilla.


Cras justo odio, dapibus ac facilisis in, egestas eget quam. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec sed odio dui. Vestibulum id ligula porta felis euismod semper.`}
                    type={'caption'}
                    style={s.details}
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

export default TermsOfServiceModal;
