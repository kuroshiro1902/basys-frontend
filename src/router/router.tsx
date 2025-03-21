import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

const Layout = lazy(() => import('../app/layout/Layout'));
const Home = lazy(() => import('../app/home/Home'));
const Login = lazy(() => import('../app/auth/auth').then((module) => ({ default: module.Login })));
const About = lazy(() => import('../app/about/About'));
const NotFound = lazy(() => import('../app/not-found/NotFound'));

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="about" element={<About />} />

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
