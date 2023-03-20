import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../../styles';
import { doubleIndent, halfindent, indent, lessIndent } from '../../../styles/dimensions';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  marginWrap: {
    marginTop: lessIndent,
  },
  cardList: {
    paddingVertical: lessIndent,
    paddingLeft: lessIndent,
    paddingRight: indent,
    borderRadius: 8,
    marginTop: indent + 4,
    marginHorizontal: indent,
    shadowColor: colors.cardboxshadow,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
    backgroundColor: colors.white,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWrap: {
    paddingLeft: lessIndent,
  },
  profileImg: {
    width: 56,
    height: 56,
    borderRadius: 50,
  },
  childName: {
    fontFamily: 'NewSpirit-Regular',
    color: colors.textColor,
    lineHeight: 25,
  },
  years: {
    fontFamily: 'NewSpirit-Regular',
    color: colors.greylite,
  },
  addWrapper: {
    paddingTop: indent,
    paddingBottom: indent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addWrappertwo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBg: {
    width: 42,
    height: 42,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    shadowColor: colors.cardboxshadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  addChild: {
    color: colors.textColor,
    fontFamily: 'Navigo-Regular',
    marginLeft: lessIndent,
  },
  //KidsEdit
  headerRow: {
    flexDirection: 'row',
    paddingLeft: halfindent,
  },
  paddingWrap: {
    paddingHorizontal: indent + 4,
    marginTop: doubleIndent,
  },
  imgWrap: {
    width: 138,
    height: 138,
    alignSelf: 'center',
    borderRadius: 50,
  },
  profileEdit: {
    width: 138,
    height: 138,
    borderRadius: 100,
  },
  imgEditWrap: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 32,
    height: 32,
    borderRadius: 50,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 8,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrap: {
    marginTop: doubleIndent,
  },
  numberWrap: {
    fontFamily: 'Navigo-Regular',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingHorizontal: lessIndent,
    marginTop: indent,
    ...Platform.select({
      ios: {
        paddingVertical: lessIndent,
      },
    }),
  },
  weekInputStyle: {
    fontFamily: 'Navigo-Regular',
    flex: 0.9,
  },
  weekText: {
    fontSize: 10,
    textTransform: 'uppercase',
    color: colors.textColor,
    letterSpacing: 1.6,
    fontFamily: 'Navigo-Medium',
  },
  inputStyle: {
    fontFamily: 'Navigo-Regular',
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingHorizontal: indent + 4,
    marginTop: indent,
    color: colors.textColor,
    ...Platform.select({
      ios: {
        paddingVertical: lessIndent,
      },
    }),
  },
  placeTextColor: {
    fontFamily: 'Navigo-Regular',
    color: colors.textColor,
    opacity: 0.8,
  },
  dateWrap: {
    marginTop: indent,
  },
  radioWrap: {
    paddingTop: indent,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bornText: {
    marginLeft: lessIndent,
    fontFamily: 'Navigo-Regular',
    color: colors.textColor,
    opacity: 0.8,
  },
  btnWrap: {
    paddingHorizontal: indent,
    paddingVertical: indent,
  },
  headText: {
    textAlign: 'center',
    fontFamily: 'Navigo-Regular',
    color: colors.grey,
    marginTop: indent,
  },
});
