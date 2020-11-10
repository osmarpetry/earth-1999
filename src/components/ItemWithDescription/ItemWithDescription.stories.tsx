import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import ItemWithDescription, {
  ItemWithDescriptionProps
} from 'components/ItemWithDescription'

import { ReactComponent as HQLogo } from 'assets/icones/book/BookLogo.svg'
import { ReactComponent as HeroLogo } from 'assets/icones/heroi/HeroLogo.svg'

export default {
  title: 'Components/ItemWithDescription',
  component: ItemWithDescription
} as Meta

const Template: Story<ItemWithDescriptionProps> = args => (
  <ItemWithDescription {...args} />
)

export const OneLine = Template.bind({})
OneLine.args = {
  itemName: 'Quadrinhos',
  description: '3.000',
  descriptionLogo: <HQLogo />,
  hasTwoLines: true
}

export const OneLineNoLogo = Template.bind({})
OneLineNoLogo.args = {
  itemName: 'Último quandrinho:',
  description: '13 fev. 2020'
}

export const TwoLines = Template.bind({})
TwoLines.args = {
  itemName: 'Hero:',
  descriptionLogo: <HeroLogo />
}
