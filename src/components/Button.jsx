import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function BasicButtons({ onClick }) {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={onClick}>
        Add to cart
      </Button>
      <Button variant="outlined" endIcon={<FavoriteBorderIcon />}>
        Add to favorites
      </Button>
    </Stack>
  );
}