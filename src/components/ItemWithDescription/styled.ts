import styled from 'styled-components';

import colors from 'core/assets/styles/colors';

export const ItemWithDescriptionWrapper = styled.div<{ hasTwoLines: boolean }>`
  width: fit-content;
  display: flex;
  flex-direction: ${({ hasTwoLines }) => (hasTwoLines ? 'column' : 'row')};
  align-items: ${({ hasTwoLines }) => (hasTwoLines ? 'center' : 'left')}; ;
`;

export const Description = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  span,
  p {
    margin: 0;
    color: ${colors.fontPrimary};
  }

  span:last-child {
    margin-left: 10px;
  }
`;

export const ItemName = styled.p`
  font-weight: 600;
  align-self: flex-start;
  color: ${colors.fontPrimary};
  white-space: nowrap;
`;
