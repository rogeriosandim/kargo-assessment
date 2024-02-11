import { createContext, useContext, useState } from 'react';
import { unique } from '../helpers/unique';

export const SnackbarContext = createContext({
  snackbars: [],
  add: () => {},
  remove: () => {},
});

export const useSnackbarList = () => useContext(SnackbarContext).snackbars;

export const useSnackbarActions = () => {
  const { add, remove } = useContext(SnackbarContext);

  return {
    remove,
    success: (message) => add({ message, type: 'success' }),
    info: (message) => add({ message, type: 'info' }),
    warning: (message) => add({ message, type: 'warning' }),
    error: (message) => add({ message, type: 'error' }),
  };
};

export const SnackBarProvider = ({ children }) => {
  const [snackbars, setSnackbars] = useState([]);

  const add = (snackbars) => {
    setSnackbars((list) => [{ id: unique(), ...snackbars }, ...list]);
  };

  const remove = (id) => {
    setSnackbars((list) => list.filter((snackbars) => snackbars.id != id));
  };

  return (
    <SnackbarContext.Provider value={{ snackbars: snackbars, add, remove }}>
      {children}
    </SnackbarContext.Provider>
  );
};
