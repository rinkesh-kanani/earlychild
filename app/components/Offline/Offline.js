import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { colors } from '../../styles';

const Offline = () => {
  const netInfo = useNetInfo();

  if (netInfo && (netInfo.isConnected || netInfo.isConnected === null)) return null;
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>{'No Internet'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: colors.red,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
  },
  offlineText: {
    // ...FONT_HEADING_BOLD,
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default Offline;
