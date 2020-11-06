import React from 'react';
import styled from 'styled-components';

const CheckBoxToggleStyled = styled.input`
  position: relative;
  width: 40px;
  height: 20px;
  appearance: none;
  background: rgba(255, 0, 0, 0);
  outline: none;
  border-radius: 20px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);

  &:hover {
    cursor: pointer;
  }

  &:checked {
    background: rgba(255, 0, 0, 0.1);
  }

  &:before {
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 20px;
    top: 2px;
    left: 5px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0);
    transform: scale(1.1);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
    transition: 0.5s;
  }

  &:checked:before {
    left: 20px;
    background: rgba(255, 0, 0, 0.8);
  }
`;

export default function CheckboxToggle() {
  return <CheckBoxToggleStyled type="checkbox" />;
}
