import React from 'react'

import { CheckboxTogleWrapper, CheckBoxToggleStyled } from './styled'

export interface CheckboxToggleProps {
  checked?: boolean
  children?: React.ReactNode
  onClick?: () => void
}

export default function CheckboxToggle({
  checked,
  children,
  onClick
}: CheckboxToggleProps) {
  return (
    <CheckboxTogleWrapper>
      <label htmlFor='checkbox' aria-labelledby='checkbox'>{children && children}</label>
      <CheckBoxToggleStyled
        data-testid='checkbox-input'
        type='checkbox'
        name='checkbox'
        id='checkbox'
        defaultChecked={false}
        defaultValue='Teste'
        checked={checked}
        onClick={onClick}
      />
    </CheckboxTogleWrapper>
  )
}
