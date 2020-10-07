import React from "react"

import { Input } from "./Input"

export default {
  title: "Example/Input",
  component: Input,
  argTypes: {
    backgroundColor: { control: "color" },
  },
}

const Template = args => <Input {...args} />

export const Primary = Template.bind({})
Primary.args = {
  label: "Input",
  placeholder: "What's on your mind?",
}
