import { StyleSheet } from 'react-native';
import { colors, fontWeights } from '../../styles';
import { borderWidth, halfindent, indent, lessIndent } from '../../styles/dimensions';
import { scaleVertical } from '../../utils/scale';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  firstWrap: {
    flexDirection: 'row',
    marginRight: -lessIndent,
  },
  atCompleted: {
    backgroundColor: colors.litePurple,
    borderRadius: 8,
    paddingVertical: halfindent,
    paddingHorizontal: lessIndent,
    flex: 0.5,
    marginRight: lessIndent,
  },
  atCompletedtwo: {
    backgroundColor: colors.litesky,
    borderRadius: 8,
    paddingVertical: halfindent,
    paddingHorizontal: lessIndent,
    flex: 0.5,
    marginRight: lessIndent,
  },
  //Header
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
  rightHeadView: {
    paddingRight: indent,
  },
  //Modal
  modal: {
    backgroundColor: colors.transparent,
    flex: 1,
    justifyContent: 'flex-end',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  modalTwo: {
    backgroundColor: colors.transparent,
    flex: 0.8,
    justifyContent: 'flex-end',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  modalContainer: {
    // flex: 1,
  },
  closeModal: {
    flex: 1,
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
  modalWrapper: {
    // flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.transparent,

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
  mainView: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  userModal: {
    width: 45,
    height: 45,
  },
  RowlistModal: {
    borderBottomWidth: borderWidth,
    paddingBottom: indent,
    paddingRight: indent,
    paddingTop: indent,
    borderColor: colors.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalText: {
    paddingLeft: indent,
  },
  userName: {
    color: colors.textPrimary,
    fontWeight: fontWeights.extraBold,
    lineHeight: 23,
  },
  userYear: {
    color: colors.textColor,
  },
  btnModal: {
    marginTop: indent + halfindent,
  },
  checkIcon: {
    marginTop: 2,
  },
});
