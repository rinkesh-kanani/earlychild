import { StyleSheet } from 'react-native';
import { colors } from '../../../styles';
import { borderWidth, halfindent, indent } from '../../../styles/dimensions';

export default StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingVertical: halfindent,
  },
  headerStyle: {
    backgroundColor: colors.white,
    borderBottomWidth: borderWidth,
    borderColor: colors.borderColor,
  },
  addIcon:{
    marginLeft:indent
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
    paddingTop: indent,
    marginBottom: indent,
  },
  blockWrap: {
    padding: indent,
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
  },
  helpHead: {
    fontFamily: 'NewSpirit-Regular',
    fontSize: 20,
    letterSpacing: 0.16,
    color: colors.black,
    marginBottom: indent,
  },
  helpCaps: {
    fontFamily: 'Navigo-Regular',
    color: colors.textColor,
  },
});
