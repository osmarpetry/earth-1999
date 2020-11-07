import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import InputSearch from 'components/InputSearch';

export default {
  title: 'Components/InputSearch',
  component: InputSearch,
} as Meta;

const Template: Story<{}> = (args) => <InputSearch {...args} />;

export const Primary = Template.bind({});

Primary.args = {};