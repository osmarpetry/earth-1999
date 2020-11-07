import React from 'react';
import styled from 'styled-components';

import SearchIcon from 'assets/busca/Lupa/Shape@1,5x.svg';

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  input {
    width: 100%;
    height: 100%;
    padding-left: 60px;
  }

  img {
    position: absolute;
    left: 20px;
    pointer-events: none;
  }

  label {
    position: absolute;
    color: #ff0000;
    font-weight: 600;
    left: 56px;
    transition: all 0.3s;
    pointer-events: none;
  }

  input:focus + label {
    transform: translate(-35px, -33px);
    font-size: 20px;
    color: #ff0000;
  }

  input:not(:placeholder-shown) + label {
    transform: translate(-35px, -33px);
    font-size: 20px;
    color: #ff0000;
    white-space: nowrap;
  }
`;

const StyledInput = styled.input`
  border-radius: 15px;
  outline: unset;
  border: none;
  background-color: #fdecec;
  padding: 15px;
  color: #ff0000;
  font-weight: 600;
`;

export interface SearchInputProps {
  value: string;
  label: string;
  name: string;
  onChange?: (value: string) => void;
}

export default function SearchInput({
  label,
  name,
  onChange,
}: SearchInputProps) {
  return (
    <InputWrapper>
      <img src={SearchIcon} alt="Input search logo" />
      <StyledInput
        placeholder=' '
        name={name}
        onChange={(event) => onChange && onChange(event.target.value)}
      />
      <label htmlFor={name}>{label}</label>
    </InputWrapper>
  );
}
