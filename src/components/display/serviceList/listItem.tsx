import React, { useCallback, useMemo } from 'react';

import { Close, WarningAmber } from '@mui/icons-material';
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
  isSelected: boolean;
  onExpandToggle: (serviceName: string) => void;
  isExpanded: boolean;
  onToggle: (service: Service, isChecked: boolean) => void;
  isPopular?: boolean;
  value: Record<string, boolean>;
}

export function ServiceListItem({
  fallbackLogoSrc = parseSrc('favicon.ico'),
  service,
  disabled,
  onChange,
  value,
  isSelected,
  onExpandToggle,
  isExpanded,
  onToggle,
}: Props) {
  const tablesValue = useMemo(() => {
    return Object.fromEntries(service.tables.map((table) => [table, value[table]]));
  }, [service.tables, value]);

  const tableList = useMemo(() => {
    return service.tables.map((table) => ({ name: table, relationTables: [] }));
  }, [service.tables]);

  const handleToggleTable = useCallback(
    (serviceTablesValues: Record<string, boolean>) => {
      const newTablesValue = {
        ...value,
        ...serviceTablesValues,
      };
      onChange(newTablesValue);
    },
    [onChange, value],
  );

  const handleExpandToggle = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onExpandToggle(service.name);
    },
    [onExpandToggle, service.name],
  );

  const onlySomeTablesSelected = useMemo(() => {
    const selectedTables = Object.keys(tablesValue).filter((table) => tablesValue[table]);

    return selectedTables.length > 0 && selectedTables.length < service.tables.length;
  }, [tablesValue, service.tables]);

  return (
    <Box>
      <Box
        border="1px solid"
        borderColor={isExpanded || isSelected ? 'primary.main' : 'action.active'}
        bgcolor={isExpanded ? 'primary.selected' : undefined}
        borderRadius={1.5}
        sx={{
          '&:hover': {
            borderColor: 'primary.dark',
            bgcolor: 'primary.hovered',
            '.expand-toggle': {
              opacity: 1,
            },
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
            width: '100%',
            '&:hover': {
              bgcolor: 'transparent',
            },
          }}
          key={service.name}
          value={service.name}
          disabled={disabled}
          onClick={() => (isExpanded ? undefined : onToggle(service, !isSelected))}
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
                  minWidth: 0,
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
                {onlySomeTablesSelected && !isExpanded && (
                  <Tooltip
                    title={
                      <Typography variant="body2" maxWidth={288} paddingY={1.5} paddingX={2}>
                        Not all default tables in this service are selected. You can edit it by
                        using the service configuration button.
                      </Typography>
                    }
                  >
                    <WarningAmber color="warning" />
                  </Tooltip>
                )}
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
                <Checkbox
                  checked={isSelected}
                  onChange={(event) => {
                    event.stopPropagation();
                    onToggle(service, event.target.checked);
                  }}
                />
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
            onClick={(event) => event.stopPropagation()}
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
    </Box>
  );
}
