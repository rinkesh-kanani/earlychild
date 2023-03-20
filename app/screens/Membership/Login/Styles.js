import { StyleSheet, Platform } from 'react-native';
import { colors, fontWeights } from '../../../styles';
import { borderWidth, doubleIndent, halfindent, indent, lessIndent } from '../../../styles/dimensions';

export default StyleSheet.create({
  wrapper: {
    paddingHorizontal: indent,
    backgroundColor: colors.white,
    flex: 1,
  },
  contentBlock: {
    alignItems: 'center',
    padding: doubleIndent,
    marginTop: indent,
  },
  headText: {
    fontWeight: fontWeights.extraBold,
    color: colors.textPrimary,
    marginBottom: indent,
    textAlign: 'center',
  },
  summary: {
    color: colors.dimGray,
    textAlign: 'center',
  },
  signupWrap: {
    marginVertical: indent,
    marginTop: doubleIndent,
  },
  inputWrap: {
    marginTop: indent + halfindent,
  },
  inputRow: {
    position: 'relative',
  },
  btnWrap: {
    marginTop: doubleIndent,
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
  root: {
    backgroundColor: colors.rootbg,
    flex: 1,
  },
  rootStyle: {
    backgroundColor: colors.rootbg,
    flex: 1,
    paddingHorizontal: indent + 4,
  },
  passwordInputStyle: {
    fontFamily: 'Navigo-Medium',
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
  inputStyle: {
    fontFamily: 'Navigo-Regular',
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingHorizontal: indent + 4,
    marginTop: indent,
    ...Platform.select({
      ios: {
        paddingVertical: lessIndent,
      },
    }),
  },
  placeTextColor: {
    color: colors.textColor,
  },
  lockIcon: {
    position: 'absolute',
    left: 16,
    top: 32,
  },
  bmBtn: {
    paddingTop: lessIndent,
    marginBottom: halfindent,
    borderBottomWidth:1,
    borderBottomColor:colors.primary,
    alignSelf:'center'
  },
  linktext: {
    fontFamily: 'Navigo-Medium',
    textAlign: 'center',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 10,
  },
  inputstyle: {
    backgroundColor: colors.white,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    flexGrow: 1,
    paddingLeft: 10,
    fontSize: 15,
    ...Platform.select({
      ios: {
        paddingVertical: indent,
      },
    }),
  },
  countryBoxWrap: {
    backgroundColor: colors.loadingBorder,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconflag: {
    // marginRight: indent,
  },
  buttonWrap: {
    paddingVertical: indent,
  },
  addIcon: {
    marginHorizontal: halfindent,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  forgateView: {
    marginTop: indent,
    borderBottomWidth:1,
    borderBottomColor:colors.primary,
    alignSelf:'center'
  },
  fgpassword: {
    textAlign: 'center',
    fontSize: 10,
    letterSpacing: 1,
    color: colors.primary,
    fontFamily: 'Navigo-Medium',
    textTransform: 'uppercase',
  },
  textNew: {
    marginTop: indent + halfindent + 2,
  },
  newEarly: {
    textAlign: 'center',
    color: colors.textColor,
    fontFamily: 'Navigo-Regular',
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
    borderColor: colors.textColor,
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
