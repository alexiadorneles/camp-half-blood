import React, { useContext } from 'react'
import { Camper } from '../../../model/Camper'
import { Edition } from '../../../model/Edition'
import { GlobalContext } from '../../../providers/GlobalContext'
import { EditionProvider } from '../../EditionProvider'
import { CHBCabinSelected } from '../../generics'

export function MyCabin() {
	const { camper, edition } = useContext(GlobalContext)
	if (edition && edition.dtBegin) {
		return <CHBCabinSelected camper={camper as Camper} />
	}

	return EditionProvider(edition as Edition)
}
