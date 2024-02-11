import { Link } from 'react-router-dom';
import { useBook } from '../contexts/books';
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
  InsightsOutlined,
  SearchOutlined,
  MenuBookOutlined,
  TrackChangesOutlined,
} from '@mui/icons-material';
import SnackbarList from '../components/snackbar/SnackbarList';
import kargoLogo from '../assets/images/KargoLogo.png';

const Header = ({ children }) => {
  const { readingList } = useBook();

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
              <IconButton size='large' aria-label='My Stats' color='inherit'>
                <Tooltip title='My Stats'>
                  <InsightsOutlined />
                </Tooltip>
              </IconButton>
            </Link>
            <Link to='/search-book'>
              <IconButton size='large' aria-label='search book' color='inherit'>
                <Tooltip title='Search Book'>
                  <SearchOutlined />
                </Tooltip>
              </IconButton>
            </Link>
            <Link to='/my-reading-list'>
              <IconButton size='large' aria-label='my books' color='inherit'>
                <Tooltip title='My Reading List'>
                  <Badge badgeContent={readingList.length} color='secondary'>
                    <MenuBookOutlined />
                  </Badge>
                </Tooltip>
              </IconButton>
            </Link>
            <Link to='/goals'>
              <IconButton size='large' aria-label='goals' color='inherit'>
                <Tooltip title='Goals'>
                  <TrackChangesOutlined />
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
