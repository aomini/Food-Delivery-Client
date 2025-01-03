import {StyleSheet, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {screenWidth} from '@/utils/Scaling';
import {Colors, Fonts} from '@/utils/Constants';
import CustomText from '@/components/ui/custom-text';
import {useAuthStore} from '@/state/auth-store';
import {replace} from '@/utils/navigation-utils';

const OrderSuccess = () => {
  const {user} = useAuthStore();

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      replace('live-tracking');
    }, 2300);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        style={styles.LottieView}
        source={require('@/assets/animations/confirm.json')}
        autoPlay
        loop={false}
        duration={2000}
        speed={1}
        enableMergePathsAndroidForKitKatAndAbove
        hardwareAccelerationAndroid
      />
      <CustomText
        variant="h8"
        fontFamily={Fonts.SemiBold}
        style={styles.orderPlaceText}>
        Order Placed
      </CustomText>
      <View style={styles.deliveryContainer}>
        <CustomText
          variant="h4"
          fontFamily={Fonts.SemiBold}
          style={styles.deliveryText}>
          Delivering to Home
        </CustomText>
      </View>
      <CustomText
        variant="h8"
        style={styles.addressText}
        fontFamily={Fonts.Regular}>
        {user?.address || 'Somewhere, knowhere'}
      </CustomText>
    </View>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  LottieView: {
    height: 150,
    width: screenWidth * 0.6,
  },
  orderPlaceText: {
    opacity: 0.4,
    textTransform: 'uppercase',
  },
  deliveryContainer: {
    borderBottomWidth: 2,
    paddingBottom: 4,
    marginBottom: 5,
    borderColor: Colors.secondary,
  },
  deliveryText: {
    marginTop: 15,
    borderColor: Colors.secondary,
  },
  addressText: {
    opacity: 0.8,
    width: '80%',
    textAlign: 'center',
    marginTop: 10,
  },
});
