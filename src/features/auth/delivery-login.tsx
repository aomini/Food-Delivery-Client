import {View, Alert, StyleSheet, ScrollView} from 'react-native';
import {z} from 'zod';
import LottieView from 'lottie-react-native';
import CustomerSafeAreaView from '@/components/shared/custom-safe-area-view';
import CustomButton from '@/components/ui/custom-button';
import {screenHeight} from '@/utils/Scaling';
import React from 'react';
import CustomText from '@/components/ui/custom-text';
import {Fonts} from '@/utils/Constants';
import CustomInput from '@/components/ui/custom-input';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {deliveryLogin} from '@/services/auth-service';
import {resetAndNavigate} from '@/utils/navigation-utils';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const DeliveryLogin = () => {
  const [formData, setData] = React.useState<z.infer<typeof loginSchema>>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (key: keyof typeof formData, text: string) => {
    setData(data => ({
      ...data,
      [key]: text,
    }));
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const data = loginSchema.safeParse(formData);
      if (data.error) {
        return Alert.alert('Validation Failed');
      }
      await deliveryLogin(data.data);
      resetAndNavigate('delivery-dashboard');
    } catch (error: unknown) {
      Alert.alert('Login failed');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomerSafeAreaView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag">
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <LottieView
              autoPlay
              loop
              style={styles.lottie}
              source={require('@/assets/animations/delivery_man.json')}
            />
          </View>
          <CustomText variant="h3" fontFamily={Fonts.Bold}>
            Delivery Partner Portal
          </CustomText>
          <CustomText
            variant="h6"
            style={styles.text}
            fontFamily={Fonts.SemiBold}>
            Faster than Flash
          </CustomText>

          <CustomInput
            onChangeText={text => handleChange('email', text)}
            value={formData.email}
            left={
              <Icon
                name="mail"
                color="#f8890e"
                style={styles.icon}
                size={RFValue(18)}
              />
            }
            placeholder="Email"
            right={false}
            inputMode="email"
          />
          <CustomInput
            onChangeText={text => handleChange('password', text)}
            value={formData.password}
            left={
              <Icon
                name="key-sharp"
                color="#f8890e"
                style={styles.icon}
                size={RFValue(18)}
              />
            }
            placeholder="Password"
            right={false}
            inputMode="email"
          />
          <CustomButton
            onPress={handleLogin}
            disabled={!(formData.email && formData.password)}
            loading={loading}
            title="Login"
          />
        </View>
      </ScrollView>
    </CustomerSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    padding: 20,
    alignItems: 'center',
  },
  lottie: {
    height: '100%',
    width: '100%',
  },
  lottieContainer: {
    // height: screenHeight * 0.12,
    height: screenHeight * 0.12,
    width: '100%',
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
  icon: {
    marginLeft: 10,
  },
});

export default DeliveryLogin;
