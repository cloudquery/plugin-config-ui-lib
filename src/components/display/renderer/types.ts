import React, { ReactNode } from 'react';

import { ConditionalRenderingProps } from './ConditionalRenderingWrapper';
import { ControlSelectFieldProps } from '../../../react-hook-form';
import { ControlBooleanFieldProps } from '../../../react-hook-form/fields/ControlBooleanField';
import { ControlDateTimeFieldProps } from '../../../react-hook-form/fields/ControlDateTimeField';
import { ControlExclusiveToggleProps } from '../../../react-hook-form/fields/ControlExclusiveToggle';
import { ControlMultiSelectProps } from '../../../react-hook-form/fields/ControlMultiSelect';
import { ControlNumberFieldProps } from '../../../react-hook-form/fields/ControlNumberField';
import { ControlSecretFieldProps } from '../../../react-hook-form/fields/ControlSecretField';
import { ControlTextFieldProps } from '../../../react-hook-form/fields/ControlTextField';

type RenderingBase = Pick<ConditionalRenderingProps, 'shouldRender'>;
export type RenderSection = RenderingBase &
  (LayoutSection | LayoutCollapsibleSection | React.FC<any>);
type RenderComponent = RenderingBase &
  (React.FC<any> | LayoutComponent | LayoutCollapsibleSubSection | LayoutSubSection);

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

interface LayoutTextField extends ControlTextFieldProps {
  component: 'control-text-field';
}

interface LayoutSecretField extends ControlSecretFieldProps {
  component: 'control-secret-field';
}

interface LayoutNumberField extends ControlNumberFieldProps {
  component: 'control-number-field';
}

interface LayoutSelectField extends ControlSelectFieldProps {
  component: 'control-select-field';
}

interface LayoutBooleanField extends ControlBooleanFieldProps {
  component: 'control-boolean-field';
}

interface LayoutDateTimeField extends ControlDateTimeFieldProps {
  component: 'control-date-time-field';
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
interface SectionAbstract extends Pick<ConditionalRenderingProps, 'shouldRender'> {
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
