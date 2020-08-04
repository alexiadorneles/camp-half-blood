import React from 'react'
import { CHBLogo } from '../../generics'

import './Login.scss'

export function Login() {
	return (
		<div className='Login'>
			<CHBLogo />
			<p className='Login__welcomeText'>
				Bem vindo ao <br />
				Acampamento Meio-Sangue
			</p>
		</div>
	)
}
