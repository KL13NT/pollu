import React from 'react'

export function Input({ id, label, className, ...props }) {
	return (
		<>
			<label aria-label={label} for={id} />
			<input className={`input ${className}`} id={id} {...props} />
		</>
	)
}
