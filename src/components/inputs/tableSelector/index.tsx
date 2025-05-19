import { useCallback, useMemo, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

import { Virtuoso } from 'react-virtuoso';

import { TableSelectorFilters } from './filters';
import { TableSelectorListItem } from './listItem';
import { PluginTableListItem } from './types';
import {
  filterTableSelectorPluginTableList,
  getTableSelectorPluginFlatTableList,
  handleTableSelectorSelect,
} from './utils';

/**
 * @public
 */
export interface TableSelectorProps {
  /** Error message to display if there is an error. */
  errorMessage?: string;
  /** Current selected table values. */
  value: Record<string, boolean>;
  /** Callback function to handle value changes. */
  onChange: (value: Record<string, boolean>) => void;
  /** List of tables to display in the selector. */
  tableList: PluginTableListItem[];
  /** Form disabled boolean */
  disabled?: boolean;
  /** Only show the search filter */
  onlySearchFilter?: boolean;
  /** Embeded mode */
  embeded?: boolean;
}

/**
 * This component allows users to select tables from a list with filtering options.
 *
 * @public
 */
export function TableSelector({
  errorMessage,
  value = {},
  onChange,
  tableList,
  disabled,
  onlySearchFilter,
  embeded,
}: TableSelectorProps) {
  const { palette } = useTheme();

  const [searchValue, setSearchValue] = useState('');
  const [filterTablesValue, setFilterTablesValue] = useState<'all' | 'selected' | 'unselected'>(
    'all',
  );

  // Those refs are necessary to prevent the tree from updating on every render
  // caused by changing the "handleSelect" function
  const filteredFlatTableListRef = useRef<PluginTableListItem[]>([]);
  const allTablesSelectedRef = useRef(false);
  const selectedTablesRef = useRef<Record<string, boolean>>(value);

  const searchValueTrimmed = searchValue.trim().toLowerCase();
  const filteredTableList = useMemo(
    () =>
      filterTableSelectorPluginTableList(
        tableList,
        selectedTablesRef.current,
        searchValueTrimmed,
        filterTablesValue,
      ).filter((table) => !table.parent),
    [filterTablesValue, searchValueTrimmed, tableList],
  );
  const filteredFlatTableList = useMemo(
    () => getTableSelectorPluginFlatTableList(filteredTableList),
    [filteredTableList],
  );
  const allTablesSelected = useMemo(
    () => filteredFlatTableList.every((table) => value[table.name]),
    [filteredFlatTableList, value],
  );

  filteredFlatTableListRef.current = filteredFlatTableList;
  selectedTablesRef.current = value;
  allTablesSelectedRef.current = allTablesSelected;

  const handleSelect = useCallback(
    (tableListItem: PluginTableListItem) => {
      const changedTables = handleTableSelectorSelect(selectedTablesRef.current, tableListItem);

      onChange({
        ...selectedTablesRef.current,
        ...changedTables,
      });
    },
    [onChange],
  );

  const handleSelectAll = useCallback(() => {
    if (allTablesSelectedRef.current) {
      const selected = { ...selectedTablesRef.current };

      for (const table of filteredFlatTableListRef.current) {
        selected[table.name] = false;
      }

      onChange(selected);
    } else {
      onChange({
        ...selectedTablesRef.current,
        ...Object.fromEntries(filteredFlatTableListRef.current.map(({ name }) => [name, true])),
      });
    }
  }, [onChange]);

  const noResults = filteredTableList.length === 0;

  const numberOfSelectedTables = Object.values(value).filter(Boolean).length;
  const maxHeight = embeded ? '250' : Math.min(tableList.length, 11) * 40;

  return (
    <Box
      sx={{
        border: embeded
          ? undefined
          : `1px solid ${errorMessage ? palette.error.main : palette.text.secondary}`,
        borderRadius: 1,
        padding: 2,
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          marginBottom: 2,
        }}
      >
        <TableSelectorFilters
          onSearchChange={setSearchValue}
          onTableTypeChange={setFilterTablesValue}
          searchValue={searchValue}
          tableTypeValue={filterTablesValue}
          disabled={disabled}
          onlySearchFilter={onlySearchFilter}
          embeded={embeded}
        />
      </Stack>
      <FormControlLabel
        disabled={disabled}
        control={
          <Checkbox
            disabled={disabled || noResults}
            checked={allTablesSelected || noResults}
            onChange={handleSelectAll}
            size="small"
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          />
        }
        label={
          searchValueTrimmed
            ? `${filteredFlatTableList.length} results of ${tableList.length} tables (${numberOfSelectedTables} selected)`
            : `${tableList.length} tables (${numberOfSelectedTables} selected)`
        }
        sx={{ marginLeft: 0, width: '100%' }}
      />
      <Box
        sx={{
          height: `min(${maxHeight}px, 65vh)`,
          maxHeight: '65vh',
          overflow: 'auto',
        }}
      >
        {!noResults && (
          <Virtuoso
            style={{ height: '100%', width: '100%', maxHeight }}
            data={filteredFlatTableList}
            itemContent={(_, table) => (
              <TableSelectorListItem
                key={`${table.parent}-${table.name}`}
                value={!!value[table.name]}
                onSelect={handleSelect}
                selectedAsIndeterminate={filterTablesValue === 'unselected'}
                tableListItem={table}
                disabled={disabled}
                depth={table.depth}
              />
            )}
          />
        )}
      </Box>
    </Box>
  );
}
