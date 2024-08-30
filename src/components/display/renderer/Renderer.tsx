import { CollapsibleSection } from './CollapsibleSection';
import { SubSection } from './SubSection';

import { CollapsibleSubSection } from './CollapsibleSubSection';
import { Section } from './Section';
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
import { ReactNode } from 'react';

export function ComponentsRenderer({ section }: { section: any }): ReactNode[] | ReactNode {
  return Array.isArray(section) ? (
    <>
      {section.map((component: any, index: number) => {
        return <ComponentsRenderer key={index} section={component} />;
      })}
    </>
  ) : (
    <ComponentRenderer component={section} />
  );
}

function ComponentRenderer({ component }: { component: any }): ReactNode[] | ReactNode {
  if (component?.component) {
    switch (component.component) {
      // Layouts
      case 'section': {
        return (
          <Section title={component.title}>
            <ComponentsRenderer section={component.children} />
          </Section>
        );
      }
      case 'collapsible-section': {
        return (
          <CollapsibleSection title={component.title} defaultExpanded={component.defaultExpanded}>
            <ComponentsRenderer section={component.children} />
          </CollapsibleSection>
        );
      }
      case 'sub-section': {
        return (
          <SubSection title={component.title}>
            <ComponentsRenderer section={component.children} />
          </SubSection>
        );
      }
      case 'collapsible-sub-section': {
        return (
          <CollapsibleSubSection
            title={component.title}
            defaultExpanded={component.defaultExpanded}
          >
            <ComponentsRenderer section={component.children} />
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
