import { Button } from '@material-ui/core'
import React from 'react'
import { FaFacebook, FaGlobe, FaInstagram, FaYoutube, FaTwitter, FaDiscord } from 'react-icons/fa'
import './CHBSocialMedia.scss'

interface CHBSocialMdiaPropTypes {
	size?: 'large' | 'small'
}

export function CHBSocialMedia({ size }: CHBSocialMdiaPropTypes) {
	const getClassName = (name: string) => (size && size === 'small' ? `${name}__${size}` : name)

	return (
		<div className="CHBSocialMedia">
			<a
				target="blank"
				className={getClassName('CHBSocialMedia--anchor')}
				href="https://instagram.com/portalpercyjackson"
			>
				<FaInstagram color="#C13584" className={getClassName('CHBSocialMedia--socialIcon')} />
			</a>
			<a
				target="blank"
				className={getClassName('CHBSocialMedia--anchor')}
				href="https://facebook.com/portalpercyjackson"
			>
				<FaFacebook color="#4267B2" className={getClassName('CHBSocialMedia--socialIcon')} />
			</a>
			<a target="blank" className={getClassName('CHBSocialMedia--anchor')} href="https://twitter.com/Portal_PJO">
				<FaTwitter color="#1DA1F2" className={getClassName('CHBSocialMedia--socialIcon')} />
			</a>
			<a
				target="blank"
				className={getClassName('CHBSocialMedia--anchor')}
				href="https://www.youtube.com/channel/UCzQzFbh6XANIJgKSSj9DCtg"
			>
				<FaYoutube color="#FF0000" className={getClassName('CHBSocialMedia--socialIcon')} />
			</a>
			<a target="blank" className={getClassName('CHBSocialMedia--anchor')} href="https://discord.com/invite/9WZD77C">
				<FaDiscord color="#7289DA" className={getClassName('CHBSocialMedia--socialIcon')} />
			</a>
			{size === 'small' && (
				<a target="blank" className={getClassName('CHBSocialMedia--anchor')} href="https://portalpercyjackson.com">
					<FaGlobe color="#71c9ff" className={getClassName('animated CHBSocialMedia--socialIcon')} />
				</a>
			)}
			<br />
			<br />
			{size !== 'small' && (
				<span className="CHBSocialMedia--site">
					Acesse nosso site para notícias e entretenimento sobre Percy Jackson:
					<a target="blank" className="CHBSocialMedia--site__anchor" href="https://portalpercyjackson.com">
						<Button className="CHBSocialMedia--button" variant="outlined">
							<FaGlobe color="#71c9ff" className="CHBSocialMedia--site__anchor--icon" />
							portalpercyjackson.com
						</Button>
					</a>
				</span>
			)}
		</div>
	)
}
