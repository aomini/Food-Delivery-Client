import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import CustomerSafeAreaView from '@/components/shared/custom-safe-area-view';
import ProductSlider from '@/components/login/product-slider';

const CustomerLogin = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <CustomerSafeAreaView>
        <View style={styles.container}>
          <ProductSlider />
          <Text>Customer login</Text>
        </View>
      </CustomerSafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomerLogin;
