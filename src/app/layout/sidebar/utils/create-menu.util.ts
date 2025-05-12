import { TPermission } from '@/core/permission/models/permission.model';
import { TMenuItem } from '../models/menu-item.model';
import { EPermission } from '@/core/permission/constants/permission.const';
import { MENU } from '../constants/menu.constant';

export const createMenu = (permissionIds: TPermission['id'][]): TMenuItem[] => {
  const menuMap: Record<string, TMenuItem[]> = {};
  if (permissionIds.length === 0) {
    return MENU[EPermission.user];
  }

  for (const permissionId of permissionIds) {
    menuMap[permissionId] = MENU[permissionId as EPermission];
  }

  return Object.values(menuMap).flat();
};
