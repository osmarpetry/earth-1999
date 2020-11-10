import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

export default function renderWithRouter(component: JSX.Element) {
  return {
    ...render(<BrowserRouter>{component}</BrowserRouter>)
  }
}
