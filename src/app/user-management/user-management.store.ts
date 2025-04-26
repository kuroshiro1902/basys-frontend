import { create } from 'zustand';

type UserManagementData = {
  state: any;
  setState: (state: any) => void;
};

export const useUserManagementStore = create<UserManagementData>((set) => ({
  state: null,
  setState: (newState) => set({ state: newState }),
}));
