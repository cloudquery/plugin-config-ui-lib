import { ReactNode } from 'react';

import { PluginUiMessageHandler } from '@cloudquery/plugin-config-ui-connector';
import LinkIcon from '@mui/icons-material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/**
 * @public
 */
export interface SetupGuideProps {
  docsLink?: string;
  title: string;
  maxHeight?: number;
  children: ReactNode;
  pluginUiMessageHandler: PluginUiMessageHandler;
}

/**
 * Display setup guide wrapper
 *
 * @public
 */
export function SetupGuide({
  docsLink,
  title,
  children,
  maxHeight,
  pluginUiMessageHandler,
}: SetupGuideProps) {
  return (
    <Card>
      <CardContent>
        <Stack gap={3} p={3} pt={0}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Setup guide</Typography>
            {!!docsLink && (
              <Button
                onClick={() => pluginUiMessageHandler.sendMessage('open_url', { url: docsLink })}
                variant="outlined"
                color="secondary"
                endIcon={<LinkIcon />}
              >
                Open docs
              </Button>
            )}
          </Stack>
          <Divider />
          <Box maxHeight={maxHeight} sx={{ overflowY: 'auto' }}>
            <Typography variant="h5" marginBottom={3}>
              {title}
            </Typography>
            {children}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
