import React, { FC, useCallback } from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';

import { PluginTableListItem } from './types';

interface Props {
  value: boolean;
  onSelect: (tableListItem: PluginTableListItem) => void;
  selectedAsIndeterminate: boolean;
  tableListItem: PluginTableListItem;
  disabled?: boolean;
  depth: number;
}

const InternalTableSelectorListItem: FC<Props> = ({
  value,
  onSelect,
  selectedAsIndeterminate,
  tableListItem,
  disabled,
  depth,
}) => {
  const isIndeterminate = selectedAsIndeterminate && value;

  const handleSelect = useCallback(() => onSelect(tableListItem), [onSelect, tableListItem]);

  return (
    <Stack
      sx={{
        borderRadius: 1,
        marginBottom: 0.25,
        marginLeft: (depth + 1) * 2.25,
      }}
    >
      <FormControlLabel
        disabled={disabled}
        control={
          <Checkbox
            disabled={disabled}
            checked={value}
            indeterminate={isIndeterminate}
            name={tableListItem.name}
            onChange={handleSelect}
            size="small"
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
            tabIndex={-1}
          />
        }
        label={tableListItem.name}
        sx={{
          borderRadius: 1,
          marginLeft: 0,
          overflowWrap: 'anywhere',
        }}
      />
    </Stack>
  );
};

export const TableSelectorListItem = React.memo(InternalTableSelectorListItem);
