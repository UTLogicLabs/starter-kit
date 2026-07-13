import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card.js'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  args: {
    children: 'Card content',
  },
}

export default meta

type Story = StoryObj<typeof Card>

export const Surface: Story = {
  args: { variant: 'surface' },
}

export const Outlined: Story = {
  args: { variant: 'outlined' },
}
