import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import InputSearch, { SearchInputProps } from 'components/InputSearch';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Components/InputSearch',
  component: InputSearch,
} as Meta;

const Template: Story<SearchInputProps> = (args) => (
  <BrowserRouter>
    <InputSearch {...args} />
  </BrowserRouter>
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Buscar herói',
  name: 'seach',
};

export const Sugestions = Template.bind({});
Sugestions.args = {
  label: 'Buscar herói',
  name: 'seach',
  value: 'hul',
  isSugestionsOpen: true,
  sugestions: [
    { id: undefined, name: 'hul' },
    { id: 1, name: 'Hulk' },
    { id: 2, name: 'She-Hulk' },
  ],
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Buscar herói',
  name: 'seach',
  isSecondary: true,
};

export const SugestionsSecondary = Template.bind({});
SugestionsSecondary.args = {
  label: 'Buscar herói',
  name: 'seach',
  value: 'hul',
  isSugestionsOpen: true,
  sugestions: [
    { id: undefined, name: 'hul' },
    { id: 1, name: 'Hulk' },
    { id: 2, name: 'She-Hulk' },
  ],
  isSecondary: true,
};
