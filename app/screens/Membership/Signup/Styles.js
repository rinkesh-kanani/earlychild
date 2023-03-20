import { Platform, StyleSheet } from 'react-native';
import { WIN_HEIGHT } from '../../../constants/constant';
import { colors } from '../../../styles';
import { borderWidth, doubleIndent, halfindent, indent, lessIndent } from '../../../styles/dimensions';
import { scale, scaleVertical } from '../../../utils/scale';

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
    paddingHorizontal: indent + 4,
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
  termCondition: {
    color: colors.textColor,
    textAlign: 'center',
    fontFamily: 'Navigo-Regular',
  },
  termLink: {
    color: colors.primary,
    textAlign: 'center',
    fontFamily: 'Navigo-Regular',
  },
  privacyCondition: {},
  btnWrap: {
    marginTop: doubleIndent,
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
  rowTerms: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: halfindent,
  },
  //InfoModal
  modal: {
    backgroundColor: colors.transparent,
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalInfoWrap: {
    paddingBottom: doubleIndent,
    marginTop: doubleIndent,
  },
  keyBord: {
    flex: 1,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.transparent,
  },
  closeModal: {
    flex: 1,
  },
  rectView: {
    width: 50,
    height: 5,
    alignSelf: 'center',
    backgroundColor: colors.backgroundColor,
    opacity: 0.8,
    borderRadius: 25,
    marginBottom: scaleVertical(8),
  },
  modalBox: {
    paddingHorizontal: indent,
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    borderTopLeftRadius: lessIndent,
    borderTopRightRadius: lessIndent,
    position: 'relative',
    maxHeight: WIN_HEIGHT - scale(85),
  },
  closeIcon: {
    position: 'absolute',
    top: 4,
    right: 8,
    zIndex: 5,
  },
  TextHead: {
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: 0.16,
    color: colors.black,
    fontFamily: 'NewSpirit-Regular',
    marginBottom: halfindent,
  },
  point: {
    fontFamily: 'Navigo-Regular',
    color: colors.textColor,
    marginBottom: lessIndent,
  },
  details: {
    color: colors.textColor,
    fontFamily: 'Navigo-Regular',
  },
});
