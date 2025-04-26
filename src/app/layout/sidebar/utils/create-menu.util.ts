import { TPermission } from '@/core/permission/models/permission.model';
import { TMenuItem } from '../models/menu-item.model';
import { EPermission } from '@/core/permission/constants/permission.const';
import { MENU } from '../constants/menu.constant';

export const createMenu = (permissionIds: TPermission['id'][]): TMenuItem[] => {
  const menu: TMenuItem[] = [];
  for (const permissionId of permissionIds) {
    if (permissionId === EPermission.admin) {
      return MENU;
    }
  }
  return menu;
};
