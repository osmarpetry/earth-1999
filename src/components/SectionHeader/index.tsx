import React from 'react';
import styled from 'styled-components';

const SectionHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 521px) {
    flex-direction: column;
  }
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
`;

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
