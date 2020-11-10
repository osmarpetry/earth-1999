import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, render } from '@testing-library/react'

import ItemWithDescription from 'components/ItemWithDescription'

import { ReactComponent as HQLogo } from 'assets/icones/book/BookLogo.svg'

afterEach(cleanup)

it('should match ItemWithDescription snapshot', () => {
  expect(
    render(<ItemWithDescription itemName='HQs' description='308' />)
  ).toMatchSnapshot()
})

it('should match ItemWithDescription two lines snapshot', () => {
  expect(
    render(
      <ItemWithDescription
        itemName='HQs'
        description='308'
        descriptionLogo={<HQLogo />}
        hasTwoLines
      />
    )
  ).toMatchSnapshot()
})

it('should render the texts on component', () => {
  const { getByText } = render(
    <ItemWithDescription itemName='HQs' description='308' />
  )

  expect(getByText('HQs')).toBeTruthy()
  expect(getByText('308')).toBeTruthy()
})
