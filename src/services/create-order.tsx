import {Order, OrderPayload} from '@/types/order.types';
import {appAxios} from './api-interceptors';

export const createOrder = async (
  items: Array<OrderPayload['items']>,
  totalPrice: number,
) => {
  try {
    const response = await appAxios.post<Order>('/orders', {
      items,
      totalPrice,
      branch: '6777f00d5009af66aeabbcc8',
    });
    return response.data;
  } catch (error: unknown) {
    console.log('Unable to create order', error);
  }
};

export const getCurrentOrderById = async (id?: Order['_id']) => {
  try {
    if (!id) {
      throw 'No active orders';
    }
    const response = await appAxios.get<Order>('/orders/' + id);
    return response.data;
  } catch (error: unknown) {
    console.log('Unable to fetch order', error);
  }
};
