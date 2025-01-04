import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '@/utils/Constants';
import {useAuthStore} from '@/state/auth-store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '@/components/ui/custom-text';
import BillDetails from '../checkout/bill-details';

const OrderSummary = () => {
  const {currentOrder} = useAuthStore();
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.iconContainer}>
          <Icon name="shopping-outline" color={Colors.disabled} />
        </View>
        <View>
          <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
            Order Summary
          </CustomText>
          <CustomText variant="h9" fontFamily={Fonts.Medium}>
            Order ID - #{currentOrder?.orderId}
          </CustomText>
        </View>
      </View>
      {currentOrder?.items.map(item => (
        <View key={item._id} style={styles.flexRow}>
          <View style={styles.imgContainer}>
            <Image source={{uri: item.item.image}} style={styles.img} />
          </View>
          <View style={{width: '55%'}}>
            <CustomText
              numberOfLines={2}
              variant="h8"
              fontFamily={Fonts.Medium}>
              {item.item.name}
            </CustomText>
            <CustomText variant="h9">{item.item.quantity}</CustomText>
          </View>
          <View style={{width: '20%', alignItems: 'flex-end'}}>
            <CustomText
              variant="h8"
              fontFamily={Fonts.Medium}
              style={{alignSelf: 'flex-end', marginTop: 4}}>
              ₹{(item.count * item.item.price).toFixed(2)}
            </CustomText>
            <CustomText
              variant="h8"
              fontFamily={Fonts.Medium}
              style={{alignSelf: 'flex-end', marginTop: 4}}>
              {item.count}x
            </CustomText>
          </View>
        </View>
      ))}
      <BillDetails />
    </View>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 15,
    marginVertical: 15,
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 15,
    width: '17%',
  },
  img: {
    width: 40,
    height: 40,
  },
});
