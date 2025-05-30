import { forwardRef, ReactNode, useCallback, useMemo, useState } from 'react';

import { Alert, AlertTitle, Button, FormControlLabel } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Virtuoso } from 'react-virtuoso';

import { ServiceSelectorFilters } from './filters';
import { ServiceSelectorListItem } from './listItem';
import { parseSrc } from '../../../utils/parseSrc';

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
  topServices?: string[];
  /**
   * This is the map of tables to their selected state
   */
  value: Record<string, boolean>;
  onChange: (value: Record<string, boolean>) => void;
  fallbackLogoSrc?: string;
  maxHeight?: string | number;
  disabled?: boolean;
  isUpdating?: boolean;
  slowTables?: string[];
}

const defaultTopServices = [];
const defaultSlowTables = [];

/**
 * ServiceSelector component is multi-select form component for selecting services
 * with an expandable view of all available services.
 *
 * @public
 */
export function ServiceSelector({
  services,
  topServices = defaultTopServices,
  fallbackLogoSrc = parseSrc('favicon.ico'),
  value = {},
  onChange,
  disabled,
  slowTables = defaultSlowTables,
}: ServiceListProps) {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterServicesValue, setFilterServicesValue] = useState<'all' | 'selected' | 'unselected'>(
    'all',
  );
  const [changedServiceNamesWithCurrentFilter, setChangedServiceNamesWithCurrentFilter] = useState<
    string[]
  >([]);

  const filteredAndSortedServices: Service[] = useMemo(() => {
    const searchValueTrimmed = search.trim().toLowerCase();
    const filteredServices =
      !searchValueTrimmed && filterServicesValue === 'all'
        ? services
        : services.filter((service) => {
            if (
              searchValueTrimmed &&
              !service.label.toLowerCase().includes(searchValueTrimmed) &&
              !service.tables.some((table) => table.toLowerCase().includes(searchValueTrimmed))
            ) {
              return false;
            }

            if (
              filterServicesValue === 'selected' &&
              !service.tables.some((table) => value?.[table]) &&
              !changedServiceNamesWithCurrentFilter.includes(service.name)
            ) {
              return false;
            }

            if (
              filterServicesValue === 'unselected' &&
              service.tables.some((table) => value?.[table]) &&
              !changedServiceNamesWithCurrentFilter.includes(service.name)
            ) {
              return false;
            }

            return true;
          });

    return filteredServices.sort((a, b) => {
      if (topServices.includes(a.name) && !topServices.includes(b.name)) {
        return -1;
      }
      if (!topServices.includes(a.name) && topServices.includes(b.name)) {
        return 1;
      }

      return a.label.toLowerCase().localeCompare(b.label.toLowerCase());
    });
  }, [
    services,
    search,
    topServices,
    filterServicesValue,
    value,
    changedServiceNamesWithCurrentFilter,
  ]);

  const serviceRows = useMemo(() => {
    const rows: Service[][] = [];
    for (let i = 0; i < filteredAndSortedServices.length; i += 2) {
      rows.push(
        [filteredAndSortedServices[i], filteredAndSortedServices[i + 1]].filter(
          Boolean,
        ) as Service[],
      );
    }

    return rows;
  }, [filteredAndSortedServices]);

  const allServicesSelected = useMemo(() => {
    return (
      filteredAndSortedServices.length > 0 &&
      Object.values(filteredAndSortedServices).every((service) =>
        service.tables.every((table) => value?.[table]),
      )
    );
  }, [filteredAndSortedServices, value]);

  const selectedServices = useMemo(() => {
    return services.filter((service) => service.tables.some((table) => value?.[table]));
  }, [services, value]);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setExpandedService(null);
  }, []);

  const handleServiceTypeChange = useCallback((value: 'all' | 'selected' | 'unselected') => {
    setFilterServicesValue(value);
    setExpandedService(null);
    setChangedServiceNamesWithCurrentFilter([]);
  }, []);

  const handleSelectAllServices = useCallback(() => {
    const newValues = Object.fromEntries(
      filteredAndSortedServices
        .flatMap(({ tables }) => tables)
        .map((tableName) => [tableName, !allServicesSelected]),
    );

    onChange({
      ...value,
      ...newValues,
    });
  }, [allServicesSelected, onChange, filteredAndSortedServices, value]);

  const handleToggleService = useCallback(
    (service: Service, isChecked: boolean) => {
      onChange({
        ...value,
        ...Object.fromEntries(service.tables.map((table) => [table, isChecked])),
      });
      if (['selected', 'unselected'].includes(filterServicesValue)) {
        setChangedServiceNamesWithCurrentFilter((prev) => [...prev, service.name]);
      }
    },
    [onChange, value, filterServicesValue],
  );

  const handleExpandService = useCallback(
    (serviceName: string) => {
      setExpandedService(expandedService === serviceName ? null : serviceName);
    },
    [expandedService],
  );

  const selectedSlowTables = useMemo(() => {
    return slowTables
      .filter((table) => value?.[table])
      .map((table) => ({
        table,
        service: services.find((service) => service.tables.includes(table)),
      }));
  }, [slowTables, value, services]);

  const handleUnselectAllSlowTables = useCallback(() => {
    const newValues = Object.fromEntries(selectedSlowTables.map(({ table }) => [table, false]));

    onChange({
      ...value,
      ...newValues,
    });
  }, [onChange, selectedSlowTables, value]);

  return (
    <Stack
      sx={{
        gap: 3,
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
            disabled={disabled || filteredAndSortedServices.length === 0}
            control={
              <Checkbox
                disabled={disabled}
                checked={allServicesSelected}
                onChange={handleSelectAllServices}
                size="small"
              />
            }
            sx={{ alignSelf: 'center' }}
            label={
              filteredAndSortedServices.length === services.length
                ? 'Select all services'
                : 'Select all filtered services'
            }
          />
        </Stack>
      </Stack>
      <ServiceSelectorFilters
        onSearchChange={handleSearchChange}
        onServiceTypeChange={handleServiceTypeChange}
        searchValue={search}
        serviceTypeValue={filterServicesValue}
        disabled={disabled}
      />
      {filteredAndSortedServices.length > 0 ? (
        <Virtuoso
          style={{ height: 470, width: '100%', maxHeight: '90vh' }}
          data={serviceRows}
          components={{
            List: gridComponents.List,
          }}
          itemContent={(_, serviceRow) => (
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={1.5} width="100%">
              {serviceRow.map((service) => (
                <Box key={service.name} minWidth="0">
                  <ServiceSelectorListItem
                    onChange={onChange}
                    service={service}
                    value={value}
                    isSelected={service.tables.some((table) => value?.[table])}
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
      ) : (
        <Typography variant="body2">No services found</Typography>
      )}
      {selectedSlowTables.length > 0 && (
        <Alert variant="filled" severity="warning">
          <AlertTitle>Slow tables selected</AlertTitle>
          The following tables are slow to sync. Make sure that this is intentional or unselect
          them:
          <Box component="ul" sx={{ margin: 0, paddingLeft: 3 }}>
            {selectedSlowTables.map(({ table, service }) => (
              <li key={table}>
                {table} ({service?.label})
              </li>
            ))}
          </Box>
          <Button
            sx={{ marginTop: 1 }}
            variant="outlined"
            color="inherit"
            onClick={handleUnselectAllSlowTables}
          >
            Unselect all slow tables
          </Button>
        </Alert>
      )}
    </Stack>
  );
}
