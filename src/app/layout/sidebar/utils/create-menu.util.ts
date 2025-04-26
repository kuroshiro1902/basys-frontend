import { TPermission } from '@/core/permission/models/permission.model';
import { TMenuItem } from '../models/menu-item.model';
import { EPermission } from '@/core/permission/constants/permission.const';
import { ROUTE } from '@/router/routes.const';
import { HomeIcon } from 'lucide-react';
import { createElement } from 'react';

const MENU: TMenuItem[] = [
  {
    label: 'Trang chủ',
    url: ROUTE.HOME,
    icon: createElement(HomeIcon, { size: 16 }),
  },
];

export const createMenu = (permissionIds: TPermission['id'][]): TMenuItem[] => {
  const menu: TMenuItem[] = [];
  for (const permissionId of permissionIds) {
    if (permissionId === EPermission.admin) {
      return MENU;
    }
  }
  return menu;
};
