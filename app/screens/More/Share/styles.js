import { StyleSheet } from 'react-native';
import { colors } from '../../../styles';
import { borderWidth, doubleIndent, halfindent, indent, lessIndent } from '../../../styles/dimensions';

export default StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingVertical: halfindent,
  },
  addIcon:{
    marginLeft:halfindent
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
  paddingWrap: {
    paddingHorizontal: indent + 4,
    paddingTop: doubleIndent + indent,
  },
  screenText: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'NewSpirit-Regular',
    color: colors.textColor,
    letterSpacing: 0.16,
  },
  sharCaps: {
    textAlign: 'center',
    fontFamily: 'Navigo-Regular',
    color: colors.textColor,
    marginTop: indent + halfindent,
  },
  btnWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: lessIndent,
    backgroundColor: colors.primary,
    borderRadius: 56,
  },
  btnText: {
    fontFamily: 'Navigo-Regular',
    color: colors.white,
    marginLeft: indent,
  },
  btnContain: {
    marginTop: indent + halfindent,
  },
});
