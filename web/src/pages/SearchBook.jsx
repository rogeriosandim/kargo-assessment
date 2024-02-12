import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  CircularProgress,
  Typography,
  TextField,
  InputAdornment,
  Stack,
  Pagination,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import BookViewCard from '../components/bookViewCard/BookViewCard';
import api from '../services/api';

const googleApiKey = 'AIzaSyAcjA7BW57ehcx-4_RHQNbSr1rrtWrdd-w';

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState();
  const [loading, setLoading] = useState(false);
  const maxResults = 40;

  const fetchBooksData = async (query, page) => {
    if (query) {
      try {
        setLoading(true);
        const response = await api.get(
          `/volumes?q=intitle:${query}&key=${googleApiKey}&maxResults=${maxResults}&startIndex=${
            page - 1
          }`
        );
        setTotalItems(Math.ceil(response.data.totalItems / maxResults));
        setSearchResults((prevResults) => [
          ...prevResults,
          ...response.data.items,
        ]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        return error;
      }
    } else {
      setSearchResults([]);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      fetchBooksData(searchInputValue, page);
    }, 400);
    return () => clearTimeout(getData);
  }, [searchInputValue, page]);

  return (
    <Box>
      <Typography variant='h4'>Search for a Book</Typography>
      <Box padding={1}>
        <TextField
          type='text'
          helperText={
            searchInputValue === '' ? 'Type to search for a book!' : ''
          }
          onChange={(event) => setSearchInputValue(event.target.value)}
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
          <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
            {searchResults &&
              searchResults.map((book, index) => (
                <Grid key={index} item>
                  <BookViewCard book={book} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {totalItems && (
        <Stack
          spacing={2}
          sx={{ alignItems: 'center', marginTop: 2, marginBottom: 1 }}
        >
          <Pagination
            count={totalItems}
            page={page}
            onChange={handlePageChange}
          />
        </Stack>
      )}
    </Box>
  );
};

export default Home;
