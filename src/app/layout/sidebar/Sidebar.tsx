import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { TUser } from '@/core/auth/models/user.model';
import { Button } from 'antd';
import clsx from 'clsx';
import { Link } from 'react-router';
import { useAuthStore } from '@/core/auth/auth.store';
import { ROUTE } from '@/router/routes.const';
import { useSidebarStore } from './sidebar.store';
import ThemeButton from '@/app/shared/components/theme-button';
import { TMenuItem } from './models/menu-item.model';
import { createMenu } from './utils/create-menu.util';
import { useState } from 'react';
type props = {};

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

function MenuItem({ label, url, icon, children, id }: TMenuItem) {
  const isSidebarExpanded = useSidebarStore((s) => s.isExpanded);
  const currentActiveItem = useSidebarStore((s) => s.currentActiveItem);
  const setActiveItem = useSidebarStore((s) => s.setActiveItem);

  const [isOpen, setIsOpen] = useState(false);
  const Element = url
    ? ({ children }: any) => <Link to={url}>{children}</Link>
    : ({ children }: any) => <span>{children}</span>;

  return (
    <details open={isOpen}>
      <summary className="list-none">
        <Element>
          <Button
            onClick={() => {
              children?.length && setIsOpen(!isOpen);
              id && setActiveItem(id);
            }}
            title={label?.toString()}
            className={clsx(
              'relative h-9! justify-start! w-full rounded-none! border-0! text-background/80! transition-all',
              {
                'bg-background/5!': !isOpen,
                'hover:bg-background/10!': !isOpen,
                'bg-background/20!': isOpen,
                'hover:bg-background/30!': isOpen,
              },
              {
                'bg-primary/70!': currentActiveItem === id,
                'hover:bg-primary/80!': currentActiveItem === id,
              },
            )}
          >
            {icon}
            {isSidebarExpanded && label}
            {children?.length && (
              <span className="ml-auto">
                {isOpen ? (
                  <ChevronUp className="text-inherit!" size={12} />
                ) : (
                  <ChevronDown className="text-inherit!" size={12} />
                )}
              </span>
            )}
            {isOpen && (
              <span className="absolute left-2 bottom-[-4px] w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-background/10 rotate-180" />
            )}
          </Button>
        </Element>
      </summary>
      {(children?.length ?? 0) > 0 && (
        <ul data-role="sidebar--menu-list" className="bg-background/5">
          {children?.map((child, i) => (
            <li data-role="sidebar--menu-item" key={i}>
              <MenuItem {...child} />
            </li>
          ))}
        </ul>
      )}
    </details>
  );
}

function Menu({ user }: { user?: TUser | null }) {
  if (!user) {
    return <></>;
  }
  return (
    <div data-role="sidebar--menu">
      <ul data-role="sidebar--menu-list">
        <li data-role="sidebar--menu-item">
          {createMenu(user.permissions).map((menu, i) => (
            <MenuItem key={i} {...menu} />
          ))}
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
      <div data-role="sidebar--main-content">
        <Head user={user} />
        <Menu user={user} />
      </div>
      <div data-role="sidebar--footer">
        <Footer />
      </div>
    </div>
  );
}

export default Sidebar;
