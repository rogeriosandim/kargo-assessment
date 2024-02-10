import { Outlet, useRoutes } from 'react-router-dom';
import Home from '../pages/Home';
import MyBooks from '../pages/MyBooks';
import Header from '../layouts/Header';

const Router = () => {
  const routes = useRoutes([
    {
      element: (
        <Header >
          <Outlet />
        </Header>
      ),
      children: [
        { element: <Home />, index: true },
        { path:'/my-books', element: <MyBooks />}
      ]
    }
  ]);
 
  return routes;
};

export default Router;