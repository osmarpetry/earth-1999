import React from 'react';
import styled from 'styled-components';

import SearchIcon from 'assets/busca/Lupa/Shape@1,5x.svg';

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  input {
    width: 100%;
    padding-left: 60px;
  }

  img {
    position: absolute;
    left: 20px;
  }
`;

const StyledInput = styled.input`
  border-radius: 15px;
  outline: unset;
  border: none;
  background-color: #fdecec;
  padding: 15px;
  color: #fa7c7c;
  font-weight: 600;

  &::placeholder {
    color: #fa7c7c;
  }
`;

export default function SearchInput() {
  return (
    <InputWrapper>
      <img src={SearchIcon} alt="Input search logo" />
      <StyledInput placeholder="Buscar herói" />
    </InputWrapper>
  );
}
