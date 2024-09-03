import { useFormContext } from 'react-hook-form';
import { ReactNode, useMemo } from 'react';

export interface ConditionalRenderingProps {
  shouldRender?: (values: Record<string, any>) => boolean;
  children: ReactNode;
}

export function ConditionalRenderingWrapper({ shouldRender, children }: ConditionalRenderingProps) {
  const { watch } = useFormContext();
  const values = watch();
  const renderChildren: boolean = useMemo(
    () => (shouldRender ? shouldRender(values) : true),
    [values],
  );

  return renderChildren ? children : null;
}
