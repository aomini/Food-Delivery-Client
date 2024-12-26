// src/types/react-native-rolling-bar.d.ts
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

declare module 'react-native-rolling-bar' {
  export interface Props {
    interval: number;
    customStyle?: StyleProp<ViewStyle>;
    animationDuration?: number;
    delayBetween?: number;
    defaultStyle?: boolean;
    forceRoll?: boolean;
    children?: React.ReactNode;
  }

  const RollingBar: React.FC<Props>;
  export default RollingBar;
}
