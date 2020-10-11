import React from 'react'

export function Result({ children, percentage, className, ...props }) {
	let percentageRounded = Math.round(parseFloat(percentage) * 10)/10;
	return (
		<>
			<div className={`result ${className}`} {...props}>
				<span className='text-lg'>{children}</span>
				<span className='text-base'>{percentageRounded}%</span>
				<div
					className='absolute bottom-0 left-0 bg-progress h-1'
					style={{ width: `${percentage}%` }}
				/>
			</div>
		</>
	)
}
