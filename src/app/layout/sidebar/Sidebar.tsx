import { ChevronLeft, ChevronRight, HomeIcon } from 'lucide-react';
import { TUser } from '../../auth/models/user.model';
import { Button } from 'antd';
import clsx from 'clsx';
import { Link } from 'react-router';
import { useAuthStore } from '@/app/auth/auth.store';
import { ROUTE } from '@/router/routes.const';
import { useSidebarStore } from './sidebar.store';
import ThemeButton from '@/app/shared/components/theme-button';
type props = {};
type TMenuItem = { children?: React.ReactNode; url: string; icon: React.ReactNode };

function Head({ user }: { user?: TUser | null }) {
  const isExpanded = useSidebarStore((s) => s.isExpanded);
  if (!user)
    return (
      <div>
        <Link to="/login">
          <Button className="break-all" type="link">
            <span>Đăng {!isExpanded ? <br /> : ''} nhập</span>
          </Button>
        </Link>
      </div>
    );

  return (
    <div
      data-role="sidebar--head"
      className="flex flex-col px-2 py-4 relative bg-cover bg-center"
      style={{ backgroundImage: `url(${user.bgImg || 'https://i.pravatar.cc/100'})` }}
    >
      <div data-role="dark-overlay" className="absolute inset-0 w-full opacity-70 bg-foreground" />
      <div data-role="user-info" className="relative z-1 overflow-x-hidden">
        <div data-role="user.avatarImg">
          <img src={user.avatarImg || 'https://i.pravatar.cc/100'} alt="" className="w-10 h-10 rounded-full" />
        </div>
        {isExpanded && (
          <div
            data-role="user.name"
            className="min-w-44 mt-2 text-background font-bold flex flex-wrap justify-between items-center"
          >
            <span>{user.name}</span>
            <span>
              <Link to="/user">
                <Button className="p-1! hover:bg-primary/30!" type="link">
                  <ChevronRight className="text-background" size={20} />
                </Button>
              </Link>
            </span>
          </div>
        )}
        {isExpanded && (
          <p data-role="user.description" className="min-w-44 text-background/70 text-xs">
            {user.email}
          </p>
        )}
      </div>
    </div>
  );
}

function MenuItem({ children, url, icon }: TMenuItem) {
  const isExpanded = useSidebarStore((s) => s.isExpanded);
  return (
    <Link to={url}>
      <Button
        title={children?.toString()}
        className="justify-start! w-full rounded-none! bg-background/10! hover:bg-background/20! border-0! text-background/80! hover:text-primary!"
      >
        {icon}
        {isExpanded && children}
      </Button>
    </Link>
  );
}
function Menu({ user }: { user?: TUser | null }) {
  if (!user) {
    return <></>;
  }
  return (
    <div data-role="sidebar--menu">
      <ul>
        <li>
          <MenuItem url={ROUTE.HOME} icon={<HomeIcon size={16} />}>
            Trang chủ
          </MenuItem>
        </li>
      </ul>
    </div>
  );
}

function Footer() {
  const isExpanded = useSidebarStore((s) => s.isExpanded);

  return (
    <div>
      <ThemeButton
        className={clsx('w-full py-5!', { 'justify-start! pl-5!': isExpanded })}
        isExpanded={isExpanded}
        label="Chế độ:"
      />
    </div>
  );
}

function Sidebar({}: props) {
  const { isExpanded, toggleExpanded } = useSidebarStore();
  const user = useAuthStore((state) => state.user);
  return (
    <div
      className={clsx('flex flex-col justify-between bg-foreground relative h-full w-16 transition-all', {
        'w-48': isExpanded,
      })}
    >
      <div data-role="expand-button" className="absolute right-0 top-1/2 translate-x-1/2" onClick={toggleExpanded}>
        <Button className="h-7! aspect-square p-0! bg-foreground! text-background!">
          {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </Button>
      </div>
      <div data-role="sidebar-main-content">
        <Head user={user} />
        <Menu user={user} />
      </div>
      <div data-role="sidebar-footer">
        <Footer />
      </div>
    </div>
  );
}

export default Sidebar;
