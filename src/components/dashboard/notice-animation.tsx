import {View, StyleSheet, Animated} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {noticeHeight} from '@/utils/Scaling';
import Notice from '@/components/dashboard/notice';

type Props = {
  noticePosition: Animated.Value;
};

export const NOTICE_HEIGHT = -(noticeHeight + 12);

const NoticeAnimation = ({
  noticePosition,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.noticeContainer,
          {
            transform: [{translateY: noticePosition}],
          },
        ]}>
        <Notice />
      </Animated.View>
      <Animated.View
        style={[
          styles.contentContainer,
          {
            paddingTop: noticePosition.interpolate({
              inputRange: [NOTICE_HEIGHT, 0],
              outputRange: [0, Math.abs(NOTICE_HEIGHT)],
              // inputRange: [NOTICE_HEIGHT, 0],
              // outputRange: [0, NOTICE_HEIGHT + 20],
            }),
          },
        ]}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  noticeContainer: {
    width: '100%',
    zIndex: 999,
    position: 'absolute',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
  },
});
export default NoticeAnimation;
