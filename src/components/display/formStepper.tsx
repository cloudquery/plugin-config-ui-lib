import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import { StepIconProps } from '@mui/material/StepIcon';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import useTheme from '@mui/material/styles/useTheme';

function SyncFormStepIcon({
  active,
  className,
  completed,
  label,
}: StepIconProps & { label: string }) {
  const theme = useTheme();

  return (
    <Box
      className={className}
      sx={{
        alignItems: 'center',
        border: 'solid 1px',
        borderColor: theme.palette.action.active,
        borderRadius: '50%',
        color: theme.palette.action.active,
        display: 'flex',
        fontSize: '14px',
        height: '24px',
        justifyContent: 'space-around',
        width: '24px',
        ...(completed
          ? {
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
            }
          : {}),
        ...(active
          ? {
              bgcolor: theme.palette.primary.main,
              border: 'none',
              color: theme.palette.background.default,
            }
          : {}),
      }}
    >
      {label}
    </Box>
  );
}

interface Props {
  steps: string[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

/**
 * FormStepper component manages navigation of multi-step forms, intended for re-use across custom plugins.
 *
 * @public
 */
export function FormStepper({ steps, activeIndex, setActiveIndex }: Props) {
  return (
    <Stepper
      activeStep={activeIndex}
      connector={<ChevronRightIcon color="secondary" />}
      nonLinear={true}
    >
      {steps.map((step, index) => {
        const stepProps: { completed?: boolean } = {};

        if (index < activeIndex) {
          stepProps.completed = true;
        }

        return (
          <Step key={step} {...stepProps}>
            <StepLabel
              onClick={() => setActiveIndex(index)}
              StepIconComponent={(props) => (
                <SyncFormStepIcon {...props} label={(index + 1).toString()} />
              )}
            >
              {step}
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
}
