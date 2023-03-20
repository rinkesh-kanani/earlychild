import { StyleSheet } from 'react-native';
import { colors, fontWeights } from '../../../styles';
import { doubleIndent, halfindent, indent, lessIndent } from '../../../styles/dimensions';
import Typography from '../../../styles/Typography';

export default StyleSheet.create({
  mainView: {
    backgroundColor: colors.white,
    flexDirection: 'column',
    flex: 1,
    paddingHorizontal: indent,
  },
  profileWrap: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: doubleIndent - halfindent,
  },
  profileImg: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  textBtn: {
    color: colors.grey,
    fontWeight: fontWeights.medium,
    marginTop: halfindent,
  },
  inputWrap: {
    marginTop: indent + halfindent,
  },
  inputWrapTwo: {
    marginTop: indent,
  },
  datePicker: {},
  inputStyle: {
    backgroundColor: colors.white,
    ...Typography.bodyTwo,
  },
  labelText: {
    color: colors.dimGray,
    fontWeight: fontWeights.semiBold,
  },
  radioMainWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  radioWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: doubleIndent,
  },
  radioText: {
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
  },
  genderWrap: {
    flexDirection: 'row',
    marginTop: halfindent,
    marginBottom: indent,
  },
  focusstatus: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 6,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: indent - 2,
    paddingHorizontal: doubleIndent,
    marginRight: indent,
  },
  notfocus: {
    borderWidth: 2,
    borderColor: colors.borderColor,
    borderRadius: 6,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: indent,
    paddingVertical: indent - 2,
    paddingHorizontal: doubleIndent,
  },
  focusText: {
    color: colors.primary,
    fontWeight: fontWeights.medium,
    marginTop: lessIndent,
  },
  notfocusText: {
    color: colors.dimGray,
    fontWeight: fontWeights.medium,
    marginTop: lessIndent,
  },
  selctIcon: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
  btnWrap: {
    marginTop: lessIndent,
    flexDirection: 'column',
  },
  btnStyle: {
    borderRadius: 30,
  },
  textbtnWrap: {
    paddingVertical: indent,
  },
  btnText: {
    textAlign: 'center',
    color: colors.grey,
    fontWeight: fontWeights.medium,
  },
});
