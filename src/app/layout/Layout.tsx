import { Outlet } from 'react-router';
import Sidebar from './sidebar/Sidebar';

function Layout() {
  return (
    <div data-role="layout" className="flex h-[100vh]">
      <Sidebar />
      <div className="overflow-x-auto flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
