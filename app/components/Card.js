import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { colors } from '../styles';
import { indent, borderRadius, lessIndent } from '../styles/dimensions';
import { scale, scaleVertical } from '../utils/scale';
import TextView from './TextView';

const Card = ({ style, children, title, contentStyle, ...props }) => (
  <View style={[s.card, style]} {...props}>
    {/* <Touchable onPress={onPress} style={{borderRadius: borderRadius}}> */}
    {title ? <TextView text={title} type={'body-one'} style={s.textStyle} /> : null}
    <View style={[s.cardContent, contentStyle]}>{children}</View>
    {/* </Touchable> */}
  </View>
);

const s = StyleSheet.create({
  card: {
    borderRadius: borderRadius,
    backgroundColor: colors.white,
    borderColor: colors.borderColor,
    ...Platform.select({
      android: {
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        overflow: 'hidden',
      },
      ios: {
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
      },
    }),
  },
  textStyle: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 15,
    color: colors.gray,
    paddingHorizontal: scale(lessIndent + 3),
    paddingTop: scaleVertical(indent),
    paddingBottom: scaleVertical(2),
  },
  cardContent: {
    fontFamily: 'CircularStd-Medium',
    fontSize: 15,
  },
});
export default Card;
