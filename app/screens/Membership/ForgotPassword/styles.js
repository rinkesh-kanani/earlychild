import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../../styles';
import { doubleIndent, halfindent, indent, lessIndent } from '../../../styles/dimensions';

export default StyleSheet.create({
  root: {
    backgroundColor: colors.rootbg,
    flex: 1,
  },
  rootStyle: {
    backgroundColor: colors.rootbg,
    flex: 1,
    paddingHorizontal: indent + 4,
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
    marginTop: indent + halfindent,
  },
  inputStyle: {
    fontFamily: 'Navigo-Regular',
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
    marginTop: doubleIndent,
  },
  addIcon: {
    marginLeft: halfindent,
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
