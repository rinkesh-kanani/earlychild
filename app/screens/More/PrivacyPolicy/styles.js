import { StyleSheet } from 'react-native';
import { colors } from '../../../styles';
import { borderWidth, halfindent, indent, lessIndent } from '../../../styles/dimensions';

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
  addIcon: {
    marginLeft: indent,
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
    paddingHorizontal: indent,
    paddingTop: indent,
    marginBottom: indent,
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
