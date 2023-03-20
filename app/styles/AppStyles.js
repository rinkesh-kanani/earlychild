import { Platform, StyleSheet } from 'react-native';
import { scale, scaleVertical } from '../utils/scale';
import colors from './colors';
import { borderRadius, borderWidth, halfindent, indent, lessIndent } from './dimensions';
import fontWeights from './fontWeights';
import Typography from './Typography';

const AppStyles = StyleSheet.create({
  rootStyle: {
    flex: 1,
  },
  root: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: indent,
    paddingHorizontal: indent,
  },
  rootLoading: {
    flex: 1,
    backgroundColor: colors.transparent,
    paddingVertical: indent,
    paddingHorizontal: indent,
  },
  rootbg: {
    backgroundColor: colors.white,
  },
  containerView: {
    paddingTop: indent,
    paddingHorizontal: indent,
  },
  HzSpacing: {
    paddingHorizontal: indent,
  },
  errorMsg: {
    ...Typography.bodyTwo,
    color: colors.error,
    marginTop: halfindent,
    textAlign: 'center',
    justifyContent: 'center',
  },
  successMsg: {
    ...Typography.bodyTwo,
    color: colors.success,
    marginTop: halfindent,
    textAlign: 'center',
    justifyContent: 'center',
  },
  // Header Style
  headerStyle: {
    backgroundColor: colors.white,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    height: 80,
    ...Platform.select({
      ios: {
        height: 120,
      },
    }),
  },
  milesRowHeader: {
    backgroundColor: colors.white,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0.5,
    borderColor: colors.cardBorder,
    height: 80,
    ...Platform.select({
      ios: {
        height: 120,
      },
    }),
  },
  headerStyleLast: {
    backgroundColor: colors.white,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerScroll: {
    backgroundColor: colors.white,
    // shadowOpacity: 0,
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
  },
  hederTwoStyle: {
    backgroundColor: colors.rootbg,
  },
  headerTitleStyle: {
    ...Typography.headline,
    fontWeight: fontWeights.extraBold,
    color: colors.textColor,
    textAlign: 'center',
    fontFamily: 'Navigo-Medium',
  },
  headerTitleTwo: {
    fontFamily: 'Navigo-Medium',
    textAlign: 'center',
    color: colors.textColor,
    ...Typography.bodyOne,
  },
  settingHeader: {
    ...Typography.bodyOne,
    color: colors.textColor,
    textAlign: 'center',
    fontFamily: 'Navigo-Medium',
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexCenter: {
    textAlign: 'center',
    flex: 1,
  },
  headerButtonCover: {
    marginRight: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.transparent,
    paddingVertical: scale(halfindent - 2),
    paddingHorizontal: scale(lessIndent),
  },
  headerButtonText: {
    ...Typography.caption,
    fontWeight: fontWeights.bold,
    color: colors.primary,
    marginRight: halfindent,
  },
  headerButtonIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingTop: 2,
  },
  footerWrapper: {
    paddingHorizontal: scale(16),
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingTop: scaleVertical(lessIndent),
    paddingBottom: scaleVertical(indent + lessIndent),
    shadowColor: colors.borderColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 24,
    borderWidth: borderWidth,
    borderColor: colors.borderColorOpacity,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
  },
  diablePrimaryButton: {
    backgroundColor: colors.disableColor,
    color: colors.borderColor,
  },
  buttonStyle: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
    marginHorizontal: scale(6),
    paddingVertical: scaleVertical(14),
  },
  buttonText: {
    ...Typography.bodyOne,
    fontWeight: fontWeights.extraBold,
    textTransform: 'uppercase',
  },
  backbtn: {
    backgroundColor: colors.secondarybtn,
    marginTop: indent,
  },
  backbtnText: {
    color: colors.textColor,
    ...Typography.bodyHead,
    fontFamily: 'Navigo-Regular',
  },
  buttonRegular: {
    fontFamily: 'Navigo-Regular',
    ...Typography.bodyHead,
    color: colors.white,
  },
});

export default AppStyles;
