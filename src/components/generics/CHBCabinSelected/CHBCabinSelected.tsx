import React from 'react'
import { Camper } from '../../../model/Camper'
import { CHBSocialMedia } from '../CHBSocialMedia/CHBSocialMedia'
import './CHBCabinSelected.scss'

export interface CHBCabinSelectedPropTypes {
	camper: Camper
	compact?: boolean
}

export function CHBCabinSelected({ camper, compact }: CHBCabinSelectedPropTypes) {
	const getClassName = (name: string) => (compact ? `${name}__compact` : name)

	return (
		<div className={getClassName('CHBCabinSelected')}>
			<div className={getClassName('CHBCabinSelected__container')}>
				<div className={getClassName('CHBCabinSelected__container--inner')}>
					<h1>Você está no Chalé {camper && camper.idCabin}</h1>
					<p>
						<span className={getClassName('CHBCabinSelected__container--inner__welcomeText')}>
							Entre no nosso servidor no Discord, vá até o canal <b>#quiron</b> e digite !camp.
							{!compact && <br />}
							{!compact && <br />} Acompanhe nossas redes sociais:
						</span>
						<br />
						<CHBSocialMedia size={compact ? 'small' : 'large'} />
					</p>
				</div>
			</div>
		</div>
	)
}
