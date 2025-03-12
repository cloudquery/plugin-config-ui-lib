import React, { ReactNode, Suspense } from 'react';

import Skeleton from '@mui/material/Skeleton';

import {
  IterableStepComponent,
  LayoutBooleanField,
  LayoutCodeField,
  LayoutCollapsibleSection,
  LayoutCollapsibleSubSection,
  LayoutComponent,
  LayoutDateField,
  LayoutDateTimeField,
  LayoutExclusiveToggle,
  LayoutMultiSelectField,
  LayoutNumberField,
  LayoutOAuth,
  LayoutSecretInput,
  LayoutSection,
  LayoutSelectField,
  LayoutServicesSelector,
  LayoutSubSection,
  LayoutTextField,
  RenderSection,
} from './types';
import { ConditionalRenderingWrapper } from '../../controls/conditionalRenderingWrapper';
import { CollapsibleSection } from '../sections/collapsibleSection';
import { CollapsibleSubSection } from '../sections/collapsibleSubSection';
import { Section } from '../sections/section';
import { SubSection } from '../sections/subSection';

const ControlSecretField = React.lazy(() =>
  import('../controls/controlSecretField').then((module) => ({
    default: module.ControlSecretField,
  })),
);
const ControlTextField = React.lazy(() =>
  import('../controls/controlTextField').then((module) => ({
    default: module.ControlTextField,
  })),
);
const ControlNumberField = React.lazy(() =>
  import('../controls/controlNumberField').then((module) => ({
    default: module.ControlNumberField,
  })),
);
const ControlBooleanField = React.lazy(() =>
  import('../controls/controlBooleanField').then((module) => ({
    default: module.ControlBooleanField,
  })),
);
const ControlMultiSelectField = React.lazy(() =>
  import('../controls/controlMultiSelectField').then((module) => ({
    default: module.ControlMultiSelectField,
  })),
);
const ControlTableSelectorField = React.lazy(() =>
  import('../controls/controlTableSelectorField').then((module) => ({
    default: module.ControlTableSelectorField,
  })),
);
const ControlExclusiveToggleField = React.lazy(() =>
  import('../controls/controlExclusiveToggleField').then((module) => ({
    default: module.ControlExclusiveToggleField,
  })),
);
const ControlDateTimeField = React.lazy(() =>
  import('../controls/controlDateTimeField').then((module) => ({
    default: module.ControlDateTimeField,
  })),
);
const ControlSelectField = React.lazy(() =>
  import('../controls/controlSelectField').then((module) => ({
    default: module.ControlSelectField,
  })),
);
const ControlOAuthField = React.lazy(() =>
  import('../controls/controlOAuthField').then((module) => ({
    default: module.ControlOAuthField,
  })),
);
const ControlServicesSelectorField = React.lazy(() =>
  import('../controls/controlServicesSelectorField').then((module) => ({
    default: module.ControlServicesSelectorField,
  })),
);
const ControlDateField = React.lazy(() =>
  import('../controls/controlDateField').then((module) => ({
    default: module.ControlDateField,
  })),
);
const ControlCodeField = React.lazy(() =>
  import('../controls/controlCodeField').then((module) => ({
    default: module.ControlCodeField,
  })),
);

export function ComponentsRenderer({
  section,
  parentKey,
  container,
}: {
  section:
    | (IterableStepComponent | ReactNode | React.FC<any>)
    | (IterableStepComponent | ReactNode | React.FC<any>)[];
  parentKey?: string;
  container?: HTMLElement | ShadowRoot;
}): ReactNode[] | ReactNode {
  return Array.isArray(section) ? (
    <>
      {section.map((component: any, index: number) => {
        const key = parentKey ? `${parentKey}-${index}` : `${index}`;

        return (
          <ComponentsRenderer key={key} section={component} container={container} parentKey={key} />
        );
      })}
    </>
  ) : (
    <ConditionalRenderingWrapper shouldRender={(section as RenderSection).shouldRender}>
      <ComponentRenderer component={section} container={container} />
    </ConditionalRenderingWrapper>
  );
}

