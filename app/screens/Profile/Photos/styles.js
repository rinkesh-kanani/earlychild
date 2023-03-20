import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../../styles';
import { doubleIndent, halfindent, indent, lessIndent } from '../../../styles/dimensions';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  paddingWrap: {
    paddingLeft: indent,
    paddingRight: indent,
    marginBottom: indent,
  },
  monthText: {
    marginTop: indent + halfindent,
    fontFamily: 'Navigo-Regular',
    color: colors.textColor,
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
    // paddingBottom: halfindent,
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
  EmptyWrap: {
    marginTop: doubleIndent + indent,
  },
  emptyHead: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: colors.textPrimary,
    fontFamily: 'Navigo-Regular',
  },
  emptyCaps: {
    fontFamily: 'Navigo-Regular',
    color: colors.textColor,
    textAlign: 'center',
    width: 263,
    alignSelf: 'center',
    marginTop: halfindent + 2,
  },
  unitmodal: {
    backgroundColor: colors.blackbg,
    flex: 1,
    justifyContent: 'flex-end',
  },
  ImgHead: {
    color: colors.imgTitle,
    fontFamily: 'Navigo-Regular',
  },
  imgDate: {
    color: colors.datecaps,
    fontFamily: 'Navigo-Regular',
  },
  closeWrap: {
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    position: 'absolute',
    right: 18,
    top: 18,
    zIndex: 20,
    ...Platform.select({
      ios: {
        top:45
      },
    }),
  },
  wrapModal: {
    flex: 1,
  },
  viewImg: {
    width: '100%',
  },
  imgTextWrap: {
    marginBottom: indent + lessIndent,
    paddingHorizontal: indent,
  },
  cmrimg: {
    width: 136,
    height: 105,
    alignSelf: 'center',
  },
});
