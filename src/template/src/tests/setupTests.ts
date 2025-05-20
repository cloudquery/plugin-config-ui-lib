import '@testing-library/jest-dom';
import { vi } from 'vitest';

if (typeof window !== 'undefined') {
  Element.prototype.scrollIntoView = vi.fn();
}
