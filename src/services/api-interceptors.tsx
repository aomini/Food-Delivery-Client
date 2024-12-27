import axios from 'axios';
import {BASE_URL} from './config';
import {tokenStorage} from '@/state/storage';
import {refreshAccessToken} from './auth-service';
import {Alert} from 'react-native';

export const appAxios = axios.create({
  baseURL: BASE_URL,
});

appAxios.interceptors.request.use(config => {
  const accessToken = tokenStorage.getString('access_token');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

appAxios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      try {
        const accessToken = tokenStorage.getString('access_token');
        if (accessToken) {
          const newAccessToken = await refreshAccessToken(accessToken);
          if (newAccessToken) {
            error.config.headers.Authorization = `Bearer ${accessToken}`;
            return axios(error.config);
          }
        }
      } catch {
        console.log('error refreshing token');
      }
    }

    if (error.response && error.response.status !== 401) {
      const errorMessage =
        error.response.data.message || 'Something went wrong';
      Alert.alert(errorMessage);
    }
    return Promise.reject(error);
  },
);
