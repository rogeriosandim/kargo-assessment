import { Chip as MuiChip } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

export const getStatusChip = (status) => {
  let brandColor;

  switch (status) {
    case 'In Progress':
      brandColor = '#0077FF';
      break;
    case 'Finished':
      brandColor = '#00FF77';
      break;
    default:
      brandColor = '#000'; // Default to black if status is not recognized
  }

  return <ChipStatus label={status} brand={brandColor} variant='outlined' />;
};

const getChipStyles = ({ brand }) => {
  const defaultStyles = {
    color: brand || '#000',
    backgroundColor: brand ? alpha(brand, 0.12) : 'transparent',
    borderColor: brand ? alpha(brand, 0.5) : alpha('#000', 0.75),
  };

  return defaultStyles;
};

const StyledChip = styled(MuiChip)((props) => ({
  ...getChipStyles(props),
}));

const ChipStatus = ({ ...props }) => {
  return <StyledChip {...props} />;
};

export default ChipStatus;
