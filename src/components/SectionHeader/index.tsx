import React from 'react';
import styled from 'styled-components';

const SectionHeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
`;

const LeftColumn = styled.div`
  display: flex;
  color: gray;
  align-items: center;
`;

const RightColumn = styled.div`
  display: flex;
  color: red;
  align-items: center;

  * > {
    margin: 0 10px;
  }
`;

export interface SectionHeaderProps {
  leftColumn: () => JSX.Element;
  rightColumn: () => JSX.Element;
}

export default function SectionHeader({
  leftColumn,
  rightColumn,
}: SectionHeaderProps) {
  return (
    <SectionHeaderWrapper>
      <LeftColumn>{leftColumn()}</LeftColumn>
      <RightColumn>{rightColumn()}</RightColumn>
    </SectionHeaderWrapper>
  );
}
