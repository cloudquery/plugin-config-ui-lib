import React, { MutableRefObject, useCallback, useEffect, useMemo, useState } from 'react';

import { Close } from '@mui/icons-material';
import { Collapse, IconButton } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { parseSrc } from '../../../utils/parseSrc';
import { AdjustmentsIcon } from '../../icons/adjustments';
import { TableSelector } from '../../inputs';
import { Logo } from '../logo';

export type Service = {
  name: string;
  label: string;
  shortLabel?: string;
  logo: string;
  tables: string[];
};

interface Props {
  onChange: (value: Record<string, boolean>) => void;
  fallbackLogoSrc?: string;
  maxHeight?: BoxProps['maxHeight'];
  disabled?: boolean;
  service: Service;
  valueRef: MutableRefObject<Record<string, boolean>>;
  onExpandToggle: (serviceName: string) => void;
  subscribeToServiceValueChange: (serviceName: string, callback: (value: boolean) => void) => void;
  isExpanded: boolean;
  onToggle: (service: Service, isChecked: boolean) => void;
}

function ServiceListItemInternal({
  fallbackLogoSrc = parseSrc('favicon.ico'),
  service,
  disabled,
  onChange,
  valueRef,
  onExpandToggle,
  subscribeToServiceValueChange,
  isExpanded,
  onToggle,
}: Props) {
  const [tablesValue, setTablesValue] = useState(() => {
    return Object.fromEntries(service.tables.map((table) => [table, valueRef.current[table]]));
  });

  const tableList = useMemo(() => {
    return service.tables.map((table) => ({ name: table, relationTables: [] }));
  }, [service.tables]);

  const handleToggleTable = useCallback(
    (serviceTablesValues: Record<string, boolean>) => {
      const newTablesValue = {
        ...valueRef.current,
        ...serviceTablesValues,
      };
      onChange(newTablesValue);
      setTablesValue(newTablesValue);
    },
    [onChange, valueRef],
  );

  const handleExpandToggle = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onExpandToggle(service.name);
    },
    [onExpandToggle, service.name],
  );

  useEffect(() => {
    return subscribeToServiceValueChange(service.name, () => {
      setTablesValue(
        Object.fromEntries(service.tables.map((table) => [table, valueRef.current[table]])),
      );
    });
  }, [subscribeToServiceValueChange, service, valueRef]);

  const isChecked = service.tables.some((table) => valueRef.current?.[table]);

  useEffect(() => {
    setTablesValue(
      Object.fromEntries(service.tables.map((table) => [table, valueRef.current[table]])),
    );
  }, [isChecked, service.tables, valueRef]);

  return (
    <Box
      border="1px solid"
      borderColor={isExpanded || isChecked ? 'primary.main' : 'transparent'}
      bgcolor={isExpanded ? 'primary.selected' : undefined}
      borderRadius={1.5}
      sx={{
        '&:hover .expand-toggle': {
          opacity: 1,
        },
      }}
    >
      <ToggleButton
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          py: 0.5,
          pr: 0,
          border: 'none',
        }}
        key={service.name}
        value={service.name}
        disabled={disabled}
        onClick={() => onToggle(service, !isChecked)}
      >
        <Stack width="100%">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flexShrink: 1,
                width: '70%',
              }}
            >
              <Logo
                src={service.logo}
                fallbackSrc={fallbackLogoSrc}
                alt={service.name}
                height={32}
                width={32}
              />
              <Tooltip title={service.label}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 'bold',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    color: 'grey.400',
                  }}
                >
                  {service.shortLabel ?? service.label}
                </Typography>
              </Tooltip>
            </Box>
            <Stack direction="row" alignItems="center" gap={1}>
              <IconButton
                className="expand-toggle"
                sx={{ opacity: isExpanded ? undefined : 0, color: 'nav.evident' }}
                size="small"
                onClick={handleExpandToggle}
                component="span"
              >
                {isExpanded ? <Close /> : <AdjustmentsIcon />}
              </IconButton>
              <Checkbox checked={isChecked} />
            </Stack>
          </Box>
        </Stack>
      </ToggleButton>
      <Collapse in={isExpanded} unmountOnExit={true}>
        <Box
          sx={{
            '& .MuiInputBase-root.MuiInputBase-root': {
              backgroundColor: 'secondary.darkMedium',
            },
          }}
        >
          <TableSelector
            tableList={tableList}
            value={tablesValue}
            onChange={handleToggleTable}
            onlySearchFilter={true}
            embeded={true}
          />
        </Box>
      </Collapse>
    </Box>
  );
}

/**
 * ServiceList component is multi-select form component for selecting services
 * with an expandable view of all available services.
 *
 * @public
 */
export const ServiceListItem = React.memo(ServiceListItemInternal);
