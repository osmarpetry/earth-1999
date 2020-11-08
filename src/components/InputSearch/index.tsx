import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { AllHeroes } from 'core/utils/heroes';

import colors from 'core/assets/styles/colors';
import sizes from 'core/assets/styles/sizes';
import fonts from 'core/assets/styles/fonts';

import SearchIcon from 'assets/busca/Lupa/Shape@1,5x.svg';

const InputWrapper = styled.div<{ isSecondary: boolean }>`
  display: flex;
  align-items: center;
  position: relative;

  input {
    width: 100%;
    height: 100%;
    padding-left: 60px;
    font-size: ${sizes.paragraphSize};
  }

  img {
    position: absolute;
    left: 20px;
    pointer-events: none;
  }

  label {
    position: absolute;
    color: ${colors.primary};
    font-weight: ${fonts.lightBold};
    left: 60px;
    font-size: ${sizes.paragraphSize};
    transition: all 0.3s;
    pointer-events: none;
  }

  input::placeholder {
    color: transparent;
    opacity: 0.6;
    transition: 0.3s color;
    font-size: ${sizes.paragraphSize};
  }

  input:focus::placeholder {
    color: ${colors.primary};
  }

  input:focus + label {
    transform: translate(-35px, -35px);
    font-size: 2rem;
    color: ${colors.primary};
  }

  input:not(:placeholder-shown) + label {
    transform: translate(-35px, -35px);
    font-size: 2rem;
    color: ${colors.primary};
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
  color: ${colors.primary};
  font-weight: ${fonts.lightBold};
`;

export interface SearchInputProps {
  isSecondary?: boolean;
  isSugestionsOpen?: boolean;
  label: string;
  placeholder: string
  name?: string;
  sugestions?: AllHeroes[];
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
    border-top: 1px solid ${colors.primary};
    padding: 10px 0;
    text-align: center;
  }
`;

const SugestionItemStyle = css`
  width: 100%;
  height: 100%;
  font-size: ${sizes.paragraphSize};
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
  placeholder,
  name = 'search',
  sugestions,
  onChange,
  onSugestionClick,
}: SearchInputProps) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <InputWrapper className="input" isSecondary={isSecondary}>
        <img src={SearchIcon} alt="Input search logo" />
        <StyledInput
          isSecondary={isSecondary}
          isSugestionsOpen={isSugestionsOpen}
          placeholder={placeholder}
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
