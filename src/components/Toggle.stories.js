import React from "react"

import { Toggle } from "./Toggle"

export default {
  title: "Example/Toggle",
  component: Toggle,
  argTypes: {
    backgroundColor: { control: "color" },
  },
}

const Template = args => <Toggle {...args} />

export const Primary = Template.bind({})
Primary.args = {
  label: "Toggle",
  placeholder: "What's on your mind?",
  onChange: console.log,
}
