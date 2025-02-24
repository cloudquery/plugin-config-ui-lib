import { ReactNode } from 'react';

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
}

/**
 * Display setup guide wrapper
 *
 * @public
 */
export function SetupGuide({ docsLink, title, children, maxHeight }: SetupGuideProps) {
  return (
    <Card>
      <CardContent>
        <Stack
          sx={{
            gap: 3,
            p: 3,
            pt: 0,
          }}
        >
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">Setup guide</Typography>
            {!!docsLink && (
              <Button
                onClick={() => window.open(docsLink, '_blank')}
                variant="outlined"
                color="secondary"
                endIcon={<LinkIcon />}
              >
                Open docs
              </Button>
            )}
          </Stack>
          <Divider />
          <Box
            sx={{
              maxHeight,
              overflowY: 'auto',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                marginBottom: 3,
              }}
            >
              {title}
            </Typography>
            {children}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
