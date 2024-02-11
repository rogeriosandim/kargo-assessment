import { useState } from 'react';
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
  FavoriteOutlined as FavoriteIcon,
  ExpandMoreOutlined as ExpandMoreIcon,
  BookmarkAddOutlined as BookmarkAddIcon,
} from '@mui/icons-material';
import { addToReadingList } from '../helpers/localStorage';
import parse from 'html-react-parser';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { useSnackbarActions } from '../contexts/snackbar';

const BookViewCard = ({ book }) => {
  const [expanded, setExpanded] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const parsedDescription = parse(`${book.volumeInfo.description}`);
  const snackbar = useSnackbarActions();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleHeartClick = () => {
    setFavourite(!favourite);
  };

  const handleAddToReadingList = (event, addBook) => {
    const bookAdded = addToReadingList(addBook);
    bookAdded
      ? snackbar.success('Book successfully added to your reading list!')
      : snackbar.info('This book already is in your reading list!');
  };

  return (
    <Card className={styles.card}>
      <CardHeader
        className={styles.header}
        title={book.volumeInfo.title}
        subheader={book.volumeInfo.authors}
        action={
          <Tooltip title='Add to Reading List'>
            <IconButton
              onClick={(event) => handleAddToReadingList(event, book)}
            >
              <BookmarkAddIcon />
            </IconButton>
          </Tooltip>
        }
      />
      <CardMedia
        id='image'
        className={styles.media}
        image={`https://books.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w325-h355&source=gbs_api`}
      />
      <CardActions disableSpacing>
        <IconButton
          className={clsx(styles.favourite, {
            [styles.favouriteSet]: favourite,
          })}
          onClick={handleHeartClick}
          aria-label='add to favourite'
        >
          <FavoriteIcon />
        </IconButton>
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
