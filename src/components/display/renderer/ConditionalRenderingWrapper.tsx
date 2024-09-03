import { useFormContext } from 'react-hook-form';
import { ReactNode } from 'react';

export interface ConditionalRenderingProps {
  shouldRender?: (values: Record<string, any>) => boolean;
  children: ReactNode;
}

export function ConditionalRenderingWrapper({ shouldRender, children }: ConditionalRenderingProps) {
  const { watch } = useFormContext();
  const renderChildren: boolean = shouldRender ? shouldRender(watch()) : true;

  return renderChildren ? children : null;
}
