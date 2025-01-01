import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {screenHeight, screenWidth} from '@/utils/Scaling';
import {Colors, Fonts} from '@/utils/Constants';
import CustomText from '@/components/ui/custom-text';
import {navigate} from '@/utils/navigation-utils';

type Props = {
  cartCount: number;
  cartImage: string | null;
};

const CartSummary = ({cartCount, cartImage}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexRowGap}>
        <Image
          source={
            cartImage ? {uri: cartImage} : require('@/assets/icons/bucket.png')
          }
          style={styles.image}
        />
        <CustomText variant="h6" fontFamily={Fonts.SemiBold}>
          {cartCount} ITEM{cartCount > 1 ? 'S' : ''}
        </CustomText>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigate('checkout')}
        activeOpacity={0.7}>
        <CustomText
          style={styles.btnText}
          variant="h6"
          fontFamily={Fonts.Medium}>
          Next
        </CustomText>
        {/* <Icon name="arrow-right" color="#fff" size={RFValue(25)} /> */}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: screenWidth * 0.05,
    paddingBottom: screenHeight * 0.03,
    paddingTop: screenHeight * 0.014,
  },
  flexRowGap: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: screenWidth * 0.03,
  },
  image: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    borderRadius: screenWidth * 0.025,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: screenHeight * 0.01,
    backgroundColor: Colors.secondary,
    paddingHorizontal: screenWidth * 0.1,
    borderRadius: screenWidth * 0.025,
  },
  btnText: {
    marginLeft: screenWidth * 0.02,
    color: '#fff',
  },
});
export default CartSummary;
