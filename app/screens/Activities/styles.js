import { StyleSheet } from 'react-native';
import { colors, fontWeights } from '../../styles';
import { borderWidth, doubleIndent, halfindent, indent, lessIndent } from '../../styles/dimensions';
import Typography from '../../styles/Typography';
import { scaleVertical } from '../../utils/scale';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: indent,
  },
  imgDp: {
    width: 35,
    height: 35,
  },
  headerText: {
    color: colors.textColor,
    marginLeft: halfindent + 2,
    fontWeight: fontWeights.extraBold,
  },
  rootpadding: {
    padding: indent,
  },
  rightHeadView: {
    paddingRight: indent,
  },
  pageTitle: {
    color: colors.textPrimary,
    fontWeight: fontWeights.extraBold,
  },
  searchView: {
    marginTop: indent,
  },
  searchflex: {
    flex: 1,
  },
  searchicon: {
    color: colors.gray,
  },
  inputstyle: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: colors.borderColor,
  },
  searchInput: {
    // flex: 1,
    borderRadius: 0,
    borderColor: colors.transparent,
    borderBottomColor: colors.transparent,
    backgroundColor: colors.transparent,
    borderTopColor: colors.transparent,
  },
  righticon: {
    display: 'none',
  },
  searchInputTextStyle: {
    ...Typography.bodyTwo,
    color: colors.black,
    marginHorizontal: 0,
    paddingVertical: 0,
  },
  secondWrap: {
    marginTop: doubleIndent,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    color: colors.textPrimary,
    fontWeight: fontWeights.extraBold,
    marginLeft: halfindent,
  },
  moreText: {
    color: colors.primary,
    fontWeight: fontWeights.medium,
    marginRight: 4,
  },
  moreIcon: {
    marginTop: 1,
  },
  rowList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: indent,
  },
  imgSecWrap: {
    flexDirection: 'row',
  },
  wrapColumImg: {
    marginRight: indent,
  },
  imgWrap: {
    width: 134,
    height: 132,
    backgroundColor: colors.bgimg,
    borderRadius: 8,
  },
  imgRow: {
    borderRadius: 8,
    width: 134,
    height: 132,
  },
  imgText: {
    color: colors.textColor,
    fontWeight: fontWeights.medium,
    marginTop: halfindent,
  },
  thirdWrap: {
    marginTop: doubleIndent,
  },
  subWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: halfindent / 2,
  },
  subBox: {
    backgroundColor: colors.white,
    paddingVertical: halfindent,
    paddingHorizontal: indent,
    borderWidth: borderWidth,
    borderColor: colors.borderColor,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: lessIndent,
    marginTop: lessIndent,
  },
  subImage: {
    width: 24,
    height: 24,
  },
  subjText: {
    color: colors.textColor,
    marginLeft: lessIndent,
  },
  lastWrap: {
    marginTop: doubleIndent,
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
    backgroundColor: colors.bglitepurple,
    borderRadius: 8,
    borderWidth: borderWidth,
    borderColor: colors.borderpurple,
    paddingVertical: indent,
  },
  cardBgTwo: {
    backgroundColor: colors.liteyellow,
    borderRadius: 8,
    borderWidth: borderWidth,
    borderColor: colors.borderyellow,
    paddingVertical: indent,
  },
  cardBgThree: {
    backgroundColor: colors.bgsky,
    borderRadius: 8,
    borderWidth: borderWidth,
    borderColor: colors.borderSky,
    paddingVertical: indent,
  },
  cardBgFour: {
    backgroundColor: colors.bgpink,
    borderRadius: 8,
    borderWidth: borderWidth,
    borderColor: colors.borderpink,
    paddingVertical: indent,
  },
  cardBgfive: {
    backgroundColor: colors.yellowbg,
    borderRadius: 8,
    borderWidth: borderWidth,
    borderColor: colors.borderyellowlite,
    paddingVertical: indent,
  },
  themesText: {
    color: colors.textColor,
    textAlign: 'center',
  },
  //Single Activity
  modalContainer: {
    flex: 0.8,
  },
  singleTitle: {
    color: colors.textPrimary,
    fontWeight: fontWeights.extraBold,
  },
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: halfindent / 2,
  },
  wraplabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orangeLabel: {
    fontSize: 9,
    lineHeight: 13,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    backgroundColor: colors.liteorange,
    borderRadius: 3,
    color: colors.white,
    fontWeight: fontWeights.extraBold,
    paddingHorizontal: halfindent,
    paddingVertical: 2,
    marginRight: halfindent,
  },
  AgeTag: {
    fontSize: 9,
    lineHeight: 13,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    backgroundColor: colors.white,
    borderRadius: 3,
    borderWidth: borderWidth,
    borderColor: colors.labelBorder,
    fontWeight: fontWeights.extraBold,
    paddingHorizontal: halfindent,
    paddingVertical: 2,
    color: colors.textColor,
  },
  ImagWrapper: {
    marginTop: indent + halfindent,
  },
  imgArt: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    backgroundColor: colors.bgimg,
    position: 'relative',
  },
  capsOverView: {
    color: colors.textColor,
    lineHeight: 20,
    marginTop: indent,
  },
  selectTik: {
    position: 'absolute',
    right: lessIndent,
    top: lessIndent,
  },
  cardWrapper: {
    marginTop: halfindent,
  },
  downloadCard: {
    backgroundColor: colors.bgsky,
    padding: indent,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: indent,
    marginBottom: halfindent,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontWeight: fontWeights.extraBold,
  },
  capsCard: {
    color: colors.textColor,
    marginTop: halfindent,
  },
  yellowCard: {
    marginTop: halfindent,
    backgroundColor: colors.yellowbg,
    padding: indent,
    marginBottom: halfindent,
  },
  bulletView: {
    width: 4,
    height: 4,
    backgroundColor: colors.textColor,
    borderRadius: 50,
  },
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: halfindent,
  },
  materialList: {
    color: colors.textColor,
    fontWeight: fontWeights.medium,
    marginLeft: lessIndent,
  },
  introSection: {
    marginTop: indent,
  },
  introTitle: {
    color: colors.textPrimary,
    fontWeight: fontWeights.extraBold,
    marginBottom: halfindent,
  },
  introRow: {
    flexDirection: 'row',
    marginTop: halfindent,
  },
  rowNum: {
    fontWeight: fontWeights.medium,
    marginRight: lessIndent,
  },
  introCaps: {
    color: colors.textColor,
    lineHeight: 20,
    fontFamily: 'Navigo',
  },
  btnWrap: {
    marginTop: indent + halfindent,
  },
  //ActivityModal
  modalTrial: {
    backgroundColor: colors.transparent,
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 'auto',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.transparent,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  rectView: {
    width: 50,
    height: 5,
    alignSelf: 'center',
    backgroundColor: colors.white,
    opacity: 0.8,
    borderRadius: 25,
    marginBottom: scaleVertical(10),
  },
  mainView: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  modalCardWarpper: {
    justifyContent: 'flex-end',
    backgroundColor: colors.backgroundColor,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: indent,
  },
  playBtn: {
    width: 46,
    height: 46,
    backgroundColor: colors.white,
    borderRadius: 50,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    left: '42%',
    top: '25%',
  },
  yellowCardtwo: {
    marginTop: halfindent + indent,
    backgroundColor: colors.yellowbg,
    padding: indent,
    marginBottom: halfindent,
  },
});
