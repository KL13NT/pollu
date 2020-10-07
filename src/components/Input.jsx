import React from "react"

export function Input({ id, label, ...props }) {
  return (
    <>
      <label aria-label={label} for={id} />
      <input className="input" id={id} {...props} />
    </>
  )
}
