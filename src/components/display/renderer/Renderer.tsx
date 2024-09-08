import React, { ReactNode } from 'react';

import { CollapsibleSection } from './CollapsibleSection';
import { CollapsibleSubSection } from './CollapsibleSubSection';
import { ConditionalRenderingWrapper } from './ConditionalRenderingWrapper';
import { Section } from './Section';
import { SubSection } from './SubSection';
import {
  IterableStepComponent,
  LayoutBooleanField,
  LayoutCollapsibleSection,
  LayoutCollapsibleSubSection,
  LayoutComponent,
  LayoutDateTimeField,
  LayoutExclusiveToggle,
  LayoutMultiSelectField,
  LayoutNumberField,
  LayoutSecretField,
  LayoutSection,
  LayoutSelectField,
  LayoutSubSection,
  LayoutTextField,
  RenderSection,
} from './types';

import {
  ControlTextField,
  ControlSecretField,
  ControlNumberField,
  ControlBooleanField,
  ControlMultiSelect,
  ControlTableSelector,
  ControlExclusiveToggle,
  ControlDateTimeField,
  ControlSelectField,
  ControlOAuth,
} from '../../../react-hook-form';

export function ComponentsRenderer({
  section,
}: {
  section:
    | (IterableStepComponent | ReactNode | React.FC<any>)
    | (IterableStepComponent | ReactNode | React.FC<any>)[];
}): ReactNode[] | ReactNode {
  return Array.isArray(section) ? (
    <>
      {section.map((component: any, index: number) => {
        return <ComponentsRenderer key={index} section={component} />;
      })}
    </>
  ) : (
    <ConditionalRenderingWrapper shouldRender={(section as RenderSection).shouldRender}>
      <ComponentRenderer component={section} />
    </ConditionalRenderingWrapper>
  );
}

function ComponentRenderer({
  component,
}: {
  component:
    | (IterableStepComponent | ReactNode | React.FC<any>)
    | (IterableStepComponent | ReactNode | React.FC<any>)[];
}): ReactNode[] | ReactNode {
  if ((component as IterableStepComponent)?.component) {
    switch ((component as IterableStepComponent).component) {
      // Layouts
      case 'section': {
        const { children, ...props } = component as LayoutSection;

        return (
          <Section {...props}>
            <ComponentsRenderer section={children} />
          </Section>
        );
      }
      case 'collapsible-section': {
        const { children, ...props } = component as LayoutCollapsibleSection;

        return (
          <CollapsibleSection {...props}>
            <ComponentsRenderer section={children} />
          </CollapsibleSection>
        );
      }
      case 'sub-section': {
        const { children, ...props } = component as LayoutSubSection;

        return (
          <SubSection {...props}>
            <ComponentsRenderer section={children} />
          </SubSection>
        );
      }
      case 'collapsible-sub-section': {
        const { children, ...props } = component as LayoutCollapsibleSubSection;

        return (
          <CollapsibleSubSection {...props}>
            <ComponentsRenderer section={children} />
          </CollapsibleSubSection>
        );
      }
      // Components
      case 'control-text-field': {
        return <ControlTextField {...(component as LayoutTextField)} />;
      }
      case 'control-secret-field': {
        return <ControlSecretField {...(component as LayoutSecretField)} />;
      }
      case 'control-number-field': {
        return <ControlNumberField {...(component as LayoutNumberField)} />;
      }
      case 'control-boolean-field': {
        return <ControlBooleanField {...(component as LayoutBooleanField)} />;
      }
      case 'control-select-field': {
        return <ControlSelectField {...(component as LayoutSelectField)} />;
      }
      case 'control-date-time-field': {
        return <ControlDateTimeField {...(component as LayoutDateTimeField)} />;
      }
      case 'control-multi-select': {
        return <ControlMultiSelect {...(component as LayoutMultiSelectField)} />;
      }
      case 'control-table-selector': {
        return <ControlTableSelector />;
      }
      case 'control-oauth': {
        return <ControlOAuth />;
      }
      case 'control-exclusive-toggle': {
        return <ControlExclusiveToggle {...(component as LayoutExclusiveToggle)} />;
      }
      default: {
        throw new Error(
          `${(component as LayoutComponent).component} does not exist in the Renderer.`,
        );
      }
    }
  } else {
    const ConcreteComponent = component as React.FC<any>;

    return <ConcreteComponent />;
  }
}
