import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, fireEvent, render } from '@testing-library/react'

import CheckboxToggle from 'components/CheckboxToggle'

afterEach(cleanup)

it('should trigger the onClick event when input is clicked', () => {
  const onClick = jest.fn()
  const { getByTestId } = render(<CheckboxToggle onClick={onClick} />)

  expect(onClick).not.toBeCalled()
  fireEvent.click(getByTestId('checkbox-input'));
  expect(onClick).toBeCalledTimes(1)
})

it('should render the label children', () => {
  const { getByText } = render(<CheckboxToggle>My checkbox label</CheckboxToggle>)

  expect(getByText('My checkbox label')).toBeTruthy();
})