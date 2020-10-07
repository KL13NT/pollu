import React, { useState } from "react"

export function Toggle({ id, label, onChange, ...props }) {
  const [checked, set] = useState(false)

  const toggle = () => {
    onChange(!checked)
    set(!checked)
  }

  const classes = checked ? "toggle-checked" : "toggle"

  return (
    <>
      <label
        for={id}
        aria-label={label}
        className="mt-3 inline-flex items-center cursor-pointer"
      >
        <span className="relative">
          <span
            className={`block w-10 h-6 transition-background-color duration-300 ${
              checked ? "bg-focus" : "bg-border"
            } rounded-full shadow-inner`}
          />
          <span className={classes}>
            <input
              id={id}
              type="checkbox"
              className="absolute opacity-0 w-0 h-0"
              checked={checked}
              onChange={toggle}
              {...props}
            />
          </span>
        </span>
      </label>
    </>
  )
}
