import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../../styles';
import { borderWidth, doubleIndent, halfindent, indent, lessIndent } from '../../../styles/dimensions';

export default StyleSheet.create({
  headerRow: {
    paddingLeft: halfindent,
  },
  rootStyle: {
    backgroundColor: colors.rootbg,
    flex: 1,
    paddingHorizontal: indent + 4,
  },
  signupWrap: {
    marginVertical: indent,
  },
  titleText: {
    fontSize: 30,
    lineHeight: 38,
    textAlign: 'center',
    color: colors.textPrimary,
    letterSpacing: 0.16,
    fontFamily: 'NewSpirit-Regular',
  },
  inputStyle: {
    fontFamily: 'Navigo-Regular',
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingLeft: doubleIndent + indent,
    paddingRight: indent,
    marginTop: indent,
    ...Platform.select({
      ios: {
        paddingVertical: lessIndent,
      },
    }),
  },
  inputWrap: {
    marginTop: indent + halfindent,
  },
  inputRow: {
    position: 'relative',
  },
  placeTextColor: {
    color: colors.textColor,
    fontFamily: 'Navigo-Regular',
    opacity: 0.4,
  },
  lockIcon: {
    position: 'absolute',
    left: 16,
    top: 32,
  },
  termCondition: {
    color: colors.textColor,
    textAlign: 'center',
    fontFamily: 'Navigo-Regular',
    marginTop: halfindent,
  },
  btnWrap: {
    marginTop: doubleIndent,
    marginBottom: indent,
  },
  bottomWrap: {
    marginTop: 'auto',
    marginBottom: indent,
  },
  dividerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: indent + 4,
  },
  divider: {
    borderTopWidth: borderWidth,
    borderColor: colors.borderColor,
    width: 142,
  },
  orText: {
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    fontFamily: 'Navigo-Medium',
    fontSize: 10,
    color: colors.textColor,
    paddingHorizontal: lessIndent,
  },
  fbBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.fbBtn,
    borderRadius: 56,
    paddingVertical: lessIndent,
    marginBottom: lessIndent,
  },
  gBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gBtn,
    borderRadius: 56,
    paddingVertical: lessIndent,
    marginBottom: lessIndent,
  },
  apBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
    borderRadius: 56,
    paddingVertical: lessIndent,
    marginBottom: lessIndent,
  },
  btnText: {
    fontFamily: 'Navigo-Regular',
    color: colors.white,
    marginLeft: lessIndent,
  },
});
