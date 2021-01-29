import React from 'react'
import { FaDiscord, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
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
					<h1>Você está no Chalé {camper && camper.idCabin}</h1>
					<p>
						<br />
						Para entrar no seu chalé no Discord, entre no nosso servidor, vá até chat <b>#quiron</b> e digite !camp
						<br />
						<br />
						Não se esqueça de conferir nossas <br /> redes sociais:
						<br />
						<br />
						<a
							target='blank'
							className='CHBCabinSelected__container--anchor'
							href='https://instagram.com/portalpercyjackson'>
							<FaInstagram color='#C13584' className='CHBCabinSelected__container--socialIcon' />
						</a>
						<a
							target='blank'
							className='CHBCabinSelected__container--anchor'
							href='https://facebook.com/portalpercyjackson'>
							<FaFacebook color='#4267B2' className='CHBCabinSelected__container--socialIcon' />
						</a>
						<a target='blank' className='CHBCabinSelected__container--anchor' href='https://twitter.com/Portal_PJO'>
							<FaTwitter color='#1DA1F2' className='CHBCabinSelected__container--socialIcon' />
						</a>
						<a
							target='blank'
							className='CHBCabinSelected__container--anchor'
							href='https://www.youtube.com/channel/UCzQzFbh6XANIJgKSSj9DCtg'>
							<FaYoutube color='#FF0000' className='CHBCabinSelected__container--socialIcon' />
						</a>
						<a
							target='blank'
							className='CHBCabinSelected__container--anchor'
							href='https://www.youtube.com/channel/UCzQzFbh6XANIJgKSSj9DCtg'>
							<FaDiscord color='#7289DA' className='CHBCabinSelected__container--socialIcon' />
						</a>
					</p>
				</div>
			</div>
		</div>
	)
}
