import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import InputSearch, { SearchInputProps } from 'components/InputSearch';

export default {
  title: 'Components/InputSearch',
  component: InputSearch,
} as Meta;

const Template: Story<SearchInputProps> = (args) => <InputSearch {...args} />;

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
  sugestions: ['hul', 'Hulk', 'She-Hulk']
};
