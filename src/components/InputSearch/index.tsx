import React from 'react';
import styled, { css } from 'styled-components';

import SearchIcon from 'assets/busca/Lupa/Shape@1,5x.svg';
import { Link } from 'react-router-dom';

const InputWrapper = styled.div<{ isSecondary: boolean }>`
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

const StyledInput = styled.input<{
  isSecondary: boolean;
  isSugestionsOpen: boolean;
}>`
  border-radius: ${({ isSugestionsOpen }) =>
    isSugestionsOpen ? '15px 15px 0 0' : '15px'};
  outline: unset;
  border: none;
  background-color: ${({ isSecondary }) => (isSecondary ? '#ffff' : '#fdecec')};
  padding: 15px;
  color: #ff0000;
  font-weight: 600;
`;

export interface SearchInputProps {
  isSecondary?: boolean;
  isSugestionsOpen?: boolean;
  label: string;
  name?: string;
  sugestions?: { id: number | undefined; name: string }[];
  value: string;
  onChange?: (value: string) => void;
  onSugestionClick?: (sugestions: string) => void;
}

const SugestionsList = styled.ul<{ isSecondary: boolean }>`
  background: ${({ isSecondary }) => (isSecondary ? '#ffff' : '#fdecec')};
  border-radius: 0 0 15px 10px;
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 99;
  li {
    border-top: 1px solid rgba(200, 0, 0, 0.3);
    padding: 10px 0;
  }
`;

const SugestionItemStyle = css`
  color: black;
  text-decoration: none;
  width: 100%;
  height: 100%;
  font-size: 20px;
`;

const SugestionButtonItem = styled(Link)`
  ${SugestionItemStyle}
`;

const SugestionItemStyleSpan = styled.span`
  ${SugestionItemStyle}
`;

export default function SearchInput({
  isSecondary = false,
  isSugestionsOpen = false,
  label,
  name = 'search',
  sugestions,
  onChange,
  onSugestionClick,
}: SearchInputProps) {
  console.log(sugestions);
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <InputWrapper className="input" isSecondary={isSecondary}>
        <img src={SearchIcon} alt="Input search logo" />
        <StyledInput
          isSecondary={isSecondary}
          isSugestionsOpen={isSugestionsOpen}
          placeholder=" "
          name={name}
          onChange={(event) => onChange && onChange(event.target.value)}
        />
        <label htmlFor={name}>{label}</label>
      </InputWrapper>
      {isSugestionsOpen && sugestions && sugestions?.length > 1 && (
        <SugestionsList
          isSecondary={isSecondary}
          style={{ position: 'absolute', width: '100%' }}
        >
          {sugestions.map((sugestion) => (
            <li key={sugestion.id}>
              {typeof sugestion.id === 'number'   ? (
                <SugestionButtonItem to={`/hero/${sugestion.id}`}>
                  {sugestion.name}
                </SugestionButtonItem>
              ) : (
                <SugestionItemStyleSpan>
                  {sugestion.name}
                </SugestionItemStyleSpan>
              )}
            </li>
          ))}
        </SugestionsList>
      )}
    </div>
  );
}
