/* eslint-disable react/jsx-no-target-blank */
import React, { FC } from 'react'

import spiderman from './logo192.png'

import { PlaceholderWrapper } from './styled'

interface PlaceholderProps {
  status: 'loading' | 'success' | 'error'
  isEmpty: boolean
  contentsName?: string | React.ReactElement
  children: React.ReactElement
}

const Placeholder: FC<PlaceholderProps> = ({
  status,
  isEmpty,
  children,
  contentsName
}) => {
  const renderState = (
    state: 'error' | 'empty',
    title: React.ReactElement,
    message: React.ReactElement
  ) => {
    if (state === 'empty') {
      return (
        <PlaceholderWrapper>
          {title}
          <img src={spiderman} alt='' />
          {message}
        </PlaceholderWrapper>
      )
    }
    return (
      <PlaceholderWrapper>
        {title}
        <img src={spiderman} alt='' />
        {message}
      </PlaceholderWrapper>
    )
  }

  if (status === 'error') {
    return renderState(
      'error',
      <h1>Ops! Something wrong just happen with the {contentsName} data!</h1>,
      <p>
        Please, open an issue on
        <a href='https://github.com/osmarpetry/earth-199999/issues' target='_blank'>
          {' '}
          my Github
        </a>
      </p>
    )
  }

  if (isEmpty && status === 'success') {
    return renderState(
      'empty',
      <h1>No {contentsName} found!</h1>,
      <p>
        Please, open an issue on
        <a href='https://github.com/osmarpetry/earth-199999/issues' target='_blank'>
          {' '}
          my Github
        </a>
      </p>
    )
  }

  return children
}

export default Placeholder
