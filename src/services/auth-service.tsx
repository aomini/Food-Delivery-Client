import axios from 'axios';
import {BASE_URL} from './config';
import {tokenStorage} from '@/state/storage';
import {useAuthStore} from '@/state/auth-store';
import {User, Customer} from '@/types/user.types';
import {resetAndNavigate} from '@/utils/navigation-utils';
import {appAxios} from './api-interceptors';

type CustomerLoginResponse = {
  accessToken: string;
  refreshToken: string;
  customer: User<Customer>;
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
    const response = await appAxios.get<{user: User}>('/user');
    const {user} = response.data;
    const {setUser} = useAuthStore.getState();
    setUser(user);
  } catch (error: unknown) {
    console.log('User fetch erro', error);
  }
};
