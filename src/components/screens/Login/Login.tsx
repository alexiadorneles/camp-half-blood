import React from 'react'
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { useHistory } from 'react-router'
import { SECURED_ROUTES } from '../../../config/Routes'
import { Camper } from '../../../model/Camper'
import { CustomSwal } from '../../../providers/SwalProvider'
import { CamperService } from '../../../services'
import { LocalStorageUtils } from '../../../utils/LocalStorageUtils'
import { CHBLogo } from '../../generics'
import './Login.scss'

export interface LoginPropTypes {
	camperService: CamperService
}

const { REACT_APP_GOOGLE_KEY } = process.env
console.log(process && process.env)

export function Login({ camperService }: LoginPropTypes) {
	const history = useHistory()

	if (LocalStorageUtils.getToken()) {
		history.push(SECURED_ROUTES.PROFILE)
	}

	async function successCallbackGoogle(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
		const onlineResponse = response as GoogleLoginResponse
		const idGoogle = onlineResponse.googleId
		const profile = onlineResponse.getBasicProfile()
		const camper: Partial<Camper> = {
			idGoogle,
			dsImageURL: profile.getImageUrl(),
			dsName: profile.getName(),
			dsEmail: profile.getEmail(),
		}
		const createdCamper = await camperService.create(camper)
		LocalStorageUtils.setItem('idCamper', createdCamper.idCamper)
		goToProfilePage()
	}

	function errorCallbackGoogle({ error }: any) {
		if ((error = 'popup_closed_by_user')) return
		CustomSwal.fire('ERRO', 'Erro inesperado no login, contate o admin do site', 'error')
	}

	function goToProfilePage() {
		history.push(SECURED_ROUTES.PROFILE)
	}

	return (
		<div className='Login'>
			<CHBLogo className='Login__logo' isPrimaryColor />
			<p className='Login__welcomeText'>
				Bem vindo ao
				<br />
				Acampamento
			</p>
			<div className='Login__google'>
				<GoogleLogin
					icon={false}
					className='Login__google--button'
					clientId={REACT_APP_GOOGLE_KEY!}
					buttonText='Entrar com Google'
					onSuccess={successCallbackGoogle}
					onFailure={errorCallbackGoogle}
					cookiePolicy={'single_host_origin'}
				/>
			</div>
			<div className='Login__terms'>
				<p>
					Ao clicar em "Entrar" acima você concorda com os{' '}
					<a href='https://portalpercyjackson.com/termos/' className='Login__terms-link'>
						termos do aplicativo.
					</a>
				</p>
			</div>
		</div>
	)
}
