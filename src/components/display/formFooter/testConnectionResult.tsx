import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionDetails, Divider } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useGetTestConnectionLogs } from '../../../hooks/useGetTestConnectionLogs';
import { ApiDataWrapper } from '../apiDataWrapper';
import { TestConnectionLogs } from '../testConnectionLogs';

interface Props {
  failureError: (Error & { code?: string }) | undefined;
  isLoading: boolean;
  isSubmitting?: boolean;
  pluginKind: 'source' | 'destination';
  onCancel: () => void;
  onSuccess: () => void;
  pluginName: string;
  teamName: string;
  testConnectionId?: string;
}

export function FormFooterTestConnectionResult({
  failureError,
  isLoading,
  isSubmitting,
  pluginKind,
  onCancel,
  onSuccess,
  pluginName,
  teamName,
  testConnectionId,
}: Props) {
  const resultCardRef = useRef<HTMLDivElement>(null);
  const logsCardRef = useRef<HTMLDivElement>(null);
  const progressElemRef = useRef<HTMLDivElement>(null);
  const intervalId = useRef<number>();
  const timeoutId = useRef<number>();
  const [progress, setProgress] = useState(0);
  const [progressRunning, setProgressRunning] = useState(false);

  const {
    data: logs,
    error: errorLogs,
    isLoading: isLoadingLogs,
  } = useGetTestConnectionLogs(
    `/teams/${teamName}/sync-${pluginKind}-test-connections/${testConnectionId}/logs`,
    {
      query: {
        enabled: !!testConnectionId,
      },
    },
  );

  useEffect(() => {
    if (isLoading) {
      setProgressRunning(true);

      const updateProgress = (currentProgress: number) => {
        const difference = 100 - currentProgress;
        const newProgressValue = currentProgress + difference / 80;
        setProgress(newProgressValue);

        intervalId.current = window.setTimeout(() => updateProgress(newProgressValue), 100);
      };

      updateProgress(0);

      return () => clearTimeout(intervalId.current);
    }
  }, [isLoading]);

  useLayoutEffect(() => {
    if (isLoading) {
      resultCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isLoading]);

  useLayoutEffect(() => {
    if (testConnectionId) {
      logsCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [testConnectionId]);

  useEffect(() => {
    if (!isLoading && !isSubmitting) {
      let hasTransitionEnded = false;

      const handleTransitionEnd = () => {
        setProgressRunning(false);

        clearTimeout(timeoutId.current);
        timeoutId.current = window.setTimeout(() => {
          if (!hasTransitionEnded) {
            hasTransitionEnded = true;
            if (!failureError) {
              onSuccess();
            }
          }
        }, 300);
      };

      const progressBar = progressElemRef.current?.querySelector(`.${linearProgressClasses.bar}`);

      progressBar?.addEventListener('transitionend', handleTransitionEnd, { once: true });
      progressBar?.addEventListener('webkitTransitionEnd', handleTransitionEnd, { once: true });

      clearTimeout(intervalId.current);
      setProgress(100);

      return () => {
        progressBar?.removeEventListener('transitionend', handleTransitionEnd);
        progressBar?.removeEventListener('webkitTransitionEnd', handleTransitionEnd);
        clearTimeout(timeoutId.current);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isSubmitting]);

  const errorMessage = failureError
    ? failureError.message || 'Connection failed, please check your configuration and try again'
    : undefined;

  const logsNotAvailable =
    errorLogs && (errorLogs.message || errorLogs.data.message) === 'Logs not available';

  return (
    <Stack gap={3}>
      <Card ref={resultCardRef}>
        <CardContent sx={{ paddingY: 4, paddingX: 2, '&:last-child': { paddingBottom: 4 } }}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: 'center',
              height: 36,
              justifyContent: 'space-between',
              marginBottom: 4,
              width: '100%',
            }}
          >
            <Typography variant="h6">
              Testing the {pluginKind === 'source' ? 'integration' : 'destination'} connection
            </Typography>
            {isLoading && (
              <Button
                color="secondary"
                endIcon={<CloseIcon />}
                onClick={onCancel}
                variant="outlined"
              >
                Cancel
              </Button>
            )}
          </Stack>
          {progressRunning && (
            <LinearProgress ref={progressElemRef} value={progress} variant="determinate" />
          )}
          {errorMessage && !progressRunning && (
            <Alert color="error" severity="error" variant="filled">
              <AlertTitle>Connection test failed</AlertTitle>
              {errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)}
            </Alert>
          )}
        </CardContent>
      </Card>
      {testConnectionId && (
        <Card ref={logsCardRef}>
          <CardContent>
            <Accordion sx={{ backgroundColor: 'transparent', border: 'none' }} variant="outlined">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  minHeight: 0,
                  padding: 0,
                  [`& .${accordionSummaryClasses.content}`]: {
                    marginY: 0,
                    [`&.${accordionSummaryClasses.expanded}`]: {
                      marginY: 0,
                    },
                  },
                  [`&.${accordionSummaryClasses.expanded}`]: {
                    minHeight: 0,
                  },
                }}
              >
                <Stack>
                  <Typography marginBottom={1} variant="h5">
                    Connection Logs
                  </Typography>
                  <Typography variant="body2">View & download connection logs.</Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                <Divider sx={{ marginY: 2.5 }} />
                <ApiDataWrapper
                  data={logs}
                  emptyTitle="No logs found"
                  errorActionText="load logs"
                  errorMessage={
                    logsNotAvailable ? 'Logs for this test connection are not available' : undefined
                  }
                  errorTitle={logsNotAvailable ? 'Logs are not available' : undefined}
                  isError={!!errorLogs}
                  isLoading={isLoadingLogs}
                >
                  {(data) => (
                    <Stack height="100%" minHeight={400} overflow="hidden">
                      <TestConnectionLogs id={`${pluginName}-${testConnectionId}`} logs={data} />
                    </Stack>
                  )}
                </ApiDataWrapper>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}
