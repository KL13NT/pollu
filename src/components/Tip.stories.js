import React from "react"

import { Tip } from "./Tip"

export default {
  title: "Example/Tip",
  component: Tip,
  argTypes: {
    backgroundColor: { control: "color" },
  },
}

const Template = args => <Tip {...args}>Tip 1</Tip>

export const Danger = Template.bind({})
Danger.args = {
  variant: "danger",
}

export const Info = Template.bind({})
Info.args = {
  variant: "info",
}
