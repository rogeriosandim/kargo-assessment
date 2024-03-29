import { useBook } from '../contexts/books';
import StatsCard from '../components/statsCard/StatsCard';
import GoalsCard from '../components/goalsCard/GoalsCard';
import { Box, Typography, Grid } from '@mui/material';

const READING_PAGES_KEY = '@kargo:readingPagesGoal';
const BOOKS_FINISHED_KEY = '@kargo:booksFinishedGoal';

const MyStatus = () => {
  const { readingList } = useBook();
  const pagesReadingGoal = localStorage.getItem(READING_PAGES_KEY) || 30;
  const yearlyBooksGoal = localStorage.getItem(BOOKS_FINISHED_KEY) || 10;

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

  const calculateAveragePages = (pageCounts, pagesReadingGoal) => {
    const { totalPages, totalStatuses } = pageCounts.reduce(
      (accumulator, { status, pages }) => {
        if (status !== 'Finished') {
          accumulator.totalPages += pages;
          accumulator.totalStatuses += 1;
        }
        return accumulator;
      },
      { totalPages: 0, totalStatuses: 0 }
    );

    if (totalStatuses == 0 || pagesReadingGoal == 0) {
      return 0;
    }

    return parseFloat((totalPages / pagesReadingGoal).toFixed(2));
  };

  const averagePagesForGoal = calculateAveragePages(
    pageCountByStatus,
    pagesReadingGoal
  );

  function calculateBooksToCompleteGoal(booksFinished, yearlyBooksGoal) {
    const currentProgress = yearlyBooksGoal - booksFinished;

    if (currentProgress <= 0) {
      const difference = Math.abs(currentProgress);
      return { difference, goalAchieved: true };
    }

    return { currentProgress, goalAchieved: false };
  }

  const booksToGoal = calculateBooksToCompleteGoal(
    bookStatusCount['Finished'],
    yearlyBooksGoal
  );

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        My Stats
      </Typography>
      <Grid container spacing={3} sx={{ marginBottom: 2 }}>
        {Object.keys(bookStatusCount).map((count) => (
          <StatsCard
            key={count}
            title={count}
            total={bookStatusCount[count]}
            books={true}
          />
        ))}
        {pageCountByStatus.map((result, index) => (
          <StatsCard key={index} title={result.status} total={result.pages} />
        ))}
      </Grid>
      <Typography variant='h4' spacing={2} gutterBottom>
        My Goals
      </Typography>
      <Grid container spacing={3}>
        <GoalsCard
          title={`Days to finish remaining pages with a ${pagesReadingGoal}-page daily goal.`}
          current={averagePagesForGoal}
        />
        <GoalsCard
          title={
            booksToGoal.goalAchieved
              ? 'Congrats on reaching your annual reading goal!'
              : 'Books you still need to finish this year in order to achieve your goal.'
          }
          current={booksToGoal.currentProgress || booksToGoal.difference}
          goal={yearlyBooksGoal}
          goalAchieved={booksToGoal.goalAchieved}
        />
      </Grid>
    </Box>
  );
};

export default MyStatus;
