import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Grid,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import api from '../services/api';
import BookViewCard from '../components/BookViewCard';

const googleApiKey = 'AIzaSyAcjA7BW57ehcx-4_RHQNbSr1rrtWrdd-w';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState('');

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchInputValue(query);
    setSearchQuery(query);
    fetchBooksData(query);
  };

  const fetchBooksData = async (query) => {
    if (query) {
      try {
        const response = await api.get(
          `/volumes?q=${query}&key=${googleApiKey}&maxResults=40`
        );
        setSearchResults(response.data.items);
      } catch (error) {
        return error;
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <Box padding={2}>
      <Typography variant='h4' gutterBottom>
        Search for a Book
      </Typography>
      <Box padding={1}>
        <TextField
          type='text'
          helperText={
            searchInputValue === '' ? 'Type anything to search for a book!' : ''
          }
          onChange={handleSearch}
          value={searchInputValue}
          name='query'
          label='Search for anything'
          variant='outlined'
          color='primary'
          size='small'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={2}>
            {searchResults &&
              searchResults.map((book) => (
                <Grid key={book.id} item>
                  <BookViewCard book={book} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
