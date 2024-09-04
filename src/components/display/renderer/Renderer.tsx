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
import { ConditionalRenderingWrapper } from './ConditionalRenderingWrapper';
import { RenderSection } from './types';

export function ComponentsRenderer({
  section,
}: {
  section:
    | (RenderSection | ReactNode | React.FC<any>)
    | (RenderSection | ReactNode | React.FC<any>)[];
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
    | (RenderSection | ReactNode | React.FC<any>)
    | (RenderSection | ReactNode | React.FC<any>)[];
}): ReactNode[] | ReactNode {
  if ((component as RenderSection)?.component) {
    const switchComponent = component as RenderSection;
    switch (switchComponent.component) {
      // Layouts
      case 'section': {
        const { children, ...props } = switchComponent;
        return (
          <Section {...props}>
            <ComponentsRenderer section={children} />
          </Section>
        );
      }
      case 'collapsible-section': {
        const { children, ...props } = switchComponent;

        return (
          <CollapsibleSection {...props}>
            <ComponentsRenderer section={children} />
          </CollapsibleSection>
        );
      }
      case 'sub-section': {
        const { children, ...props } = switchComponent;

        return (
          <SubSection {...props}>
            <ComponentsRenderer section={children} />
          </SubSection>
        );
      }
      case 'collapsible-sub-section': {
        const { children, ...props } = switchComponent;

        return (
          <CollapsibleSubSection {...props}>
            <ComponentsRenderer section={children} />
          </CollapsibleSubSection>
        );
      }
      // Components
      case 'control-text-field': {
        return <ControlTextField {...switchComponent} />;
      }
      case 'control-secret-field': {
        return <ControlSecretField {...switchComponent} />;
      }
      case 'control-number-field': {
        return <ControlNumberField {...switchComponent} />;
      }
      case 'control-boolean-field': {
        return <ControlBooleanField {...switchComponent} />;
      }
      case 'control-select-field': {
        return <ControlSelectField {...switchComponent} />;
      }
      case 'control-date-time-field': {
        return <ControlDateTimeField {...switchComponent} />;
      }
      case 'control-multi-select': {
        return <ControlMultiSelect {...switchComponent} />;
      }
      case 'control-table-selector': {
        return <ControlTableSelector />;
      }
      // case 'control-oauth': {
      //   // TODO: after iframe deprecation
      //   return <>This will work after the iframe deprecation.</>;
      // }
      case 'control-exclusive-toggle': {
        return <ControlExclusiveToggle {...switchComponent} />;
      }
      default: {
        return <>Component was not added to the Renderer.</>;
      }
    }
  } else {
    const ConcreteComponent = component as any;

    return <ConcreteComponent />;
  }
}
