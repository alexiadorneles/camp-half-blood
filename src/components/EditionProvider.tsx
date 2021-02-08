import React from 'react'
import { Edition } from '../model/Edition'
import { CHBSocialMedia } from './generics'

export function EditionProvider(edition: Edition) {
	if (!edition) {
		return (
			<div style={{ padding: 15 }} className='page'>
				<h2>Nossa edição ainda não começou. Fique ligado em nossas redes sociais para mais informações.</h2>
				<CHBSocialMedia />
			</div>
		)
	}

	if (edition && edition.dtBegin) {
		return (
			<div style={{ padding: 15 }} className='page'>
				<h2>Oops. Parece que você perdeu o prazo de inscrição :(</h2>
				<br></br>
				<p>
					Logo teremos outras edições para você participar! Fique de olho nas nossas redes sociais para saber quando o
					próximo camp vai acontecer
				</p>
				<CHBSocialMedia />
			</div>
		)
	}

	return null
}
