import { StyleSheet } from 'react-native';
import { WIN_WIDTH } from '../../../constants/constant';
import { colors } from '../../../styles';
import { doubleIndent, halfindent, indent, lessIndent } from '../../../styles/dimensions';

export default StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    flex: 1,
  },
  paddingWrap: {
    paddingHorizontal: indent,
    paddingVertical: indent,
  },
  playHead: {
    fontFamily: 'NewSpirit-Regular',
    textAlign: 'center',
    color: colors.textColor,
    marginTop: indent,
    letterSpacing: 0.24,
  },
  spendWrap: {
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginTop: indent + 4,
    borderRadius: 8,
    padding: indent,
  },
  spendText: {
    fontFamily: 'Navigo-Regular',
    textAlign: 'center',
    color: colors.textColor,
    marginBottom: indent,
    lineHeight: 22,
  },
  bmborder: {
    borderBottomWidth: 1,
    borderColor: colors.primary,
    alignSelf: 'center',
  },
  btnText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: colors.primary,
    fontSize: 10,
    fontFamily: 'Navigo-Medium',
    letterSpacing: 1,
  },
  dismiss: {
    color: colors.textColor,
    opacity: 0.6,
    textAlign: 'center',
    marginTop: indent,
  },
  cardList: {
    marginVertical: indent,
  },
  firstCard: {
    paddingTop: halfindent + 2,
    backgroundColor: colors.litePink,
    borderRadius: 8,
    paddingHorizontal: doubleIndent + halfindent,
    paddingBottom: indent,
    marginTop: indent,
  },
  secondCard: {
    paddingTop: halfindent + 2,
    backgroundColor: colors.greenBg,
    borderRadius: 8,
    paddingHorizontal: doubleIndent + halfindent,
    paddingBottom: indent,
    marginTop: indent,
  },
  thirdCard: {
    paddingTop: halfindent + 2,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: doubleIndent + halfindent,
    paddingBottom: indent,
    marginTop: indent,
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 10,
    color: colors.white,
    fontFamily: 'Navigo-Medium',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: lessIndent,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  imgWrap: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  cardImg: {
    width: 65,
    height: 57,
  },
  centerView: {
    alignItems: 'center',
    width: 65,
    height: 57,
  },
  numbText: {
    fontSize: 31,
    fontFamily: 'NewSpirit-Regular',
    color: colors.white,
  },
  cardCaps: {
    color: colors.white,
    fontFamily: 'Navigo-Regular',
  },
  calendarWrap: {
    marginTop: halfindent,
  },
  btnWrap: {
    marginTop: doubleIndent,
  },
  btnBottom: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 10,
    letterSpacing: 1,
    marginTop: indent,
    color: colors.textColor,
    fontFamily: 'Navigo-Regular',
  },
  //MindFulModal
  mindfulModal: {
    width: WIN_WIDTH - indent * 3,
    height: 'auto',
    backgroundColor: colors.rootbg,
    borderRadius: 8,
  },
  modalRoot: {
    paddingVertical: doubleIndent,
  },
  mindfulImg: {
    width: 168,
    height: 168,
    alignSelf: 'center',
  },
  titlemodalText: {
    fontFamily: 'NewSpirit-Regular',
    textAlign: 'center',
    letterSpacing: 0.32,
    color: colors.textColor,
    marginTop: halfindent,
  },
  modalCaps: {
    fontFamily: 'Navigo-Medium',
    textAlign: 'center',
    color: colors.textPrimary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: halfindent,
    fontSize: 10,
  },
  btnModalWrap: {
    paddingHorizontal: doubleIndent,
    paddingTop: doubleIndent,
    paddingBottom: indent,
  },
  closeIcon: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    right: 16,
    top: 16,
  },
  modal: {
    backgroundColor: colors.transparent,
    flex: 1,
    justifyContent: 'flex-end',
  },
});
