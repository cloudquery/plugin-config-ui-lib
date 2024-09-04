import { ControlSecretFieldProps } from '../../../react-hook-form/fields/ControlSecretField';
import { ControlTextFieldProps } from '../../../react-hook-form/fields/ControlTextField';
import { ControlNumberFieldProps } from '../../../react-hook-form/fields/ControlNumberField';
import { ControlBooleanFieldProps } from '../../../react-hook-form/fields/ControlBooleanField';
import { ControlMultiSelectProps } from '../../../react-hook-form/fields/ControlMultiSelect';
import { ControlExclusiveToggleProps } from '../../../react-hook-form/fields/ControlExclusiveToggle';
import { ControlDateTimeFieldProps } from '../../../react-hook-form/fields/ControlDateTimeField';
import { ControlSelectFieldProps } from '../../../react-hook-form';
import { ConditionalRenderingProps } from './ConditionalRenderingWrapper';
import {
  CollapsibleSectionProps,
  CollapsibleSubSectionProps,
  SectionProps,
  SubSectionProps,
} from '../..';

type ComponentAbstract = Pick<ConditionalRenderingProps, 'shouldRender'>;

export type RenderSection = ComponentAbstract &
  (
    | LayoutSection
    | LayoutCollapsibleSection
    | LayoutCollapsibleSubSection
    | LayoutSubSection
    // | React.FC<any>
    | LayoutComponent
  );

// Components
type LayoutComponent =
  | LayoutTextField
  | LayoutSecretField
  | LayoutNumberField
  | LayoutDateTimeField
  | LayoutBooleanField
  | LayoutSelectField
  | LayoutMultiSelectField
  | LayoutTableSelector
  | LayoutExclusiveToggle;

interface LayoutTextField extends ComponentAbstract, ControlTextFieldProps {
  component: 'control-text-field';
}

interface LayoutSecretField extends ComponentAbstract, ControlSecretFieldProps {
  component: 'control-secret-field';
}

interface LayoutNumberField extends ComponentAbstract, ControlNumberFieldProps {
  component: 'control-number-field';
}

interface LayoutSelectField extends ComponentAbstract, ControlSelectFieldProps {
  component: 'control-select-field';
}

interface LayoutBooleanField extends ComponentAbstract, ControlBooleanFieldProps {
  component: 'control-boolean-field';
}

interface LayoutDateTimeField extends ComponentAbstract, ControlDateTimeFieldProps {
  component: 'control-date-time-field';
}

interface LayoutMultiSelectField extends ComponentAbstract, ControlMultiSelectProps {
  component: 'control-multi-select';
}

interface LayoutTableSelector extends ComponentAbstract {
  component: 'control-table-selector';
}

interface LayoutExclusiveToggle extends ComponentAbstract, ControlExclusiveToggleProps {
  component: 'control-exclusive-toggle';
}

// TODO: enable after iframe deprecation
// export interface LayoutOAuth {
//   component: 'control-oauth';
// }

// Layouts
interface LayoutSection extends ComponentAbstract, SectionProps {
  component: 'section';
}

interface LayoutCollapsibleSection extends ComponentAbstract, CollapsibleSectionProps {
  component: 'collapsible-section';
}

interface LayoutSubSection extends ComponentAbstract, SubSectionProps {
  component: 'sub-section';
}

interface LayoutCollapsibleSubSection extends ComponentAbstract, CollapsibleSubSectionProps {
  component: 'collapsible-sub-section';
}
