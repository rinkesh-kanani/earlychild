import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../../styles';
import { borderWidth, doubleIndent, halfindent, indent, lessIndent } from '../../../styles/dimensions';
import Typography from '../../../styles/Typography';

export default StyleSheet.create({
  root: {
    backgroundColor: colors.rootbg,
    flex: 1,
  },
  headerRow: {
    paddingLeft: halfindent,
  },
  paddingWrap: {
    padding: indent + 4,
  },
  topWrapper: {
    paddingTop: doubleIndent,
  },
  paddingTop: {
    paddingTop: 7,
  },
  wrapProfile: {
    flex: 1,
    backgroundColor: colors.rootbg,
  },
  titleText: {
    fontSize: 30,
    lineHeight: 38,
    textAlign: 'center',
    color: colors.textPrimary,
    letterSpacing: 0.16,
    fontFamily: 'NewSpirit-Regular',
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: doubleIndent,
    alignSelf: 'center',
    paddingLeft: 22,
  },
  activeStep: {
    width: 28,
    height: 28,
    backgroundColor: colors.bgstep,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  unactiveStep: {
    width: 28,
    height: 28,
    backgroundColor: colors.bgstep,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    fontFamily: 'Navigo-Bold',
    color: colors.primary,
    letterSpacing: 1.6,
    fontSize: 10,
    lineHeight: 14,
    marginTop: halfindent,
    textTransform: 'uppercase',
  },
  nonstepText: {
    fontFamily: 'Navigo-Bold',
    color: colors.textColor,
    letterSpacing: 1.6,
    fontSize: 10,
    lineHeight: 14,
    marginTop: halfindent,
    textTransform: 'uppercase',
    opacity: 0.7,
  },
  activeText: {
    fontFamily: 'Navigo-Bold',
    color: colors.primary,
    fontSize: 10,
    lineHeight: 14,
  },
  unactiveText: {
    fontFamily: 'Navigo-Bold',
    color: colors.textColor,
    fontSize: 10,
    lineHeight: 14,
  },
  dividerLeft: {
    borderTopWidth: borderWidth,
    width: 60,
    borderColor: colors.textColor,
    position: 'relative',
    top: -10,
    marginLeft: lessIndent,
  },
  dividerRight: {
    borderTopWidth: borderWidth,
    width: 60,
    borderColor: colors.textColor,
    position: 'relative',
    top: -10,
  },
  wrapCenter: {
    alignItems: 'center',
  },
  bottmWrap: {
    paddingTop: doubleIndent,
  },
  imgWrap: {
    alignSelf: 'center',
  },
  profileWrap: {
    width: 91,
    height: 91,
    backgroundColor: colors.litePurple,
    borderWidth: borderWidth,
    borderColor: colors.borderColor,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  addimg: {
    width: 30,
    height: 30,
    backgroundColor: colors.white,
    borderRadius: 50,
    position: 'absolute',
    right: 0,
    bottom: -5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  inputWrap: {
    paddingTop: halfindent - 2,
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
    fontFamily: 'Navigo-Regular',
    color: colors.textColor,
    opacity: 0.8,
  },
  btnwrap: {
    paddingTop: doubleIndent + halfindent,
  },
  btnText: {
    fontFamily: 'Navigo-Regular',
    ...Typography.bodyHead,
  },
  dateWrap: {
    paddingTop: indent,
  },
  radioWrap: {
    paddingTop: indent,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bornText: {
    marginLeft: lessIndent,
    fontFamily: 'Navigo-Regular',
    color: colors.textColor,
    opacity: 0.8,
  },
  cardWrap: {
    paddingTop: indent + halfindent,
  },
  cardList: {
    paddingVertical: lessIndent,
    paddingLeft: lessIndent,
    paddingRight: indent,
    borderRadius: 8,
    marginTop: lessIndent,
  },
  profileImg: {
    width: 56,
    height: 56,
    borderRadius: 50,
  },
  childName: {
    fontFamily: 'NewSpirit-Regular',
    color: colors.textColor,
    lineHeight: 25,
  },
  years: {
    fontFamily: 'NewSpirit-Regular',
    color: colors.greylite,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWrap: {
    paddingLeft: lessIndent,
  },
  addWrapper: {
    paddingTop: indent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBg: {
    width: 37,
    height: 37,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 25,
  },
  addChild: {
    color: colors.primary,
    fontFamily: 'Navigo-Regular',
    marginLeft: lessIndent,
  },
});
