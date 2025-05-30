import { useId, useRef, useState } from 'react';

import FilterIcon from '@mui/icons-material/FilterAlt';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Menu from '@mui/material/Menu';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useTheme } from '@mui/material/styles';

import { SearchInput } from '../searchInput';

interface Props {
  onSearchChange: (value: string) => void;
  onTableTypeChange: (value: 'all' | 'selected' | 'unselected') => void;
  searchValue: string;
  tableTypeValue: 'all' | 'selected' | 'unselected';
  disabled?: boolean;
  onlySearchFilter?: boolean;
  embeded?: boolean;
}

export function TableSelectorFilters({
  onSearchChange,
  onTableTypeChange,
  searchValue,
  tableTypeValue,
  disabled,
  onlySearchFilter,
  embeded,
}: Props) {
  const { palette } = useTheme();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const menuToggleId = useId();

  return (
    <Stack direction="row" gap={1} marginBottom={2}>
      <SearchInput
        fullWidth={true}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tables"
        value={searchValue}
        disabled={disabled}
        size="small"
        slotProps={{
          root: {
            sx: {
              backgroundColor: 'secondary.darkMedium',
              border: embeded ? '1px solid' : undefined,
              borderColor: embeded ? 'nav.evident' : undefined,
              borderRadius: 1.5,
              height: 38,
            },
          },
        }}
      />
      {!onlySearchFilter && (
        <Box>
          <Button
            ref={menuToggleRef}
            disabled={disabled}
            aria-controls={menuIsOpen ? menuId : undefined}
            aria-expanded={menuIsOpen ? 'true' : undefined}
            aria-haspopup="true"
            endIcon={<FilterIcon />}
            id={menuToggleId}
            onClick={() => setMenuIsOpen(true)}
            sx={{
              borderColor: palette.neutral[300],
              color: tableTypeValue === 'all' ? palette.text.secondary : palette.text.primary,
              height: '100%',
            }}
            variant="outlined"
          >
            Filter
          </Button>
          <Menu
            anchorEl={menuToggleRef.current}
            anchorOrigin={{
              horizontal: 'right',
              vertical: 'top',
            }}
            id={menuId}
            MenuListProps={{
              'aria-labelledby': menuToggleId,
            }}
            onClose={() => setMenuIsOpen(false)}
            open={menuIsOpen || false}
            transformOrigin={{
              horizontal: 'right',
              vertical: -60,
            }}
          >
            <Box
              sx={{
                paddingLeft: 1.5,
                paddingRight: 2.5,
              }}
            >
              <RadioGroup
                onChange={(e) => {
                  onTableTypeChange(e.target.value as 'all' | 'selected' | 'unselected');
                  setMenuIsOpen(false);
                }}
                sx={{ paddingLeft: 0.5, paddingRight: 1.5 }}
                value={tableTypeValue}
              >
                <FormControlLabel control={<Radio size="small" />} label="Show all" value="all" />
                <FormControlLabel
                  control={<Radio size="small" />}
                  label="Show selected"
                  value="selected"
                />
                <FormControlLabel
                  control={<Radio size="small" />}
                  label="Show unselected"
                  value="unselected"
                />
              </RadioGroup>
            </Box>
          </Menu>
        </Box>
      )}
    </Stack>
  );
}
