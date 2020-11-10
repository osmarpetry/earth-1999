import React from 'react'
import { withRouter } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import colors from './colors'
import sizes from './sizes'

export const GlobalStyle = createGlobalStyle<{ isSecondaryBackground?: boolean }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

   #root {
    background: ${({ isSecondaryBackground }) =>
      isSecondaryBackground
        ? colors.backgroundColorSecondary
        : colors.backgroundColorPrimary};
  }

  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Work Sans', sans-serif;;
    font-weight: normal;
    font-size: 10px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3 {
    color: ${colors.fontPrimary};
  }

  h1 {
    font-size: ${sizes.h1Size};
    font-weight: 600;
  }

  h2 {
    font-size: ${sizes.h2Size};
    font-weight: 600;
  }

  h3 {
    font-size: ${sizes.h3Size};
    font-weight: 600;
  }

  a {
    color: ${colors.fontPrimary};
    text-decoration: none;
  }

  p {
    color: ${colors.fontSecondary};
    font-size: ${sizes.paragraphSize};
    line-height: ${sizes.lineHeightParagraph};
  }
`

function GlobalStyleContainer(props: any) {
  return (
    <>
      <GlobalStyle isSecondaryBackground={props.location.pathname.includes('hero')} />
      {props.children}
    </>
  )
}

export default withRouter(GlobalStyleContainer)
