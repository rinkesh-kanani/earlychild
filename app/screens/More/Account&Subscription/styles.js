import { StyleSheet } from 'react-native';
import { WIN_HEIGHT } from '../../../constants/constant';
import { colors } from '../../../styles';
import { borderWidth, halfindent, indent, lessIndent } from '../../../styles/dimensions';
import Typography from '../../../styles/Typography';
import { scale, scaleVertical } from '../../../utils/scale';

export default StyleSheet.create({
  headerRow: {
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
  imgWrap: {
    alignItems: 'center',
    paddingVertical: indent,
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
  },
  profileImg: {
    width: 108,
    height: 108,
    borderRadius: 50,
    alignSelf: 'center',
  },
  chText: {
    textAlign: 'center',
    fontFamily: 'Navigo-Medium',
    fontSize: 10,
    marginTop: halfindent,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    color: colors.primary,
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: indent,
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
  },
  editText: {
    fontSize: 10,
    textTransform: 'uppercase',
    color: colors.primary,
    letterSpacing: 1.6,
    fontFamily: 'Navigo-Medium',
  },
  labelText: {
    fontFamily: 'Navigo-Medium',
    color: colors.textColor,
  },
  leftWrap: {
    flex: 0.7,
  },
  valueText: {
    fontFamily: 'Navigo-Regular',
    color: colors.textColor,
    marginTop: halfindent / 2,
    ...Typography.bodyTwo,
    padding: 0,
    // backgroundColor: colors.red,
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
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    borderTopLeftRadius: lessIndent,
    borderTopRightRadius: lessIndent,
    position: 'relative',
    maxHeight: WIN_HEIGHT - scale(85),
  },
  modalHeadWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
    padding: indent,
  },
  modaltitle: {
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    fontSize: 10,
    color: colors.textPrimary,
  },
  modalPadding: {
    paddingHorizontal: indent,
  },
  firstModalWrap: {
    paddingVertical: indent,
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
  },
  labelWrap: {
    color: colors.textColor,
    fontFamily: 'Navigo-Medium',
    lineHeight: 22,
  },
  dateText: {
    fontFamily: 'Navigo-Regular',
    color: colors.textColor,
    lineHeight: 34,
  },
  secondModalWrap: {
    paddingVertical: indent,
  },
  subPrefe: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    color: colors.primary,
    fontFamily: 'Navigo-Medium',
  },
  rowSub: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cancelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: indent + halfindent,
  },
  avtar: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    width: 108,
    height: 108,
    borderRadius: 50,
    justifyContent: 'center',
  },
});
