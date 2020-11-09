import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import ButtonHeart, { ButtonHeartProps } from 'components/ButtonHeart'

export default {
  title: 'Components/ButtonHeart',
  component: ButtonHeart
} as Meta

const Template: Story<ButtonHeartProps> = args => <ButtonHeart {...args} />

export const Primary = Template.bind({})

Primary.args = {
  value: true
}
