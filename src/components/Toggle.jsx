import React, { useState } from 'react'

export function Toggle({ id, label, onChange, ...props }) {
	const [checked, set] = useState(false)
	const [focused, focus] = useState(false)

	const toggle = () => {
		onChange(!checked)
		set(!checked)
	}

	const onFocus = () => focus(true)
	const onBlur = () => focus(false)

	return (
		<>
			<label
				htmlFor={id}
				aria-label={label}
				className='toggle'
				data-checked={checked}
				data-focused={focused}
			>
				<span className='relative'>
					<span className={checked ? 'bg-focus' : 'bg-border'} />
					<span>
						<input
							id={id}
							type='checkbox'
							checked={checked}
							onChange={toggle}
							onFocus={onFocus}
							onBlur={onBlur}
							{...props}
						/>
					</span>
				</span>
			</label>
		</>
	)
}
