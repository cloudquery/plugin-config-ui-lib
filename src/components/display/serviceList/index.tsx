import { useCallback, useMemo, useRef, useState } from 'react';

import { FormControlLabel } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

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
  maxHeight?: BoxProps['maxHeight'];
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
  value,
  onChange,
  maxHeight = '400px',
  disabled,
}: ServiceListProps) {
  const subscriptionsRef = useRef<Record<string, ((value: boolean) => void)[]>>({});
  const valueRef = useRef(value);
  valueRef.current = value;
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const [showServices, setShowServices] = useState<ServiceListMode.All | ServiceListMode.Popular>(
    ServiceListMode.Popular,
  );

  const filteredServices: Service[] = useMemo(
    () =>
      showServices === ServiceListMode.Popular
        ? (topServices
            .map((name) => services.find((service) => service.name === name))
            .filter(Boolean) as Service[])
        : services.sort((a, b) => a.label.localeCompare(b.label)),
    [services, showServices, topServices],
  );

  const allServicesSelected = useMemo(() => {
    return Object.values(filteredServices).every((service) =>
      service.tables.every((table) => value?.[table]),
    );
  }, [filteredServices, value]);

  const subscribeToServiceValueChange = useCallback(
    (serviceName: string, callback: (value: boolean) => void) => {
      subscriptionsRef.current[serviceName] = [
        ...(subscriptionsRef.current[serviceName] || []),
        callback,
      ];

      return () => {
        delete subscriptionsRef.current[serviceName];
      };
    },
    [],
  );

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

      for (const callback of subscriptionsRef.current[service.name] || []) {
        callback(isChecked);
      }
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
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Tabs value={showServices} onChange={(_, newValue) => setShowServices(newValue)}>
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
              {value.length} {selectedServices.length > 1 ? 'services' : 'service'} selected
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
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: 'minmax(0, 1fr) minmax(0, 1fr)' },
          width: '100%',
          maxHeight,
          overflowY: 'auto',
        }}
      >
        {filteredServices.map((service) => (
          <ServiceListItem
            key={service.name}
            onChange={onChange}
            service={service}
            valueRef={valueRef}
            onExpandToggle={handleExpandService}
            subscribeToServiceValueChange={subscribeToServiceValueChange}
            isExpanded={expandedService === service.name}
            fallbackLogoSrc={fallbackLogoSrc}
            onToggle={handleToggleService}
          />
        ))}
      </Box>
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
