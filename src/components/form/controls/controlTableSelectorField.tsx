import React, { useCallback, useMemo } from 'react';

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

import { useFormContext, useWatch } from 'react-hook-form';

import { usePluginContext } from '../../../context';
import { generatePluginTableList } from '../../../utils';
import { TableSelector } from '../../inputs';

function InternalPluginTableSelector() {
  const {
    formState: { errors, submitCount },
    setValue,
    trigger,
  } = useFormContext();
  const { tablesList } = usePluginContext();
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

  if (tableList.length === 0) {
    return null;
  }

  return (
    <FormControl>
      <input
        type="hidden"
        style={{
          maxWidth: 0,
          overflow: 'hidden',
          padding: 0,
          margin: 0,
          maxHeight: 0,
          border: 0,
        }}
        name="tables"
        value={JSON.stringify(selectedTables)}
      />
      <TableSelector
        errorMessage={errorMessage}
        onChange={handleChange}
        tableList={tableList}
        disabled={tableList.length === 1}
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
export const ControlTableSelectorField = React.memo(InternalPluginTableSelector);
