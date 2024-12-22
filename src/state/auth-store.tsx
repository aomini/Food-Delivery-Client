import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {mmkvStorage} from './storage';

export type AuthStore = {
  user: Record<string, any> | null;
  setUser: (user: any) => void;
  setCurrentOrder: (order: any) => void;
  currentOrder: Record<string, any> | null;
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
