import React from "react"

export function Tip({ children, variant, ...props }) {
  return (
    <>
      <span className={`tip-${variant}`} {...props}>
        {children}
      </span>
    </>
  )
}
