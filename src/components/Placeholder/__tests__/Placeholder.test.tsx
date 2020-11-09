import React from 'react'
import { cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Placeholder from 'components/Placeholder'

afterEach(cleanup)

it('should render child when sucess and is not empty', () => {
  const status = 'success'
  const { queryByText } = render(
    <Placeholder status={status} isEmpty={false} contentsName='heroes'>
      <div>
        <p>Content is loadead</p>
      </div>
    </Placeholder>
  )

  expect(queryByText('No heroes found!')).toBeFalsy()
  expect(queryByText('Content is loadead')).toBeTruthy()
  expect(queryByText('Ops! Something wrong just happen with the heroes data!')).toBeFalsy()
})

it('should render specific message when sucess but is empty', () => {
  const status = 'success'
  const { queryByText } = render(
    <Placeholder status={status} isEmpty={true} contentsName='heroes'>
      <div>
        <p>Content is loadead</p>
      </div>
    </Placeholder>
  )

  expect(queryByText('No heroes found!')).toBeTruthy()
  expect(queryByText('Content is loadead')).toBeFalsy()
  expect(queryByText('Ops! Something wrong just happen with the heroes data!')).toBeFalsy()
})

it('should render error message when status error and is not empty', () => {
  const status = 'error'
  const { queryByText } = render(
    <Placeholder status={status} isEmpty={false} contentsName='heroes'>
      <div>
        <p>Content is loadead</p>
      </div>
    </Placeholder>
  )

  expect(queryByText('No heroes found!')).toBeFalsy()
  expect(queryByText('Content is loadead')).toBeFalsy()
  expect(queryByText('Ops! Something wrong just happen with the heroes data!')).toBeTruthy()
})

it('should render error message when status error and is empty', () => {
  const status = 'error'
  const { queryByText } = render(
    <Placeholder status={status} isEmpty={true} contentsName='heroes'>
      <div>
        <p>Content is loadead</p>
      </div>
    </Placeholder>
  )

  expect(queryByText('No heroes found!')).toBeFalsy()
  expect(queryByText('Content is loadead')).toBeFalsy()
  expect(queryByText('Ops! Something wrong just happen with the heroes data!')).toBeTruthy()
})

it('should render the content when status is loading and is empty', () => {
  const status = 'loading'
  const { queryByText } = render(
    <Placeholder status={status} isEmpty={true} contentsName='heroes'>
      <div>
        <p>Content with skeleton is loading</p>
      </div>
    </Placeholder>
  )

  expect(queryByText('No heroes found!')).toBeFalsy()
  expect(queryByText('Content with skeleton is loading')).toBeTruthy()
  expect(queryByText('Ops! Something wrong just happen with the heroes data!')).toBeFalsy()
})
