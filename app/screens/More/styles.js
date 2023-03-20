import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../styles';
import { borderWidth, doubleIndent, halfindent, indent } from '../../styles/dimensions';

export default StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: indent,
  },
  headerStyle: {
    backgroundColor: colors.white,
    borderBottomWidth: borderWidth,
    borderColor: colors.borderColor,
    height: 80,
    ...Platform.select({
      ios: {
        height: 110,
      },
    }),
  },
  headerText: {
    fontFamily: 'NewSpirit-Regular',
    color: colors.textColor,
  },
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  leftText: {
    fontFamily: 'Navigo-Medium',
    color: colors.textColor,
  },
  moreWrap: {
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
    padding: indent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logWrap: {
    marginTop: doubleIndent,
    paddingHorizontal: indent + 4,
  },
  logText: {
    alignItems: 'center',
  },
  loggText: {
    fontFamily: 'Navigo-Medium',
    color: colors.textColor,
  },
  emailText: {
    fontFamily: 'Navigo-Regular',
    color: colors.textColor,
    marginTop: halfindent,
  },
  btnWrap: {
    marginTop: indent + halfindent,
  },
});
