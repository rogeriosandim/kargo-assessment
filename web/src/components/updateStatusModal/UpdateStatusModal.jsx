import { useBook } from '../../contexts/books';
import { useSnackbarActions } from '../../contexts/snackbar';
import { Box, Button, Typography, Modal } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
};

const UpdateStatusModal = ({ open, setOpen, bookId }) => {
  const snackbar = useSnackbarActions();
  const { updateBookStatusById } = useBook();

  const handleClose = () => setOpen(false);

  const updateBookStatus = (bookId, status) => {
    const isBookUpdate = updateBookStatusById(bookId, status);
    isBookUpdate
      ? snackbar.success(`Book status successfully updated to: ${status}`)
      : snackbar.warning(
          'Oops. Try to update the book status to a different status!'
        );
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Update Book Status
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          Choose the status you would like to set for your book update!
        </Typography>
        <Box
          sx={{
            justifyContent: 'space-between',
            display: 'flex',
            paddingTop: 2,
            width: '100%',
          }}
        >
          <Button
            onClick={() => updateBookStatus(bookId, 'In Progress')}
            color='secondary'
            variant='outlined'
          >
            In Progress
          </Button>
          <Button
            onClick={() => updateBookStatus(bookId, 'Finished')}
            color='success'
            variant='outlined'
          >
            Finished
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateStatusModal;
