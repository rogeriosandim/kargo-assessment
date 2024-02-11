import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import theme from './theme';
import './assets/scss/index.scss';
import { SnackBarProvider } from './contexts/snackbar';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </SnackBarProvider>
    </ThemeProvider>
  );
};

export default App;
