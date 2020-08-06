import React from 'react'
import { Edition } from '../../../model/Edicao'

const edition: Partial<Edition> = {
	dtBegin: new Date(),
}

export function Cabin() {
	function renderCabinChoiceBeforeGameStarts() {
		return <div className='Cabin'></div>
	}

	return (
		<div>
			<h2 style={{ margin: 0, padding: 20 }}>HOME</h2>
		</div>
	)
}
