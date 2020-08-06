import React, { useState, ChangeEvent } from 'react'
import { Avatar, Button, TextField, TextareaAutosize, Select, MenuItem } from '@material-ui/core'

import './Profile.scss'
import { Camper } from '../../../model/Camper'
import { Country, BrazilianState } from '../../../model/Places'
import { DateUtils } from '../../../utils/DateUtils'
import { Edit, Done } from '@material-ui/icons'

const camperMock: Camper = {
	dsName: 'Aléxia Dorneles',
	nrDiscordID: 1234,
	dsInstagramNick: 'dornelesalexia',
	dtBirth: new Date(2000, 2, 14),
	dsDescription:
		'Amo a Annabeth e Mitologia Grega, conheço a saga Percy Jackson há cerca de 8 anos e cada vez me apaixono ainda mais',
	tpCountry: Country.BRAZIL,
	tpState: BrazilianState.RS,
	dsImageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRiJEwdHt9yU8zgfWKMm1WW5Gnh3p8pA9IqLQ&usqp=CAU',
	dsPronouns: 'ela/dela',
	idCabin: '6',
	idCamper: '1',
}

enum ScreenMode {
	DISPLAY = 'Display',
	EDITION = 'Edition',
}

type FieldChangeEvent = ChangeEvent<{
	name?: string | undefined
	value: unknown
}>

export function Profile() {
	const [camper, setCamper] = useState<Camper>(camperMock)
	const [screenMode, setScreenMode] = useState(ScreenMode.DISPLAY)

	function renderDisplayMode() {
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
		setCamper(oldCamper => ({ ...oldCamper, [name]: value }))
	}

	return (
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
}
