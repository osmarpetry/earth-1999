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

const StyledInput = styled.input<{ isSugestionsOpen: boolean }>`
  border-radius: ${({ isSugestionsOpen }) =>
    isSugestionsOpen ? '15px 15px 0 0' : '15px'};
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
  sugestions?: string[];
  isSugestionsOpen?: boolean;
  name?: string;
  onSugestionClick?: (sugestions: string) => void;
  onChange?: (value: string) => void;
}

const SugestionsList = styled.ul`
  background: rgba(200, 0, 0, 0.1);
  border-radius: 0 0 15px 10px;
  margin: 0;
  padding: 0;
  list-style: none;

  li:last-child {
    button {
      border-bottom: none;
    }
  }
`;

const SugestionButtonItem = styled.button`
  outline: none;
  background: transparent;
  border: 0;
  border-bottom: 1px solid rgba(200, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  padding: 15px;
  font-size: 20px;
`;

export default function SearchInput({
  label,
  name = 'search',
  sugestions,
  isSugestionsOpen = false,
  onChange,
  onSugestionClick,
}: SearchInputProps) {
  return (
    <div>
      <InputWrapper className="input">
        <img src={SearchIcon} alt="Input search logo" />
        <StyledInput
          isSugestionsOpen={isSugestionsOpen}
          placeholder=" "
          name={name}
          onChange={(event) => onChange && onChange(event.target.value)}
        />
        <label htmlFor={name}>{label}</label>
      </InputWrapper>
      {isSugestionsOpen && sugestions && sugestions?.length > 1 && (
        <SugestionsList>
          {sugestions.map((sugestion) => (
            <li key={sugestion}>
              <SugestionButtonItem
                onClick={() => onSugestionClick && onSugestionClick(sugestion)}
              >
                {sugestion}
              </SugestionButtonItem>
            </li>
          ))}
        </SugestionsList>
      )}
    </div>
  );
}
