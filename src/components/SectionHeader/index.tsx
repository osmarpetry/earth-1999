import React from 'react';
import { SectionHeaderWrapper, LeftColumn, RightColumn } from './styled';

export interface SectionHeaderProps {
  leftColumn: JSX.Element;
  rightColumn: JSX.Element;
}

export default function SectionHeader({
  leftColumn,
  rightColumn,
}: SectionHeaderProps) {
  return (
    <SectionHeaderWrapper>
      <LeftColumn>{leftColumn}</LeftColumn>
      <RightColumn>{rightColumn}</RightColumn>
    </SectionHeaderWrapper>
  );
}
