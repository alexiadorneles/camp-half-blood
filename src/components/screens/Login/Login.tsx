import { Button } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router'
import { SECURED_ROUTES } from '../../../config/Routes'
import { CamperService } from '../../../services'
import { LocalStorageUtils } from '../../../utils/LocalStorageUtils'
import { CHBLogo } from '../../generics'
import './Login.scss'

export interface LoginPropTypes {
	camperService: CamperService
}

export function Login({ camperService }: LoginPropTypes) {
	const history = useHistory()

	const urlParams = new URLSearchParams(window.location.search)
	const token = urlParams.get('token')
	const idCamper = urlParams.get('idCamper')

	if (token && idCamper) {
		LocalStorageUtils.setToken(token)
		LocalStorageUtils.setItem('idCamper', idCamper)
		goToProfilePage()
	}

	if (LocalStorageUtils.getToken()) {
		history.push(SECURED_ROUTES.PROFILE)
	}

	function goToProfilePage() {
		history.push(SECURED_ROUTES.PROFILE)
	}

	const openGoogleLoginPage = async () => {
		const googleURL = await camperService.login()
		window.location.href = googleURL
	}

	return (
		<div className="Login">
			<CHBLogo className="Login__logo" isPrimaryColor />
			<p className="Login__welcomeText">
				Bem vindo ao
				<br />
				Acampamento
			</p>
			<div className="Login__google">
				<Button onClick={openGoogleLoginPage} className="Login__google--button">
					Entrar com Google
				</Button>
			</div>
			<div className="Login__terms">
				<p>
					Ao clicar em "Entrar" acima você concorda com os{' '}
					<a href="https://portalpercyjackson.com/termos/" className="Login__terms-link">
						termos do aplicativo.
					</a>
				</p>
			</div>
		</div>
	)
}
