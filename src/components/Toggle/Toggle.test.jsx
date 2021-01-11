import React from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import rerender from 'react-test-renderer';

import Toggle from './Toggle';

describe('Toggle component render', () => {
  test('correctly without crashing, default', () => {
    render(<Toggle />);
  });

  test('correctly without crashing, matching snapshot', () => {
    const component = rerender.create(<Toggle />);
    expect(component).toMatchSnapshot();
  });
});

describe('Toggle component property', () => {
  describe('checked', () => {
    test('set to true', () => {
      const { getByTestId } = render(<Toggle data-testid="toggle" checked />);
      expect(getByTestId('toggle')).toBeChecked();
    });

    test('set to false', () => {
      const { getByTestId } = render(<Toggle data-testid="toggle" />);
      expect(getByTestId('toggle')).not.toBeChecked();
    });
  });
});

describe('Toggle component interaction', () => {
  test('check', () => {
    const checkCB = jest.fn();
    const { getByTestId } = render(<Toggle data-testid="toggle" onChange={checkCB} />);
    userEvent.click(getByTestId('toggle'));
    expect(checkCB).toHaveBeenCalled();
  });
});