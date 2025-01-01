import {StyleSheet, ViewStyle} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {SafeAreaView, SafeAreaViewProps} from 'react-native-safe-area-context';

type Props = {
  style?: ViewStyle;
};

const CustomerSafeAreaView = ({
  children,
  style,
  ...props
}: PropsWithChildren<Props & SafeAreaViewProps>) => {
  return (
    <SafeAreaView {...props} style={[styles.container, style]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default CustomerSafeAreaView;
