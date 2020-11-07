import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import CheckboxToggle, { CheckboxToggleProps } from 'components/CheckboxToggle';

export default {
  title: 'Components/CheckboxToggle',
  component: CheckboxToggle,
} as Meta;

const Template: Story<CheckboxToggleProps> = (args) => <CheckboxToggle {...args} />;

export const Primary = Template.bind({});

Primary.args = {};