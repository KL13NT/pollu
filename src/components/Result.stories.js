import React from "react"

import { Result } from "./Result"

export default {
  title: "Example/Result",
  component: Result,
  argTypes: {
    backgroundColor: { control: "color" },
  },
}

const Template = args => <Result {...args}>Result 1</Result>

export const Primary = Template.bind({})
Primary.args = {
  percentage: 50,
}
