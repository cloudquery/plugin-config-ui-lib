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
  failureReason: string | undefined;
  isLoading: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

export function FormFooterTestConnectionResult({
  failureReason,
  isLoading,
  onCancel,
  onSuccess,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const progressElemRef = useRef<HTMLDivElement>(null);
  const intervalId = useRef<number>();
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
    if (!isLoading) {
      progressElemRef.current
        ?.querySelector(`.${linearProgressClasses.bar}`)
        ?.addEventListener('transitionend', () => {
          window.setTimeout(() => {
            if (failureReason) {
              setErrorMessage(failureReason);
            } else {
              setSuccess(true);
              onSuccess();
            }
          }, 300);
        });
      clearTimeout(intervalId.current);
      setProgress(100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (success) {
    return null;
  }

  return (
    <Card ref={cardRef}>
      <Card sx={{ paddingY: 4, paddingX: 2, '&:last-child': { paddingBottom: 4 } }}>
        <Stack
          alignItems="center"
          direction="row"
          height={36}
          justifyContent="space-between"
          marginBottom={4}
          spacing={2}
          width="100%"
        >
          <Typography variant="h6">Connection test</Typography>
          {isLoading && (
            <Button color="secondary" endIcon={<CloseIcon />} onClick={onCancel} variant="outlined">
              Cancel test
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