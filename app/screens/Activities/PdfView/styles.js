import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../../styles';
import { borderWidth, halfindent } from '../../../styles/dimensions';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: colors.white,
  },
  pdfview: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerStyle: {
    backgroundColor: colors.white,
    borderBottomWidth: borderWidth,
    borderColor: colors.borderColor,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingVertical: halfindent,
  },
  addIcon: {
    marginLeft: halfindent,
  },
  rightIcon: {
    marginRight: halfindent,
  },
});
