import { useMemo, useState } from 'react';

import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import useTheme from '@mui/material/styles/useTheme';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import ToggleButton from '@mui/material/ToggleButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { Logo } from './logo';

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

interface Props {
  services: ServiceTypes;
  topServices: string[];
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
  topServices,
  fallbackLogoSrc,
  value = [],
  onChange,
  maxHeight = '400px',
  disabled
}: Props) {
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

  return (
    <Stack gap={2}>
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
      <Box
        display="grid"
        gap={2}
        gridTemplateColumns={{ xs: 'minmax(0, 1fr) minmax(0, 1fr)' }}
        width="100%"
        maxHeight={maxHeight}
        sx={{ overflowY: 'auto' }}
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
                display="flex"
                alignItems="center"
                gap={1}
                justifyContent="space-between"
                width="100%"
              >
                <Box display="flex" alignItems="center" gap={1} flexShrink={1} width="70%">
                  <Logo
                    src={service.logo}
                    fallbackSrc={fallbackLogoSrc}
                    alt={service.name}
                    height={32}
                    width={32}
                  />
                  <Tooltip title={service.label}>
                    <Typography
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                      color={palette.grey[400]}
                      fontWeight="bold"
                      variant="body1"
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
      >
        {showServices === ServiceListMode.Popular
          ? 'Show all services'
          : 'Show only popular services'}
      </Button>
    </Stack>
  );
}
