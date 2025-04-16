import { Pagination, Stack } from "@mui/material";

interface PaginationButtonsProps {
  count: number;
  page: number;
  onChange: (page: number) => void;
}

const PaginationButtons = ({ count, page, onChange }: PaginationButtonsProps) => {
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    onChange(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination 
        count={count} 
        page={page} 
        onChange={handleChange}
        showFirstButton 
        showLastButton 
      />
    </Stack>
  );
};

export default PaginationButtons;
