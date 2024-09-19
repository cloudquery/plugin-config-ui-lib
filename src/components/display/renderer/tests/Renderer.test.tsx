import { render } from '@testing-library/react';
import { ComponentsRenderer } from '../Renderer';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';

const TestWrapper = ({ children }: any) => {
  const form = useForm();

  return <FormProvider {...form}>{children}</FormProvider>;
};

test('throws error when rendering Renderer component', () => {
  expect(() => {
    render(
      <TestWrapper>
        <ComponentsRenderer
          section={{
            component: 'control-my-thing-does-not-exist' as any,
            name: 'fastly_api_key',
            helperText: 'Paste the API key you generated in the Fastly dashboard.',
            label: 'Fastly API Key',
            schema: yup.string(),
          }}
        />
      </TestWrapper>,
    );
  }).toThrow('control-my-thing-does-not-exist does not exist in the Renderer.');
});
