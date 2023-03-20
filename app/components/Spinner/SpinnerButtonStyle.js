import { StyleSheet } from 'react-native';
import { WIN_WIDTH } from '../../constants/constant';
import { colors } from '../../styles';

export default StyleSheet.create({
  defaultButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    backgroundColor: colors.mediumTurquoise,
  },
  defaultSpinnerContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedViewStyle: {
    width: WIN_WIDTH - 32,
  },
});
