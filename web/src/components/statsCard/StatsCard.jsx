// DashboardInfo.js
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { alpha } from '@mui/material/styles';

const StatsCard = ({ title, total, books = false }) => {
  const statusColorMap = {
    'In Progress': alpha('#0077FF', 0.45),
    Finished: alpha('#00FF77', 0.45),
    Unread: alpha('#000000', 0.45),
  };

  return (
    <Grid item xs={12} sm={4}>
      <Card>
        <CardContent sx={{ backgroundColor: statusColorMap[title] }}>
          <Typography variant='h6' gutterBottom>
            {books ? `Books ${title}` : `Pages ${title}`}
          </Typography>
          <Typography variant='h4'>{total}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default StatsCard;
