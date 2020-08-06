import { Divinity } from './Mythology'
import { Camper } from './Camper'

export interface Cabin {
	idCabin: string
	dsName: string
	tpDivinityRelated: Divinity
	dsImageURL: string
}

export interface CabinCampers {
	campers: Camper[]
}
