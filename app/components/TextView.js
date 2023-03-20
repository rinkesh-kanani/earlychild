import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
import { fontSizes, colors } from '../styles';
import Typography from '../styles/Typography';
import { indent, lessIndent } from '../styles/dimensions';

const TextView = ({ style, text, type, color, numberOfLines, isTextColorWhite = false, ...props }) => {
  let textStyle = [style];
  let textValue = text;
  if (type === 'form-label') {
    textStyle.push(s.inputLabel);
  } else if (type === 'head-line') {
    textStyle.push(s.headLine);
  } else if (type === 'header') {
    textStyle.push(s.header);
  } else if (type === 'title') {
    textStyle.push(s.title);
  } else if (type === 'sub-title') {
    textStyle.push(s.subTitle);
  } else if (type === 'body') {
    textStyle.push(s.body);
  } else if (type === 'body-head') {
    textStyle.push(s.bodyHead);
  } else if (type === 'body-one') {
    textStyle.push(s.bodyOne);
  } else if (type === 'body-two') {
    textStyle.push(s.bodyTwo);
  } else if (type === 'caption') {
    textStyle.push(s.caption);
  } else if (type === 'caption-two') {
    textStyle.push(s.captionTwo);
  } else if (type === 'caps') {
    textStyle.push(s.caps);
  } else if (type === 'caps-one') {
    textStyle.push(s.capsOne);
  } else if (type === 'small-caps') {
    textStyle.push(s.smallCaps);
  } else if (type === 'form-title') {
    textStyle.push(s.formTitle);
    if (text) {
      textValue = Platform.OS === 'android' ? text : text.toUpperCase();
    }
  } else if (type === 'select-input') {
    textStyle.push(s.SelctInputValue);
  } else if (type === 'card-title') {
    textStyle.push(s.cardTitle);
  } else if (type === 'button-text') {
    textStyle.push(s.buttonText);
  } else if (type === 'Highlight-text') {
    textStyle.push(s.HighlightText);
  } else if (type === 'Badge-Text') {
    textStyle.push(s.BadgeText);
  }

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[textStyle, color ? { color: color } : undefined, isTextColorWhite ? { color: colors.white } : {}, style]}
      {...props}>
      {textValue}
    </Text>
  );
};
const s = StyleSheet.create({
  inputLabel: {
    ...Typography.body,
    minWidth: 110,
    maxWidth: '50%',
    marginRight: 5,
  },
  formTitle: {
    marginBottom: Platform.OS === 'ios' ? 6 : 12,
    ...Platform.select({
      android: {
        fontSize: fontSizes.bodyOne,
        color: colors.theme,
      },
      ios: {
        ...Typography.footNote,
        color: colors.gray,
        marginLeft: indent,
        paddingTop: lessIndent,
      },
    }),
  },
  buttonText: {
    ...Platform.select({
      android: {
        fontSize: fontSizes.bodyOne,
        color: colors.white,
      },
      ios: {
        ...Typography.body,
        color: colors.theme,
      },
      textAlign: 'center',
      textAlignVertical: 'center',
    }),
  },
  SelctInputValue: {
    ...Typography.body,
    color: colors.gray,
    textAlign: 'right',
  },
  HighlightText: {
    ...Platform.select({
      android: {
        fontSize: fontSizes.veryverySmall,
        color: colors.white,
      },
      ios: {
        ...Typography.subHead,
        color: colors.gray,
      },
    }),
  },
  BadgeText: {
    ...Platform.select({
      android: {
        fontSize: fontSizes.bodyOne,
        lineHeight: 20,
        color: colors.blackHalfOpacity,
      },
      ios: {
        ...Typography.footNote,
        color: colors.darkGrey,
      },
    }),
  },
  cardTitle: {
    ...Platform.select({
      android: {
        fontSize: fontSizes.small,
        lineHeight: 16,
        color: colors.theme,
      },
      ios: {
        ...Typography.headline,
      },
    }),
  },
  title: {
    ...Typography.title,
  },
  headLine: {
    ...Typography.headline,
  },
  header: {
    ...Typography.header,
  },
  body: {
    ...Typography.body,
  },
  bodyHead: {
    ...Typography.bodyHead,
  },
  bodyOne: {
    ...Typography.bodyOne,
  },
  bodyTwo: {
    ...Typography.bodyTwo,
  },
  caption: {
    ...Typography.caption,
  },
  captionTwo: {
    ...Typography.captionTwo,
  },
  caps: {
    ...Typography.caps,
  },
  capsOne: {
    ...Typography.capsOne,
  },
  smallCaps: {
    ...Typography.smallCaps,
  },
  subTitle: {
    ...Typography.subTitle,
  },
});
export default TextView;
