import colors from 'core/assets/styles/colors';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

export interface ItemWithDescriptionProps {
  description?: string | number;
  descriptionLogo?: ReactNode;
  hasTwoLines?: boolean;
  itemName: string;
}

const ItemWithDescriptionWrapper = styled.div<{ hasTwoLines: boolean }>`
  width: fit-content;
  display: flex;
  flex-direction: ${({ hasTwoLines }) => (hasTwoLines ? 'column' : 'row')};
  align-items: ${({ hasTwoLines }) => (hasTwoLines ? 'center' : 'left')}; ;
`;

const Description = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span,
  p {
    margin: 0;
    color: ${colors.fontPrimary};
  }

  span:last-child {
    margin-left: 10px;
  }
`;

const ItemName = styled.p`
  font-weight: 600;
  color: ${colors.fontPrimary};
  white-space: nowrap;
`;

export default function ItemWithDescription({
  description,
  descriptionLogo,
  hasTwoLines = false,
  itemName,
}: ItemWithDescriptionProps) {
  return (
    <ItemWithDescriptionWrapper hasTwoLines={hasTwoLines}>
      <ItemName>{itemName}</ItemName>
      <Description>
        {descriptionLogo && <span>{descriptionLogo}</span>}
        {description && (
          <span>
            <p>{description}</p>
          </span>
        )}
      </Description>
    </ItemWithDescriptionWrapper>
  );
}
