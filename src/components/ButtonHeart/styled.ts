import styled, { css } from 'styled-components'

interface ButtonStyledProps {
  color: string
  isDisabled: boolean
}

export const ButtonStyled = styled.button<ButtonStyledProps>`
  background: none;
  border: none;
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  outline: none;

  span {
    margin-left: 5px;
  }

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      opacity: 0.4;
    `}
`
