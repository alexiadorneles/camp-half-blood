import React from 'react'
import logo from '../../../assets/images/favicon.png'
import logoOrange from '../../../assets/images/favicon-orange-2.png'

import './CHBLogo.scss'

export interface CHBLogoPropTypes {
	isPrimaryColor?: boolean
}

export function CHBLogo({ isPrimaryColor }: CHBLogoPropTypes) {
	return (
		<div className='CHBLogo'>
			<img className='CHBLogo__image' src={isPrimaryColor ? logoOrange : logo} alt='Camp Half Blood Logo' />
		</div>
	)
}
