import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import colors from 'core/assets/styles/colors';
import fonts from 'core/assets/styles/fonts';
import responsive from 'core/assets/styles/responsive';
import sizes from 'core/assets/styles/sizes';

export const InputWrapper = styled.div<{ isSecondary: boolean }>`
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

    @media only screen and (max-width: ${responsive.mobile}) {
      transform: translate(-58px, -35px);
    }
    font-size: 2rem;
    color: ${colors.primary};
    white-space: nowrap;
  }

  input:not(:placeholder-shown) + label {
    transform: translate(-35px, -35px);

    @media only screen and (max-width: ${responsive.mobile}) {
      transform: translate(-58px, -35px);
    }
    font-size: 2rem;
    color: ${colors.primary};
    white-space: nowrap;
  }
`;

export const StyledInput = styled.input<{
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

export  const SugestionsList = styled.ul<{ isSecondary: boolean }>`
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

export  const SugestionItemStyle = css`
  width: 100%;
  height: 100%;
  font-size: ${sizes.paragraphSize};
`;

export const SugestionButtonItem = styled(Link)`
  ${SugestionItemStyle}
`;

export  const SugestionItemStyleSpan = styled.span`
  ${SugestionItemStyle}
`;