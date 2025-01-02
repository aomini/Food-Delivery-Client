import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {CartItem} from '@/state/cart-store';
import {Colors, Fonts} from '@/utils/Constants';
import CustomText from '@/components/ui/custom-text';
import UniversalAdd from '@/components/ui/universal-add';

const OrderItem = ({item}: {item: CartItem}) => {
  return (
    <View style={styles.flexRow}>
      <View style={styles.imgContainer}>
        <Image source={{uri: item.item.image}} style={styles.img} />
      </View>
      <View style={{width: '55%'}}>
        <CustomText numberOfLines={2} variant="h8" fontFamily={Fonts.Medium}>
          {item.item.name}
        </CustomText>
        <CustomText variant="h9">{item.item.quantity}</CustomText>
      </View>
      <View style={{width: '20%', alignItems: 'flex-end'}}>
        <UniversalAdd item={item.item} />
        <CustomText
          variant="h8"
          fontFamily={Fonts.Medium}
          style={{alignSelf: 'flex-end', marginTop: 4}}>
          ₹{(item.count * item.item.price).toFixed(2)}
        </CustomText>
      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  imgContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 15,
    padding: 10,
    width: '17%',
  },
  img: {
    height: 40,
    width: 40,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderTopWidth: 0.6,
    borderColor: Colors.border,
  },
});
