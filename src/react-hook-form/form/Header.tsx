import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useFormContext } from 'react-hook-form';

import { Section, Logo } from '../../components';
import { usePluginContext } from '../../context/plugin';
import { ControlTextField } from '../fields/ControlTextField';

/**
 * This component serves as a header for the form, encapsulating the Name input field.
 *
 * @public
 */
export function Header() {
  const { config } = usePluginContext();
  const { watch } = useFormContext();
  const editMode = watch('_editMode');
  const step = watch('_step');

  return (
    <Section>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">{`${editMode ? 'Update' : 'Create'} a ${config.type}`}</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={1.5}>
          <Logo src={config.iconLink} fallbackSrc="favicon.ico" alt={config.label} />
          <Typography variant="body1">{config.label}</Typography>
        </Box>
      </Box>
      {step === 0 && (
        <ControlTextField
          name="displayName"
          helperText={`Unique ${config.type} name that helps identify the ${config.type} within your workspace.`}
          label={`${config.type.charAt(0).toUpperCase() + config.type.slice(1)} name`}
        />
      )}
    </Section>
  );
}
