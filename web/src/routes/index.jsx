import { Outlet, useRoutes } from 'react-router-dom';
import Home from '../pages/Home';
import MyReadingList from '../pages/MyReadingList';
import Header from '../layouts/Header';
import Favourites from '../pages/Favourites';

const Router = () => {
  const routes = useRoutes([
    {
      element: (
        <Header>
          <Outlet />
        </Header>
      ),
      children: [
        { element: <Home />, index: true },
        { path: '/my-reading-list', element: <MyReadingList /> },
        { path: '/favourites', element: <Favourites /> },
      ],
    },
  ]);

  return routes;
};

export default Router;
