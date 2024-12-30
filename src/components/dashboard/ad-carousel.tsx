import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {adData} from '@/utils/dummyData';
import Carousel from 'react-native-reanimated-carousel';
import {screenWidth} from '@/utils/Scaling';
import {useSharedValue} from 'react-native-reanimated';
import ScalePress from '../ui/scale-press';

type Props = {
  adData: typeof adData;
};
const AdCarousel = ({adData}: Props) => {
  const progressValue = useSharedValue(0);
  const baseOptions = {
    vertical: false,
    width: screenWidth,
    height: screenWidth * 0.5,
  };
  return (
    <View style={styles.view}>
      <Carousel
        {...baseOptions}
        loop
        snapEnabled
        autoPlay
        autoPlayInterval={3000}
        mode="parallax"
        data={adData}
        scrollAnimationDuration={1000}
        modeConfig={{
          parallaxScrollingOffset: 0,
          parallaxScrollingScale: 0.94,
        }}
        renderItem={({item}) => (
          <ScalePress style={styles.imageContainer}>
            <Image source={item} style={styles.img} />
          </ScalePress>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  view: {left: -20, marginVertical: 20},
  imageContainer: {
    height: '100%',
    width: '100%',
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
});
export default AdCarousel;
