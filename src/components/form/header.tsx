import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useFormContext } from 'react-hook-form';

import { ControlTextField } from './controls/controlTextField';
import { Section } from './sections/section';
import { usePluginContext } from '../../context/plugin';
import { parseSrc } from '../../utils/parseSrc';
import { Logo } from '../display';

/**
 * This component serves as a header for the form, encapsulating the Name input field.
 *
 * @public
 */
export function ConfigUIFormHeader() {
  const { config } = usePluginContext();
  const { watch } = useFormContext();
  const editMode = watch('_editMode');
  const step = watch('_step');
  const label = config.type === 'source' ? 'integration' : 'destination';

  return (
    <Section>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5">{`${editMode ? 'Update' : 'Create'} ${config.type === 'source' ? 'an integration' : 'a destination'}`}</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Logo src={config.iconLink} fallbackSrc={parseSrc('favicon.ico')} alt={config.label} />
          <Typography variant="body1">{config.label}</Typography>
        </Box>
      </Box>
      {step === 0 && (
        <ControlTextField
          name="displayName"
          helperText={`Unique ${label} name that helps identify the ${label} within your workspace.`}
          label={`${label.charAt(0).toUpperCase() + label.slice(1)} name`}
        />
      )}
    </Section>
  );
}
