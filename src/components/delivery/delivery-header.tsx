import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAuthStore} from '@/state/auth-store';

type Props = {
  name?: string;
  email?: string;
};

const DeliveryHeader = ({name, email}: Props) => {
  const {logout} = useAuthStore();

  return (
    <View>
      <Text>DeliveryHeader</Text>
    </View>
  );
};

export default DeliveryHeader;

const styles = StyleSheet.create({});
