import { Box, Grid, Typography } from '@mui/material';
import BookViewCard from '../components/bookViewCard/BookViewCard';
import { getReadingList } from '../helpers/localStorage';

const MyReadingList = () => {
  const readingList = getReadingList();

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        My Reading List
      </Typography>
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
    </Box>
  );
};

export default MyReadingList;
