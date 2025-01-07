import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Order} from '@/types/order.types';

type Props = {
  item: Order;
};

const OrderItem = ({item}: Props) => {
  return (
    <View>
      <Text>OrderItem</Text>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({});
