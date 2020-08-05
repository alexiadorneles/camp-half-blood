import React from 'react'
import { Avatar } from '@material-ui/core'

import './Profile.scss'
import { Camper } from '../../../model/Camper'
import { Country, BrazilianState } from '../../../model/Places'
import { DateUtils } from '../../../utils/DateUtils'

const camper: Camper = {
	dsName: 'Aléxia Dorneles',
	nrDiscordID: 1234,
	dsInstagramNick: 'dornelesalexia',
	dtBirth: new Date(2000, 2, 14),
	dsDescription:
		'Amo a Annabeth e Mitologia Grega, conheço a saga Percy Jackson há cerca de 8 anos e cada vez me apaixono ainda mais',
	tpCountry: Country.BRAZIL,
	tpState: BrazilianState.RS,
	dsImageURL: 'https://i.imgur.com/jRkMt2Z.jpeg',
	dsPronouns: 'ela/dela',
	idCabin: '6',
	idCamper: '1',
}

export function Profile() {
	return (
		<div className='Profile'>
			<div className='Profile__container'>
				<div className='Profile__photoAndNameContainer'>
					<Avatar className='Profile__photoAndNameContainer--photo' alt='foto de perfil' src={camper.dsImageURL} />
					<p>{camper.dsName}</p>
					<p className='Profile__photoAndNameContainer--cabin'>Chalé 6</p>
				</div>

				<div className='Profile__container--formItem'>
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
			</div>
		</div>
	)
}
