import React from "react"

import { Button } from "./Button"

export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
}

const Template = args => <Button {...args}>Create Poll</Button>

export const Primary = Template.bind({})
Primary.args = {
  label: "Button",
  placeholder: "What's on your mind?",
}
