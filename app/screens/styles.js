import { StyleSheet } from 'react-native';
import { colors, fontWeights } from '../styles';
import { doubleIndent, halfindent, indent, lessIndent } from '../styles/dimensions';
import { scaleVertical } from '../utils/scale';

export default StyleSheet.create({
  mainView: {
    backgroundColor: colors.white,
    flexDirection: 'column',
    flex: 1,
  },
  rootStyle: {
    flex: 1,
    backgroundColor: colors.statusbar,
  },
  rootBg: {
    backgroundColor: colors.white,
  },
  WelWrap: {
    flex: 1,
  },
  logoImg: {
    width: '100%',
    height: scaleVertical(470),
  },
  appLogo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginTop: -30,
  },
  textLogo: {
    marginTop: halfindent,
    alignSelf: 'center',
    paddingHorizontal: doubleIndent,
  },
  welText: {
    color: colors.textPrimary,
    fontWeight: fontWeights.extraBold,
    textAlign: 'center',
  },
  capsText: {
    textAlign: 'center',
    color: colors.textColor,
    marginTop: lessIndent,
  },
  btnStyle: {
    marginHorizontal: indent,
    marginBottom: halfindent,
  },
  btnTextStyle: {
    textTransform: 'uppercase',
    fontWeight: fontWeights.extraBold,
  },
  rootSplace: {
    flex: 1,
    backgroundColor: colors.splacebg,
  },
  iconWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  earlyIcon: {},
});
