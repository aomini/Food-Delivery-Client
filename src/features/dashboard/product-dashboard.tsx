import {
  Animated,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ReAnimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import React, {useEffect, useRef} from 'react';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  useCollapsibleContext,
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
import Icon from 'react-native-vector-icons/Ionicons';
import {screenHeight} from '@/utils/Scaling';

const ProductDashboard = () => {
  const {scrollY, expand} = useCollapsibleContext();
  const previousScroll = useRef(0);
  const noticePosition = useRef(new Animated.Value(NOTICE_HEIGHT)).current;

  const backToTopStyles = useAnimatedStyle(() => {
    const isScrollingUp =
      scrollY.value < previousScroll.current && scrollY.value > 180;
    const opacity = withTiming(isScrollingUp ? 1 : 0, {duration: 300});
    const translateY = withTiming(isScrollingUp ? 0 : 10, {duration: 300});

    previousScroll.current = scrollY.value;

    return {opacity, transform: [{translateY}]};
  });

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
        <ReAnimated.View style={[styles.backToTop, backToTopStyles]}>
          <TouchableOpacity
            onPress={() => {
              scrollY.value = 0;
              expand();
            }}
            style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
            <Icon
              name="arrow-up-circle-outline"
              size={RFValue(12)}
              color={'white'}
            />
            <CustomText
              variant="h9"
              style={{color: 'white'}}
              fontFamily={Fonts.SemiBold}>
              Back to Top
            </CustomText>
          </TouchableOpacity>
        </ReAnimated.View>
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
                fontSize={RFValue(26)}
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
  backToTop: {
    position: 'absolute',
    alignSelf: 'center',
    top: Platform.OS === 'ios' ? screenHeight * 0.18 : 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 999,
  },
});

export default withCollapsibleContext(ProductDashboard);
