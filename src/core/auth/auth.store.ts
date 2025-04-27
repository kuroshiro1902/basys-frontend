import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import { TUser } from '../user/models/user.model';
import { getMe } from './auth.service';
import { ACCESS_TOKEN_KEY } from './constants/access-token-key.const';

type TAuthData = {
  user: TUser | null;
  setUser: (user: TUser | string) => void;
  logout: () => void;
};

export const useAuthStore = create<TAuthData>()((set) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  let initialUser: TUser | null = null;
  if (accessToken) {
    try {
      initialUser = jwtDecode<TUser>(accessToken);
      console.log('initialUser', initialUser);
    } catch (error) {
      getMe();
    }
  }
  else {
    getMe();
  }
  
  return {
    user: initialUser,
    setUser: (user: TUser | string) => {
      if (typeof user === 'string') {
        const decoded = jwtDecode<TUser>(user);
        localStorage.setItem(ACCESS_TOKEN_KEY, user);
        set({ user: decoded });
      } else {
        set({ user });
      }
    },
    logout: () => {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      set({ user: null });
    },
  };
});
