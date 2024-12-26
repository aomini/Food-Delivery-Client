import {View, Text, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import NoticeAnimation, {NOTICE_HEIGHT} from './notice-animation';

const ProductDashboard = () => {
  const noticePosition = useRef(new Animated.Value(NOTICE_HEIGHT)).current;
  // const noticePosition = useRef(new Animated.Value(0)).current;

  const slideUp = () => {
    Animated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    slideDown();
    const timeoutId = setTimeout(() => {
      slideUp();
    }, 3500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <View>
        <Text>ProductDashboard</Text>
      </View>
    </NoticeAnimation>
  );
};

export default ProductDashboard;
