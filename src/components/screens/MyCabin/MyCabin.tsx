import React, { useContext } from 'react'
import { GlobalContext } from '../../../providers/GlobalContext'
import { CHBCabinSelected } from '../../generics/CHBCabinSelected/CHBCabinSelected'
import { Camper } from '../../../model/Camper'

export function MyCabin() {
	const { camper } = useContext(GlobalContext)
	return <CHBCabinSelected camper={camper as Camper} />
}
