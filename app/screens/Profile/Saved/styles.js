import { StyleSheet } from 'react-native';
import { colors } from '../../../styles';
import { halfindent, indent, lessIndent } from '../../../styles/dimensions';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  paddingWrap: {
    paddingHorizontal: lessIndent,
    marginVertical: indent,
  },
  cardList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: lessIndent,
    margin: -8,
  },
  rowcards: {
    width: '100%',
    maxWidth: '50%',
    minWidth: '50%',
    flex: 1,
    padding: halfindent,
  },
  cardItem: {
    paddingBottom: halfindent,
  },
  imgView: {
    backgroundColor: colors.bgimg,
    borderRadius: 8,
  },
  ImgList: {
    width: '100%',
    height: 160,
    // resizeMode: 'contain',
    borderRadius: 8,
  },
  darkText: {
    fontFamily: 'NewSpirit-Regular',
    color: colors.black,
    marginTop: halfindent,
  },
  emptyWrap: {
    marginTop: indent,
  },
  emptyImg: {
    width: 115,
    height: 115,
    alignSelf: 'center',
  },
  emptycaps: {
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: lessIndent,
    color: colors.textColor,
    fontFamily: 'Navigo-Regular',
  },
});
