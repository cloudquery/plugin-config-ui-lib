import React, { ReactNode, Suspense } from 'react';

import Skeleton from '@mui/material/Skeleton';

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
  LayoutDateField,
  LayoutDateTimeField,
  LayoutExclusiveToggle,
  LayoutMultiSelectField,
  LayoutNumberField,
  LayoutSecretField,
  LayoutSection,
  LayoutSelectField,
  LayoutServicesSelector,
  LayoutSubSection,
  LayoutTextField,
  RenderSection,
} from './types';

const ControlSecretField = React.lazy(() =>
  import('./../../../react-hook-form/fields/ControlSecretField').then((module) => ({
    default: module.ControlSecretField,
  })),
);
const ControlTextField = React.lazy(() =>
  import('./../../../react-hook-form/fields/ControlTextField').then((module) => ({
    default: module.ControlTextField,
  })),
);
const ControlNumberField = React.lazy(() =>
  import('./../../../react-hook-form/fields/ControlNumberField').then((module) => ({
    default: module.ControlNumberField,
  })),
);
const ControlBooleanField = React.lazy(() =>
  import('./../../../react-hook-form/fields/ControlBooleanField').then((module) => ({
    default: module.ControlBooleanField,
  })),
);
const ControlMultiSelect = React.lazy(() =>
  import('./../../../react-hook-form/fields/ControlMultiSelect').then((module) => ({
    default: module.ControlMultiSelect,
  })),
);
const ControlTableSelector = React.lazy(() =>
  import('./../../../react-hook-form/fields/ControlTableSelector').then((module) => ({
    default: module.ControlTableSelector,
  })),
);
const ControlExclusiveToggle = React.lazy(() =>
  import('./../../../react-hook-form/fields/ControlExclusiveToggle').then((module) => ({
    default: module.ControlExclusiveToggle,
  })),
);
const ControlDateTimeField = React.lazy(() =>
  import('./../../../react-hook-form/fields/ControlDateTimeField').then((module) => ({
    default: module.ControlDateTimeField,
  })),
);
const ControlSelectField = React.lazy(() =>
  import('./../../../react-hook-form/fields/ControlSelectField').then((module) => ({
    default: module.ControlSelectField,
  })),
);
const ControlOAuth = React.lazy(() =>
  import('./../../../react-hook-form/fields/ControlOAuth').then((module) => ({
    default: module.ControlOAuth,
  })),
);
const ControlServicesSelector = React.lazy(() =>
  import('./../../../react-hook-form/fields/ControlServicesSelector').then((module) => ({
    default: module.ControlServicesSelector,
  })),
);
const ControlDateField = React.lazy(() =>
  import('./../../../react-hook-form/fields/ControlDateField').then((module) => ({
    default: module.ControlDateField,
  })),
);

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
        return (
          <Suspense fallback={<Skeleton variant="rounded" width="100%" height={78} />}>
            <ControlTextField {...(component as LayoutTextField)} />
          </Suspense>
        );
      }
      case 'control-secret-field': {
        return (
          <Suspense fallback={<Skeleton variant="rounded" width="100%" height={78} />}>
            <ControlSecretField {...(component as LayoutSecretField)} />
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
            <ControlMultiSelect {...(component as LayoutMultiSelectField)} />
          </Suspense>
        );
      }
      case 'control-table-selector': {
        return (
          <Suspense fallback={<Skeleton variant="rounded" width="100%" height={580} />}>
            <ControlTableSelector />
          </Suspense>
        );
      }
      case 'control-services-selector': {
        return (
          <Suspense fallback={<Skeleton variant="rounded" width="100%" height={350} />}>
            <ControlServicesSelector {...(component as LayoutServicesSelector)} />
          </Suspense>
        );
      }
      case 'control-oauth': {
        return (
          <Suspense fallback={<Skeleton variant="rounded" width="100%" height={42} />}>
            <ControlOAuth />
          </Suspense>
        );
      }
      case 'control-exclusive-toggle': {
        return (
          <Suspense fallback={<Skeleton variant="rounded" width="100%" height={50} />}>
            <ControlExclusiveToggle {...(component as LayoutExclusiveToggle)} />
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
    const ConcreteComponent = component as React.FC<any>;

    return <ConcreteComponent />;
  }
}
