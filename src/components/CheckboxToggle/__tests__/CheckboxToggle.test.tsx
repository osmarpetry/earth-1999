import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, fireEvent, render } from '@testing-library/react'

import CheckboxToggle from 'components/CheckboxToggle'

afterEach(cleanup)

it('should match CheckboxToggle snapshot', () => {
  expect(
    render(<CheckboxToggle onChange={jest.fn()} checked={true} />)
  ).toMatchSnapshot()
})

it('should trigger the onChange event when input is clicked', () => {
  const onChange = jest.fn()
  const { getByTestId } = render(
    <CheckboxToggle onChange={onChange} checked={false} />
  )

  expect(onChange).not.toBeCalled()
  fireEvent.click(getByTestId('checkbox-input'))
  expect(onChange).toBeCalledTimes(1)
})

it('should render the label children', () => {
  const { getByText } = render(
    <CheckboxToggle onChange={jest.fn()} checked={true}>
      My checkbox label
    </CheckboxToggle>
  )

  expect(getByText('My checkbox label')).toBeTruthy()
})
