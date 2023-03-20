import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../styles';
import { doubleIndent, halfindent, indent, lessIndent } from '../../styles/dimensions';
import Typography from '../../styles/Typography';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tabSlide: {
    backgroundColor: colors.extralitePurple,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: indent,
  },
  headerWrap: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: lessIndent,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: halfindent,
  },
  headerRowRight: {
    paddingRight: indent,
  },
  searchWrap: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.borderColor,
  },
  pageTitle: {
    fontFamily: 'NewSpirit-Regular',
    color: colors.textColor,
    marginLeft: halfindent,
  },
  activeWrap: {
    backgroundColor: colors.white,
    paddingVertical: halfindent - 2,
    paddingHorizontal: indent,
    borderRadius: 32,
    marginHorizontal: halfindent,
  },
  activeTab: {
    fontFamily: 'Navigo-Medium',
    fontSize: 10,
    color: colors.black,
    letterSpacing: 1.6,
    lineHeight: 11,
    textTransform: 'uppercase',
  },
  unactiveWrap: {
    backgroundColor: colors.darkbrown,
    paddingVertical: halfindent - 2,
    paddingHorizontal: indent,
    borderRadius: 32,
    marginHorizontal: halfindent,
  },
  unactiveTab: {
    fontFamily: 'Navigo-Medium',
    fontSize: 10,
    color: colors.black,
    letterSpacing: 1.6,
    lineHeight: 11,
    textTransform: 'uppercase',
  },
  articleListWrap: {
    paddingHorizontal: indent,
    paddingTop: indent - 6,
    flex: 1,
  },
  Tag: {
    fontFamily: 'Navigo-Regular',
    color: colors.textColor,
    marginBottom: halfindent + 2,
  },
  wrapCard: {
    marginBottom: doubleIndent,
  },
  boxShadow: {
    backgroundColor: colors.white,
    borderRadius: 8,
    shadowColor: colors.cardboxshadow,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    elevation: 19,
  },
  imgWrap: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardWrap: {
    paddingHorizontal: indent + halfindent,
    paddingVertical: indent,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: -24,
  },
  imgArticles: {
    width: '100%',
    height: 240,
    borderRadius: 8,
  },
  smallTitle: {
    fontFamily: 'Navigo-Medium',
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1,
    color: colors.textPrimary,
    textTransform: 'uppercase',
  },
  titleArticles: {
    fontFamily: 'NewSpirit-Regular',
    color: colors.textColor,
    marginTop: halfindent / 2,
  },
  linkTag: {
    fontFamily: 'Navigo-Medium',
    fontSize: 10,
    textTransform: 'uppercase',
    color: colors.primary,
    letterSpacing: 1,
    marginTop: halfindent,
  },
  leftbmborder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    alignSelf: 'flex-start',
  },
  paddingWrap: {
    padding: indent,
  },
  imgArticlesDetail: {
    width: '100%',
    height: 207,
    borderRadius: 8,
  },
  imgName: {
    fontFamily: 'Navigo-Medium',
    fontSize: 10,
    marginTop: indent,
    color: colors.textPrimary,
    letterSpacing: 1,
  },
  detailWrap: {
    marginTop: halfindent,
  },
  detailTitle: {
    fontFamily: 'NewSpirit-Regular',
    color: colors.textColor,
    fontSize: 22,
    lineHeight: 28,
  },
  descriptionWrap: {
    paddingTop: halfindent,
    marginTop: halfindent,
  },
  tagsStyles: {
    p: {
      fontFamily: 'Navigo-Regular',
      color: colors.textColor,
      fontSize: 14,
      lineHeight: 22,
    },
  },
  blogText: {
    color: colors.textColor,
    fontFamily: 'Navigo-Regular',
  },
  searchview: {
    backgroundColor: colors.white,
    paddingHorizontal: halfindent,
    ...Platform.select({
      ios: {
        paddingHorizontal: 0,
      },
    }),
  },
  searchflex: {
    flex: 1,
  },
  searchicon: {
    color: colors.textColor,
  },
  searchbarStyle: {
    padding: indent,
  },
  inputRow: {
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: 16,
    ...Platform.select({
      ios: {
        left: 16,
        top: 11,
      },
    }),
  },
  cancelIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    ...Platform.select({
      ios: {
        right: 16,
        top: 11,
      },
    }),
  },
  inputstyle: {
    fontFamily: 'Navigo-Regular',
    backgroundColor: colors.white,
    borderRadius: 56,
    borderWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: colors.greyborder,
    paddingLeft: doubleIndent + indent,
    paddingRight: doubleIndent + indent,
    ...Platform.select({
      ios: {
        paddingVertical: 11,
      },
    }),
  },
  searchInput: {
    borderRadius: 0,
    borderColor: colors.transparent,
    borderBottomColor: colors.transparent,
    backgroundColor: colors.transparent,
    borderTopColor: colors.transparent,
  },
  searchInputTextStyle: {
    ...Typography.body,
    color: colors.black,
    marginHorizontal: 0,
    paddingVertical: 0,
  },
  righticon: {},
  iconClear: {
    color: colors.grey,
  },
});
