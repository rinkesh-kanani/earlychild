import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../../../styles';
import { borderWidth, doubleIndent, halfindent, indent, lessIndent } from '../../../../styles/dimensions';
import Typography from '../../../../styles/Typography';

export default StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingVertical: halfindent,
  },
  addIcon: {
    marginLeft: halfindent,
  },
  headerStyle: {
    backgroundColor: colors.white,
    borderBottomWidth: borderWidth,
    borderColor: colors.borderColor,
  },
  headerText: {
    fontFamily: 'Navigo-Medium',
    textAlign: 'center',
    color: colors.textColor,
    marginRight: indent + halfindent,
  },
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  rootStyle: {
    backgroundColor: colors.white,
    flex: 1,
    // paddingHorizontal: indent + 4,
    paddingLeft: indent + 4,
    paddingRight: indent + halfindent + 1,
    paddingTop: indent,
  },
  titleText: {
    fontSize: 30,
    lineHeight: 38,
    textAlign: 'center',
    color: colors.textPrimary,
    letterSpacing: 0.16,
    fontFamily: 'NewSpirit-Regular',
    marginTop: indent,
  },
  signupWrap: {
    marginVertical: indent,
    marginTop: doubleIndent,
  },
  inputWrap: {
    marginTop: indent,
    overflow: 'hidden',
    borderColor: colors.inputBorder,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
  },
  inputStyle: {
    ...Typography.bodyTwo,
    lineHeight: 22,
    marginTop: 0,
    paddingVertical: 0,
    paddingHorizontal: indent - 4,
    fontFamily: 'Navigo-Regular',
    backgroundColor: colors.white,
    color: colors.textColor,
    ...Platform.select({
      ios: {
        paddingVertical: 2,
      },
    }),
  },
  btnWrap: {
    marginTop: doubleIndent + indent,
  },
  linktext: {
    fontFamily: 'Navigo-Medium',
    textAlign: 'center',
    color: colors.primary,
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 16,
  },
  bmBtn: {
    padding: lessIndent,
    marginBottom: halfindent,
  },
  btnwrap: {
    paddingTop: doubleIndent + halfindent,
  },
  btnText: {
    fontFamily: 'Navigo-Regular',
    ...Typography.bodyHead,
  },
  inputTheme: {
    roundness: 8,
  },
  inputlabel: {
    fontSize: 10,
    fontFamily: 'Navigo-Regular',
    paddingHorizontal: indent - 4,
    lineHeight: 14,
    color: colors.placeholder,
  },
});
