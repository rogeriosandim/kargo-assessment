import { useState } from 'react';
import { Alert, Snackbar as MuiSnackbar } from '@mui/material';

const Snackbar = ({ id, type, message, onExit, ...props }) => {
  const [isOpen, setOpen] = useState(true);

  const handleClose = (onExit, id) => (event, reason) => {
    if (reason == 'clickaway') return;

    setOpen(false);

    setTimeout(() => {
      onExit(id);
    }, 1000);
  };

  return (
    <MuiSnackbar
      {...props}
      sx={{ position: 'static' }}
      open={isOpen}
      onClose={handleClose(onExit, id)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={5000}
      transitionDuration={600}
    >
      <Alert
        sx={{ fontSize: 14 }}
        onClose={handleClose(onExit, id)}
        severity={type}
        elevation={6}
        variant='filled'
      >
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
