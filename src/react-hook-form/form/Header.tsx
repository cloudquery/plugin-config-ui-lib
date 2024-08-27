import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useFormContext } from 'react-hook-form';
import { Section, Logo } from '../../components';
import { PluginConfig } from '../../types';
import { ControlTextField } from '../fields/ControlTextField';

interface Props {
  config: PluginConfig;
}

/**
 * This component serves as a header for the form, encapsulating the Name input field.
 *
 * @public
 */
export function Header({ config }: Props) {
  const { watch } = useFormContext();
  const editMode = watch('_editMode');
  const step = watch('_step');

  return (
    <Section>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">{editMode ? 'Update' : 'Create'} a source</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={1.5}>
          <Logo src={`images/logo.webp`} fallbackSrc="favicon.ico" alt={config.label} />
          <Typography variant="body1">{config.label}</Typography>
        </Box>
      </Box>
      {step === 0 && (
        <ControlTextField
          name="name"
          textFieldProps={{ disabled: editMode }}
          helperText={'Unique source name that helps identify the source within your workspace.'}
          label="Source name"
        />
      )}
    </Section>
  );
}
