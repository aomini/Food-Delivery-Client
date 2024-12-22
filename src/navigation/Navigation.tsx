import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '@/features/auth/splash-screen';

const RootStack = createNativeStackNavigator();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="splash-screen"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen name="splash-screen" component={SplashScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
