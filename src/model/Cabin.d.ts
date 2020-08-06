import { Divinity } from './Mythology'

export interface Cabin {
	idCabin: string
	dsName: string
	tpDivinityRelated: Divinity
	dsImageURL: string
}

export interface CabinUserCount {
	nrCampers: number
}
