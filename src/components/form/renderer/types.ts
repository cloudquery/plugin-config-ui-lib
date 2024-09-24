import React from 'react';

import * as yup from 'yup';

import { type ConditionalRenderingProps } from '../../controls/conditionalRenderingWrapper';

import { type ControlBooleanFieldProps } from '../controls/controlBooleanField';
import { type ControlDateFieldProps } from '../controls/controlDateField';
import { type ControlDateTimeFieldProps } from '../controls/controlDateTimeField';
import { type ControlExclusiveToggleFieldProps } from '../controls/controlExclusiveToggleField';
import { type ControlMultiSelectFieldProps } from '../controls/controlMultiSelectField';
import { type ControlNumberFieldProps } from '../controls/controlNumberField';
import { type ControlSecretFieldProps } from '../controls/controlSecretField';
import { type ControlSelectFieldProps } from '../controls/controlSelectField';
import { type ControlServicesSelectorFieldProps } from '../controls/controlServicesSelectorField';
import { type ControlTextFieldProps } from '../controls/controlTextField';
import { type CollapsibleSectionProps } from '../sections/collapsibleSection';
import { type CollapsibleSubSectionProps } from '../sections/collapsibleSubSection';
import { type SectionProps } from '../sections/section';
import { type SubSectionProps } from '../sections/subSection';

// Abstracts
type ShouldRenderAbstract = Pick<ConditionalRenderingProps, 'shouldRender'>;
interface ComponentAbstract extends ShouldRenderAbstract {
  name: string;
  schema: yup.AnySchema;
}

interface SectionAbstract extends ShouldRenderAbstract {
  children: (RenderSection | LayoutComponent | ReservedLayoutComponent | React.FC<any>)[];
}

// Top-Level
export type IterableStepComponent =
  | RenderSection
  | LayoutComponent
  | ReservedLayoutComponent
  | ReactField;

export type RenderSection = ShouldRenderAbstract &
  (LayoutSection | LayoutCollapsibleSection | LayoutCollapsibleSubSection | LayoutSubSection);

export type LayoutComponent =
  | LayoutTextField
  | LayoutSecretInput
  | LayoutNumberField
  | LayoutDateTimeField
  | LayoutDateField
  | LayoutBooleanField
  | LayoutSelectField
  | LayoutMultiSelectField
  | LayoutExclusiveToggle
  | LayoutServicesSelector;

export type ReservedLayoutComponent = LayoutTableSelector | LayoutOAuth;

// Components

export interface ReactField extends ComponentAbstract {
  component: React.FC<any>;
}

export interface LayoutTextField extends ComponentAbstract, ControlTextFieldProps {
  component: 'control-text-field';
}

export interface LayoutSecretInput extends ComponentAbstract, ControlSecretFieldProps {
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

export interface LayoutDateField extends ComponentAbstract, ControlDateFieldProps {
  component: 'control-date-field';
}

export interface LayoutMultiSelectField extends ComponentAbstract, ControlMultiSelectFieldProps {
  component: 'control-multi-select';
}

export interface LayoutExclusiveToggle extends ComponentAbstract, ControlExclusiveToggleFieldProps {
  component: 'control-exclusive-toggle';
}

export interface LayoutServicesSelector
  extends ComponentAbstract,
    ControlServicesSelectorFieldProps {
  component: 'control-services-selector';
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
