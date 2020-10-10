import React from 'react'

export function Button({ children, auto, className, ...props }) {
	return (
		<>
			<button
				className={`button ${className} ${auto ? 'w-auto' : 'w-full'}`}
				{...props}
			>
				{children}
			</button>
		</>
	)
}
