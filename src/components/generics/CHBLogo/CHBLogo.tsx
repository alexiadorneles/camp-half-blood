import React from 'react'
import logo from '../../../assets/images/favicon.png'
import logoColored from '../../../assets/images/camp-logo.png'

import './CHBLogo.scss'

export interface CHBLogoPropTypes {
	isPrimaryColor?: boolean
	className?: string
}

export function CHBLogo({ isPrimaryColor, className }: CHBLogoPropTypes) {
	return (
		<div className={`CHBLogo ${className || ''}`}>
			<img className='CHBLogo__image' src={isPrimaryColor ? logoColored : logo} alt='Camp Half Blood Logo' />
		</div>
	)
}
