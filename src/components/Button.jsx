import React from "react"

export function Button({ children, ...props }) {
  return (
    <>
      <button
        className="button"
        {...props}
      >
        {children}
      </button>
    </>
  )
}
