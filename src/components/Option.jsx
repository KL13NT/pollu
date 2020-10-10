import React, { useState } from 'react'
import { useRef } from 'react'

export function Option({ label, children, className, htmlFor, ...props }) {
	return (
		<>
			<label className={`option ${className}`} htmlFor={htmlFor}>
				<span>{children}</span>
				<input type='checkbox' className='hidden' {...props} />
				<span />
			</label>
		</>
	)
}

export function Radio({ label, children, className, htmlFor, ...props }) {
	return (
		<>
			<label className={`option ${className}`} htmlFor={htmlFor}>
				<span>{children}</span>
				<input type='radio' className='hidden' {...props} />
				<span />
			</label>
		</>
	)
}
