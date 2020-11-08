import React from 'react';
import styled from 'styled-components';
import { Story, Meta } from '@storybook/react/types-6-0';

import SectionHeader, { SectionHeaderProps } from 'components/SectionHeader';
import CheckboxToggle from 'components/CheckboxToggle';

import { ReactComponent as HeroLogo } from 'assets/icones/heroi/noun_Superhero_2227044@1,5x.svg';
import ButtonHeart from 'components/ButtonHeart';

export default {
  title: 'Components/SectionHeader',
  component: SectionHeader,
} as Meta;

const Template: Story<SectionHeaderProps> = (args) => (
  <SectionHeader {...args} />
);

export const Primary = Template.bind({});

const LeftColumn = () => <p>Encontrados 20 heróis </p>;

const SpanRightColumn = styled.span`
  display: flex;
  align-items: center;
  margin-left: 15px;
`;

const CheckboxChildren = styled(SpanRightColumn)`
  p {
    margin-left: 10px;
  }
`;

const RightColumn = () => (
  <>
    <SpanRightColumn>
      <CheckboxToggle checked={true}>
        <CheckboxChildren>
          <HeroLogo />
          <p>Ordernar por nome - A/Z</p>
        </CheckboxChildren>
      </CheckboxToggle>
    </SpanRightColumn>
    <SpanRightColumn>
      <ButtonHeart disabled={false} value={true}>
        Somente Favoritos
      </ButtonHeart>
    </SpanRightColumn>
  </>
);
Primary.args = {
  leftColumn: LeftColumn,
  rightColumn: RightColumn,
};
