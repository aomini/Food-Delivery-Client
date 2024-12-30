import {View, StyleSheet} from 'react-native';
import React from 'react';
import {adData, categories} from '@/utils/dummyData';
import AdCarousel from './ad-carousel';
import CustomText from '../ui/custom-text';
import {Fonts} from '@/utils/Constants';
import CategoryContainer from './category-container';

const ContentContainer = () => {
  return (
    <View style={styles.container}>
      <AdCarousel adData={adData} />
      <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
        Grocery & Kitchen Items
      </CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
        Best Sellers
      </CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
        Snacks & Drinks
      </CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
        Home & lifeStyle
      </CustomText>
      <CategoryContainer data={categories} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
export default ContentContainer;
