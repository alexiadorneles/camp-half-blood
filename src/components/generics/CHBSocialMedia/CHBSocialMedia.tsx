import { Button } from '@material-ui/core'
import React from 'react'
import { FaFacebook, FaGlobe, FaInstagram, FaYoutube, FaTwitter, FaDiscord } from 'react-icons/fa'
import './CHBSocialMedia.scss'

export function CHBSocialMedia() {
	return (
		<div className='CHBSocialMedia'>
			<a target='blank' className='CHBSocialMedia--anchor' href='https://instagram.com/portalpercyjackson'>
				<FaInstagram color='#C13584' className='CHBSocialMedia--socialIcon' />
			</a>
			<a target='blank' className='CHBSocialMedia--anchor' href='https://facebook.com/portalpercyjackson'>
				<FaFacebook color='#4267B2' className='CHBSocialMedia--socialIcon' />
			</a>
			<a target='blank' className='CHBSocialMedia--anchor' href='https://twitter.com/Portal_PJO'>
				<FaTwitter color='#1DA1F2' className='CHBSocialMedia--socialIcon' />
			</a>
			<a
				target='blank'
				className='CHBSocialMedia--anchor'
				href='https://www.youtube.com/channel/UCzQzFbh6XANIJgKSSj9DCtg'>
				<FaYoutube color='#FF0000' className='CHBSocialMedia--socialIcon' />
			</a>
			<a
				target='blank'
				className='CHBSocialMedia--anchor'
				href='https://www.youtube.com/channel/UCzQzFbh6XANIJgKSSj9DCtg'>
				<FaDiscord color='#7289DA' className='CHBSocialMedia--socialIcon' />
			</a>
			<br />
			<br />
			<span className='CHBSocialMedia--site'>
				Acesse nosso site para notícias e entretenimento sobre Percy Jackson:
				<a target='blank' className='CHBSocialMedia--site__anchor' href='https://portalpercyjackson.com'>
					<Button className='CHBSocialMedia--button' variant='outlined'>
						<FaGlobe color='#71c9ff' className='CHBSocialMedia--site__anchor--icon' />
						portalpercyjackson.com
					</Button>
				</a>
			</span>
		</div>
	)
}
