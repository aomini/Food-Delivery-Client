import {Animated, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import NoticeAnimation, {
  NOTICE_HEIGHT,
} from '../../components/dashboard/notice-animation';
import Visuals from '../../components/dashboard/visuals';
import AnimatedHeader from '@/components/dashboard/animated-header';
import StickySearchBar from './sticky-search-bar';
import CustomerSafeAreaView from '@/components/shared/custom-safe-area-view';
import ContentContainer from '@/components/dashboard/content-container';
import CustomText from '@/components/ui/custom-text';
import {RFValue} from 'react-native-responsive-fontsize';
import {Fonts} from '@/utils/Constants';

const ProductDashboard = () => {
  const noticePosition = useRef(new Animated.Value(NOTICE_HEIGHT)).current;

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
      <CustomerSafeAreaView>
        <Visuals />
        <CollapsibleContainer style={styles.panelContainer}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <AnimatedHeader onShowNotice={noticeAnimation} />
            <StickySearchBar />
          </CollapsibleHeaderContainer>
          <CollapsibleScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            style={styles.panelContainer}>
            <ContentContainer />
            <View style={styles.bottomContent}>
              <CustomText
                fontSize={RFValue(32)}
                fontFamily={Fonts.Bold}
                style={{opacity: 0.2}}>
                Nepal's last minute app 🥭
              </CustomText>
              <CustomText
                fontFamily={Fonts.Bold}
                style={{marginTop: 10, paddingBottom: 100, opacity: 0.2}}>
                Developed by 💓 rakesh Shrestha
              </CustomText>
            </View>
          </CollapsibleScrollView>
        </CollapsibleContainer>
      </CustomerSafeAreaView>
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
  bottomContent: {
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
});

export default withCollapsibleContext(ProductDashboard);