function ComponentRenderer({
  component,
  container,
}: {
  component:
    | (IterableStepComponent | ReactNode | React.FC<any>)
    | (IterableStepComponent | ReactNode | React.FC<any>)[];
  container?: HTMLElement | ShadowRoot;
}): ReactNode[] | ReactNode {
  if (typeof (component as IterableStepComponent)?.component === 'string') {
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
          <SubSection {...props} isSubSection={true}>
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
        return (
          <Suspense fallback={<Skeleton variant="rounded" width="100%" height={78} />}>
            <ControlTextField {...(component as LayoutTextField)} />
          </Suspense>
        );
      }
      case 'control-secret-field': {
        return (
          <Suspense fallback={<Skeleton variant="rounded" width="100%" height={78} />}>
            <ControlSecretField {...(component as LayoutSecretInput)} />
          </Suspense>
        );
      }
      case 'control-number-field': {
        return (
          <Suspense fallback={<Skeleton variant="rounded" width="100%" height={78} />}>
            <ControlNumberField {...(component as LayoutNumberField)} />
          </Suspense>
        );
      }
      case 'control-boolean-field': {
        return (
          <Suspense fallback={<Skeleton variant="rounded" width="100%" height={42} />}>
            <ControlBooleanField {...(component as LayoutBooleanField)} />
          </Suspense>
        );
      }
      case 'control-select-field': {
        return (
          <Suspense fallback={<Skeleton variant="rounded" width="100%" height={82} />}>
            <ControlSelectField {...(component as LayoutSelectField)} />
          </Suspense>
        );
      }
      case 'control-date-time-field': {
        return (
          <Suspense fallback={<Skeleton variant="rounded" width="100%" height={78} />}>
            <ControlDateTimeField {...(component as LayoutDateTimeField)} />
          </Suspense>
        );
      }
      case 'control-date-field': {
        return (
          <Suspense fallback={<Skeleton variant="rounded" width="100%" height={78} />}>
            <ControlDateField {...(component as LayoutDateField)} />
          </Suspense>
        );
      }
      case 'control-multi-select': {
        return (
          <Suspense fallback={<Skeleton variant="rounded" width="100%" height={82} />}>
            <ControlMultiSelectField {...(component as LayoutMultiSelectField)} />
          </Suspense>
        );
      }
      case 'control-table-selector': {
        return (
          <Suspense fallback={<Skeleton variant="rounded" width="100%" height={580} />}>
            <ControlTableSelectorField />
          </Suspense>
        );
      }
      case 'control-services-selector': {
        return (
          <Suspense fallback={<Skeleton variant="rounded" width="100%" height={350} />}>
            <ControlServicesSelectorField {...(component as LayoutServicesSelector)} />
          </Suspense>
        );
      }
      case 'control-oauth': {
        return (
          <Suspense fallback={<Skeleton variant="rounded" width="100%" height={42} />}>
            <ControlOAuthField {...(component as LayoutOAuth)} />
          </Suspense>
        );
      }
      case 'control-exclusive-toggle': {
        return (
          <Suspense fallback={<Skeleton variant="rounded" width="100%" height={50} />}>
            <ControlExclusiveToggleField {...(component as LayoutExclusiveToggle)} />
          </Suspense>
        );
      }
      case 'control-code-field': {
        return (
          <Suspense fallback={<Skeleton variant="rounded" width="100%" height={50} />}>
            <ControlCodeField {...(component as LayoutCodeField)} container={container} />
          </Suspense>
        );
      }
      default: {
        throw new Error(
          `${(component as LayoutComponent).component} does not exist in the Renderer.`,
        );
      }
    }
  } else {
    const ConcreteComponent = ((component as IterableStepComponent)?.component ??
      component) as React.FC<any>;
    const { children, ...props } = component as LayoutSection;

    return (
      <ConcreteComponent {...(props as any)}>
        <ComponentsRenderer section={children} />
      </ConcreteComponent>
    );
  }
}
