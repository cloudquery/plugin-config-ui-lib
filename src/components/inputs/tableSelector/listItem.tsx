import React, { FC, useCallback, useEffect } from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';

import { PluginTableListItem, SubscribeToTablesValueChange } from './types';

interface Props {
  valuesRef: React.MutableRefObject<Record<string, boolean>>;
  onSelect: (tableListItem: PluginTableListItem) => void;
  selectedAsIndeterminate: boolean;
  tableListItem: PluginTableListItem;
  subscribeToTablesValueChange: SubscribeToTablesValueChange;
  disabled?: boolean;
  depth: number;
}

const InternalTableSelectorListItem: FC<Props> = ({
  valuesRef,
  subscribeToTablesValueChange,
  onSelect,
  selectedAsIndeterminate,
  tableListItem,
  disabled,
  depth,
}) => {
  const [value, setValue] = React.useState(!!valuesRef.current[tableListItem.name]);
  const valueRef = React.useRef(value);
  valueRef.current = value;
  const isIndeterminate = selectedAsIndeterminate && value;

  const handleSelect = useCallback(() => onSelect(tableListItem), [onSelect, tableListItem]);

  useEffect(() => {
    const unsubscribe = subscribeToTablesValueChange(tableListItem.name, (value) =>
      setValue(!!value),
    );

    return unsubscribe;
  }, [subscribeToTablesValueChange, tableListItem.name]);

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
