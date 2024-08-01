import { useCallback, useMemo } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';
import { generatePluginTableList } from '../../../utils';
import { PluginTable, TableSelector } from '../../fields';
import React from 'react';

interface Props {
  pluginTables: PluginTable[];
  fieldName?: string;
}

function _PluginTableSelector({ pluginTables, fieldName = 'tables' }: Props) {
  const {
    control,
    formState: { errors, submitCount },
    setValue,
    trigger,
  } = useFormContext();
  const selectedTables: Record<string, boolean> = useWatch({
    exact: true,
    name: fieldName,
  });

  const tableList = useMemo(() => generatePluginTableList(pluginTables), [pluginTables]);

  const handleChange = useCallback(
    (value: Record<string, boolean>) => {
      setValue(fieldName, value);
      trigger(fieldName);
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
    <TableSelector
      errorMessage={errorMessage}
      onChange={handleChange}
      subscribeToTablesValueChange={subscribeToTablesValueChange}
      tableList={tableList}
      value={selectedTables}
    />
  );
}

/**
 * This is a react-hook-form plugin table selector control on top of the generic TableSelector component.
 * It is necessary to wrap this component in a react-hook-form FormProvider.
 * If you are not using react-hook-form, please use the TableSelector component directly.
 *
 * @public
 */
export const ReactHookFormPluginTableSelector = React.memo(_PluginTableSelector);
