import { useEffect, useMemo, useState } from 'react';

import {
  Box,
  Button,
  Checkbox,
  Stack,
  Tab,
  Tabs,
  ToggleButton,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';

import { Logo } from './logo';

enum ServiceListMode {
  All = 'all',
  Popular = 'popular',
}

type ServiceType = {
  name: string;
  label: string;
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
}: Props) {
  const { palette } = useTheme();

  const [showServices, setShowServices] = useState<ServiceListMode.All | ServiceListMode.Popular>(
    ServiceListMode.Popular,
  );

  // prefetch logos
  useEffect(() => {
    for (const service of Object.values(services)) {
      const img = new Image();
      img.src = service.logo;
    }
  }, [services]);

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
        <Tab label="Popular Services" value={ServiceListMode.Popular}></Tab>
        <Tab label="All Services" value={ServiceListMode.All}></Tab>
      </Tabs>
      <Box
        display="grid"
        gap={2}
        gridTemplateColumns={{ xs: 'minmax(0, 1fr) minmax(0, 1fr)' }}
        width="100%"
        maxHeight="calc(100vh - 550px)"
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
                      {service.label}
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
        fullWidth
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
