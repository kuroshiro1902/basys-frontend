import { Outlet } from 'react-router';
import { Sidebar } from './sidebar';

function Layout() {
  return (
    <div data-role="layout" className="flex h-[100vh]">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Layout;
