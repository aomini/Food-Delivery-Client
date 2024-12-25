import React from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {jwtDecode} from 'jwt-decode';
import {Colors} from '@/utils/Constants';
import {screenHeight, screenWidth} from '@/utils/Scaling';
import Logo from '@/assets/images/splash_logo.jpeg';
import Geolocation from '@react-native-community/geolocation';
import {useAuthStore} from '@/state/auth-store';
import {tokenStorage} from '@/state/storage';
import {resetAndNavigate} from '@/utils/navigation-utils';
import {refetchUser, refreshAccessToken} from '@/services/auth-service';

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

type DecodedToken = {
  exp: number;
};

const SplashScreen: React.FC = () => {
  const {user} = useAuthStore();

  const tokenCheck = React.useCallback(async () => {
    const accessToken = tokenStorage.getString('access_token');
    const refreshToken = tokenStorage.getString('refresh_token');
    if (accessToken) {
      const decodedToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken || '');
      const currentTime = Date.now() / 1000;
      if (decodedRefreshToken.exp < currentTime) {
        Alert.alert('Session expired', 'Please login again');
        return resetAndNavigate('customer-login');
      } else if (refreshToken && decodedToken.exp > currentTime) {
        try {
          await refreshAccessToken(refreshToken);
          await refetchUser();
        } catch (error: unknown) {
          console.log(error);
          return Alert.alert("Couldn't login you at the moment");
        }
      }
      return resetAndNavigate(
        user?.role === 'customer' ? 'product-dashboard' : 'delivery-dashboard',
      );
    }
    resetAndNavigate('customer-login');
    return false;
  }, [user?.role]);

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
  }, [tokenCheck]);

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
