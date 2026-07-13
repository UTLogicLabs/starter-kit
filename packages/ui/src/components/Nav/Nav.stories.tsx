import type { Meta, StoryObj } from '@storybook/react'
import { Nav } from './Nav.js'

const meta: Meta<typeof Nav> = {
  title: 'Components/Nav',
  component: Nav,
  args: {
    logoSlot: 'UTLogicLabs',
    items: [
      { label: 'Home', href: '#', isActive: true },
      { label: 'Docs', href: '#' },
      { label: 'About', href: '#' },
    ],
  },
}

export default meta

type Story = StoryObj<typeof Nav>

export const Default: Story = {}
