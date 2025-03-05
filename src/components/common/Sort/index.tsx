import { useState, FC } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface SortOption {
    value: string;
    label: string;
}

interface SortProps {
    t: (key: string) => string;
    sortOptions: SortOption[];
}

const Sort: FC<SortProps> = ({ t, sortOptions }) => {
    const [age, setAge] = useState<string>('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="demo-simple-select-label">{t('sort')}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChange}
                    label={t('sort')}
                    style={{ height: '50px', fontSize: '14px' }}
                >
                    <MenuItem value="">
                        <em>{t('none')}</em>
                    </MenuItem>
                    {sortOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
};

export default Sort;
