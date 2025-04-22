import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import { TUser } from './models/user.model';

type TAuthData = {
  user: TUser | null;
  access_token(): string | null;
  setUser: (access_token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<TAuthData>()((set) => {
  const accessToken = localStorage.getItem('access_token');
  let initialUser: TUser | null = null;
  if (accessToken) {
    try {
      initialUser = jwtDecode<TUser>(accessToken);
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  }

  return {
    user: initialUser,
    access_token: () => accessToken || null,
    setUser: (access_token) => {
      if (!access_token) return;
      const user = jwtDecode<TUser>(access_token);
      localStorage.setItem('access_token', access_token);
      set({ user });
    },
    logout: () => {
      localStorage.removeItem('access_token');
      set({ user: null });
    },
  };
});
