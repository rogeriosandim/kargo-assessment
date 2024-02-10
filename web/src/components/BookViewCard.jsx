import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Collapse,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import styles from './styles.module.scss';
import parse from 'html-react-parser';
import clsx from 'clsx';

const BookViewCard = ({ book }) => {
  const [expanded, setExpanded] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const parsedDescription = parse(`${book.volumeInfo.description}`);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleHeartClick = () => {
    setFavourite(!favourite);
  };

  return (
    <Card className={styles.card}>
      <CardHeader
        className={styles.header}
        title={book.volumeInfo.title}
        subheader={book.volumeInfo.authors}
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
