import { StyleSheet } from 'react-native';
import { colors, fontWeights } from '../../../styles';
import { doubleIndent, halfindent, indent, lessIndent } from '../../../styles/dimensions';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.rootbg,
  },
  paddingView: {
    paddingHorizontal: indent + 4,
    paddingVertical: doubleIndent,
    flex: 1,
  },
  topWrap: {
    marginBottom: indent + halfindent,
  },
  TitleHead: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'NewSpirit-Regular',
    color: colors.textPrimary,
    lineHeight: 37,
  },
  capsNotification: {
    textAlign: 'center',
    marginTop: indent + lessIndent,
    lineHeight: 22,
    fontWeight: fontWeights.medium,
  },
  notiWrap: {
    paddingTop: indent + halfindent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notiText: {
    fontFamily: 'Navigo-Medium',
    color: colors.textColor,
  },
  btnWrap: {
    marginTop: 'auto',
  },
});
