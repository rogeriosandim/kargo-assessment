import {
  AppBar,
  Box,
  Badge,
  IconButton,
  Tooltip,
  Toolbar,
  Typography,
  Container,
} from '@mui/material';
import { MenuBookOutlined, FavoriteOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getReadingListQuantity } from '../helpers/localStorage';
import SnackbarList from '../components/snackbar/SnackbarList';

const Header = ({ children }) => {
  const readingQuantity = getReadingListQuantity();
  return (
    <Box sx={{ flexGrow: 1, zIndex: -1 }}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Kargo Books
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex' }}>
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
        <Box sx={{ my: 2 }}>{children}</Box>
      </Container>
      <SnackbarList />
    </Box>
  );
};

export default Header;
