import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, fireEvent, render } from '@testing-library/react'

import renderWithRouter from 'core/utils/tests/renderWithRouter'

import HeroCard from 'components/HeroCard'

afterEach(cleanup)

it('should match HeroCard snapshot', () => {
  expect(
    renderWithRouter(
      <HeroCard
        loading={false}
        onClick={jest.fn}
        alt='Image alt'
        disabled={false}
        favorite={true}
        height='200px'
        width='170px'
        imageSrc='image.png'
        linkTo='/myHero'
        name='Hero'
      />
    )
  ).toMatchSnapshot()
})

it('should trigger the onClick event when input is clicked', () => {
  const onClick = jest.fn()
  const { getByTestId } = render(<HeroCard onClick={onClick} />)

  expect(onClick).not.toBeCalled()
  fireEvent.click(getByTestId('button-heart'))
  expect(onClick).toBeCalledTimes(1)
})

it('should render the alt and the name', () => {
  const { getByAltText, getByText } = render(
    <HeroCard alt='My alt' name='Hero name' />
  )

  expect(getByAltText('My alt')).toBeTruthy()
  expect(getByText('Hero name')).toBeTruthy()
})
