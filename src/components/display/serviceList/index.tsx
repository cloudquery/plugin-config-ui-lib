import { forwardRef, ReactNode, useCallback, useMemo, useRef, useState } from 'react';

import { FormControlLabel } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { Virtuoso } from 'react-virtuoso';

import { ServiceListItem } from './listItem';
import { parseSrc } from '../../../utils/parseSrc';

enum ServiceListMode {
  All = 'all',
  Popular = 'popular',
}

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
  const popularServices = useMemo(() => {
    return topServices
      .map((name) => services.find((service) => service.name === name))
      .filter(Boolean) as Service[];
  }, [services, topServices]);

  const [showServices, setShowServices] = useState<ServiceListMode.All | ServiceListMode.Popular>(
    () =>
      !Object.keys(value).some((key) => value[key]) ||
      popularServices.some((service) => service.tables.some((table) => value?.[table]))
        ? ServiceListMode.Popular
        : ServiceListMode.All,
  );

  const filteredServices: Service[] = useMemo(
    () =>
      showServices === ServiceListMode.Popular
        ? popularServices
        : services.sort((a, b) => a.label.localeCompare(b.label)),
    [services, showServices, popularServices],
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

  const handleServiceCategoryChange = useCallback((newValue: ServiceListMode) => {
    setShowServices(newValue);
    setExpandedService(null);
  }, []);

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
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Tabs
          value={showServices}
          onChange={(_, newValue) => handleServiceCategoryChange(newValue)}
        >
          <Tab
            disabled={disabled}
            sx={{ py: '9px' }}
            label={<Typography variant="subtitle1">Popular services</Typography>}
            value={ServiceListMode.Popular}
          />
          <Tab
            disabled={disabled}
            sx={{ py: '9px' }}
            label={<Typography variant="subtitle1">All services</Typography>}
            value={ServiceListMode.All}
          />
        </Tabs>
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
            onClick={handleSelectAllServices}
            label={
              showServices === ServiceListMode.Popular
                ? 'Select all popular services'
                : 'Select all services'
            }
          />
        </Stack>
      </Stack>
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
                />
              </Box>
            ))}
          </Box>
        )}
      />
      <Button
        disabled={disabled}
        fullWidth={true}
        onClick={() =>
          setShowServices(
            showServices === ServiceListMode.Popular
              ? ServiceListMode.All
              : ServiceListMode.Popular,
          )
        }
        sx={{ width: 'auto' }}
      >
        {showServices === ServiceListMode.Popular
          ? 'Show all services'
          : 'Show only popular services'}
      </Button>
    </Stack>
  );
}
