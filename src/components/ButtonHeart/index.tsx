import colors from 'core/assets/styles/colors';
import React from 'react';
import styled, { css } from 'styled-components';

const HeartIcon = ({ fill }: { fill: string }) => (
  <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
    <title>Path Copy 2@1,5x</title>
    <g
      id="Page-1"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g
        id="Guide"
        className="teste"
        transform="translate(-231.000000, -828.000000)"
        fill-rule="nonzero"
        stroke="#FF0000"
        fill={fill}
        stroke-width="2"
      >
        <path
          d="M248.428712,839.053345 L241.268331,846.885348 C241.199896,846.960594 241.102641,847 241.001802,847 C240.900941,847 240.803707,846.960594 240.735272,846.885348 L233.574892,839.053345 C231.475036,836.760342 231.475036,833.030654 233.574892,830.737651 C234.59779,829.616232 235.962887,829 237.418006,829 C238.750677,829 240.011307,829.515925 241.001802,830.465354 C241.992297,829.515925 243.249322,829 244.581993,829 C246.037112,829 247.405792,829.616232 248.432318,830.737651 C250.524963,833.030654 250.521357,836.760342 248.428712,839.053345 Z"
          id="Path-Copy-2"
        ></path>
      </g>
    </g>
  </svg>
);

const ButtonStyled = styled.button<{ color: string, isDisabled: boolean }>`
  background: none;
  border: none;
  color: ${({color}) => color};
  cursor: pointer;
  display: flex;
  justify-items: center;
  outline: none;
  transition: all 4s ease;

  svg:first-child {
    margin-right: 10px;
  }

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      opacity: 0.4;
    `}
`;

export interface ButtonHeartProps {
  value: boolean;
  disabled: boolean;
  children?: unknown
  onClick?: () => void;
}

export default function ButtonHeart({
  children,
  disabled,
  value,
  onClick,
}: ButtonHeartProps) {
  return (
    <ButtonStyled color={colors.primary} onClick={onClick} disabled={disabled} isDisabled={disabled}>
      <HeartIcon fill={value ? colors.primary : 'none'} />
      {children}
    </ButtonStyled>
  );
}
