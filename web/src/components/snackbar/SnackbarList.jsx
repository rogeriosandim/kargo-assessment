import { Stack } from '@mui/material';
import Snackbar from './Snackbar';
import { useSnackbarActions, useSnackbarList } from '../../contexts/snackbar';

const extraProps = (remove, id) => ({
  onExit: () => remove(id),
});

const SnackbarList = () => {
  const snackbars = useSnackbarList();
  const { remove } = useSnackbarActions();

  return (
    <Stack
      spacing={2}
      sx={{ position: 'fixed', top: '3em', right: '1em', zIndex: 9999 }}
    >
      {snackbars.map(({ id, ...snackbar }) => (
        <Snackbar key={id} id={id} {...extraProps(remove, id)} {...snackbar} />
      ))}
    </Stack>
  );
};

export default SnackbarList;
