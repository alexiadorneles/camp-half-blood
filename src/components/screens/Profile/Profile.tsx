import { Avatar, Button, MenuItem, Select, TextareaAutosize, TextField } from '@material-ui/core'
import { Done, Edit } from '@material-ui/icons'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Camper } from '../../../model/Camper'
import { BrazilianState, Country } from '../../../model/Places'
import { CRUDService } from '../../../services'
import { DateUtils } from '../../../utils'
import './Profile.scss'
import { LocalStorageUtils } from '../../../utils/LocalStorageUtils'

enum ScreenMode {
	DISPLAY = 'Display',
	EDITION = 'Edition',
}

type FieldChangeEvent = ChangeEvent<{
	name?: string | undefined
	value: unknown
}>

export interface ProfilePropTypes {
	camperService: CRUDService<Camper>
}

export function Profile({ camperService }: ProfilePropTypes) {
	const [camper, setCamper] = useState<Camper | null>(null)
	const [screenMode, setScreenMode] = useState(ScreenMode.DISPLAY)

	useEffect(() => {
		const camperId = LocalStorageUtils.getItem('idCamper')
		getCamper(Number(camperId))
	}, [])

	async function getCamper(camperId: number): Promise<void> {
		const camper = await camperService.findOne(camperId)
		setCamper(camper)
	}

	function renderDisplayMode() {
		if (!camper) return null
		return (
			<>
				<div className='Profile__container--formItem-down'>
					<label>Descrição: </label>
					<p>{camper.dsDescription}</p>
				</div>

				<div className='Profile__container--formItem'>
					<label>Pronomes: </label>
					<p>{camper.dsPronouns}</p>
				</div>

				<div className='Profile__container--formItem'>
					<label>Instagram: </label>
					<p>{camper.dsInstagramNick}</p>
				</div>

				<div className='Profile__container--formItem'>
					<label>Discord ID: </label>
					<p>{camper.nrDiscordID}</p>
				</div>

				<div className='Profile__container--formItem'>
					<label>País: </label>
					<p>{camper.tpCountry}</p>
				</div>

				<div className='Profile__container--formItem'>
					<label>Estado: </label>
					<p>{camper.tpState}</p>
				</div>

				<div className='Profile__container--formItem'>
					<label>Idade: </label>
					<p>{DateUtils.calculateAgeFromBirthDate(camper.dtBirth)}</p>
				</div>

				<div className='Profile__container--actionButtonContainer'>
					<Button size='medium' variant='outlined' endIcon={<Edit />} onClick={changeToEditionMode}>
						Editar Perfil
					</Button>
				</div>
			</>
		)
	}

	function renderEditMode() {
		if (!camper) return null

		return (
			<>
				<div className='Profile__container--formItem-down'>
					<label>Descrição: </label>
					<TextareaAutosize
						onChange={onFieldChanged}
						name='dsDescription'
						maxLength={200}
						value={camper.dsDescription}
					/>
				</div>

				<div className='Profile__container--formItem'>
					<label>Pronomes: </label>
					<TextField
						variant='outlined'
						name='dsPronouns'
						onChange={onFieldChanged}
						className='Profile__container--formItem-textField'
						value={camper.dsPronouns}
					/>
				</div>

				<div className='Profile__container--formItem'>
					<label>Instagram: </label>
					<TextField
						name='dsInstagramNick'
						onChange={onFieldChanged}
						variant='outlined'
						className='Profile__container--formItem-textField'
						value={camper.dsInstagramNick}
					/>
				</div>

				<div className='Profile__container--formItem'>
					<label>Discord ID: </label>
					<TextField
						onChange={onFieldChanged}
						name='nrDiscordID'
						variant='outlined'
						className='Profile__container--formItem-textField'
						value={camper.nrDiscordID}
					/>
				</div>

				<div className='Profile__container--formItem'>
					<label>País: </label>
					<Select
						variant='outlined'
						name='tpCountry'
						className='Profile__container--formItem-textField'
						value={camper.tpCountry}
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
						<label>Estado: </label>
						<Select
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

				<div className='Profile__container--actionButtonContainer'>
					<Button size='medium' variant='outlined' color='primary' endIcon={<Done />} onClick={saveChanges}>
						Salvar Alterações
					</Button>
				</div>
			</>
		)
	}

	function changeToEditionMode() {
		setScreenMode(ScreenMode.EDITION)
	}

	function saveChanges() {
		setScreenMode(ScreenMode.DISPLAY)
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
						<p className='Profile__photoAndNameContainer--cabin'>Chalé 6</p>
					</div>

					{screenMode === ScreenMode.DISPLAY ? renderDisplayMode() : renderEditMode()}
				</div>
			</div>
		)
	)
}
