import { StyleSheet } from 'react-native';
import { colors } from '../../styles';
import {  indent, lessIndent } from '../../styles/dimensions';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileWrap: {
    padding: indent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom:0,
  },
  iconWrap: {},
  profileImg: {
    width: 108,
    height: 108,
    borderRadius: 50,
  },
  imgWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'NewSpirit-Regular',
    textAlign: 'center',
    color: colors.black,
    marginLeft: lessIndent,
  },
  tabView: {
    flex: 1,
    height: '100%',
  },
});
