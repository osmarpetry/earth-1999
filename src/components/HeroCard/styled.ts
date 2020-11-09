import styled from 'styled-components'

import colors from 'core/assets/styles/colors'
import fonts from 'core/assets/styles/fonts'

export const HeroCardStyled = styled.section<{ width: string }>`
  padding: 0;
  width: ${({ width }) => width};
  height: fit-content;
`

export const Image = styled.img<{ width: string; height: string }>`
  border-bottom: 3px solid red;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`

export const CardFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`

export const HeroName = styled.p`
  margin: 0;
  color: ${colors.fontPrimary};
  font-weight: ${fonts.lightBold};
`
