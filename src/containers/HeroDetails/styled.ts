import styled from 'styled-components'

import responsive from 'core/assets/styles/responsive'

export const ComicListSection = styled.section`
  @media only screen and (min-width: ${responsive.desktop}) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  @media only screen and (max-width: ${responsive.mobile}) {
    section {
      width: 100%;
    }
    img {
      height: 100%;
      width: 100%;
    }
  }
`
