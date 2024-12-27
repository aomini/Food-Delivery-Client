import axios from 'axios';
import {BASE_URL} from './config';
import {tokenStorage} from '@/state/storage';
import {useAuthStore} from '@/state/auth-store';
import {User, Customer, DeliveryPartner} from '@/types/user.types';
import {resetAndNavigate} from '@/utils/navigation-utils';
import {appAxios} from './api-interceptors';

type CustomerLoginResponse<
  U extends 'customer' | 'deliveryPartner' = 'customer',
  T = Customer,
> = {
  accessToken: string;
  refreshToken: string;
} & {
  [K in U]: User<T>;
};

export const customerLogin = async (phone: string) => {
  try {
    const response = await axios.post<CustomerLoginResponse>(
      `${BASE_URL}/customer/login`,
      {phone},
    );
    const {accessToken, refreshToken, customer} = response.data;
    tokenStorage.set('access_token', accessToken);
    tokenStorage.set('refresh_token', refreshToken);
    const {setUser} = useAuthStore.getState();
    setUser(customer);
  } catch (error: unknown) {
    console.log('login error', error);
  }
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await axios.post<
      Pick<CustomerLoginResponse, 'accessToken' | 'refreshToken'>
    >(`${BASE_URL}/refresh-token`, {refreshToken});
    const {accessToken, refreshToken: nextRefreshToken} = response.data;
    tokenStorage.set('access_token', accessToken);
    tokenStorage.set('refresh_token', nextRefreshToken);
    return accessToken;
  } catch (error: unknown) {
    console.log('Refresh Token Error', error);
    tokenStorage.clearAll();
    resetAndNavigate('customer-login');
  }
};

export const refetchUser = async () => {
  try {
    const response = await appAxios.get<{user: User}>('/me');
    const {user} = response.data;
    const {setUser} = useAuthStore.getState();
    setUser(user);
  } catch (error: unknown) {
    console.log('User fetch error', error);
  }
};

/** Delivery Partner login */
type DeliveryLoginArgs = {
  email: string;
  password: string;
};

export const deliveryLogin = async ({email, password}: DeliveryLoginArgs) => {
  try {
    const response = await axios.post<
      CustomerLoginResponse<'deliveryPartner', DeliveryPartner>
    >(`${BASE_URL}/delivery-partner/login`, {
      email,
      password,
    });
    const {accessToken, refreshToken, deliveryPartner} = response.data;
    tokenStorage.set('access_token', accessToken);
    tokenStorage.set('refresh_token', refreshToken);
    const {setUser} = useAuthStore.getState();
    setUser(deliveryPartner);
  } catch (error: unknown) {
    console.log('login error', error);
    throw error;
  }
};
