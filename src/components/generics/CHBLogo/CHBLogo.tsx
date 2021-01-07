import React from 'react'
import logo from '../../../assets/images/favicon.png'
import pegasus from '../../../assets/images/pegasus.png'

import './CHBLogo.scss'

export interface CHBLogoPropTypes {
	isPrimaryColor?: boolean
}

export function CHBLogo({ isPrimaryColor }: CHBLogoPropTypes) {
	return (
		<div className='CHBLogo'>
			<img className='CHBLogo__image' src={isPrimaryColor ? pegasus : logo} alt='Camp Half Blood Logo' />
		</div>
	)
}
