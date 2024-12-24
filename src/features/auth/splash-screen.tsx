import React from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {Colors} from '@/utils/Constants';
import {screenHeight, screenWidth} from '@/utils/Scaling';
import Logo from '@/assets/images/splash_logo.jpeg';
import Geolocation from '@react-native-community/geolocation';
import {useAuthStore} from '@/state/auth-store';
import {tokenStorage} from '@/state/storage';
import {useNavigation} from '@react-navigation/native';
import {resetAndNavigate} from '@/utils/navigation-utils';

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

const SplashScreen: React.FC = () => {
  const {user, setUser} = useAuthStore();
  const navigation = useNavigation();

  const tokenCheck = async () => {
    console.log(user, '@@@');
    const accessToken = await tokenStorage.getString('access_token');
    const refreshToken = await tokenStorage.getString('refresh_token');
    if (accessToken) {
      // return resetAndNavigate('product-dashboard');
    }
    resetAndNavigate('customer-login');
    return false;
  };

  React.useEffect(() => {
    const fetchUserLocation = () => {
      try {
        Geolocation.requestAuthorization();
        tokenCheck();
      } catch (err) {
        Alert.alert(
          'Error',
          'Sorry we need location to give you better experience',
        );
      }
    };

    const timeout = setTimeout(fetchUserLocation, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  logo: {
    height: screenHeight * 0.7,
    width: screenWidth * 0.7,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default SplashScreen;
