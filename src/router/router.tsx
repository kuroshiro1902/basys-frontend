import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

const UserManagement = lazy(() => import('../app/user-management/UserManagement'));
const Layout = lazy(() => import('../app/layout/Layout'));
const Home = lazy(() => import('../app/home/Home'));
const Login = lazy(() => import('../app/auth/Login'));
const About = lazy(() => import('../app/about/About'));
const NotFound = lazy(() => import('../app/not-found/NotFound'));

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="user-management" element={<UserManagement />} />
          {/* <Route path="about" element={<About />} /> */}

          {/* <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="concerts">
          <Route index element={<ConcertsHome />} />
          <Route path=":city" element={<City />} />
          <Route path="trending" element={<Trending />} />
        </Route> */}
          {/* Not Found Page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
