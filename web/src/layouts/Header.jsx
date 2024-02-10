import {AppBar, Box, Toolbar,Typography} from '@mui/material';

const Header = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Kargo Books
          </Typography>
        </Toolbar>
      </AppBar>
      { children }
    </Box>
  );
};

export default Header;