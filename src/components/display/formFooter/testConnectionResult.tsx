import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface Props {
  failureError: (Error & { code?: string }) | undefined;
  isLoading: boolean;
  isSubmitting?: boolean;
  pluginKind: 'source' | 'destination';
  onCancel: () => void;
  onSuccess: () => void;
}

export function FormFooterTestConnectionResult({
  failureError,
  isLoading,
  isSubmitting,
  pluginKind,
  onCancel,
  onSuccess,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const progressElemRef = useRef<HTMLDivElement>(null);
  const intervalId = useRef<number>();
  const timeoutId = useRef<number>();
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setErrorMessage(undefined);
      setSuccess(false);

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
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && !isSubmitting) {
      let hasTransitionEnded = false;

      const handleTransitionEnd = () => {
        clearTimeout(timeoutId.current);
        timeoutId.current = window.setTimeout(() => {
          if (!hasTransitionEnded) {
            hasTransitionEnded = true;
            if (failureError) {
              setErrorMessage(
                failureError.message ||
                  'Connection failed, please check your configuration and try again',
              );
            } else {
              setSuccess(true);
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

  if (success) {
    return null;
  }

  return (
    <Card ref={cardRef}>
      <Card sx={{ paddingY: 4, paddingX: 2, '&:last-child': { paddingBottom: 4 } }}>
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
          <Typography variant="h6">{`Testing the ${pluginKind} connection`}</Typography>
          {isLoading && (
            <Button color="secondary" endIcon={<CloseIcon />} onClick={onCancel} variant="outlined">
              Cancel
            </Button>
          )}
        </Stack>
        {errorMessage ? (
          <Alert color="error" severity="error" variant="filled">
            <AlertTitle>Connection test failed</AlertTitle>
            {errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)}
          </Alert>
        ) : (
          <LinearProgress ref={progressElemRef} value={progress} variant="determinate" />
        )}
      </Card>
    </Card>
  );
}
