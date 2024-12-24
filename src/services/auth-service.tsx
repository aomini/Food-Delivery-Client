import axios from 'axios';
import {BASE_URL} from './config';
import {tokenStorage} from '@/state/storage';
import {useAuthStore} from '@/state/auth-store';
import {User, Customer} from '@/types/user.types';

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
    setUser(response.data.customer);
    console.log(customer);
  } catch (error: unknown) {
    console.log('login error', error);
  }
};
