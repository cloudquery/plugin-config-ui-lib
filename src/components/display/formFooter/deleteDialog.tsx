import { useId, useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';

interface Props {
  pluginKind: 'source' | 'destination';
  onClose: () => void;
  onConfirm: () => Promise<void>;
  open: boolean;
  name: string;
}

export function FormFooterDeleteDialog({ pluginKind, onClose, onConfirm, open, name }: Props) {
  const labelId = useId();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleConfirm = async () => {
    setIsLoading(true);

    try {
      await onConfirm();
    } catch (error: any) {
      setErrorMessage(error?.data?.message || error?.message || `Failed to delete ${pluginKind}`);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Dialog
      aria-labelledby={labelId}
      fullWidth={true}
      onClose={isLoading ? undefined : onClose}
      open={open}
    >
      <DialogTitle id={labelId} sx={{ paddingBottom: 0, paddingTop: 4 }}>
        <Box alignItems="center" display="flex" justifyContent="space-between">
          <Typography variant="h6">
            Confirm deleting {name} {pluginKind}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          If you delete a {pluginKind}, it can&apos;t be restored. All {pluginKind} configuration
          information will be deleted.
        </Typography>
      </DialogContent>
      <DialogActions>
        {!!errorMessage && <FormHelperText error={true}>{errorMessage}</FormHelperText>}
        <Button
          color="secondary"
          disabled={isLoading}
          onClick={onClose}
          size="medium"
          variant="outlined"
        >
          Cancel
        </Button>
        <LoadingButton
          color="error"
          loading={isLoading}
          onClick={handleConfirm}
          size="medium"
          variant="contained"
        >
          Delete {pluginKind}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
