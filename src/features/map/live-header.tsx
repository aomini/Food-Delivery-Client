import {Pressable, SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {navigate} from '@/utils/navigation-utils';
import {useAuthStore} from '@/state/auth-store';
import CustomText from '@/components/ui/custom-text';
import {Fonts} from '@/utils/Constants';

type Props = {
  type: 'customer' | 'delivery';
  title: string;
  subTitle: string;
};

const LiveHeader = ({title, subTitle, type}: Props) => {
  const isCustomer = type === 'customer';
  const {currentOrder, setCurrentOrder} = useAuthStore();

  const handleBack = () => {
    if (isCustomer) {
      navigate('product-dashboard');
      if (currentOrder?.status === 'delivered') {
        setCurrentOrder(null);
      }
      return void 0;
    }
    navigate('delivery-dashboard');
  };

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Pressable style={styles.backBtn} onPress={handleBack}>
          <Icon
            name="chevron-back"
            color={isCustomer ? 'white' : 'black'}
            size={RFValue(16)}
          />
        </Pressable>
        <CustomText
          variant="h8"
          fontFamily={Fonts.Medium}
          style={isCustomer ? styles.textWhite : styles.textBlack}>
          {title}
        </CustomText>
        <CustomText
          variant="h4"
          fontFamily={Fonts.SemiBold}
          style={isCustomer ? styles.textWhite : styles.textBlack}>
          {subTitle}
        </CustomText>
      </View>
    </SafeAreaView>
  );
};

export default LiveHeader;

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
  },
  backBtn: {
    position: 'absolute',
    left: 20,
  },
  textWhite: {
    color: 'white',
  },
  textBlack: {
    color: 'black',
  },
});
