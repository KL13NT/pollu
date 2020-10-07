import React, { useState } from "react"

export function Option({ children, label, onChange, ...props }) {
  const [checked, set] = useState(false)

  const toggle = () => {
    onChange(!checked)
    set(!checked)
  }

  const classes = checked ? "option-checked" : "option"

  return (
    <>
      <label className={classes} label={label || children}>
        {children}
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={toggle}
          {...props}
        />
      </label>
    </>
  )
}
