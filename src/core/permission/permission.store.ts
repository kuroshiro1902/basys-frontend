import { create } from 'zustand';
import { TPermission } from './models/permission.model';
type PermissionData = {
  permissions: TPermission[];
  setPermissions: (permissions: TPermission[]) => void;
};

export const usePermissionStore = create<PermissionData>((set) => ({
  permissions: [],
  setPermissions: (permissions: TPermission[]) => set({ permissions }),
}));
