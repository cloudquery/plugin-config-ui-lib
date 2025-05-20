/**
 * Scroll to the first form field with an error
 *
 * @param errorFieldNames - Array of field names that contain errors
 * @public
 */
export function scrollToFirstFormFieldError(
  errorFieldNames: string[],
  formElement: HTMLFormElement,
) {
  const elements = errorFieldNames
    .map((name) => formElement.querySelector(`[name="${name}"]`) as HTMLElement)
    .filter((el) => !!el);
  elements.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);

  if (elements.length > 0) {
    const errorElement = elements[0];
    errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    errorElement.focus({ preventScroll: true });
  }
}
