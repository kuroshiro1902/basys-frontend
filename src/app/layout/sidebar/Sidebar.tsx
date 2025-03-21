import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TUser } from '../../auth/models/user.model';
import { Button } from 'antd';
import { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router';
import { useAuthStore } from '@/app/auth/auth.store';
type props = {};

function Head({ user, isExpanded = false }: { user?: TUser | null; isExpanded?: boolean }) {
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

function Sidebar({}: props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const user = useAuthStore((state) => state.user);
  return (
    <div className={clsx('bg-foreground relative h-full w-16 transition-all', { 'w-48': isExpanded })}>
      <div
        data-role="expand-button"
        className="absolute right-0 top-1/2 translate-x-1/2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Button className="h-7! aspect-square p-0! bg-foreground! text-background!">
          {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </Button>
      </div>
      <Head user={user} isExpanded={isExpanded} />
    </div>
  );
}

export default Sidebar;
