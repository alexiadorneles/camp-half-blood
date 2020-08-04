import React from 'react'
import logo from '../../../assets/images/favicon.png'

import './CHBLogo.scss'

export function CHBLogo() {
	return (
		<div className='CHBLogo'>
			<img className='CHBLogo__image' src={logo} alt='Camp Half Blood Logo' />
		</div>
	)
}
