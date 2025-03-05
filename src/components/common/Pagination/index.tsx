import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationButtons = ()=> {
  return (
    <Stack spacing={2}>
      <Pagination count={10} showFirstButton showLastButton />
    </Stack>
  );
}

export default PaginationButtons