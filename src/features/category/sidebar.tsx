import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import {Category} from '@/types/category.types';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CustomText from '@/components/ui/custom-text';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '@/utils/Constants';

type Props = {
  categories: Category[];
  selectedCategory: Category | null;
  onCategoryPress: (x: Category) => void;
};

const Sidebar = ({categories, selectedCategory, onCategoryPress}: Props) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const indicatorPosition = useSharedValue(0);
  const animatedValues = useSharedValue(0);

  React.useEffect(() => {
    let targetIndex = -1;
    categories.forEach((category, index) => {
      const isSelected = selectedCategory?._id === category._id;
      animatedValues.value = withTiming(isSelected ? 2 : -15, {duration: 5000});
      if (isSelected) {
        targetIndex = index;
      }
    });

    if (targetIndex !== -1) {
      indicatorPosition.value = withTiming(targetIndex * 100, {duration: 500});
      runOnJS(() => {
        scrollViewRef.current?.scrollTo({
          y: targetIndex * 100,
          animated: true,
        });
      });
    }
  }, [selectedCategory, categories, animatedValues, indicatorPosition]);

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: indicatorPosition.value}],
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {bottom: animatedValues.value};
  });

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{paddingBottom: 50}}
        showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.indicator, indicatorStyle]} />
        <Animated.View>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onCategoryPress(category)}
              style={styles.categoryButton}
              activeOpacity={1}>
              <View
                style={[
                  styles.imageContainer,
                  selectedCategory?._id === category._id
                    ? styles.selectedImageCategory
                    : '',
                ]}>
                <Animated.Image
                  source={{uri: category.image}}
                  style={[styles.image, animatedStyle]}
                />
              </View>
              <CustomText fontSize={RFValue(7)} style={{textAlign: 'center'}}>
                {category.name}
              </CustomText>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '24%',
    backgroundColor: '#fff',
    borderRightWidth: 0.8,
    borderRightColor: '#eee',
    position: 'relative',
  },
  categoryButton: {
    padding: 10,
    height: 100,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imageContainer: {
    borderRadius: 100,
    height: '50%',
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f7',
    marginBottom: 10,
    overflow: 'hidden',
  },
  image: {
    height: '80%',
    width: '80%',
    resizeMode: 'contain',
  },
  selectedImageCategory: {
    backgroundColor: '#cfffdb',
  },
  indicator: {
    position: 'absolute',
    right: 0,
    width: 4,
    height: 80,
    top: 10,
    alignSelf: 'center',
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
});

export default Sidebar;
