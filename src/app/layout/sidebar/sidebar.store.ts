import { create } from 'zustand';
import { TMenuItem } from './models/menu-item.model';

type SidebarState = {
  isExpanded: boolean;
  // TODO: change to currentActiveItems to active parents when their child is active
  currentActiveItem: TMenuItem['id'];
  toggleExpanded: () => void;
  setActiveItem: (itemId: TMenuItem['id']) => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  isExpanded: false,
  currentActiveItem: '',
  toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
  setActiveItem: (itemId) => set({ currentActiveItem: itemId }),
}));
