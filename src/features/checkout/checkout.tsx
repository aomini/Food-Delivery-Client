import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import CustomHeader from '@/components/ui/custom-header';
import {Colors, Fonts} from '@/utils/Constants';
import OrderList from './order-list';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '@/components/ui/custom-text';
import BillDetails from './bill-details';
import {hocStyles} from '@/styles/global-styles';
import {useAuthStore} from '@/state/auth-store';
import ArrowButton from '@/components/ui/arrow-button';
import {useCartStore} from '@/state/cart-store';
import {navigate} from '@/utils/navigation-utils';
import {createOrder} from '@/services/create-order';

const Checkout = () => {
  const {user, setCurrentOrder, currentOrder} = useAuthStore();
  const {cart, clear, total} = useCartStore();
  const [loading, setLoading] = React.useState(false);

  const handlePlaceOrder = async () => {
    if (currentOrder !== null)
      return Alert.alert('Let your first order to be delivered');

    const formattedOrder = cart.map(item => {
      return {
        id: item._id,
        item: item._id,
        count: item.count,
      };
    });
    if (formattedOrder.length === 0) return Alert.alert('Add items to cart');
    setLoading(true);
    const data = await createOrder(formattedOrder, total());

    if (data) {
      setCurrentOrder(data);
      clear();
      navigate('order-success', {...data});
    } else {
      return Alert.alert('Something went wrong');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Checkout" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <OrderList />
        <View style={styles.flexRowBetween}>
          <View style={styles.flexRow}>
            <Image
              source={require('@/assets/icons/coupon.png')}
              style={styles.icon}
            />
            <CustomText variant="h6" fontFamily={Fonts.SemiBold}>
              Use Coupons
            </CustomText>
          </View>
          <Icon name="chevron-right" size={RFValue(16)} color={Colors.text} />
        </View>
        <BillDetails />
        <View style={styles.flexRowBetween}>
          <View>
            <CustomText variant="h8" fontFamily={Fonts.SemiBold}>
              Cancellation Policy
            </CustomText>
            <CustomText
              variant="h9"
              style={styles.cancelText}
              fontFamily={Fonts.SemiBold}>
              Orders cannot be cancelled once placed. In case of unexpected
              delays, a refund will be facilitated.
            </CustomText>
          </View>
        </View>
      </ScrollView>
      <View style={hocStyles.CategoryContainer}>
        <View style={styles.absoluteContainer}>
          <View style={styles.addressContainer}>
            <View style={styles.flexRow}>
              <Image
                source={require('@/assets/icons/home.png')}
                style={{width: 20, height: 20}}
              />
              <View style={{width: '75%'}}>
                <CustomText variant="h8" fontFamily={Fonts.Medium}>
                  Deliverying to Home
                </CustomText>
                <CustomText
                  variant="h9"
                  numberOfLines={2}
                  style={{opacity: 0.6}}>
                  {user?.address}
                </CustomText>
              </View>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <CustomText
                variant="h8"
                style={{color: Colors.secondary}}
                fontFamily={Fonts.Medium}>
                Change
              </CustomText>
            </TouchableOpacity>
          </View>
          <View style={styles.paymentGeteway}>
            <View style={{width: '30%'}}>
              <CustomText fontSize={RFValue(6)} fontFamily={Fonts.Regular}>
                💳 PAY USING
              </CustomText>
              <CustomText
                variant={'h8'}
                fontFamily={Fonts.Regular}
                style={{marginTop: 2}}>
                Cash on Delivery
              </CustomText>
            </View>
            <View style={{width: '70%'}}>
              <ArrowButton
                loading={loading}
                title="Place Order"
                price={total()}
                onPress={async () => {
                  await handlePlaceOrder();
                }}></ArrowButton>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  absoluteContainer: {
    marginVertical: 15,
    marginBottom: Platform.OS === 'ios' ? 30 : 10,
  },
  addressContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.7,
    borderBottomColor: Colors.border,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    paddingBottom: 250,
  },
  icon: {
    width: 25,
    height: 25,
  },
  flexRowBetween: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 15,
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  cancelText: {
    marginTop: 4,
    opacity: 0.6,
  },
  paymentGeteway: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 14,
  },
});
