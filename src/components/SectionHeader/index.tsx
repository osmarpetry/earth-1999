import colors from 'core/assets/styles/colors';
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
  color: ${colors.fontAuxiliary};
  align-items: center;
`;

const RightColumn = styled.div`
  display: flex;
  align-items: center;
  p {
    color: ${colors.primary};
  }
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
