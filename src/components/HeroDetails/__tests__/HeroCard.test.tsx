import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, fireEvent, render } from '@testing-library/react'

import HeroDetails from 'components/HeroDetails'

afterEach(cleanup)

it('should match HeroDetails snapshot', () => {
  expect(
    render(
      <HeroDetails
        handleButtonClick={() => null}
        disabled={false}
        favorited={false}
        loading={false}
        hero={{
          id: 0,
          comics: {
            available: 98
          },
          description: 'Hero details description',
          events: {
            available: 20
          },
          name: "Hero's name",
          thumbnail: {
            extension: 'png',
            path: ''
          }
        }}
        lastRelease={new Date(2018, 11, 24, 10, 33, 30, 0).toString()}
      />
    )
  ).toMatchSnapshot()
})

it('should trigger the onClick event when input is clicked', () => {
  const onClick = jest.fn()
  const { getByTestId } = render(
    <HeroDetails
      handleButtonClick={onClick}
      disabled={false}
      loading={false}
      favorited={false}
      lastRelease=''
    />
  )

  expect(onClick).not.toBeCalled()
  fireEvent.click(getByTestId('button-heart'))
  expect(onClick).toBeCalledTimes(1)
})

it('should render the alt and the name', () => {
  const { getByAltText, getByText } = render(
    <HeroDetails
      handleButtonClick={() => null}
      disabled={false}
      favorited={false}
      loading={false}
      hero={{
        id: 0,
        comics: {
          available: 98
        },
        description: 'Hero details description',
        events: {
          available: 20
        },
        name: "Hero's name",
        thumbnail: {
          extension: 'png',
          path: ''
        }
      }}
      lastRelease={new Date(2018, 11, 24, 10, 33, 30, 0).toString()}
    />
  )
  expect(getByText('HQs')).toBeTruthy()
  expect(getByText('Events')).toBeTruthy()
  expect(getByText('24 Dec. 2018')).toBeTruthy()
  expect(getByText('Hero details description')).toBeTruthy()
  expect(getByText("Hero's name")).toBeTruthy()
  expect(getByAltText("Hero's name")).toBeTruthy()
})
