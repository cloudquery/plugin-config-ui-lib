import { ReactNode } from 'react';

/**
 * @public
 */
export type FormWrapperProps = {
  children: ReactNode;
  formDisabled: boolean;
};

/**
 * Wrapper to support disabling forms while submitting
 *
 * @public
 */
export function FormWrapper({ children, formDisabled }: FormWrapperProps) {
  return formDisabled ? (
    <fieldset disabled={true} style={{ opacity: '0.5', border: 'none', padding: 0, margin: 0 }}>
      {children}
    </fieldset>
  ) : (
    <>{children}</>
  );
}
