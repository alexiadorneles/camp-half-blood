import React from 'react'
import { CHBLogo } from '../../generics'
import { Button } from '@material-ui/core'

import './Login.scss'
import { useHistory } from 'react-router'
import { SECURED_ROUTES } from '../../../config/Routes'

export function Login() {
	const history = useHistory()

	function goToProfilePage() {
		history.push(SECURED_ROUTES.PROFILE)
	}

	return (
		<div className='Login'>
			<CHBLogo />
			<p className='Login__welcomeText'>
				Bem vindo ao <br />
				Acampamento Meio-Sangue
			</p>
			<Button size="large" variant='contained' color="secondary" onClick={goToProfilePage}>
				Login
			</Button>
		</div>
	)
}
