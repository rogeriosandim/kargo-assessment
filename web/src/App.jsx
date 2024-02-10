import { ThemeProvider, } from '@mui/material';
import { BrowserRouter, } from 'react-router-dom';
import Router from './routes';
import theme from './theme';
import './assets/scss/index.scss';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
