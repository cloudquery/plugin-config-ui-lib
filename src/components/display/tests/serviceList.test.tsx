import { describe, expect, test, vi } from 'vitest';
import { screen, fireEvent, within } from '@testing-library/react';

import { renderWithTheme } from '../../../utils/tests/renderWithTheme';
import { ServiceSelector } from '../../inputs';

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

describe('ServiceSelector Component', () => {
  test('renders correctly with given props', () => {
    renderWithTheme(<ServiceSelector {...defaultProps} />);

    expect(screen.getByLabelText('Option C')).toBeInTheDocument();
    expect(screen.getByLabelText('Option D')).toBeInTheDocument();
    expect(screen.getByLabelText('Option E')).toBeInTheDocument();
    expect(screen.queryByLabelText('Option B')).not.toBeInTheDocument();
  });

  test('inits with values already checked', () => {
    renderWithTheme(<ServiceSelector {...defaultProps} value={{ 'table3': true }} />);

    expect(
      screen.getByRole('button', { name: 'Option C Option C' }).querySelector('.Mui-checked'),
    ).toBeInTheDocument();
  });

  test('onChange is called with correct value when an item is clicked', () => {
    renderWithTheme(<ServiceSelector {...defaultProps} value={{ 'table3': true }} />);

    const newValue = { 'table3': true, 'table8': true };
    fireEvent.click(screen.getByRole('button', { name: 'Option H Option H' }));
    expect(defaultProps.onChange).toHaveBeenCalledWith(newValue);
  });

  test('search filters services correctly by service name', () => {
    renderWithTheme(<ServiceSelector {...defaultProps} />);
    
    // Search for Option C
    const searchInput = screen.getByPlaceholderText('Search services or tables');
    fireEvent.change(searchInput, { target: { value: 'Option C' } });
    
    // Option C should be visible
    expect(screen.getByLabelText('Option C')).toBeInTheDocument();
    
    // Other options should not be visible
    expect(screen.queryByLabelText('Option D')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Option E')).not.toBeInTheDocument();
  });
  
  test('search filters services correctly by table name', () => {
    renderWithTheme(<ServiceSelector {...defaultProps} />);
    
    // Search for table3
    const searchInput = screen.getByPlaceholderText('Search services or tables');
    fireEvent.change(searchInput, { target: { value: 'table3' } });
    
    // Option C (which has table3) should be visible
    expect(screen.getByLabelText('Option C')).toBeInTheDocument();
    
    // Other options should not be visible
    expect(screen.queryByLabelText('Option D')).not.toBeInTheDocument();
  });
  
  test('filter shows only selected services', () => {
    renderWithTheme(<ServiceSelector {...defaultProps} value={{ 'table3': true, 'table5': true }} />);
    
    // Open filter menu
    const filterButton = screen.getByRole('button', { name: 'Filter' });
    fireEvent.click(filterButton);
    
    // Select "Show selected" option
    const selectedRadio = screen.getByLabelText('Show selected');
    fireEvent.click(selectedRadio);
    
    // Selected options (C and E) should be visible
    expect(screen.getByLabelText('Option C')).toBeInTheDocument();
    expect(screen.getByLabelText('Option E')).toBeInTheDocument();
    
    // Unselected options should not be visible
    expect(screen.queryByLabelText('Option D')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Option F')).not.toBeInTheDocument();
  });
  
  test('filter shows only unselected services', () => {
    renderWithTheme(<ServiceSelector {...defaultProps} value={{ 'table3': true, 'table5': true }} />);
    
    // Open filter menu
    const filterButton = screen.getByRole('button', { name: 'Filter' });
    fireEvent.click(filterButton);
    
    // Select "Show unselected" option
    const unselectedRadio = screen.getByLabelText('Show unselected');
    fireEvent.click(unselectedRadio);
    
    // Unselected options should be visible
    expect(screen.getByLabelText('Option D')).toBeInTheDocument();
    expect(screen.getByLabelText('Option F')).toBeInTheDocument();
    
    // Selected options (C and E) should not be visible
    expect(screen.queryByLabelText('Option C')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Option E')).not.toBeInTheDocument();
  });

  test('select all checkbox selects all filtered services', () => {
    renderWithTheme(<ServiceSelector {...defaultProps} />);
    
    // First search to filter services
    const searchInput = screen.getByPlaceholderText('Search services or tables');
    fireEvent.change(searchInput, { target: { value: 'Option C' } });
    
    // Click select all checkbox
    const selectAllCheckbox = screen.getByLabelText('Select all filtered services');
    fireEvent.click(selectAllCheckbox);
    
    // onChange should be called with only Option C's table selected
    expect(defaultProps.onChange).toHaveBeenCalledWith({ 'table3': true });
  });
  
  test('displays correct number of selected services', () => {
    renderWithTheme(<ServiceSelector {...defaultProps} value={{ 'table3': true, 'table5': true }} />);
    
    // Should display "2 services selected"
    expect(screen.getByText('2 services selected')).toBeInTheDocument();
    
    // Select another service
    fireEvent.click(screen.getByRole('button', { name: 'Option D Option D' }));
    
    // Mock a new value object that would be passed back to the component
    const updatedProps = {
      ...defaultProps,
      value: { 'table3': true, 'table5': true, 'table4': true }
    };
    
    // Re-render with the new value
    renderWithTheme(<ServiceSelector {...updatedProps} />);
    
    // Should now display "3 services selected"
    expect(screen.getByText('3 services selected')).toBeInTheDocument();
  });
});
