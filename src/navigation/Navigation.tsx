import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '@/features/auth/splash-screen';
import {navigationRef} from '@/utils/navigation-utils';
import CustomerLogin from '@/features/auth/customer-login';
import ProductDashboard from '@/features/dashboard/product-dashboard';
import DeliveryDashboard from '@/features/delivery/delivery-dashboard';
import DeliveryLogin from '@/features/auth/delivery-login';
import ProductCategories from '@/features/category/product-categories';
import Checkout from '@/features/checkout/checkout';
import OrderSuccess from '@/features/checkout/order-success';
import LiveTracking from '@/features/map/live-tracking';

const RootStack = createNativeStackNavigator();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        initialRouteName="splash-screen"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen name="splash-screen" component={SplashScreen} />
        <RootStack.Screen
          name="delivery-login"
          component={DeliveryLogin}
          options={{
            animation: 'fade',
          }}
        />
        <RootStack.Screen
          name="customer-login"
          component={CustomerLogin}
          options={{
            animation: 'fade',
          }}
        />
        <RootStack.Screen
          name="product-dashboard"
          component={ProductDashboard}
          options={{
            animation: 'slide_from_left',
          }}
        />
        <RootStack.Screen
          name="delivery-dashboard"
          component={DeliveryDashboard}
          options={{
            animation: 'slide_from_left',
          }}
        />
        <RootStack.Screen
          name="product-categories"
          component={ProductCategories}
          options={{
            animation: 'fade',
          }}
        />
        <RootStack.Screen
          name="checkout"
          component={Checkout}
          options={{
            animation: 'fade',
          }}
        />
        <RootStack.Screen
          name="order-success"
          component={OrderSuccess}
          options={{
            animation: 'fade',
          }}
        />
        <RootStack.Screen
          name="live-tracking"
          component={LiveTracking}
          options={{
            animation: 'fade',
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
