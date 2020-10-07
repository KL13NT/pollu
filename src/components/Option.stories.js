import React from "react"

import { Option } from "./Option"

export default {
  title: "Example/Option",
  component: Option,
  argTypes: {
    backgroundColor: { control: "color" },
  },
}

const Template = args => <Option {...args}>Option 1</Option>

export const Primary = Template.bind({})
Primary.args = {
  label: "Option",
  placeholder: "What's on your mind?",
  onChange: console.log,
}
