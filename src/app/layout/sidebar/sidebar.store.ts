import { create } from 'zustand';

type SidebarState = {
  isExpanded: boolean;
  toggleExpanded: () => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  isExpanded: false,
  toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
}));
