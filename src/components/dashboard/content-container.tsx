import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {adData} from '@/utils/dummyData';
import AdCarousel from './ad-carousel';

const ContentContainer = () => {
  return (
    <View style={styles.container}>
      <AdCarousel adData={adData} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
export default ContentContainer;
