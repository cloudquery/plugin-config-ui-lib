import { ReactNode } from 'react';

import { Box, CircularProgress, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

interface Props<Data> {
  LoadingSkeleton?: ({ children }: { children?: ReactNode }) => ReactNode;
  children: (data: Exclude<Data, undefined | null>) => ReactNode;
  data: Data;
  emptyAction?: ReactNode;
  emptyCondensed?: boolean;
  emptyImage?: ReactNode;
  emptyMessage?: string;
  emptyTitle?: string;
  errorMessage?: string;
  errorTitle?: string;
  isError: boolean;
  isLoading?: boolean;
  loaderText?: string;
  errorActionText?: string;
}

export function ApiDataWrapper<Data>({
  LoadingSkeleton,
  children,
  data,
  emptyAction,
  emptyCondensed,
  emptyImage,
  emptyMessage,
  emptyTitle,
  errorMessage,
  errorTitle,
  isError,
  isLoading,
  loaderText,
  errorActionText,
}: Props<Data>) {
  if (isError) {
    return (
      <Box padding={3} textAlign="center" width="100%">
        <Typography marginBottom={2} variant="h5">
          {errorTitle ?? 'Something went wrong'}
        </Typography>
        <Typography variant="body1" whiteSpace="pre-line">
          {errorMessage || `Error occurred when trying to ${errorActionText}.`}
        </Typography>
      </Box>
    );
  }

  if (isLoading || (!isError && !data && isLoading === false)) {
    return (
      <>
        {LoadingSkeleton ? (
          <LoadingSkeleton />
        ) : (
          <Stack padding={1} width="100%">
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
              gap={2}
              height={150}
              justifyContent="center"
            >
              <CircularProgress />
              {!!loaderText && <Typography variant="body1">{loaderText}</Typography>}
            </Box>
          </Stack>
        )}
      </>
    );
  }

  if (data && Array.isArray(data) && data.length === 0) {
    return (
      <Box
        sx={{ bgcolor: 'background.paper', borderRadius: 2.5, padding: emptyCondensed ? 5 : 9 }}
        textAlign="center"
        width="100%"
      >
        <Stack spacing={3}>
          {emptyImage && (
            <Box display="flex" justifyContent="center" width="100%">
              {emptyImage}
            </Box>
          )}
          <Stack alignItems="center" spacing={2}>
            <Typography color="text.primary" variant="h5">
              {emptyTitle}
            </Typography>
            {!!emptyMessage && (
              <Typography
                maxWidth="600px"
                sx={{ color: 'text.secondary' }}
                variant="body1"
                whiteSpace="pre-line"
              >
                {emptyMessage}
              </Typography>
            )}
          </Stack>
          {emptyAction && <div>{emptyAction}</div>}
        </Stack>
      </Box>
    );
  }

  return <>{children(data as Exclude<Data, undefined | null>)}</>;
}
