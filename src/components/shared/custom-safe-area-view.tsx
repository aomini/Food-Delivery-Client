import {StyleSheet, ViewStyle} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {
  style?: ViewStyle;
};

const CustomerSafeAreaView = ({children, style}: PropsWithChildren<Props>) => {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default CustomerSafeAreaView;
