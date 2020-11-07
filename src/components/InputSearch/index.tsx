import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  border-radius: 15px;
  outline: unset;
  border: none;
  background: #FDECEC;
  padding: 15px;
  color: #FA7C7C;
  font-weight: 600;

  &::placeholder {
    color: #FA7C7C;
  }
`

export default function SearchInput() {
  return <StyledInput placeholder='Buscar herói' />
}