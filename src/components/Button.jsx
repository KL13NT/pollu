import React from 'react'

export function Button({ children, className, ...props }) {
	return (
		<>
			<button className={`button ${className}`} {...props}>
				{children}
			</button>
		</>
	)
}
