import React, { useContext } from 'react'
import { GlobalContext } from '../../../providers/GlobalContext'

export function MyCabin() {
	const { camper } = useContext(GlobalContext)
	return (
		<div className='MyCabin'>
			<br />
			<br />
			<h1>Você está no Chalé {camper && camper.idCabin}</h1>
		</div>
	)
}
