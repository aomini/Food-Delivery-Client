import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {useAuthStore} from '@/state/auth-store';
import {getCurrentOrderById} from '@/services/create-order';
import {Colors, Fonts} from '@/utils/Constants';
import LiveHeader from './live-header';
import LiveMap from './live-map';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '@/components/ui/custom-text';
import DeliveryDetails from './delivery-details';
import OrderSummary from './order-summary';

const LiveTracking = () => {
  const {currentOrder, setCurrentOrder} = useAuthStore();

  const fetchOrderDetails = React.useCallback(async () => {
    const data = await getCurrentOrderById(currentOrder?._id);
    if (data) setCurrentOrder(data);
  }, [currentOrder?._id, setCurrentOrder]);

  React.useEffect(() => {
    fetchOrderDetails();
  }, [fetchOrderDetails]);

  let msg = 'Packing your order';
  let time = 'Arriving in 10 minutes';
  if (currentOrder?.status === 'confirmed') {
    msg = 'Arriving soon';
    time = 'Arriving in 8 minutes';
  } else if (currentOrder?.status === 'arriving') {
    msg = 'Order Picked Up';
    time = 'Arriving in 6 minutes';
  } else if (currentOrder?.status === 'delivered') {
    msg = 'Order Delivered';
    time = 'Fastest Delivery ⚡️';
  }

  return (
    <View style={styles.container}>
      <LiveHeader type="customer" title={msg} subTitle={time} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <LiveMap />
        <View style={styles.flexRow}>
          <View style={styles.iconContainer}>
            <Icon
              name={currentOrder?.deliveryPartner ? 'phone' : 'shopping'}
              color={Colors.disabled}
              size={RFValue(20)}
            />
          </View>
          <View style={{width: '82%'}}>
            <CustomText
              numberOfLines={1}
              variant="h7"
              fontFamily={Fonts.SemiBold}>
              {currentOrder?.deliveryPartner?.name ||
                'We will soon assign someone'}
            </CustomText>
            {currentOrder?.deliveryPartner && (
              <CustomText variant="h7" fontFamily={Fonts.Medium}>
                {currentOrder?.deliveryPartner?.phone}
              </CustomText>
            )}

            <CustomText variant="h9" fontFamily={Fonts.Medium}>
              {currentOrder?.deliveryPartner
                ? 'For delivery instructions you can contact here'
                : msg}
            </CustomText>
          </View>
        </View>
        <DeliveryDetails details={currentOrder?.customer} />
        <OrderSummary />
      </ScrollView>
    </View>
  );
};

export default LiveTracking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  scrollContent: {
    paddingBottom: 150,
    backgroundColor: Colors.backgroundSecondary,
    padding: 15,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 15,
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
    width: '100%',
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
