import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../../styles';
import { doubleIndent, halfindent, indent, lessIndent } from '../../../styles/dimensions';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: halfindent,
    paddingVertical: halfindent,
    backgroundColor: colors.white,
    ...Platform.select({
      ios: {
        paddingBottom: 0,
      },
    }),
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        paddingRight: indent,
        paddingVertical: halfindent,
      },
    }),
  },
  heartIcon: {
    marginRight: halfindent,
  },
  headerText: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: colors.textColor,
    letterSpacing: 1,
    fontFamily: 'Navigo-Medium',
    ...Platform.select({
      ios: {
        marginLeft: indent,
      },
    }),
  },
  slideWrap: {
    height: 274,
  },
  sliderWrap: {
    height: 274,
  },
  inactivedot: {
    width: 6,
    height: 6,
    backgroundColor: colors.unactivedot,
    marginTop: indent + indent,
  },
  activedot: {
    backgroundColor: colors.rootbg,
    width: 10,
    height: 10,
    marginTop: indent + indent,
  },
  slide: {
    // backgroundColor: colors.primary,
  },
  titleSlide: {
    fontSize: 10,
    fontFamily: 'Navigo-Medium',
    textAlign: 'center',
    letterSpacing: 1.6,
    marginTop: indent + halfindent,
    color: colors.white,
    textTransform: 'uppercase',
  },
  slideImg: {
    width: 213,
    height: 163,
    alignSelf: 'center',
    marginTop: indent + halfindent - 1,
    position: 'relative',
  },
  dateSlide: {
    fontSize: 80,
    alignSelf: 'center',
    fontFamily: 'NewSpirit-Regular',
    color: colors.textColor,
    marginTop: indent,
  },
  slideMonth: {
    textAlign: 'center',
    fontFamily: 'Navigo-Regular',
    color: colors.greylite,
  },
  toprightImg: {
    position: 'absolute',
    width: 44,
    height: 55,
    right: 20,
  },
  topLeftImg: {
    position: 'absolute',
    width: 80,
    height: 87,
    left: -20,
    top: 0,
  },
  rightTopImg: {
    position: 'absolute',
    width: 68,
    height: 67,
    right: 0,
    top: 0,
  },
  complateWrap: {
    paddingHorizontal: indent,
    // marginBottom: indent,
  },
  complateCard: {
    marginTop: indent + 4,
    backgroundColor: colors.rootbg,
    paddingHorizontal: indent + 2,
    paddingVertical: indent + halfindent,
    borderRadius: 8,
  },
  cardTitle: {
    fontFamily: 'NewSpirit-Regular',
    fontSize: 30,
    textAlign: 'center',
    letterSpacing: 0.16,
    color: colors.textColor,
  },
  skillWrap: {
    borderTopWidth: 1,
    borderColor: colors.borderColor,
    marginTop: lessIndent,
    paddingTop: indent + 4,
  },
  skilllabel: {
    fontFamily: 'Navigo-Medium',
    letterSpacing: 1.6,
    fontSize: 10,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  socialText: {
    fontFamily: 'Navigo-Regular',
    color: colors.black,
    marginTop: lessIndent,
    textAlign: 'center',
  },
  mindcaps: {
    marginTop: indent,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    color: colors.textColor,
  },
  scarapbook: {
    fontFamily: 'Navigo-Regular',
    textAlign: 'center',
    marginTop: indent + 4,
    fontSize: 16,
    lineHeight: 22,
    color: colors.textColor,
  },
  btnRow: {
    borderWidth: 2,
    borderColor: colors.greyborder,
    borderRadius: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: lessIndent,
    marginBottom: indent,
  },
  btnWrap: {
    marginTop: doubleIndent - 2,
    marginBottom: halfindent,
  },
  btnText: {
    color: colors.textColor,
    marginLeft: lessIndent,
    fontFamily: 'Navigo-Regular',
  },
  imgWrap: {
    marginTop: doubleIndent,
  },
  rowImgWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginHorizontal: -halfindent,
  },
  workWrap: {
    position: 'relative',
    margin: halfindent,
  },
  uploadImg: {
    width: 71,
    height: 71,
    borderRadius: 8,
  },
  closeIcon: {
    position: 'absolute',
    right: -8,
    top: -8,
  },
  addWrap: {
    width: 48,
    height: 48,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.borderColor,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secBtnWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: doubleIndent,
  },
  rightBtn: {
    flex: 1,
    paddingLeft: indent,
  },
});
