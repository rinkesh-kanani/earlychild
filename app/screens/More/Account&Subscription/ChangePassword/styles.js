import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../../../styles';
import { borderWidth, doubleIndent, halfindent, indent, lessIndent } from '../../../../styles/dimensions';

export default StyleSheet.create({
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
  headerStyle: {
    backgroundColor: colors.white,
    borderBottomWidth: borderWidth,
    borderColor: colors.borderColor,
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
  rootStyle: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: indent + 4,
    paddingTop: indent,
  },
  titleText: {
    fontSize: 30,
    lineHeight: 38,
    textAlign: 'center',
    color: colors.textPrimary,
    letterSpacing: 0.16,
    fontFamily: 'NewSpirit-Regular',
    marginTop: indent,
  },
  signupWrap: {
    marginVertical: indent,
    marginTop: doubleIndent,
  },
  inputWrap: {
    marginTop: indent,
  },
  inputStyle: {
    fontFamily: 'Navigo-Medium',
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingHorizontal: indent + 4,
    marginTop: indent,
    ...Platform.select({
      ios: {
        paddingVertical: lessIndent,
      },
    }),
  },
  btnWrap: {
    marginTop: doubleIndent + indent,
  },
  linktext: {
    fontFamily: 'Navigo-Medium',
    textAlign: 'center',
    color: colors.primary,
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 16,
  },
  bmBtn: {
    padding: lessIndent,
    marginBottom: halfindent,
  },
});
