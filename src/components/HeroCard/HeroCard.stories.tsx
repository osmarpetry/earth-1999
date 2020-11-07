import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import HeroCard, { HeroCardProps } from 'components/HeroCard';

export default {
  title: 'Components/HeroCard',
  component: HeroCard,
} as Meta;

const Template: Story<HeroCardProps> = (args) => <HeroCard {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  name: 'Spider-Man Playstation',
  imageSrc:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQxR0m6S2SOdVD-rDfs88qcZJ-Ti44ScGJgeg&usqp=CAU',
  width: '221px',
  height: '221px',
};
