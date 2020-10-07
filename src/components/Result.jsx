import React from "react"

export function Result({ children, percentage, label, ...props }) {
  return (
    <>
      <div className="result" aria-label={label} {...props}>
        <span className="text-lg">{children}</span>
        <span className="text-base">{percentage}%</span>
        <div
          className="absolute bottom-0 left-0 bg-progress h-1"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </>
  )
}
