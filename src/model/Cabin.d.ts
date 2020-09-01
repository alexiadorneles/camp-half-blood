import { Divinity } from './Mythology'
import { Camper } from './Camper'

export interface Cabin {
	idCabin: number
	dsName: string
	tpDivinityRelated: Divinity
	dsImageURL: string
	campers?: Camper[]
}
