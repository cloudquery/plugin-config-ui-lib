import { screen, fireEvent } from '@testing-library/react';
import { renderWithTheme } from '../../../utils/tests/renderWithTheme';
import { ServiceList } from '../serviceList';


const services = {
  'Option 1': { label: 'Option 1', name: 'Option 1', logo: '1', tables: [], shortlabel: '1' },
  'Option 2': { label: 'Option 2', name: 'Option 2', logo: '2', tables: [], shortlabel: '2' },
  'Option 3': { label: 'Option 3', name: 'Option 3', logo: '3', tables: [], shortlabel: '3' },
  'Option 4': { label: 'Option 4', name: 'Option 4', logo: '4', tables: [], shortlabel: '4' },
  'Option 5': { label: 'Option 5', name: 'Option 5', logo: '5', tables: [], shortlabel: '5' },
  'Option 6': { label: 'Option 6', name: 'Option 6', logo: '6', tables: [], shortlabel: '6' },
  'Option 7': { label: 'Option 7', name: 'Option 7', logo: '7', tables: [], shortlabel: '7' },
  'Option 8': { label: 'Option 8', name: 'Option 8', logo: '8', tables: [], shortlabel: '8' },
  'Option 9': { label: 'Option 9', name: 'Option 9', logo: '9', tables: [], shortlabel: '9' },
  'Option 10': { label: 'Option 10', name: 'Option 10', logo: '10', tables: [], shortlabel: '10' },
};

const defaultProps = {
  services,
  topServices: ['Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8', 'Option 9', 'Option 10'],
  onChange: jest.fn(), 
};

describe('ExclusiveToggle Component', () => {
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
    renderWithTheme(<ServiceList {...defaultProps} value={['Option 3']} />);

    expect(screen.getByRole('button', {name : 'Option 3 Option 3'}).querySelector('.Mui-checked')).toBeInTheDocument();
  });

  test('onChange is called with correct value when an item is clicked', () => {
    renderWithTheme(<ServiceList {...defaultProps} value={['Option 3']} />);

    const newValue = ['Option 3', 'Option 8'];
    fireEvent.click(screen.getByRole('button', {name : 'Option 8 Option 8'}));
    expect(defaultProps.onChange).toHaveBeenCalledWith(newValue);
  });
});
