import { useCallback, useMemo, useState } from 'react';

import { FormControlLabel } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import ToggleButton from '@mui/material/ToggleButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { Logo } from './logo';
import { parseSrc } from '../../utils/parseSrc';

enum ServiceListMode {
  All = 'all',
  Popular = 'popular',
}

type ServiceType = {
  name: string;
  label: string;
  shortLabel?: string;
  logo: string;
  tables: string[];
};

/**
 * ServiceTypes type is the required shape of the services for the ServiceList
 *
 * @public
 */
export type ServiceTypes = Record<string, ServiceType>;

/**
 * @public
 */
export interface ServiceListProps {
  services: ServiceTypes;
  topServices?: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
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
  topServices = [],
  fallbackLogoSrc = parseSrc('favicon.ico'),
  value = [],
  onChange,
  maxHeight = '400px',
  disabled,
}: ServiceListProps) {
  const { palette } = useTheme();

  const [showServices, setShowServices] = useState<ServiceListMode.All | ServiceListMode.Popular>(
    ServiceListMode.Popular,
  );

  const filteredServices: ServiceType[] = useMemo(
    () =>
      showServices === ServiceListMode.Popular
        ? topServices.map((name) => services[name]).filter(Boolean)
        : Object.values(services).sort((a, b) => a.label.localeCompare(b.label)),
    [services, showServices, topServices],
  );

  const allServicesSelected = useMemo(() => {
    return Object.values(services).every((service) => value.includes(service.name));
  }, [services, value]);

  const handleAllServicesSelected = useCallback(() => {
    onChange?.(allServicesSelected ? [] : Object.values(services).map((service) => service.name));
  }, [allServicesSelected, onChange, services]);

  const handleSelectAllServices = useCallback(() => {
    onChange?.(Object.values(filteredServices).map((service) => service.name));
  }, [onChange, filteredServices]);

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
        alignItems="flex-start"
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
        {value.length > 0 && (
          <Typography variant="body1">Selected services: {value.length}</Typography>
        )}
      </Stack>
      <Stack gap={1}>
        <FormControlLabel
          disabled={disabled}
          control={
            <Checkbox
              disabled={disabled}
              checked={allServicesSelected}
              onChange={handleAllServicesSelected}
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
          {filteredServices.map((service) => {
            const isChecked = value?.includes(service.name);

            return (
              <ToggleButton
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  py: 0.5,
                  pr: 0,
                }}
                key={service.name}
                value={service.name}
                disabled={disabled}
                onClick={() =>
                  onChange?.(
                    isChecked
                      ? value.filter((name: string) => name !== service.name)
                      : [...value, service.name],
                  )
                }
              >
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
                          color: palette.grey[400],
                        }}
                      >
                        {service.shortLabel ?? service.label}
                      </Typography>
                    </Tooltip>
                  </Box>
                  <Checkbox checked={isChecked} />
                </Box>
              </ToggleButton>
            );
          })}
        </Box>
      </Stack>
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
