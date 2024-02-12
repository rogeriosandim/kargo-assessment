import { useEffect, useState } from 'react';
import { useSnackbarActions } from '../contexts/snackbar';
import { Grid, TextField, Button, Box, Card, Typography } from '@mui/material';

const READING_PAGES_KEY = '@kargo:readingPagesGoal';
const BOOKS_FINISHED_KEY = '@kargo:booksFinishedGoal';

const Goals = () => {
  const snackbar = useSnackbarActions();
  const initialGoals = [
    {
      key: READING_PAGES_KEY,
      label: 'Reading Pages Per Day',
      value: 30,
    },
    {
      key: BOOKS_FINISHED_KEY,
      label: 'Books Finished This Year',
      value: 10,
    },
  ];

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  };

  const getFromLocalStorage = (key, defaultValue) => {
    return localStorage.getItem(key) || defaultValue;
  };

  const [goals, setGoals] = useState(
    initialGoals.map(({ value, label, key }) => ({
      key,
      value: getFromLocalStorage(key, value),
      label,
    }))
  );

  const [inputValues, setInputValues] = useState({
    [READING_PAGES_KEY]: '',
    [BOOKS_FINISHED_KEY]: '',
  });

  const handleInputChange = (event, key) => {
    const { value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleSaveGoal = (index) => {
    const { key } = goals[index];
    const valueToSave = inputValues[key];

    if (valueToSave === '') {
      snackbar.warning('Oops! Please enter a value before saving.');
      return;
    }

    saveToLocalStorage(key, valueToSave);

    const updatedGoals = [...goals];
    updatedGoals[index].value = valueToSave;
    setGoals(updatedGoals);

    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: '',
    }));
    snackbar.success('Your goal has been successfuly updated!');
  };

  useEffect(() => {
    initialGoals.map(({ value, key }) => {
      const existingValue = getFromLocalStorage(key, value);
      saveToLocalStorage(key, existingValue);
    });
  });

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Set Your Goals
      </Typography>
      <Grid container spacing={3}>
        {goals.map((goal, index) => (
          <Grid key={index} item xs={12} sm={6}>
            <Card
              sx={{
                marginBottom: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: 2,
              }}
            >
              <Typography variant='h6' gutterBottom>
                {goal.label}
              </Typography>
              <TextField
                label='Enter your goal'
                variant='outlined'
                size='small'
                name={goal.key}
                value={inputValues[goal.key]}
                onChange={(event) => handleInputChange(event, goal.key)}
                style={{ marginBottom: '20px' }}
                type='number'
              />
              <Button
                variant='contained'
                color='secondary'
                onClick={() => handleSaveGoal(index)}
              >
                Save Goal
              </Button>
              <Typography variant='body1' mt={2}>
                Your current Goal is: {goal.value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Goals;
