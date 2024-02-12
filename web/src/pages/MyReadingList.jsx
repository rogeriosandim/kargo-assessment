import { useBook } from '../contexts/books';
import { Box, Button, Grid, Typography } from '@mui/material';
import BookViewCard from '../components/bookViewCard/BookViewCard';
import { Link } from 'react-router-dom';

const NoBookingListMessage = () => {
  return (
    <Box textAlign='center' mt={5}>
      <Typography variant='h5' gutterBottom>
        No books in your list at the moment :(
      </Typography>
      <Typography variant='body1' paragraph>
        Go search for books and add them to your reading list.
      </Typography>
      <Link to='/search-book'>
        <Button variant='contained' color='primary'>
          Go to Search
        </Button>
      </Link>
    </Box>
  );
};

const MyReadingList = () => {
  const { readingList } = useBook();

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        My Reading List
      </Typography>
      {readingList.length ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justify='center' spacing={2}>
              {readingList &&
                readingList.map((book) => (
                  <Grid key={book.id} item>
                    <BookViewCard book={book} search={false} />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <NoBookingListMessage />
      )}
    </Box>
  );
};

export default MyReadingList;
