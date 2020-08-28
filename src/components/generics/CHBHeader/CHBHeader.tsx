import { AppBar, Button, Toolbar } from '@material-ui/core'
import React from 'react'
import { CHBLogo } from '../CHBLogo/CHBLogo'
import './CHBHeader.scss'

export function CHBHeader() {
	return (
		<AppBar className='CHBHeader' color='secondary' position='static'>
			<Toolbar>
				<div className='CHBHeader__title'>
					<CHBLogo isPrimaryColor />
					<p className='CHBHeader__title--text'> ACAMPAMENTO </p>
				</div>
				<Button color='primary'>Sair</Button>
			</Toolbar>
		</AppBar>
	)
}
