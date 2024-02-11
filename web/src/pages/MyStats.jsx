import DashboardCard from '../components/dashboardCard/DashboardCard';
import { useBook } from '../contexts/books';
import { Box, Typography, Grid } from '@mui/material';

const MyStatus = () => {
  const { readingList } = useBook();

  const countBooksByStatus = (list) => {
    return list.reduce(
      (count, book) => {
        count[book.status] += 1;
        return count;
      },
      { Finished: 0, 'In Progress': 0, Unread: 0 }
    );
  };

  const bookStatusCount = countBooksByStatus(readingList);

  const calculatePageCountByStatus = (books) => {
    const allStatuses = ['Finished', 'In Progress', 'Unread'];

    const pageCount = allStatuses.map((status) => {
      const pages = books.reduce((sum, book) => {
        return (
          sum + (book.status === status ? book.volumeInfo.pageCount || 0 : 0)
        );
      }, 0);

      return { pages, status };
    });

    return pageCount;
  };

  const pageCountByStatus = calculatePageCountByStatus(readingList);

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        My Stats
      </Typography>
      <Grid container spacing={3}>
        {Object.keys(bookStatusCount).map((count) => (
          <DashboardCard
            key={count}
            title={count}
            total={bookStatusCount[count]}
            books={true}
          />
        ))}
        {pageCountByStatus.map((result, index) => (
          <DashboardCard
            key={index}
            title={result.status}
            total={result.pages}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default MyStatus;
