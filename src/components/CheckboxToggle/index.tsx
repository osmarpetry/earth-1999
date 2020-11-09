import React from 'react';

import { CheckboxTogleWrapper, CheckBoxToggleStyled } from './styled';

export interface CheckboxToggleProps {
  checked?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function CheckboxToggle({
  checked,
  children,
  onClick,
}: CheckboxToggleProps) {
  return (
    <CheckboxTogleWrapper>
      <label htmlFor="checkbox">{children && children}</label>
      <CheckBoxToggleStyled
        type="checkbox"
        name="checkbox"
        defaultChecked={false}
        defaultValue="Teste"
        checked={checked}
        onClick={onClick}
      />
    </CheckboxTogleWrapper>
  );
}
