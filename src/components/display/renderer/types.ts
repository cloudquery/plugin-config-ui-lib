import { ReactNode } from 'react';
import { ControlSecretFieldProps } from '../../../react-hook-form/fields/ControlSecretField';
import { ControlTextFieldProps } from '../../../react-hook-form/fields/ControlTextField';
import { ControlNumberFieldProps } from '../../../react-hook-form/fields/ControlNumberField';
import { ControlBooleanFieldProps } from '../../../react-hook-form/fields/ControlBooleanField';
import { ControlMultiSelectProps } from '../../../react-hook-form/fields/ControlMultiSelect';
import { ControlExclusiveToggleProps } from '../../../react-hook-form/fields/ControlExclusiveToggle';

export type RenderSection = LayoutSection | LayoutCollapsibleSection;
type RenderComponent = ReactNode | LayoutComponent | LayoutCollapsibleSubSection | LayoutSubSection;

// Components
type LayoutComponent =
  | LayoutTextField
  | LayoutSecretField
  | LayoutNumberField
  | LayoutBooleanField
  | LayoutMultiSelectField
  | LayoutTableSelector
  | LayoutExclusiveToggle;

interface LayoutTextField extends ControlTextFieldProps {
  component: 'control-text-field';
}

interface LayoutSecretField extends ControlSecretFieldProps {
  component: 'control-secret-field';
}

interface LayoutNumberField extends ControlNumberFieldProps {
  component: 'control-number-field';
}

interface LayoutBooleanField extends ControlBooleanFieldProps {
  component: 'control-boolean-field';
}

interface LayoutMultiSelectField extends ControlMultiSelectProps {
  component: 'control-multi-select';
}

interface LayoutTableSelector {
  component: 'control-table-selector';
}

interface LayoutExclusiveToggle extends ControlExclusiveToggleProps {
  component: 'control-exclusive-toggle';
}

// TODO: enable after iframe deprecation
// export interface LayoutOAuth {
//   component: 'control-oauth';
// }

// Layouts
interface SectionAbstract {
  title: ReactNode;
  subtitle?: ReactNode;
  children: (RenderSection | RenderComponent)[];
}

interface LayoutSection extends SectionAbstract {
  component: 'section';
}

interface LayoutCollapsibleSection extends SectionAbstract {
  component: 'collapsible-section';
  defaultExpanded?: boolean;
}

interface SubSectionAbstract {
  title: ReactNode;
  subtitle?: ReactNode;
  children: LayoutComponent[];
}

interface LayoutSubSection extends SubSectionAbstract {
  component: 'sub-section';
}

interface LayoutCollapsibleSubSection extends SubSectionAbstract {
  component: 'collapsible-sub-section';
  defaultExpanded?: boolean;
}
