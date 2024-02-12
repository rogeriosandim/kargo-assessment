// DashboardInfo.js
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { alpha } from '@mui/material/styles';

const GoalsCard = ({ title, current, goal, goalAchieved }) => {
  const statusColorMap = {
    'In Progress': alpha('#0077FF', 0.45),
    Finished: alpha('#00FF77', 0.45),
    Unread: alpha('#000000', 0.45),
  };

  const calculateTotal = Number(current) + Number(goal);

  return (
    <Grid item xs={12} sm={6}>
      <Card>
        <CardContent sx={{ backgroundColor: statusColorMap[title] }}>
          <Typography variant='h6' gutterBottom>
            {title}
          </Typography>
          <Typography variant='h4'>
            {goalAchieved
              ? `${calculateTotal}  of ${goal} books`
              : goal
              ? `${current} of ${goal} books`
              : current}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default GoalsCard;
