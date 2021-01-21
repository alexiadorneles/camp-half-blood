import { Avatar, Button, Checkbox, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import { Done, Edit } from '@material-ui/icons'
import { KeyboardDatePicker } from '@material-ui/pickers'
import base64url from 'base64url'
import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import DiscordImage from '../../../assets/images/discord-button.png'
import { SECURED_ROUTES } from '../../../config/Routes'
import { Camper } from '../../../model/Camper'
import { BrazilianState, Country } from '../../../model/Places'
import { GlobalContext } from '../../../providers/GlobalContext'
import { CustomSwal } from '../../../providers/SwalProvider'
import { CamperService } from '../../../services'
import { DateUtils } from '../../../utils'
import './Profile.scss'

enum ScreenMode {
	DISPLAY = 'Display',
	EDITION = 'Edition',
}

type FieldChangeEvent = ChangeEvent<{
	name?: string | undefined
	value: unknown
}>

export interface ProfilePropTypes {
	camperService: CamperService
}

const discordUrl =
	'https://discord.com/api/oauth2/authorize?client_id=800010577929306112&redirect_uri=http%3A%2F%2Flocalhost%3A3333%2Fdiscord%2Fredirect&response_type=code&scope=identify%20email%20guilds'

export function Profile({ camperService }: ProfilePropTypes) {
	const history = useHistory()
	const { dispatchCamper } = useContext(GlobalContext)

	const [camper, setCamper] = useState<Camper | null>(null)
	const [camperLoaded, setCamperLoaded] = useState(false)
	const [screenMode, setScreenMode] = useState(ScreenMode.DISPLAY)
	const [agreeAllDataIsTrue, setAgreeAllDataIsTrue] = useState(false)

	function openDiscordLogin() {
		const idCamper = camper!.idCamper
		window.open(discordUrl + `&state=${base64url(JSON.stringify({ idCamper }))}`)
	}

	useEffect(() => {
		getCamper()
	}, [screenMode])

	useEffect(() => {
		if (camperLoaded && !camper!.blRegisterCompleted) {
			CustomSwal.fire({
				title: 'Bem vindo!',
				text:
					'Precisamos que você informe alguns dados pra gente antes de continuarmos. Por favor informe dados verdadeiros, ou pode acabar sendo desclassificado no processo, tudo bem? Esses dados são usados para sabermos quem está participando e evitar contas fakes entrando no nosso Acampamento',
				icon: 'info',
				showConfirmButton: true,
				focusConfirm: false,
				confirmButtonText: `Entendi!`,
			})
			setScreenMode(ScreenMode.EDITION)
		}
	}, [camperLoaded])

	async function getCamper(): Promise<void> {
		const camper = await camperService.getProfile()
		setCamper(camper)
		setCamperLoaded(true)
	}

	function renderDisplayMode() {
		if (!camper) return null
		return (
			<>
				{/* TODO: uncoment when screen is ready */}
				{/* <div className='Profile__container--formItem-down'>
					<label>Descrição: </label>
					<p>{camper.dsDescription}</p>
				</div>

				<div className='Profile__container--formItem'>
					<label>Pronomes: </label>
					<p>{camper.dsPronouns}</p>
				</div> */}

				<div className='Profile__container--formItem'>
					<label>Instagram: </label>
					<p>{camper.dsInstagramNick}</p>
				</div>

				<div className='Profile__container--formItem'>
					<label>Discord ID: </label>
					<p>{camper.dsDiscordID}</p>
				</div>

				<div className='Profile__container--formItem'>
					<label>País: </label>
					<p>{camper.tpCountry}</p>
				</div>

				{camper.tpCountry === Country.BRAZIL && (
					<div className='Profile__container--formItem'>
						<label>Estado: </label>
						<p>{camper.tpState}</p>
					</div>
				)}

				{camper.dtBirth && (
					<div className='Profile__container--formItem'>
						<label>Idade: </label>
						<p>{DateUtils.calculateAgeFromBirthDate(camper.dtBirth)}</p>
					</div>
				)}

				<div className='Profile__container--actionButtonContainer'>
					<Button size='medium' variant='outlined' endIcon={<Edit />} onClick={changeToEditionMode}>
						Editar Perfil
					</Button>
				</div>
			</>
		)
	}

	function firstTimeFragment() {
		return (
			<>
				<div className='Profile__container--formItem'>
					<KeyboardDatePicker
						invalidDateMessage='Por favor insira uma data válida!'
						className='Profile__container--formItem-textField'
						inputVariant='outlined'
						name='dtBirth'
						required
						disableToolbar
						variant='inline'
						format='dd/MM/yyyy'
						margin='normal'
						id='date-picker-inline'
						label='Data de Nascimento'
						value={camper!.dtBirth}
						onChange={date => onFieldChanged({ target: { name: 'dtBirth', value: date } } as any)}
						KeyboardButtonProps={{
							'aria-label': 'change date',
						}}
					/>
				</div>
				<div className='Profile__container--formItem'>
					<label htmlFor='check'>Eu declaro que os dados acima são verdadeiros</label>
					<Checkbox
						id='check'
						name='check'
						checked={agreeAllDataIsTrue}
						onChange={(event, value) => setAgreeAllDataIsTrue(value)}
					/>
				</div>
			</>
		)
	}

	function renderEditMode() {
		if (!camper) return null

		return (
			<>
				{/* TODO: uncoment when screen is ready */}
				{/* <div className='Profile__container--formItem-down'>
					<textarea
						placeholder='Conta um pouco sobre você, máximo 200 caracteres'
						onChange={onFieldChanged}
						name='dsDescription'
						maxLength={200}
						value={camper.dsDescription || ''}
					/>
				</div> */}

				<div className='Profile__container--formItem'>
					<InputLabel htmlFor={'País'}>País*: </InputLabel>
					<Select
						required
						variant='outlined'
						name='tpCountry'
						className='Profile__container--formItem-textField'
						value={camper.tpCountry || ''}
						onChange={onFieldChanged}>
						{Object.values(Country).map(v => (
							<MenuItem key={v} value={v}>
								{v}
							</MenuItem>
						))}
					</Select>
				</div>

				{camper.tpCountry === Country.BRAZIL && (
					<div className='Profile__container--formItem'>
						<InputLabel htmlFor={'Estado'}>Estado*: </InputLabel>
						<Select
							required
							variant='outlined'
							name='tpState'
							className='Profile__container--formItem-textField'
							value={camper.tpState}
							onChange={onFieldChanged}>
							{Object.values(BrazilianState).map(v => (
								<MenuItem key={v} value={v}>
									{v}
								</MenuItem>
							))}
						</Select>
					</div>
				)}

				<div className='Profile__container--formItem'>
					<TextField
						required
						label='Nome de Usuário no Instagram:'
						name='dsInstagramNick'
						onChange={onFieldChanged}
						variant='outlined'
						className='Profile__container--formItem-textField'
						value={camper.dsInstagramNick || ''}
					/>
				</div>

				{/* TODO: uncoment when screen is ready */}
				{/* <div className='Profile__container--formItem'>
					<TextField
						label='Pronomes'
						variant='outlined'
						name='dsPronouns'
						onChange={onFieldChanged}
						className='Profile__container--formItem-textField'
						value={camper.dsPronouns || ''}
					/>
				</div> */}

				{!camper.blRegisterCompleted && firstTimeFragment()}

				<div className='Profile__container--actionButtonContainer'>
					<Button
						size='medium'
						disabled={!camper!.blRegisterCompleted ? isButtonDisabled() : false}
						variant='outlined'
						color='primary'
						endIcon={<Done />}
						onClick={saveChanges}>
						Salvar Alterações
					</Button>
				</div>
			</>
		)
	}

	function isButtonDisabled(): boolean {
		return (
			!agreeAllDataIsTrue ||
			// TODO: uncoment when screen is ready
			// !camper!.dsDescription ||
			!camper!.dsInstagramNick ||
			!camper!.dtBirth ||
			!camper!.tpCountry
		)
	}

	function changeToEditionMode() {
		setScreenMode(ScreenMode.EDITION)
	}

	async function saveChanges() {
		try {
			if (camper!.blRegisterCompleted) {
				await camperService.update(camper!)
			} else {
				await camperService.completeRegister(camper!)
				dispatchCamper && dispatchCamper({ ...camper, blRegisterCompleted: true })
				history.push(SECURED_ROUTES.CABIN_CHOICE)
			}
			setScreenMode(ScreenMode.DISPLAY)
		} catch (err) {
			console.error(err)
		}
	}

	function onFieldChanged(event: FieldChangeEvent): void {
		const value = event.target.value
		const name = event.target.name!
		setCamper(oldCamper => ({ ...oldCamper!, [name]: value }))
	}

	return (
		camper && (
			<div className='Profile'>
				<div className='Profile__container'>
					<div className='Profile__photoAndNameContainer'>
						<Avatar className='Profile__photoAndNameContainer--photo' alt='foto de perfil' src={camper.dsImageURL} />
						<p>{camper.dsName}</p>
						<p className='Profile__photoAndNameContainer--email'>{camper.dsEmail}</p>
					</div>

					{screenMode === ScreenMode.DISPLAY ? renderDisplayMode() : renderEditMode()}
					{screenMode === ScreenMode.DISPLAY && camper && !camper.dsDiscordID && (
						<div className='Profile__container--formItem-down'>
							<InputLabel>
								Para completar seu cadastro, <br /> entre com o Discord
							</InputLabel>
							<img
								alt='Discord'
								className='Profile__container--formItem-down--discordImage'
								src={DiscordImage}
								onClick={openDiscordLogin}
							/>
						</div>
					)}
				</div>
			</div>
		)
	)
}
