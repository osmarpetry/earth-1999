import React from 'react';

import colors from 'core/assets/styles/colors';

import HeartIcon from './HeartIcon';

import { ButtonStyled } from './styled';

export interface ButtonHeartProps {
  value: boolean;
  disabled: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function ButtonHeart({
  children,
  disabled,
  value,
  onClick,
}: ButtonHeartProps) {
  return (
    <ButtonStyled
      color={colors.primary}
      onClick={onClick}
      disabled={disabled}
      isDisabled={disabled}
    >
      <HeartIcon fill={value ? colors.primary : 'none'} />
      {children && <span>{children}</span>}
    </ButtonStyled>
  );
}
