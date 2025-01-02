import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {useCartStore} from '@/state/cart-store';
import CustomText from '@/components/ui/custom-text';
import {Colors, Fonts} from '@/utils/Constants';
import OrderItem from './order-item';

const OrderList = () => {
  const {cart} = useCartStore();

  const totalItems = cart.reduce((acc, cart) => acc + cart.count, 0);

  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.imageContainer}>
          <Image
            source={require('@/assets/icons/clock.png')}
            style={styles.img}
          />
        </View>
        <View>
          <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
            Delivery in 9 minutes
          </CustomText>
          <CustomText variant="h8" fontFamily={Fonts.SemiBold}>
            Shipment of {totalItems || 0} item{totalItems > 1 ? `s` : ''}
          </CustomText>
        </View>
      </View>
      {cart.map(item => (
        <OrderItem key={item._id} item={item} />
      ))}
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  imageContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 15,
  },
  img: {
    width: 30,
    height: 30,
  },
});
