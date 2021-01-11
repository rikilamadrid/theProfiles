import React from 'react';

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import rerender from 'react-test-renderer';

import Button from './Button';

describe('Button component render', () => {
  test('correctly without crashing, default', () => {
    render(<Button />);
  });

  test('correctly without crashing with testid', () => {
    const { getByTestId } = render(<Button data-testid="btn"/>);
    expect(getByTestId('btn')).toBeDefined();
  });

  test('correctly without crashing, matching snapshot', () => {
    const component = rerender.create(<Button/>);
    expect(component).toMatchSnapshot();
  });
});

describe('Button component property', () => {
  describe('label', () => {
    test('set to any text value', () => {
      const { getByText } = render(<Button label="save" />);
      expect(getByText('save')).toHaveTextContent(/^save$/);
    });
  });
});

describe('Button component interaction', () => {
  test('click', () => {
    const clickCB = jest.fn();
    const { getByTestId } = render(<Button data-testid="btn" onClick={clickCB} />);
    userEvent.click(getByTestId('btn'));
    expect(clickCB).toHaveBeenCalled();
  });
});
