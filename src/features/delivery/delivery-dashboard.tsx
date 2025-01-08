import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '@/utils/Constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuthStore} from '@/state/auth-store';
import DeliveryHeader from '@/components/delivery/delivery-header';

const DeliveryDashboard = () => {
  const {user} = useAuthStore();
  return (
    <View style={styles.container}>
      <SafeAreaView></SafeAreaView>
      <DeliveryHeader name={user?.name} email={user?.email} />
      <View style={styles.subContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  subContainer: {
    backgroundColor: Colors.backgroundSecondary,
    flex: 1,
    padding: 6,
  },
  flatListContainer: {
    padding: 2,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
});

export default DeliveryDashboard;
