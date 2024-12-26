import {useCollapsibleContext} from '@r0b0t3d/react-native-collapsible';
import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import CustomText from '../ui/custom-text';
import {Fonts} from '@/utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAuthStore} from '@/state/auth-store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  onShowNotice: () => void;
};
const AnimatedHeader = ({onShowNotice}: Props) => {
  const {scrollY} = useCollapsibleContext();

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 120], [1, 0]);
    return {opacity};
  });

  return (
    <Animated.View style={headerAnimatedStyle}>
      <Header onShowNotice={onShowNotice} />
    </Animated.View>
  );
};
export default AnimatedHeader;

const Header = ({onShowNotice}: Props) => {
  const {setUser, user} = useAuthStore();

  return (
    <View style={styles.subContainer}>
      <TouchableOpacity activeOpacity={0.8}>
        <CustomText fontFamily={Fonts.Bold} variant="h8" style={styles.text}>
          Delivery in
        </CustomText>
        <View style={styles.flexRowGap}>
          <CustomText
            fontFamily={Fonts.SemiBold}
            variant="h2"
            style={styles.text}>
            10 minutes
          </CustomText>
          <TouchableOpacity style={styles.noticeButton} onPress={onShowNotice}>
            <CustomText
              fontSize={RFValue(12)}
              fontFamily={Fonts.SemiBold}
              style={{color: '#3b4886'}}>
              ⛈️ Rain
            </CustomText>
          </TouchableOpacity>
        </View>
        <View style={styles.flexRow}>
          <CustomText
            variant="h8"
            numberOfLines={1}
            fontFamily={Fonts.Medium}
            style={styles.text2}>
            {user?.address || 'knowhere, somewhere'}
          </CustomText>
          <Icon
            name="menu-down"
            color={'#fff'}
            size={RFValue(20)}
            style={{bottom: -2}}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon
          name="account-circle-outline"
          size={RFValue(36)}
          color={'white'}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'android' ? 10 : 5,
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
  },
  text2: {color: 'white'},
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    width: '70%',
  },
  flexRowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  noticeButton: {
    backgroundColor: '#e8eaf5',
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    bottom: -2,
  },
});
