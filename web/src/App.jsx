import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import theme from './theme';
import './assets/scss/index.scss';
import { SnackBarProvider } from './contexts/snackbar';
import { BookProvider } from './contexts/books';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <BookProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </BookProvider>
      </SnackBarProvider>
    </ThemeProvider>
  );
};

export default App;
