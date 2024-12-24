import React from 'react';
import {Keyboard} from 'react-native';

export const useKeyboardOffsetHeight = () => {
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    const $androidKeyboardShow = Keyboard.addListener('keyboardDidShow', e => {
      setOffset(e.endCoordinates.height);
    });

    const $androidKeyboardHide = Keyboard.addListener('keyboardDidHide', () => {
      setOffset(0);
    });

    const $iosKeyboardShow = Keyboard.addListener('keyboardDidShow', e => {
      setOffset(e.endCoordinates.height);
    });

    const $iosKeyboardHide = Keyboard.addListener('keyboardDidHide', () => {
      setOffset(0);
    });

    return () => {
      $androidKeyboardShow.remove();
      $androidKeyboardHide.remove();
      $iosKeyboardShow.remove();
      $iosKeyboardHide.remove();
    };
  }, []);

  return offset;
};
