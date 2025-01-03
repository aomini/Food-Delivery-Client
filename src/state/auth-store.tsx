import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {mmkvStorage} from './storage';
import {User} from '@/types/user.types';
import {Order} from '@/types/order.types';

export type AuthStore = {
  user: User | null;
  setUser: (user: any) => void;
  setCurrentOrder: (order: Order | null) => void;
  currentOrder: Order | null;
  logout: () => void;
};
export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      user: null,
      currentOrder: null,
      setUser: user => set({user}),
      setCurrentOrder: order => set({currentOrder: order}),
      logout: () => {
        set({user: null});
        set({currentOrder: null});
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
