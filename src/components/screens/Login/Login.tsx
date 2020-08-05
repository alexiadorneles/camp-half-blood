import React from 'react'
import { CHBLogo } from '../../generics'
import { Button } from '@material-ui/core'

import './Login.scss'
import { useHistory } from 'react-router'
import { SECURED_ROUTES } from '../../../config/Routes'

export function Login() {
	const history = useHistory()

	function goToHomePage() {
		history.push(SECURED_ROUTES.HOME)
	}

	return (
		<div className='Login'>
			<CHBLogo />
			<p className='Login__welcomeText'>
				Bem vindo ao <br />
				Acampamento Meio-Sangue
			</p>
			<Button variant='contained' onClick={goToHomePage}>
				Login
			</Button>
		</div>
	)
}
