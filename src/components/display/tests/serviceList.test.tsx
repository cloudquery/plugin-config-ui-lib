import { screen, fireEvent } from '@testing-library/react';

import { renderWithTheme } from '../../../utils/tests/renderWithTheme';
import { ServiceList } from '../serviceList';

const services = [
  { label: 'Option 1', name: 'Option 1', logo: '1', tables: ['table1'], shortlabel: '1' },
  { label: 'Option 2', name: 'Option 2', logo: '2', tables: ['table2'], shortlabel: '2' },
  { label: 'Option 3', name: 'Option 3', logo: '3', tables: ['table3'], shortlabel: '3' },
  { label: 'Option 4', name: 'Option 4', logo: '4', tables: ['table4'], shortlabel: '4' },
  { label: 'Option 5', name: 'Option 5', logo: '5', tables: ['table5'], shortlabel: '5' },
  { label: 'Option 6', name: 'Option 6', logo: '6', tables: ['table6'], shortlabel: '6' },
  { label: 'Option 7', name: 'Option 7', logo: '7', tables: ['table7'], shortlabel: '7' },
  { label: 'Option 8', name: 'Option 8', logo: '8', tables: ['table8'], shortlabel: '8' },
  { label: 'Option 9', name: 'Option 9', logo: '9', tables: ['table9'], shortlabel: '9' },
  { label: 'Option 10', name: 'Option 10', logo: '10', tables: ['table10'], shortlabel: '10' },
];

const defaultProps = {
  services,
  topServices: [
    'Option 3',
    'Option 4',
    'Option 5',
    'Option 6',
    'Option 7',
    'Option 8',
    'Option 9',
    'Option 10',
  ],
  onChange: jest.fn(),
  value: {},
};

describe('ServiceList Component', () => {
  test('renders correctly with given props', () => {
    renderWithTheme(<ServiceList {...defaultProps} />);

    expect(screen.getByLabelText('Option 3')).toBeInTheDocument();
    expect(screen.queryByLabelText('Option 2')).not.toBeInTheDocument();
  });

  test('expands to show the full list when button is clicked', () => {
    renderWithTheme(<ServiceList {...defaultProps} />);

    fireEvent.click(screen.getByText('All services'));
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
  });

  test('inits with values already checked', () => {
    renderWithTheme(<ServiceList {...defaultProps} value={{ 'table3': true }} />);

    expect(
      screen.getByRole('button', { name: 'Option 3 Option 3' }).querySelector('.Mui-checked'),
    ).toBeInTheDocument();
  });

  test('onChange is called with correct value when an item is clicked', () => {
    renderWithTheme(<ServiceList {...defaultProps} value={{ 'table3': true }} />);

    const newValue = { 'table3': true, 'table8': true };
    fireEvent.click(screen.getByRole('button', { name: 'Option 8 Option 8' }));
    expect(defaultProps.onChange).toHaveBeenCalledWith(newValue);
  });
});
