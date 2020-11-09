import styled from 'styled-components'

import colors from 'core/assets/styles/colors'

export const CheckBoxToggleStyled = styled.input`
  position: relative;
  margin-left: 10px;
  width: 40px;
  height: 20px;
  appearance: none;
  outline: none;
  border-radius: 20px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);

  &:before {
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 20px;
    top: 2px;
    left: 5px;
    transform: scale(1.1);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
    transition: 0.5s;
  }

  &:checked:before {
    left: 20px;
    background: ${colors.primary};
  }
`

export const CheckboxTogleWrapper = styled.div`
  display: flex;
  align-items: center;
`
