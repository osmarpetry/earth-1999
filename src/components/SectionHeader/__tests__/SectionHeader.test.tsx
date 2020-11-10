import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, render } from '@testing-library/react'

import SectionHeader from 'components/SectionHeader'

afterEach(cleanup)

it('should match SectionHeader snapshot', () => {
  expect(
    render(
      <SectionHeader
        leftColumn={<span data-testid='left-column'></span>}
        rightColumn={<span data-testid='right-column'></span>}
      />
    )
  ).toMatchSnapshot()
})

it('should render left and right children', () => {
  const { getByTestId } = render(
    <SectionHeader
      leftColumn={<span data-testid='left-column'></span>}
      rightColumn={<span data-testid='right-column'></span>}
    />
  )

  expect(getByTestId('left-column')).toBeTruthy()
  expect(getByTestId('left-column')).toBeTruthy()
})
