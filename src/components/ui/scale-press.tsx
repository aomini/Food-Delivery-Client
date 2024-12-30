import {Animated, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import React, {PropsWithChildren} from 'react';

const ScalePress = ({
  children,
  ...props
}: PropsWithChildren<TouchableOpacityProps>) => {
  const scaleValue = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.92,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  return (
    <TouchableOpacity
      {...props}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={1}>
      <Animated.View
        style={[{transform: [{scale: scaleValue}], width: '100%'}]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ScalePress;
