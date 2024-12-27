import {
  View,
  StyleSheet,
  Animated,
  Image,
  Text,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import React, {useRef} from 'react';
import {
  GestureHandlerRootView,
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  State,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import CustomerSafeAreaView from '@/components/shared/custom-safe-area-view';
import ProductSlider from '@/components/login/product-slider';
import {resetAndNavigate} from '@/utils/navigation-utils';
import CustomText from '@/components/ui/custom-text';
import {Colors, Fonts, lightColors} from '@/utils/Constants';
import CustomInput from '@/components/ui/custom-input';
import CustomButton from '@/components/ui/custom-button';
import {useKeyboardOffsetHeight} from '@/utils/useKeyboardOffsetHeight';
import {customerLogin} from '@/services/auth-service';

type SingleTypeOf<T extends any[]> = T extends (infer U)[] ? U : never;

const bottomColors = [...lightColors].reverse();

const CustomerLogin = () => {
  const [phone, setPhone] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [gestureSequence, setGestureSequence] = React.useState<
    Array<'left' | 'right' | 'up' | 'down'>
  >([]);
  const keyboardOffset = useKeyboardOffsetHeight();
  const animatedValue = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!keyboardOffset) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffset * 0.84,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [keyboardOffset, animatedValue]);

  const handlePanGesture = (
    event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>,
  ) => {
    if (event.nativeEvent.state === State.END) {
      const {translationX, translationY} = event.nativeEvent;
      let direction = 'left';
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        direction = translationY > 0 ? 'down' : 'up';
      }
      const sequence = [
        ...gestureSequence,
        direction as SingleTypeOf<typeof gestureSequence>,
      ];
      setGestureSequence(sequence);
      if (sequence.slice(-4).join('_') === 'up_down_right_left') {
        resetAndNavigate('delivery-login');
      }
    }
  };

  const handleAuth = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      await customerLogin(phone);
      resetAndNavigate('product-dashboard');
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <CustomerSafeAreaView>
        <View style={styles.container}>
          <ProductSlider />
          <PanGestureHandler onHandlerStateChange={handlePanGesture}>
            <Animated.ScrollView
              style={{transform: [{translateY: animatedValue}]}}
              bounces={false}
              keyboardDismissMode={'on-drag'}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.subContainer}>
              <LinearGradient colors={bottomColors} style={styles.gradient} />
              <View style={styles.content}>
                <Image
                  source={require('@/assets/images/logo.png')}
                  style={styles.logoImage}
                />
                <CustomText
                  variant="h2"
                  fontFamily={Fonts.Bold}
                  style={{textAlign: 'center'}}>
                  Welcome to <Text style={{color: 'red'}}>Nepal's</Text> Food
                  Delivery
                </CustomText>
                <CustomText
                  variant="h5"
                  fontFamily={Fonts.SemiBold}
                  style={styles.text}>
                  Log in or sign up
                </CustomText>
                <CustomInput
                  onChangeText={text => setPhone(text.slice(0, 10))}
                  onClear={() => setPhone('')}
                  value={phone}
                  left={
                    <CustomText
                      variant="h6"
                      fontFamily={Fonts.SemiBold}
                      style={styles.phoneText}>
                      + 977
                    </CustomText>
                  }
                  placeholder="Enter phone number"
                  inputMode="tel"
                  right
                />
                <CustomButton
                  title="Continue"
                  disabled={phone.length !== 10}
                  loading={loading}
                  onPress={handleAuth}
                />
              </View>
            </Animated.ScrollView>
          </PanGestureHandler>
        </View>
      </CustomerSafeAreaView>
      <View style={styles.footer}>
        <SafeAreaView>
          <CustomText fontSize={6}>
            By Continuing, you agree to our Terms of Service & Privacy Policy
          </CustomText>
        </SafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    paddingTop: 60,
    width: '100%',
    height: 180,
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
  phoneText: {
    marginLeft: 10,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 0,
  },

  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logoImage: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginVertical: 10,
  },
  footer: {
    borderTopWidth: 0.8,
    borderTopColor: Colors.border,
    paddingBottom: 10,
    zIndex: 22,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f9fc',
    width: '100%',
  },
});

export default CustomerLogin;
