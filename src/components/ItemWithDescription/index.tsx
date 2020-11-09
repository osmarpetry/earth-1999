import React, { ReactNode } from 'react';

import { ItemWithDescriptionWrapper, ItemName, Description } from './styled';

export interface ItemWithDescriptionProps {
  description?: string | number | React.ReactNode;
  descriptionLogo?: ReactNode;
  hasTwoLines?: boolean;
  itemName: string;
}

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
        <span>
          <p>{description}</p>
        </span>
      </Description>
    </ItemWithDescriptionWrapper>
  );
}
