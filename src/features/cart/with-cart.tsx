import React from 'react';
import {useCartStore} from '@/state/cart-store';
import {StyleSheet, View} from 'react-native';
import CartAnimation from './cart-animation';
import CartSummary from './cart-summary';

const WithCart = <P extends object>(Component: React.ComponentType<P>) => {
  const WithCartComponent = (props: P) => {
    const cart = useCartStore(state => state.cart);
    const cartCount = cart.reduce((acc, item) => acc + item.count, 0);
    return (
      <View style={styles.container}>
        <Component {...props} />
        <CartAnimation cartCount={cartCount}>
          <CartSummary
            cartCount={cartCount}
            cartImage={cart[0]?.item.image || null}
          />
        </CartAnimation>
      </View>
    );
  };
  return WithCartComponent;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default WithCart;
