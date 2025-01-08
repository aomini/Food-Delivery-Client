import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Order} from '@/types/order.types';
import CustomText from '@/components/ui/custom-text';
import {Fonts} from '@/utils/Constants';
import {formatISOToCustom} from '@/utils/date-utils';

type Props = {
  item: Order;
  index: number;
};

const OrderItem = ({item, index}: Props) => {
  return (
    <View style={(styles.container, {borderTopWidth: index === 0 ? 0.7 : 0})}>
      <View style={styles.flexRowBetween}>
        <CustomText variant="h8" fontFamily={Fonts.Medium}>
          #{item.orderId}
        </CustomText>
        <CustomText variant="h8" fontFamily={Fonts.Medium}>
          {item.status}
        </CustomText>
      </View>
      <View style={styles.flexRowBetween}>
        <View style={{width: '50%'}}>
          {item.items.map((i, idc) => (
            <CustomText key={idc} numberOfLines={1} variant="h8">
              {i.count}x {i.item.name}
            </CustomText>
          ))}
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <CustomText
            variant="h5"
            fontFamily={Fonts.SemiBold}
            style={{marginTop: 10}}>
            ₹{item.totalPrice.toFixed(2)}
          </CustomText>
          <CustomText variant="h9">
            {formatISOToCustom(item.createdAt)}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.7,
    paddingVertical: 15,
    opacity: 0.9,
  },
  flexRowBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
