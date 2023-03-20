import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../../styles';
import { halfindent, indent, lessIndent } from '../../../styles/dimensions';

export default StyleSheet.create({
  root: {
    flex: 1,
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
  expBack: {
    ...Platform.select({
      ios: {
        marginRight: lessIndent,
      },
    }),
  },
  headerText: {
    fontFamily: 'NewSpirit-Regular',
    color: colors.textColor,
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
  theamImg: {
    width: '100%',
    height: 97,
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
  themesText: {
    fontFamily: 'Navigo-Regular',
    color: colors.white,
  },
});
