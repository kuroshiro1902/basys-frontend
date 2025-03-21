import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { TUser } from './models/user.model';

type TAuthData = {
  user: TUser | null;
  access_token: string | null;
  setUser: (user: TUser, token: string) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
};

// Tạo Zustand store với middleware persist
export const useAuthStore = create<TAuthData>()(
  persist(
    (set) => ({
      user: null,
      access_token: null,
      setUser: (user, token) => set({ user, access_token: token }),
      setAccessToken: (token) => set({ access_token: token }),
      logout: () => set({ user: null, access_token: null }),
    }),
    { name: 'auth-store', storage: createJSONStorage(() => localStorage) },
  ),
);
