import { Chip as MuiChip } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

const statusColorMap = {
  'In Progress': '#0077FF',
  Finished: '#00FF77',
};

const getChipStyles = ({ brand }) => {
  const defaultStyles = {
    color: brand || '#000',
    backgroundColor: brand ? alpha(brand, 0.12) : 'transparent',
    borderColor: brand ? alpha(brand, 0.5) : alpha('#000', 0.75),
  };

  return defaultStyles;
};

const StyledChip = styled(MuiChip)(({ brand }) => ({
  ...getChipStyles({ brand }),
}));

const ChipStatus = ({ ...props }) => {
  return <StyledChip {...props} />;
};

export const getStatusChip = (status) => {
  const brandColor = statusColorMap[status] || '#000';
  return <ChipStatus label={status} brand={brandColor} variant='outlined' />;
};

export default ChipStatus;
