import {Alert, Animated, StyleSheet, Text} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import NoticeAnimation, {
  NOTICE_HEIGHT,
} from '../../components/dashboard/notice-animation';
import Visuals from '../../components/dashboard/visuals';
import AnimatedHeader from '@/components/dashboard/animated-header';
import {SafeAreaView} from 'react-native-safe-area-context';
import StickySearchBar from './sticky-search-bar';

const ProductDashboard = () => {
  const noticePosition = useRef(new Animated.Value(NOTICE_HEIGHT)).current;
  // const noticePosition = useRef(new Animated.Value(0)).current;

  const slideUp = React.useCallback(() => {
    Animated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, [noticePosition]);

  const slideDown = React.useCallback(() => {
    Animated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, [noticePosition]);

  const noticeAnimation = React.useCallback(() => {
    slideDown();
    const timeoutId = setTimeout(() => {
      slideUp();
    }, 3500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [slideUp, slideDown]);

  useEffect(() => {
    slideDown();
    const timeoutId = setTimeout(() => {
      slideUp();
    }, 3500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [slideUp, slideDown]);

  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />
        <SafeAreaView />
        <CollapsibleContainer style={styles.panelContainer}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <AnimatedHeader onShowNotice={noticeAnimation} />
            <StickySearchBar />
          </CollapsibleHeaderContainer>
        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
};

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
});

export default withCollapsibleContext(ProductDashboard);
