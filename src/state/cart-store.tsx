import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {mmkvStorage} from './storage';
import {Product} from '@/types/category.types';

export type CartItem = {
  _id: string | number;
  item: Product;
  count: number;
};

type CartStore<T = CartItem, K = Product> = {
  cart: Array<T>;
  insert: (item: K) => void;
  erase: (id: string | number) => void;
  clear: () => void;
  size: (id: string | number) => number;
  total: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      insert(item) {
        const cart = get().cart;
        const exists = cart.findIndex(cartItem => cartItem?._id === item._id);
        if (exists >= 0) {
          const updatedCart = [...cart];
          updatedCart[exists] = {
            ...updatedCart[exists],
            count: updatedCart[exists].count + 1,
          };
          set({cart: updatedCart});
        } else set({cart: [...cart, {_id: item._id, item, count: 1}]});
      },
      erase(id) {
        const cart = get().cart;
        const exists = cart.findIndex(cartItem => cartItem?._id === id);
        if (exists >= 0) {
          const updatedCart = [...cart];
          updatedCart[exists] = {
            ...updatedCart[exists],
            count: updatedCart[exists].count - 1,
          };
          set({cart: updatedCart});
        } else set({cart: cart.filter(cartItem => cartItem._id !== id)});
      },
      clear() {
        set({cart: []});
      },
      size(id) {
        return get().cart.find(cartItem => cartItem._id === id)?.count || 0;
      },
      total() {
        return get().cart.reduce(
          (acc, item) => acc + item.item.price * item.count,
          0,
        );
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
