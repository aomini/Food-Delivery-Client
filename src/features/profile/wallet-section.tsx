import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '@/utils/Constants';
import WalletItem from './wallet-item';

const WalletSection = () => {
  return (
    <View style={styles.walletContainer}>
      <WalletItem icon="wallet-outline" label="wallet" />
      <WalletItem icon="chatbubbles-outline" label="payments" />
      <WalletItem icon="card-outline" label="support" />
    </View>
  );
};

export default WalletSection;

const styles = StyleSheet.create({
  walletContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    paddingVertical: 15,
    borderRadius: 15,
    marginVertical: 20,
  },
});
