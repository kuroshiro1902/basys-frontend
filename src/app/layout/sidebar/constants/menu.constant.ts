import { BarChartIcon, DatabaseIcon, HomeIcon } from 'lucide-react';
import { ROUTE } from '@/router/routes.const';
import { UserIcon } from 'lucide-react';
import { createElement } from 'react';
import { TMenuItem } from '../models/menu-item.model';
import { EPermission } from '@/core/permission/constants/permission.const';

const home: TMenuItem = {
  id: 'home',
  label: 'Trang chủ',
  url: ROUTE.INDEX,
  icon: createElement(HomeIcon, { size: 16 }),
};

const userManagement: TMenuItem = {
  label: 'Quản lý tài khoản',
  icon: createElement(UserIcon, { size: 16 }),
  children: [
    {
      id: 'user-management-dashboard',
      label: 'Thống kê',
      url: ROUTE.USER_MANAGEMENT_DASHBOARD,
      icon: createElement(BarChartIcon, { size: 16 }),
    },
    {
      id: 'user-management-main',
      label: 'Tài khoản',
      url: ROUTE.USER_MANAGEMENT_MAIN,
      icon: createElement(UserIcon, { size: 16 }),
    },
  ],
};

const collection: TMenuItem = {
  id: 'collection',
  label: 'Bộ sưu tập',
  url: ROUTE.COLLECTION,
  icon: createElement(DatabaseIcon, { size: 16 })
};

export const MENU = {
  [EPermission.admin]: [home, userManagement, collection],
  [EPermission.user]: [home, collection],
};
