import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
import { TUser } from './models/user.model';

type TAuthData = {
  user: TUser | null;
  access_token(): string | null;
  setUser: (user: TUser, access_token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<TAuthData>()((set) => ({
  user: null,
  access_token: () => localStorage.getItem('access_token') || null,
  setUser: (user, access_token) => {
    if (!access_token) return;
    localStorage.setItem('access_token', access_token);
    set({ user });
  },
  logout: () => {
    localStorage.removeItem('access_token');
    set({ user: null });
  },
}));
