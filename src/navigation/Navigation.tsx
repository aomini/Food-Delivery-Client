import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '@/features/auth/splash-screen';
import {navigationRef} from '@/utils/navigation-utils';
import CustomerLogin from '@/features/auth/customer-login';
import DeliveryLogin from '@/features/auth/delivery-login';

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
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
