import {hocStyles} from '@/styles/global-styles';
import React, {PropsWithChildren, useRef} from 'react';
import {Animated} from 'react-native';

type Props = {
  cartCount: number;
};

const CartAnimation = ({cartCount, children}: PropsWithChildren<Props>) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [hasAnimated, setAnimated] = React.useState(false);

  React.useEffect(() => {
    if (cartCount > 0 && !hasAnimated) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setAnimated(true));
    } else if (cartCount === 0 && hasAnimated) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setAnimated(false));
    }
  }, [slideAnim, hasAnimated, cartCount]);

  const slideUpStyle = {
    transform: [
      {
        translateY: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }),
      },
    ],
    opacity: slideAnim,
  };

  return (
    <Animated.View style={[hocStyles.CategoryContainer, slideUpStyle]}>
      {children}
    </Animated.View>
  );
};

export default CartAnimation;
