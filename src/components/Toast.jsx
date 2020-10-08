import React, { useEffect, useRef, useState } from 'react'

function useToasts() {
	const [notification, set] = useState(null)
	const timeout = useRef(null)

	useEffect(() => {
		if (timeout.current) clearTimeout(timeout.current)

		timeout.current = setTimeout(() => {
			set(null)
		}, 5000)
	}, [notification])

	return [notification, set]
}

function Toast({ children, className, ...props }) {
	return (
		<>
			<div className={`toast ${className}`} {...props}>
				{children}
			</div>
		</>
	)
}

export { Toast, useToasts }
