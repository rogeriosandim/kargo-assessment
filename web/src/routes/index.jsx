import { Outlet, useRoutes } from 'react-router-dom';
import Header from '../layouts/Header';
import MyStats from '../pages/MyStats';
import SearchBook from '../pages/SearchBook';
import MyReadingList from '../pages/MyReadingList';
import Goals from '../pages/Goals';

const Router = () => {
  const routes = useRoutes([
    {
      element: (
        <Header>
          <Outlet />
        </Header>
      ),
      children: [
        { element: <MyStats />, index: true },
        { path: '/search-book', element: <SearchBook /> },
        { path: '/my-reading-list', element: <MyReadingList /> },
        { path: '/goals', element: <Goals /> },
      ],
    },
  ]);

  return routes;
};

export default Router;
