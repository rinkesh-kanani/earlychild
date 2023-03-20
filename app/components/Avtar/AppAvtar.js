import React from 'react';
import { colors } from '../../styles';
import { View, Image } from 'react-native';
import s from './styles';
import TextView from '../TextView';
import { isEmpty } from 'lodash';

const AppAvtar = (props) => {
  const { Name: userName, Imgsrc: userImg, Size: size } = props;
  const isborder = props.isborder ? props.isborder : false;
  const textType = props.TextType ? props.TextType : 'sub-head';

  return (
    <View style={props.style}>
      {!isEmpty(userImg) ? (
        <Image
          style={[
            s.userImage,
            props.Size
              ? {
                  height: size,
                  width: size,
                  borderRadius: size / 2,
                }
              : undefined,
            isborder ? { borderWidth: 3, borderColor: colors.white } : undefined,
          ]}
          source={{ uri: userImg, cache: 'force-cache' }}
        />
      ) : (
        <View
          style={[
            s.userImage,

            props.Size
              ? {
                  height: size,
                  width: size,
                  borderRadius: size / 2,
                }
              : undefined,
            isborder ? { borderWidth: 3, borderColor: colors.white } : undefined,
          ]}>
          <TextView type={textType} style={s.userLetter} text={userName ? userName.charAt(0) : '#'} />
        </View>
      )}
    </View>
  );
};

export default AppAvtar;
