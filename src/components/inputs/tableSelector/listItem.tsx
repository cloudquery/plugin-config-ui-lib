import React, { FC, useCallback, useEffect } from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';

import { PluginTableListItem, SubscribeToTablesValueChange } from './types';
import { TreeGroup, TreeNode } from '../../display/tree';

interface Props {
  valuesRef: React.MutableRefObject<Record<string, boolean>>;
  onSelect: (tableListItem: PluginTableListItem) => void;
  selectedAsIndeterminate: boolean;
  tableListItem: PluginTableListItem;
  subscribeToTablesValueChange: SubscribeToTablesValueChange;
  disabled?: boolean;
}

const _TableSelectorListItem: FC<Props> = ({
  valuesRef,
  subscribeToTablesValueChange,
  onSelect,
  selectedAsIndeterminate,
  tableListItem,
  disabled,
}) => {
  const [value, setValue] = React.useState(!!valuesRef.current[tableListItem.name]);
  const valueRef = React.useRef(value);
  valueRef.current = value;
  const isIndeterminate = selectedAsIndeterminate && value;

  const handleSelect = useCallback(() => onSelect(tableListItem), [onSelect, tableListItem]);

  useEffect(() => {
    const unsubscribe = subscribeToTablesValueChange((tableValues) => {
      const newValue = !!tableValues[tableListItem.name];
      if (newValue !== valueRef.current) {
        setValue(newValue);
      }
    });

    return unsubscribe;
  }, [subscribeToTablesValueChange, tableListItem.name]);

  return (
    <TreeNode isExpanded={true} isSelected={value} onSelect={handleSelect} sx={{ paddingLeft: 3 }}>
      <Stack
        sx={{
          borderRadius: 1,
          marginBottom: 0.25,
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
      {tableListItem.relationTables.length > 0 && (
        <TreeGroup sx={{ padding: 0, paddingY: 0 }}>
          {tableListItem.relationTables.map((relationTable) => (
            <TableSelectorListItem
              key={`${relationTable.parent}-${relationTable.name}`}
              onSelect={onSelect}
              valuesRef={valuesRef}
              selectedAsIndeterminate={selectedAsIndeterminate}
              tableListItem={relationTable}
              subscribeToTablesValueChange={subscribeToTablesValueChange}
              disabled={disabled}
            />
          ))}
        </TreeGroup>
      )}
    </TreeNode>
  );
};

export const TableSelectorListItem = React.memo(_TableSelectorListItem);
