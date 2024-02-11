import { useState } from 'react';
import { useSnackbarActions } from '../../contexts/snackbar';
import {
  Card,
  Collapse,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Tooltip,
} from '@mui/material';
import {
  ExpandMoreOutlined as ExpandMoreIcon,
  BookmarkAddOutlined as BookmarkAddIcon,
  BookmarkRemoveOutlined as BookmarkRemoveIcon,
} from '@mui/icons-material';
import {
  addToReadingList,
  removeFromReadingList,
} from '../../helpers/localStorage';
import { getStatusChip } from '../chipStatus/ChipStatus';
import parse from 'html-react-parser';
import clsx from 'clsx';
import styles from './styles.module.scss';

const BookViewCard = ({ book, search = true }) => {
  const [expanded, setExpanded] = useState(false);
  const parsedDescription = parse(`${book.volumeInfo.description}`);
  const snackbar = useSnackbarActions();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddToReadingList = (event, addBook) => {
    const isBookAdded = addToReadingList(addBook);
    isBookAdded
      ? snackbar.success('Book successfully added to your reading list!')
      : snackbar.info('This book already is in your reading list!');
  };

  const handleRemoveFromReadingList = (event, bookId) => {
    const isBookRemoved = removeFromReadingList(bookId);
    isBookRemoved
      ? snackbar.success('Book successfully removed from your reading list!')
      : snackbar.warning(
          'Oops! Looks like this book has already been removed.'
        );
  };

  return (
    <Card className={styles.card}>
      <CardHeader
        className={styles.header}
        title={book.volumeInfo.title}
        subheader={book.volumeInfo.authors}
        action={
          search ? (
            <Tooltip title='Add to Reading List'>
              <IconButton
                color='secondary'
                onClick={(event) => handleAddToReadingList(event, book)}
              >
                <BookmarkAddIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title='Remove from Reading List'>
              <IconButton
                color='secondary'
                onClick={(event) => handleRemoveFromReadingList(event, book.id)}
              >
                <BookmarkRemoveIcon />
              </IconButton>
            </Tooltip>
          )
        }
      />
      <CardMedia
        id='image'
        className={styles.media}
        image={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w325-h355&source=gbs_api`}
      />
      <CardActions disableSpacing>
        {search ? '' : getStatusChip(book.status)}
        <IconButton
          className={clsx(styles.expand, {
            [styles.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='div'>
            {parsedDescription}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default BookViewCard;