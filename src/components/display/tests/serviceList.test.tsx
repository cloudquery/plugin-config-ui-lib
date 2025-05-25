import { describe, expect, test, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';

import { renderWithTheme } from '../../../utils/tests/renderWithTheme';
import { ServiceList } from '../serviceList';

const services = [
  { label: 'Option A', name: 'Option A', logo: '1', tables: ['table1'], shortlabel: '1' },
  { label: 'Option B', name: 'Option B', logo: '2', tables: ['table2'], shortlabel: '2' },
  { label: 'Option C', name: 'Option C', logo: '3', tables: ['table3'], shortlabel: '3' },
  { label: 'Option D', name: 'Option D', logo: '4', tables: ['table4'], shortlabel: '4' },
  { label: 'Option E', name: 'Option E', logo: '5', tables: ['table5'], shortlabel: '5' },
  { label: 'Option F', name: 'Option F', logo: '6', tables: ['table6'], shortlabel: '6' },
  { label: 'Option G', name: 'Option G', logo: '7', tables: ['table7'], shortlabel: '7' },
  { label: 'Option H', name: 'Option H', logo: '8', tables: ['table8'], shortlabel: '8' },
  { label: 'Option I', name: 'Option I', logo: '9', tables: ['table9'], shortlabel: '9' },
  { label: 'Option J', name: 'Option J', logo: '10', tables: ['table10'], shortlabel: '10' },
];

const defaultProps = {
  services,
  topServices: [
    'Option C',
    'Option D',
    'Option E',
    'Option F',
    'Option G',
    'Option H',
    'Option I',
    'Option J',
  ],
  onChange: vi.fn(),
  value: {},
};

describe('ServiceList Component', () => {
  test('renders correctly with given props', () => {
    renderWithTheme(<ServiceList {...defaultProps} />);

    expect(screen.getByLabelText('Option C')).toBeInTheDocument();
    expect(screen.queryByLabelText('Option B')).not.toBeInTheDocument();
  });

  test('inits with values already checked', () => {
    console.log('here1');
    const { container } = renderWithTheme(<ServiceList {...defaultProps} value={{ 'table3': true }} />);

    expect(
      screen.getByRole('button', { name: 'Option C Option C' }).querySelector('.Mui-checked'),
    ).toBeInTheDocument();
  });

  test('onChange is called with correct value when an item is clicked', () => {
    renderWithTheme(<ServiceList {...defaultProps} value={{ 'table3': true }} />);

    const newValue = { 'table3': true, 'table8': true };
    fireEvent.click(screen.getByRole('button', { name: 'Option H Option H' }));
    expect(defaultProps.onChange).toHaveBeenCalledWith(newValue);
  });
});
