import {
  AppBar,
  Box,
  Badge,
  IconButton,
  Tooltip,
  Toolbar,
  Container,
} from '@mui/material';
import {
  SearchOutlined,
  MenuBookOutlined,
  FavoriteOutlined,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import kargoLogo from '../assets/images/KargoLogo.png';
import { getReadingListQuantity } from '../helpers/localStorage';
import SnackbarList from '../components/snackbar/SnackbarList';

const Header = ({ children }) => {
  const readingQuantity = getReadingListQuantity();
  return (
    <Box sx={{ flexGrow: 1, zIndex: -1 }}>
      <AppBar position='fixed'>
        <Toolbar>
          <Link
            to='https://kargo.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              style={{ height: 45 }}
              src={kargoLogo}
              alt='Kargo Logo'
              loading='lazy'
            />
          </Link>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex' }}>
            <Link to='/'>
              <IconButton size='large' aria-label='search book' color='inherit'>
                <Tooltip title='Search Book'>
                  <SearchOutlined />
                </Tooltip>
              </IconButton>
            </Link>
            <Link to='/my-reading-list'>
              <IconButton size='large' aria-label='my books' color='inherit'>
                <Tooltip title='My Reading List'>
                  <Badge badgeContent={readingQuantity} color='error'>
                    <MenuBookOutlined />
                  </Badge>
                </Tooltip>
              </IconButton>
            </Link>
            <Link to='/favourites'>
              <IconButton size='large' aria-label='my books' color='inherit'>
                <Tooltip title='Favourites'>
                  <Badge badgeContent={4} color='error'>
                    <FavoriteOutlined />
                  </Badge>
                </Tooltip>
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container maxWidth='xg'>
        <Box sx={{ paddingY: 2 }}>{children}</Box>
      </Container>
      <SnackbarList />
    </Box>
  );
};

export default Header;
