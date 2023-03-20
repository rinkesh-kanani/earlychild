import { StyleSheet } from 'react-native';
import { fontWeights, colors } from '../../styles';

export default StyleSheet.create({
  userImage: {
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },

  userLetter: {
    fontWeight: fontWeights.medium,
    color: colors.white,
    textTransform: 'capitalize',
  },
});
