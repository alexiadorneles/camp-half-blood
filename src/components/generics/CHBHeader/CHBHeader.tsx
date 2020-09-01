import { AppBar, Button, Toolbar } from '@material-ui/core'
import React from 'react'
import { CHBLogo } from '../CHBLogo/CHBLogo'
import './CHBHeader.scss'
import { LocalStorageUtils } from '../../../utils'
import { useHistory } from 'react-router'

export function CHBHeader() {
	const history = useHistory()
	function logout() {
		LocalStorageUtils.setItem('idCamper', null)
		LocalStorageUtils.setToken(null!)
		history.push('/')
	}

	return (
		<AppBar className='CHBHeader' color='secondary' position='static'>
			<Toolbar>
				<div className='CHBHeader__title'>
					<CHBLogo isPrimaryColor />
					<p className='CHBHeader__title--text'> ACAMPAMENTO </p>
				</div>
				<Button onClick={logout} color='primary'>
					Sair
				</Button>
			</Toolbar>
		</AppBar>
	)
}
