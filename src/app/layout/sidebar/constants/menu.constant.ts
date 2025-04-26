import { BarChartIcon, HomeIcon, UserPlusIcon } from 'lucide-react';
import { ROUTE } from '@/router/routes.const';
import { UserIcon } from 'lucide-react';
import { createElement } from 'react';
import { TMenuItem } from '../models/menu-item.model';

export const MENU: TMenuItem[] = [
  {
    label: 'Trang chủ',
    url: ROUTE.INDEX,
    icon: createElement(HomeIcon, { size: 16 }),
  },
  {
    label: 'Quản lý tài khoản',
    icon: createElement(UserIcon, { size: 16 }),
    children: [
      {
        label: 'Thống kê',
        url: ROUTE.USER_MANAGEMENT_DASHBOARD,
        icon: createElement(BarChartIcon, { size: 16 }),
      },
      {
        label: 'Tài khoản',
        url: ROUTE.USER_MANAGEMENT_MAIN,
        icon: createElement(UserIcon, { size: 16 }),
      },
    ],
  },
];
