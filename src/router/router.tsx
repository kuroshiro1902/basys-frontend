import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { ROUTE } from './routes.const';

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
        <Route path={ROUTE.LOGIN} element={<Login />} />
        <Route element={<Layout />}>
          <Route path={ROUTE.INDEX} element={<Home />} />
          <Route path={ROUTE.HOME} element={<Navigate to={ROUTE.INDEX} replace />} />
          <Route path={ROUTE.USER_MANAGEMENT} element={<UserManagement />} />
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
