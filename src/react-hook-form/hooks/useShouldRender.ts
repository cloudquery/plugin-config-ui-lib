import { useFormContext } from 'react-hook-form';

export interface UseShouldRenderProps {
  shouldRender?: (values: Record<string, any>) => boolean;
}

// TODO: maybe a HOC?
export const useShouldRender = ({ shouldRender }: UseShouldRenderProps): boolean => {
  const { watch } = useFormContext();
  return shouldRender ? shouldRender(watch()) : true;
};
