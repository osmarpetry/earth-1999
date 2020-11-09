import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Placeholder from 'components/Placeholder'

afterEach(cleanup)

it('should render child when sucess and is not empty', () => {
  const status = 'success'
  const { queryByText, queryByTestId } = render(
    <Placeholder status={status} isEmpty={false} contentsName='dados'>
      <div>
        <p>Content is loadead</p>
      </div>
    </Placeholder>
  )

  expect(queryByTestId('empty')).toBeFalsy()
  expect(queryByText('Content is loadead')).toBeTruthy()
  expect(queryByTestId('error')).toBeFalsy()
})

it('should render specific message when sucess but is empty', () => {
  const status = 'success'
  const { queryByText, queryByTestId } = render(
    <Placeholder status={status} isEmpty={true} contentsName='dados'>
      <div>
        <p>Content is loadead</p>
      </div>
    </Placeholder>
  )

  expect(queryByTestId('empty')).toBeTruthy()
  expect(queryByText('Content is loadead')).toBeFalsy()
  expect(queryByTestId('error')).toBeFalsy()
})

it('should render error message when status error and is not empty', () => {
  const status = 'error'
  const { queryByText, queryByTestId } = render(
    <Placeholder status={status} isEmpty={false} contentsName='dados'>
      <div>
        <p>Content is loadead</p>
      </div>
    </Placeholder>
  )

  expect(queryByTestId('empty')).toBeFalsy()
  expect(queryByText('Content is loadead')).toBeFalsy()
  expect(queryByTestId('error')).toBeTruthy()
})

it('should render error message when status error and is empty', () => {
  const status = 'error'
  const { queryByText, queryByTestId } = render(
    <Placeholder status={status} isEmpty={true} contentsName='dados'>
      <div>
        <p>Content is loadead</p>
      </div>
    </Placeholder>
  )

  expect(queryByTestId('empty')).toBeFalsy()
  expect(queryByText('Content is loadead')).toBeFalsy()
  expect(queryByTestId('error')).toBeTruthy()
})

it('should render the content when status is loading and is empty', () => {
  const status = 'loading'
  const { queryByText, queryByTestId } = render(
    <Placeholder status={status} isEmpty={true} contentsName='dados'>
      <div>
        <p>Content with skeleton is loading</p>
      </div>
    </Placeholder>
  )

  expect(queryByTestId('empty')).toBeFalsy()
  expect(queryByText('Content with skeleton is loading')).toBeTruthy()
  expect(queryByTestId('error')).toBeFalsy()
})
