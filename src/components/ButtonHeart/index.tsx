import React from 'react'

import colors from 'core/assets/styles/colors'

import HeartIcon from './HeartIcon'

import { ButtonStyled } from './styled'

export interface ButtonHeartProps {
  value: boolean
  disabled: boolean
  dataTestid?: string
  children?: React.ReactNode
  onClick?: () => void
}

export default function ButtonHeart({
  children,
  dataTestid,
  disabled,
  value,
  onClick
}: ButtonHeartProps) {
  return (
    <ButtonStyled
      color={colors.primary}
      onClick={onClick}
      data-testid={dataTestid}
      disabled={disabled}
      isDisabled={disabled}>
      <HeartIcon fill={value ? colors.primary : 'none'} />
      {children && <span>{children}</span>}
    </ButtonStyled>
  )
}
