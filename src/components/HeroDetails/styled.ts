import styled from 'styled-components'

import responsive from 'core/assets/styles/responsive'

export const Image = styled.img`
  height: 340px;
  width: 310px;

  @media only screen and (max-width: ${responsive.mobile}) {
    height: 100%;
    width: 100%;
    align-self: center;
  }
`
