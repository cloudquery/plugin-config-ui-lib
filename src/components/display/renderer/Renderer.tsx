import { ReactNode } from 'react';

import { CollapsibleSection } from './CollapsibleSection';
import { CollapsibleSubSection } from './CollapsibleSubSection';
import { ConditionalRenderingWrapper } from './ConditionalRenderingWrapper';
import { Section } from './Section';
import { SubSection } from './SubSection';

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
} from '../../../react-hook-form';

export function ComponentsRenderer({ section }: { section: any }): ReactNode[] | ReactNode {
  return Array.isArray(section) ? (
    <>
      {section.map((component: any, index: number) => {
        return <ComponentsRenderer key={index} section={component} />;
      })}
    </>
  ) : (
    <ConditionalRenderingWrapper shouldRender={section.shouldRender}>
      <ComponentRenderer component={section} />
    </ConditionalRenderingWrapper>
  );
}

function ComponentRenderer({ component }: { component: any }): ReactNode[] | ReactNode {
  if (component?.component) {
    switch (component.component) {
      // Layouts
      case 'section': {
        const { children, ...props } = component;

        return (
          <Section {...props}>
            <ComponentsRenderer section={children} />
          </Section>
        );
      }
      case 'collapsible-section': {
        const { children, ...props } = component;

        return (
          <CollapsibleSection {...props}>
            <ComponentsRenderer section={children} />
          </CollapsibleSection>
        );
      }
      case 'sub-section': {
        const { children, ...props } = component;

        return (
          <SubSection {...props}>
            <ComponentsRenderer section={children} />
          </SubSection>
        );
      }
      case 'collapsible-sub-section': {
        const { children, ...props } = component;

        return (
          <CollapsibleSubSection {...props}>
            <ComponentsRenderer section={children} />
          </CollapsibleSubSection>
        );
      }
      // Components
      case 'control-text-field': {
        return <ControlTextField {...component} />;
      }
      case 'control-secret-field': {
        return <ControlSecretField {...component} />;
      }
      case 'control-number-field': {
        return <ControlNumberField {...component} />;
      }
      case 'control-boolean-field': {
        return <ControlBooleanField {...component} />;
      }
      case 'control-select-field': {
        return <ControlSelectField {...component} />;
      }
      case 'control-date-time-field': {
        return <ControlDateTimeField {...component} />;
      }
      case 'control-multi-select': {
        return <ControlMultiSelect {...component} />;
      }
      case 'control-table-selector': {
        return <ControlTableSelector {...component} />;
      }
      case 'control-oauth': {
        // TODO: after iframe deprecation
        return <>This will work after the iframe deprecation.</>;
      }
      case 'exclusive-toggle': {
        return <ControlExclusiveToggle {...component} />;
      }
      default: {
        return <>Component was not added to the Renderer.</>;
      }
    }
  } else {
    const ConcreteComponent = component;

    return <ConcreteComponent />;
  }
}
