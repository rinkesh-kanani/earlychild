import { StyleSheet } from 'react-native';
import { WIN_WIDTH } from '../../constants/constant';
import { colors } from '../../styles';
import { halfindent, indent, lessIndent } from '../../styles/dimensions';
import Typography from '../../styles/Typography';
import { scaleVertical } from '../../utils/scale';

export default StyleSheet.create({
  keybordWrapper: {
    flex: 1,
  },
  inputprofile: {
    marginBottom: lessIndent,
    marginTop: 10,
  },
  unitmodal: {
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    flex: 0.9,
    paddingHorizontal: indent,
  },
  inputstyle: {
    backgroundColor: colors.white,
    height: scaleVertical(45),
    ...Typography.bodyHead,
    position: 'relative',
  },
  dropDownItem: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: 30,
    height: 20,
  },
  searchRight: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    color: colors.darkGrey,
    alignItems: 'center',
    width: '30%',
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
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.transparent,
  },
  name: {
    color: colors.dimGray,
    width: WIN_WIDTH - 100,
  },
  countryphonecode: {
    color: colors.dimGray,
    paddingLeft: halfindent,
  },
  imageWrap: {
    paddingLeft: indent,
    paddingRight: lessIndent,
  },
  selectedImageWrap: {
    paddingLeft: halfindent + 2,
    paddingRight: 6,
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectedimage: {
    width: 30,
    height: 20,
  },
  downicon: {
    marginLeft: 'auto',
    paddingRight: 5,
  },
});
