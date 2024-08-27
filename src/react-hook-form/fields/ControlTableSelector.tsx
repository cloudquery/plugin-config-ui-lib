import { useCallback, useMemo } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';
import React from 'react';
import { FormControl, FormHelperText } from '@mui/material';
import { generatePluginTableList } from '../../utils';
import { TableSelector } from '../../components/fields/tableSelector';

function _PluginTableSelector() {
  const {
    control,
    formState: { errors, submitCount },
    setValue,
    trigger,
    watch,
  } = useFormContext();
  const tablesList = watch('_data.tablesList');
  const selectedTables: Record<string, boolean> = useWatch({
    exact: true,
    name: 'tables',
  });

  const tableList = useMemo(() => generatePluginTableList(tablesList), [tablesList]);

  const handleChange = useCallback(
    (value: Record<string, boolean>) => {
      setValue('tables', value);
      trigger('tables');
    },
    [setValue, trigger],
  );
  const errorMessage = submitCount > 0 ? (errors?.tables?.message as any) : null;

  const subscribeToTablesValueChange = useCallback(
    (callback: (value: Record<string, boolean>) => void) => {
      const { unsubscribe } = control._subjects.values.subscribe({
        next(payload) {
          callback(payload.values.tables);
        },
      });

      return unsubscribe;
    },
    [control],
  );

  if (tableList.length === 0) {
    return null;
  }

  return (
    <FormControl>
      <TableSelector
        errorMessage={errorMessage}
        onChange={handleChange}
        subscribeToTablesValueChange={subscribeToTablesValueChange}
        tableList={tableList}
        value={selectedTables}
      />
      <FormHelperText error={!!errorMessage}>{errorMessage}</FormHelperText>
    </FormControl>
  );
}

/**
 * This component is used to manage table selection.
 *
 * @public
 */
export const ControlTableSelector = React.memo(_PluginTableSelector);
