import React from 'react'
import { FaDiscord, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaGlobe } from 'react-icons/fa'
import { Camper } from '../../../model/Camper'
import './CHBCabinSelected.scss'
import { Button } from '@material-ui/core'

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
						<div className='CHBCabinSelected__container--inner__social'></div>
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
						<br />
						<br />
						<span className='CHBCabinSelected__container--site'>
							Acesse nosso site para notícias e entretenimento sobre Percy Jackson:
							<a
								target='blank'
								className='CHBCabinSelected__container--site__anchor'
								href='https://portalpercyjackson.com'>
								<Button className='CHBCabinSelected__container--button' variant='outlined'>
									<FaGlobe color='#71c9ff' className='CHBCabinSelected__container--site__anchor--icon' />
									portalpercyjackson.com
								</Button>
							</a>
						</span>
					</p>
				</div>
			</div>
		</div>
	)
}
