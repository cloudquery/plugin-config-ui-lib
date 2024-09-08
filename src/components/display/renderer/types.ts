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

// Abstracts
type ShouldRenderAbstract = Pick<ConditionalRenderingProps, 'shouldRender'>;
interface ComponentAbstract extends ShouldRenderAbstract {
  schema: yup.AnySchema;
}
interface SectionAbstract extends ShouldRenderAbstract {
  children: (RenderSection | LayoutComponent | ReservedLayoutComponent | React.FC<any>)[];
}

// Top-Level
export type IterableStepComponent = RenderSection | LayoutComponent | ReservedLayoutComponent;

export type RenderSection = ShouldRenderAbstract &
  (LayoutSection | LayoutCollapsibleSection | LayoutCollapsibleSubSection | LayoutSubSection);

export type LayoutComponent =
  | LayoutTextField
  | LayoutSecretField
  | LayoutNumberField
  | LayoutDateTimeField
  | LayoutBooleanField
  | LayoutSelectField
  | LayoutMultiSelectField
  | LayoutExclusiveToggle;

export type ReservedLayoutComponent = LayoutTableSelector | LayoutOAuth;

// Components

export interface LayoutTextField extends ComponentAbstract, ControlTextFieldProps {
  component: 'control-text-field';
}

export interface LayoutSecretField extends ComponentAbstract, ControlSecretFieldProps {
  component: 'control-secret-field';
}

export interface LayoutNumberField extends ComponentAbstract, ControlNumberFieldProps {
  component: 'control-number-field';
}

export interface LayoutSelectField extends ComponentAbstract, ControlSelectFieldProps {
  component: 'control-select-field';
}

export interface LayoutBooleanField extends ComponentAbstract, ControlBooleanFieldProps {
  component: 'control-boolean-field';
}

export interface LayoutDateTimeField extends ComponentAbstract, ControlDateTimeFieldProps {
  component: 'control-date-time-field';
}

export interface LayoutMultiSelectField extends ComponentAbstract, ControlMultiSelectProps {
  component: 'control-multi-select';
}

export interface LayoutExclusiveToggle extends ComponentAbstract, ControlExclusiveToggleProps {
  component: 'control-exclusive-toggle';
}

// Reserved Components

export interface LayoutTableSelector extends ShouldRenderAbstract {
  component: 'control-table-selector';
}
export interface LayoutOAuth extends ShouldRenderAbstract {
  component: 'control-oauth';
}

// Layouts
export interface LayoutSection extends SectionAbstract, Omit<SectionProps, 'children'> {
  component: 'section';
}

export interface LayoutCollapsibleSection
  extends SectionAbstract,
    Omit<CollapsibleSectionProps, 'children'> {
  component: 'collapsible-section';
}

export interface LayoutSubSection extends SectionAbstract, Omit<SubSectionProps, 'children'> {
  component: 'sub-section';
}

export interface LayoutCollapsibleSubSection
  extends SectionAbstract,
    Omit<CollapsibleSubSectionProps, 'children'> {
  component: 'collapsible-sub-section';
}
