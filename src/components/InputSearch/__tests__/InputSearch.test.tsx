import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, fireEvent, render } from '@testing-library/react'

import renderWithRouter from 'core/utils/tests/renderWithRouter'

import InputSearch from 'components/InputSearch'

afterEach(cleanup)

it('should match InputSearch with sugestions open snapshot', () => {
  expect(
    renderWithRouter(
      <InputSearch
        placeholder='Type something...'
        label="Hero's name"
        isSugestionsOpen={true}
        sugestions={[
          { id: undefined, name: 'hul' },
          { id: 1, name: 'Hulk' },
          { id: 1, name: 'Spider-Man' }
        ]}
        value=''
        onChange={jest.fn()}
      />
    )
  ).toMatchSnapshot()
})


it('should match InputSearch with sugestions close snapshot', () => {
  expect(
    renderWithRouter(
      <InputSearch
        placeholder='Type something...'
        label="Hero's name"
        isSugestionsOpen={true}
        sugestions={[
          { id: undefined, name: 'hul' },
          { id: 1, name: 'Hulk' },
          { id: 1, name: 'Spider-Man' }
        ]}
        value=''
        onChange={jest.fn()}
      />
    )
  ).toMatchSnapshot()
})


it('should trigger the onChange event when is typing something', () => {
  const onChange = jest.fn()
  const { getByLabelText } = render(
    <InputSearch
      placeholder='Type something...'
      label="Hero's name"
      value=''
      onChange={onChange}
    />
  )

  expect(onChange).not.toBeCalled()
  fireEvent.change(getByLabelText("Hero's name"), { target: { value: 'Hulk' } })
  expect(onChange).toBeCalledTimes(1)
})

it('should show sugestions list', () => {
  const onChange = jest.fn()
  const { getByText } = renderWithRouter(
    <InputSearch
      placeholder='Type something...'
      label="Hero's name"
      isSugestionsOpen={true}
      sugestions={[
        { id: undefined, name: 'hul' },
        { id: 1, name: 'Hulk' },
        { id: 1, name: 'Spider-Man' }
      ]}
      value=''
      onChange={onChange}
    />
  )
  expect(getByText('hul')).toBeTruthy()
  expect(getByText('Hulk')).toBeTruthy()
  expect(getByText('Hulk')).toBeTruthy()
})
