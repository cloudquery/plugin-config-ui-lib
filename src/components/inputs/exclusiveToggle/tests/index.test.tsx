import { screen, fireEvent } from '@testing-library/react';

import { ExclusiveToggle } from '..';
import { renderWithTheme, theme } from '../../../../utils/tests/renderWithTheme';

const options = [
  { label: 'Option 1', description: 'Subtitle 1', value: '1' },
  { label: 'Option 2', description: 'Subtitle 2', value: '2' },
  { label: 'Option 3', description: 'Subtitle 3', value: '3', disabled: true },
];

const defaultProps = {
  noExistingItems: false,
  onChange: jest.fn(),
  value: '1',
  title: 'Test Title',
  options,
};

describe('ExclusiveToggle Component', () => {
  test('renders correctly with given props', () => {
    renderWithTheme(<ExclusiveToggle {...defaultProps} />);

    expect(screen.getByLabelText('Test Title')).toBeInTheDocument();
    for (const item of options) {
      expect(screen.getByText(item.label)).toBeInTheDocument();
      if (item.description) {
        expect(screen.getByText(item.description)).toBeInTheDocument();
      }
    }
  });

  test('initially selected value is correct', () => {
    renderWithTheme(<ExclusiveToggle {...defaultProps} />);

    const selectedItem = options.find((item) => item.value === defaultProps.value);
    expect(screen.getByText(selectedItem!.label)).toHaveStyle('opacity: 1');
  });

  test('onChange is called with correct value when an item is clicked', () => {
    renderWithTheme(<ExclusiveToggle {...defaultProps} />);

    const newValue = options[1].value;
    fireEvent.click(screen.getByText(options[1].label));
    expect(defaultProps.onChange).toHaveBeenCalledWith(newValue);
  });

  test('disabled item cannot be selected', () => {
    renderWithTheme(<ExclusiveToggle {...defaultProps} />);

    fireEvent.click(screen.getByText(options[2].label));
    expect(defaultProps.onChange).not.toHaveBeenCalledWith(options[2].value);
  });

  test('item styles are correct based on selection', () => {
    renderWithTheme(<ExclusiveToggle {...defaultProps} />);

    for (const item of options) {
      const expectedOpacity = item.value === defaultProps.value ? '1' : '0.8';
      expect(screen.getByText(item.label)).toHaveStyle(`opacity: ${expectedOpacity}`);
      if (item.description) {
        expect(screen.getByText(item.description)).toHaveStyle(`opacity: ${expectedOpacity}`);
      }
    }
  });

  test('title is rendered if provided', () => {
    renderWithTheme(<ExclusiveToggle {...defaultProps} />);
    expect(screen.getByLabelText('Test Title')).toBeInTheDocument();
  });

  test('title is not rendered if not provided', () => {
    const { title, ...propsWithoutTitle } = defaultProps;
    renderWithTheme(<ExclusiveToggle {...propsWithoutTitle} />);
    expect(screen.queryByLabelText(title)).not.toBeInTheDocument();
  });

  test('changes theme styles correctly', () => {
    renderWithTheme(<ExclusiveToggle {...defaultProps} />);

    for (const item of options) {
      const isSelected = item.value === defaultProps.value;
      const expectedColor = isSelected ? theme.palette.text.primary : theme.palette.text.secondary;
      expect(screen.getByText(item.label)).toHaveStyle(`color: ${expectedColor}`);
      if (item.description) {
        expect(screen.getByText(item.description)).toHaveStyle(`color: ${expectedColor}`);
      }
    }
  });
});
