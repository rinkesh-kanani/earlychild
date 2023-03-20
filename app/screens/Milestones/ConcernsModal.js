import { View, Text, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import s from './styles';
import TextView from '../../components/TextView';

const ConcernsModal = ({ onRequestClose }) => {
  return (
    <KeyboardAvoidingView style={s.keyBord}>
      <View style={s.modalWrapper}>
        <Text style={s.closeModal} onPress={onRequestClose}></Text>
        <View style={s.rectView}></View>
        <View style={s.modalBox}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback>
              <View style={s.concerWrap}>
                <TextView text={'Have concerns?'} style={s.TitleHead} />
                <View style={s.blogView}>
                  <TextView
                    text={`If you have concerns or any little gut feeling about your child’s development, talk to your doctor, or another health professional. The earlier needs are identified and the earlier kids get connected to support, the better their long-term success will be.`}
                    style={s.blogCaps}
                  />
                  <View style={s.secondBlog}>
                    <TextView text={'Who do you talk to?'} style={s.blogQues} />
                    <TextView
                      text={`You can always talk to your doctor and they can connect you to other professionals. But if your child needs support with…`}
                      style={s.blogCaps}
                    />
                    <View style={s.listWrap}>
                      <View style={s.rowWrap}>
                        <View style={s.dotView}></View>
                        <TextView
                          text={`Talking and learning words, you see a speech pathologist`}
                          style={s.listCaps}
                        />
                      </View>
                      <View style={s.rowWrap}>
                        <View style={s.dotView}></View>
                        <TextView
                          text={`Moving their bodies confidently, you see a physiotherapist`}
                          style={s.listCaps}
                        />
                      </View>
                      <View style={s.rowWrap}>
                        <View style={s.dotView}></View>
                        <TextView
                          text={`Managing their feelings and getting along well with others, you see a play therapist`}
                          style={s.listCaps}
                        />
                      </View>
                      <View style={s.rowWrap}>
                        <View style={s.dotView}></View>
                        <TextView
                          text={`Learning their letters, numbers, and other early academic skills, you see a teacher, educational psychologist or school psychologist`}
                          style={s.listCaps}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ConcernsModal;
