import { Platform, StyleSheet } from 'react-native';
import { WIN_HEIGHT } from '../../constants/constant';
import { colors } from '../../styles';
import { doubleIndent, halfindent, indent, lessIndent } from '../../styles/dimensions';
import Typography from '../../styles/Typography';
import { scale, scaleVertical } from '../../utils/scale';

export default StyleSheet.create({
  headerWrap: {
    paddingTop: 26,
    backgroundColor: colors.white,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: halfindent,
    backgroundColor: colors.white,
    // paddingBottom: indent,
    // paddingTop: halfindent,
  },
  headerRowRight: {
    paddingRight: indent,
    paddingBottom: indent,
    paddingTop: indent,
  },
  headerIcon: {
    paddingRight: halfindent,
  },
  searchWrap: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.borderColor,
  },
  pageTitle: {
    fontFamily: 'NewSpirit-Regular',
    fontSize: 28,
    color: colors.textColor,
    marginLeft: halfindent,
  },
  headerText: {
    fontFamily: 'NewSpirit-Regular',
    color: colors.textColor,
  },
  expBack: {
    ...Platform.select({
      ios: {
        marginRight: lessIndent,
      },
    }),
  },
  root: {
    backgroundColor: colors.white,
    flex: 1,
  },
  searchMainWrap: {
    marginTop: indent,
    marginBottom: indent + halfindent - 2,
  },
  searchflex: {
    flex: 1,
    paddingVertical: indent,
  },
  searchicon: {
    color: colors.textColor,
  },
  inputstyle: {
    backgroundColor: colors.rootbg,
    borderRadius: 8,
    borderColor: colors.greyborder,
    marginHorizontal: halfindent,
  },
  searchInput: {
    borderRadius: 0,
    borderColor: colors.transparent,
    borderBottomColor: colors.transparent,
    backgroundColor: colors.transparent,
    borderTopColor: colors.transparent,
  },
  searchInputTextStyle: {
    fontFamily: 'Navigo-Regular',
    ...Typography.body,
    color: colors.textColor,
    marginHorizontal: 0,
    paddingVertical: 0,
  },
  ActivitisWrap: {
    marginTop: indent,
  },
  ActivitisWrapone: {
    marginBottom: doubleIndent + 2,
  },
  ActivitisWrapTwo: {
    // marginTop: doubleIndent,
  },
  activityTitle: {
    fontFamily: 'NewSpirit-Regular',
    color: colors.textColor,
    letterSpacing: 0.16,
  },
  moreWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewState: {
    fontFamily: 'Navigo-Regular',
    color: colors.textColor,
    fontSize: 14,
  },
  labelActivity: {
    marginBottom: lessIndent,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: indent,
  },
  labelActivityTwo: {
    // marginBottom: lessIndent,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: indent,
    justifyContent: 'space-between',
  },
  //scroll list
  imgSecWrap: {
    flexDirection: 'row',
    marginHorizontal: halfindent,
  },
  wrapColumImg: {
    marginHorizontal: halfindent,
  },
  imgWrap: {
    width: 134,
    height: 132,
    backgroundColor: colors.bgimg,
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  imgRow: {
    borderRadius: 8,
    width: 134,
    height: 132,
  },
  imgText: {
    fontFamily: 'NewSpirit-Regular',
    color: colors.textColor,
    marginTop: halfindent / 2,
    width: 136,
  },
  imgLabel: {
    width: 16,
    height: 16,
    backgroundColor: colors.blackbtn,
    borderRadius: 2,
    position: 'absolute',
    right: 6,
    top: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconOpa: {
    opacity: 1,
  },
  selectIconActivity: {
    position: 'absolute',
    top: 6,
    left: 6,
  },
  labelWrap: {
    backgroundColor: colors.yellowcm,
    borderRadius: 32,
    paddingHorizontal: lessIndent,
    paddingVertical: halfindent / 2,
    marginLeft: lessIndent,
  },
  labelTag: {
    fontFamily: 'Navigo-Medium',
    fontSize: 8,
    letterSpacing: 0.8,
    color: colors.black,
  },
  browseWrap: {
    marginTop: doubleIndent + 4,
  },
  subRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  subMainWrap: {
    marginTop: indent + 2,
    flexBasis: 1,
    width: 62,
    marginHorizontal: 6,
  },
  centerSub: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  subjectImg: {
    width: 48,
    height: 48,
  },
  imgName: {
    fontFamily: 'Navigo-Medium',
    marginTop: halfindent,
    fontSize: 11,
    textTransform: 'capitalize',
    textAlign: 'center',
    lineHeight: 13,
    color: colors.subject,
  },
  theamWrap: {
    marginTop: doubleIndent + 4,
  },
  paddingTheam: {
    paddingHorizontal: indent,
  },
  cardList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: halfindent / 2,
    margin: -8,
  },
  rowcards: {
    width: '100%',
    maxWidth: '50%',
    minWidth: '50%',
    flex: 1,
    padding: halfindent,
  },
  cardBg: {
    // paddingVertical: indent,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 6,
  },
  textTheamWrap: {
    backgroundColor: colors.balckOpacity,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  theamImg: {
    width: '100%',
    height: 97,
    borderRadius: 6,
  },
  themesText: {
    fontFamily: 'Navigo-Regular',
    color: colors.white,
  },
  rootpadding: {
    paddingBottom: indent,
    flex: 1,
  },
  //Explore activity
  headSearchWrap: {
    paddingHorizontal: indent,
    paddingBottom: indent,
    paddingTop: indent,
    borderBottomWidth: 1,
    borderColor: colors.borderSecond,
  },
  searchflexTwo: {
    flex: 1,
  },
  inputstyleTwo: {
    backgroundColor: colors.white,
    borderRadius: 56,
    borderWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: colors.greyborder,
  },
  searchInputTextStyleTwo: {
    fontFamily: 'Navigo-Regular',
    ...Typography.body,
    color: colors.textColor,
    marginHorizontal: 0,
    paddingVertical: 0,
    flexGrow: 1,
  },
  searchInputTwo: {
    flexGrow: 1,
    borderRadius: 0,
    borderColor: colors.transparent,
    borderBottomColor: colors.transparent,
    backgroundColor: colors.transparent,
    borderTopColor: colors.transparent,
    paddingLeft: 0,
    paddingRight: indent,
    paddingVertical: 0,
  },
  IconSearch: {
    marginLeft: 2,
  },
  rowSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shortByView: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRadius: 50,
    borderColor: colors.greyborder,
  },
  rowFilterWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: indent,
  },
  filterWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreIcon: {
    marginTop: 3,
    marginLeft: halfindent,
  },
  resultText: {
    fontFamily: 'Navigo-Regular',
    color: colors.textColor,
  },
  exploreRoot: {
    flex: 1,
  },
  scrollSpace: {
    paddingVertical: indent,
  },
  wrapWorkCard: {
    marginBottom: doubleIndent,
    marginHorizontal: indent,
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
  imgWrapCard: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  imgVideo: {
    width: '100%',
    height: 240,
    borderRadius: 8,
  },
  selectIcon: {
    position: 'absolute',
    left: 8,
    top: 8,
  },
  cardWrap: {
    paddingLeft: indent + halfindent,
    paddingRight: indent,
    paddingVertical: indent,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: -24,
  },
  smallTitle: {
    fontFamily: 'Navigo-Medium',
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1,
    color: colors.greylast,
    textTransform: 'uppercase',
  },
  titleArticles: {
    fontFamily: 'NewSpirit-Regular',
    color: colors.black,
    marginTop: halfindent / 2,
  },
  wrapLast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: halfindent,
    flexWrap: 'wrap',
  },
  tagWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: halfindent,
  },
  labelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  labelList: {
    paddingHorizontal: lessIndent,
    paddingVertical: halfindent / 2,
    backgroundColor: colors.greenTag,
    borderRadius: 32,
  },
  todayTag: {
    fontFamily: 'Navigo-Medium',
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: colors.black,
    textAlign: 'center',
  },
  todayTagTwo: {
    fontFamily: 'Navigo-Medium',
    fontSize: 10,
    lineHeight: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.black,
    textAlign: 'center',
  },
  labelcard: {
    paddingHorizontal: lessIndent,
    paddingVertical: halfindent / 2,
    borderRadius: 32,
  },
  artTag: {
    fontFamily: 'Navigo-Medium',
    paddingHorizontal: lessIndent,
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    backgroundColor: colors.linearPurple,
    borderRadius: 32,
    paddingVertical: halfindent / 2,
    color: colors.black,
    textAlign: 'center',
  },
  socialTag: {
    fontFamily: 'Navigo-Regular',
    paddingHorizontal: lessIndent,
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    backgroundColor: colors.cream,
    borderRadius: 32,
    paddingVertical: halfindent / 2,
    color: colors.black,
    textAlign: 'center',
  },
  labelWrapExplore: {
    position: 'absolute',
    backgroundColor: colors.white,
    paddingHorizontal: halfindent + 2,
    paddingVertical: halfindent / 2,
    borderRadius: 32,
    right: 9,
    top: 8,
  },
  labelText: {
    fontSize: 8,
    fontFamily: 'Navigo-Medium',
    letterSpacing: 1.6,
    color: colors.black,
  },
  //Modal
  modal: {
    backgroundColor: colors.transparent,
    flex: 1,
    justifyContent: 'flex-end',
  },
  keyBord: {
    flex: 1,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.transparent,
  },
  closeModal: {
    flex: 1,
  },
  rectView: {
    width: 50,
    height: 5,
    alignSelf: 'center',
    backgroundColor: colors.backgroundColor,
    opacity: 0.8,
    borderRadius: 25,
    marginBottom: scaleVertical(8),
  },
  modalBox: {
    paddingHorizontal: scale(indent),
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    borderTopLeftRadius: lessIndent,
    borderTopRightRadius: lessIndent,
    position: 'relative',
    maxHeight: WIN_HEIGHT - scale(85),
  },
  paddingModal: {
    paddingHorizontal: indent + halfindent,
    paddingTop: indent,
  },
  TypeActivity: {
    borderBottomWidth: 1,
    borderColor: colors.bgstep,
    paddingBottom: halfindent + 2,
  },
  TypeActivityTwo: {
    paddingBottom: halfindent + 2,
  },
  modalType: {
    fontFamily: 'Navigo-Regular',
    color: colors.textColor,
    marginBottom: halfindent,
    lineHeight: 34,
    marginTop: halfindent,
  },
  checkBox: {
    marginBottom: lessIndent,
    //  fontFamily: 'Navigo-Regular',
  },
  btnModal: {
    paddingTop: indent,
    paddingBottom: indent + halfindent,
  },
  //theme
  rightHeadView: {
    paddingRight: indent,
  },
  headerRight: {
    fontFamily: 'Navigo-Regular',
    color: colors.textColor,
    opacity: 0.6,
  },
  titleArticlesTheam: {
    fontFamily: 'NewSpirit-Regular',
    color: colors.black,
    marginTop: halfindent / 2,
  },
  playBtn: {
    width: 48,
    height: 48,
    backgroundColor: colors.blackbtn,
    position: 'absolute',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 70,
  },
  playIcon: {},
  headerActivity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: halfindent,
    paddingHorizontal: halfindent,
    ...Platform.select({
      ios: {
        paddingVertical: 0,
      },
    }),
  },
  headerActivityText: {
    color: colors.textColor,
    fontFamily: 'Navigo-Medium',
    textAlign: 'center',
  },
  spaceRoot: {
    paddingHorizontal: indent,
  },
  spaceRootMargin: {
    marginBottom: 100,
  },
  spaceRootSimple: {
    paddingHorizontal: indent,
    marginBottom: 100,
  },
  imgActivity: {
    marginTop: indent,
    position: 'relative',
  },
  acitvitymainImg: {
    width: '100%',
    height: 348,
    borderRadius: 8,
  },
  singleactivityWrap: {
    marginTop: lessIndent,
  },
  activityTitleImg: {
    fontFamily: 'NewSpirit-Regular',
    color: colors.black,
  },
  labelSug: {
    marginVertical: lessIndent,
  },
  blogWrap: {
    marginBottom: indent + lessIndent,
  },
  blogText: {
    fontFamily: 'Navigo-Regular',
    color: colors.textColor,
    fontSize: 16,
    lineHeight: 24,
  },
  actBox: {
    backgroundColor: colors.rootbg,
    padding: indent,
    borderRadius: 8,
    marginBottom: indent + 2,
  },
  boxTitle: {
    fontFamily: 'Navigo-Medium',
    color: colors.textColor,
    fontSize: 16,
  },
  boxTitleTwo: {
    fontFamily: 'Navigo-Medium',
    color: colors.textColor,
    marginHorizontal: indent,
    fontSize: 16,
    lineHeight: 23,
  },
  downloadWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: lessIndent,
  },
  linkText: {
    fontFamily: 'Navigo-Regular',
    color: colors.primary,
    fontSize: 16,
    lineHeight: 24,
  },
  ulView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: colors.textColor,
    borderRadius: 50,
    marginTop: 2,
  },
  meterialName: {
    fontFamily: 'Navigo-Regular',
    marginLeft: halfindent,
    color: colors.textColor,
  },
  materialTag: {
    ul: {
      margin: 0,
      padding: 0,
      paddingLeft: lessIndent,
      marginTop: 11,
      fontFamily: 'Navigo-Regular',
      lineHeight: 23,
      fontSize: 16,
    },
    li: {
      fontFamily: 'Navigo-Regular',
      margin: 0,
      marginLeft: halfindent,
      flexDirection: 'row',
      alignItems: 'center',
      color: colors.textColor,
      lineHeight: 23,
      fontSize: 16,
    },
    p: {
      paddingTop: '0px',
      margin: 0,
      color: colors.textColor,
      lineHeight: 23,
      fontSize: 16,
    },
  },
  noteCaps: {
    fontFamily: 'Navigo-Regular',
    color: colors.textColor,
    lineHeight: 20,
    marginTop: halfindent,
  },
  stepNum: {
    fontFamily: 'Navigo-Regular',
    color: colors.white,
    lineHeight: 18,
  },
  notesText: {
    fontFamily: 'Navigo-Regular',
    fontSize: 16,
    color: colors.textColor,
    lineHeight: 23,
    marginTop: 11,
  },
  instCard: {
    // flexDirection: 'row',
    marginHorizontal: halfindent,
    marginBottom: 100,
  },
  intrWrap: {
    marginHorizontal: halfindent,
    flexDirection: 'row',
    marginTop: indent,
  },
  imginsWrap: {
    flex: 1,
    backgroundColor: colors.rootbg,
    margin: 0,
    paddingHorizontal: indent,
    borderRadius: 8,
    marginLeft: 10,
  },
  instructionImg: {
    image: {
      borderRadius: 8,
      overflow: 'hidden',
      resizeMode: 'contain',
    },
  },
  insCaps: {
    fontFamily: 'Navigo-Regular',
    color: colors.textColor,
    lineHeight: 22,
    marginTop: indent,
    text: {
      fontFamily: 'Navigo-Regular',
      color: colors.textColor,
      lineHeight: 22,
      marginTop: 0,
      fontSize: 16,
    },
  },
  numView: {
    width: 20,
    height: 20,
    backgroundColor: colors.textPrimary,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollRoot: {
    position: 'relative',
  },
  linearImg: {
    position: 'absolute',
    width: '100%',
    height: 100,
    justifyContent: 'center',
    bottom: 0,
  },
  btnCenter: {
    width: '50%',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: colors.primary,
  },
  btnComplate: {
    width: '50%',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: colors.greenBg,
    borderRadius: 50,
    padding: lessIndent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cmpText: {
    fontFamily: 'Navigo-Regular',
    color: colors.white,
    marginLeft: halfindent,
  },
  activityWrap: {
    backgroundColor: colors.rootbg,
    padding: indent,
    borderRadius: 8,
    marginHorizontal: indent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textExplore: {
    marginLeft: halfindent,
    fontFamily: 'Navigo-Regular',
    color: colors.textColor,
  },
  EmptyWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyCaps: {
    fontFamily: 'Navigo-Regular',
    color: colors.textColor,
    textAlign: 'center',
    width: 263,
    alignSelf: 'center',
    marginTop: halfindent + 2,
  },
});
