import React from 'react';
import * as yup from 'yup';

import { CollapsibleSectionProps } from './CollapsibleSection';
import { CollapsibleSubSectionProps } from './CollapsibleSubSection';
import { ConditionalRenderingProps } from './ConditionalRenderingWrapper';
import { SectionProps } from './Section';
import { SubSectionProps } from './SubSection';
import { ControlSelectFieldProps } from '../../../react-hook-form';
import { ControlBooleanFieldProps } from '../../../react-hook-form/fields/ControlBooleanField';
import { ControlDateTimeFieldProps } from '../../../react-hook-form/fields/ControlDateTimeField';
import { ControlExclusiveToggleProps } from '../../../react-hook-form/fields/ControlExclusiveToggle';
import { ControlMultiSelectProps } from '../../../react-hook-form/fields/ControlMultiSelect';
import { ControlNumberFieldProps } from '../../../react-hook-form/fields/ControlNumberField';
import { ControlSecretFieldProps } from '../../../react-hook-form/fields/ControlSecretField';
import { ControlTextFieldProps } from '../../../react-hook-form/fields/ControlTextField';

type ComponentAbstract = Pick<ConditionalRenderingProps, 'shouldRender'> & {
  schema?: yup.AnySchema;
};

export type RenderSection = ComponentAbstract &
  (
    | LayoutSection
    | LayoutCollapsibleSection
    | LayoutCollapsibleSubSection
    | LayoutSubSection
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

interface SectionAbstract extends ComponentAbstract {
  children: (RenderSection | React.FC<any>)[];
}

// Layouts
interface LayoutSection extends SectionAbstract, Omit<SectionProps, 'children'> {
  component: 'section';
}

interface LayoutCollapsibleSection
  extends SectionAbstract,
    Omit<CollapsibleSectionProps, 'children'> {
  component: 'collapsible-section';
}

interface LayoutSubSection extends SectionAbstract, Omit<SubSectionProps, 'children'> {
  component: 'sub-section';
}

interface LayoutCollapsibleSubSection
  extends SectionAbstract,
    Omit<CollapsibleSubSectionProps, 'children'> {
  component: 'collapsible-sub-section';
}
