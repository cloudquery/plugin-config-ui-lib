import { ReactNode, useMemo } from 'react';

import { useFormContext } from 'react-hook-form';

export interface ConditionalRenderingProps {
  shouldRender?: (values: any) => boolean;
  children: ReactNode;
}

export function ConditionalRenderingWrapper({ shouldRender, children }: ConditionalRenderingProps) {
  const { watch } = useFormContext();
  const values = watch();
  const renderChildren: boolean = useMemo(
    () => (shouldRender ? shouldRender(values) : true),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [values],
  );

  return renderChildren ? children : null;
}
