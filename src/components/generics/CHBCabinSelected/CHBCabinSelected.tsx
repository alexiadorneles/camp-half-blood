import React from 'react'
import { Camper } from '../../../model/Camper'
import './CHBCabinSelected.scss'

export interface CHBCabinSelectedPropTypes {
	camper: Camper
}

export function CHBCabinSelected({ camper }: CHBCabinSelectedPropTypes) {
	return (
		<div className='CHBCabinSelected'>
			<div className='CHBCabinSelected__container'>
				<div className='CHBCabinSelected__container--inner-textOnly'>
					<p>
						<h1>Você está no Chalé {camper && camper.idCabin}</h1>
						<br />
						Para entrar no seu chalé no Discord, entre no nosso servidor, vá até chat <b>#quiron</b> e digite !camp
						<br />
						<br />
						Não se esqueça de conferir nossas <br /> redes sociais:
						<br />
						<br />
						<a href='https://instagram.com/portalpercyjackson'>Instagram</a>
						<br />
						Conheça o nosso <a href='https://portalpercyjackson.com'>site</a>
						<br />
						Nossa <a href='https://facebook.com/portalpercyjackson'>página no Facebook</a>
						<br />
						Segue a gente no <a href='https://twitter.com/Portal_PJO'>Twitter</a>
					</p>
				</div>
			</div>
		</div>
	)
}
