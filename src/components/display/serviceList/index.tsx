import { forwardRef, ReactNode, useCallback, useMemo, useRef, useState } from 'react';

import { FormControlLabel } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Virtuoso } from 'react-virtuoso';

import { ServiceListItem } from './listItem';
import { parseSrc } from '../../../utils/parseSrc';
import { SearchInput } from '../../inputs';

export type Service = {
  name: string;
  label: string;
  shortLabel?: string;
  logo: string;
  tables: string[];
};

const gridComponents = {
  // eslint-disable-next-line react/display-name
  List: forwardRef<HTMLDivElement, { children?: ReactNode }>(({ children, ...props }, ref) => (
    <Stack ref={ref} {...props} gap={1.5} width="100%">
      {children}
    </Stack>
  )),
  Item: ({ children, ...props }: { children?: ReactNode }) => <Box {...props}>{children}</Box>,
};

/**
 * @public
 */
export interface ServiceListProps {
  services: Service[];
  topServices: string[];
  /**
   * This is the map of tables to their selected state
   */
  value: Record<string, boolean>;
  onChange: (value: Record<string, boolean>) => void;
  fallbackLogoSrc?: string;
  maxHeight?: string | number;
  disabled?: boolean;
  isUpdating?: boolean;
}

/**
 * ServiceList component is multi-select form component for selecting services
 * with an expandable view of all available services.
 *
 * @public
 */
export function ServiceList({
  services,
  topServices,
  fallbackLogoSrc = parseSrc('favicon.ico'),
  value = {},
  onChange,
  maxHeight = '400px',
  disabled,
}: ServiceListProps) {
  const valueRef = useRef(value);
  valueRef.current = value;
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const filteredServices: Service[] = useMemo(
    () =>
      services
        .filter((service) => service.label.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
          if (topServices.includes(a.name)) {
            return -1;
          }
          if (topServices.includes(b.name)) {
            return 1;
          }

          return a.label.localeCompare(b.label);
        }),
    [services, search, topServices],
  );

  const filteredServiceRows = useMemo(() => {
    const rows: Service[][] = [];
    for (let i = 0; i < filteredServices.length; i += 2) {
      rows.push([filteredServices[i], filteredServices[i + 1]].filter(Boolean) as Service[]);
    }

    return rows;
  }, [filteredServices]);

  const allServicesSelected = useMemo(() => {
    return Object.values(filteredServices).every((service) =>
      service.tables.every((table) => value?.[table]),
    );
  }, [filteredServices, value]);

  const handleSelectAllServices = useCallback(() => {
    const newValues = Object.fromEntries(
      filteredServices
        .flatMap(({ tables }) => tables)
        .map((tableName) => [tableName, !allServicesSelected]),
    );

    onChange({
      ...value,
      ...newValues,
    });
  }, [allServicesSelected, onChange, filteredServices, value]);

  const handleToggleService = useCallback(
    (service: Service, isChecked: boolean) => {
      onChange({
        ...valueRef.current,
        ...Object.fromEntries(service.tables.map((table) => [table, isChecked])),
      });
    },
    [onChange],
  );

  const handleExpandService = useCallback(
    (serviceName: string) => {
      setExpandedService(expandedService === serviceName ? null : serviceName);
    },
    [expandedService],
  );

  const selectedServices = useMemo(() => {
    return services.filter((service) => service.tables.some((table) => value?.[table]));
  }, [services, value]);

  return (
    <Stack
      sx={{
        gap: 2,
      }}
      alignItems="center"
    >
      <Stack
        gap={2}
        flexWrap="wrap"
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        width="100%"
      >
        <Stack direction="row" alignItems="center" gap={1}>
          {selectedServices.length > 0 && (
            <Typography variant="body2" color="secondary">
              {selectedServices.length} {selectedServices.length > 1 ? 'services' : 'service'}{' '}
              selected
            </Typography>
          )}
          <FormControlLabel
            disabled={disabled}
            control={
              <Checkbox
                disabled={disabled}
                checked={allServicesSelected}
                onChange={handleSelectAllServices}
                size="small"
              />
            }
            sx={{ alignSelf: 'center' }}
            label="Select all services"
          />
        </Stack>
      </Stack>
      <SearchInput
        sx={{ width: '100%' }}
        value={search}
        placeholder="Search services"
        size="small"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Virtuoso
        style={{ height: expandedService ? '380px' : '280px', width: '100%', maxHeight }}
        data={filteredServiceRows}
        components={{
          List: gridComponents.List,
        }}
        itemContent={(_, serviceRow) => (
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1.5} width="100%">
            {serviceRow.map((service) => (
              <Box key={service.name} minWidth="0">
                <ServiceListItem
                  onChange={onChange}
                  service={service}
                  valueRef={valueRef}
                  isSelected={service.tables.some((table) => valueRef.current?.[table])}
                  onExpandToggle={handleExpandService}
                  isExpanded={expandedService === service.name}
                  fallbackLogoSrc={fallbackLogoSrc}
                  onToggle={handleToggleService}
                  isPopular={topServices.includes(service.name)}
                />
              </Box>
            ))}
          </Box>
        )}
      />
    </Stack>
  );
}
