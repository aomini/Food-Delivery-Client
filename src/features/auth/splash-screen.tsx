import React from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {Colors} from '@/utils/Constants';
import {screenHeight, screenWidth} from '@/utils/Scaling';
import Logo from '@/assets/images/splash_logo.jpeg';
import Geolocation from '@react-native-community/geolocation';

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

const SplashScreen: React.FC = () => {
  React.useEffect(() => {
    const fetchUserLocation = () => {
      try {
        Geolocation.requestAuthorization();
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
