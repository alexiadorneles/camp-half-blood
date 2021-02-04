import React from 'react'
import { Camper } from '../../../model/Camper'
import { CHBSocialMedia } from '../CHBSocialMedia/CHBSocialMedia'
import './CHBCabinSelected.scss'

export interface CHBCabinSelectedPropTypes {
	camper: Camper
}

export function CHBCabinSelected({ camper }: CHBCabinSelectedPropTypes) {
	return (
		<div className='CHBCabinSelected'>
			<div className='CHBCabinSelected__container'>
				<div className='CHBCabinSelected__container--inner'>
					<h1>Você está no Chalé {camper && camper.idCabin}</h1>
					<p>
						<span className='CHBCabinSelected__container--inner__welcomeText'>
							Para entrar no seu chalé no Discord, entre no nosso servidor, vá até chat <b>#quiron</b> e digite !camp
							<br />
							<br />
							Não se esqueça de conferir nossas redes sociais:
						</span>
						<br />
						<CHBSocialMedia />
					</p>
				</div>
			</div>
		</div>
	)
}
