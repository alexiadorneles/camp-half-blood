import { BrazilianState, Country } from './Places'

export interface Camper {
	idCamper: number
	idCabin: number
	dsName: string
	nrDiscordID: number
	dsInstagramNick: string
	dtBirth: Date
	tpState: BrazilianState
	tpCountry: Country
	// dsPronouns: string TODO: uncoment when screen is ready
	// dsDescription: string TODO: uncoment when screen is readys
	dsImageURL: string
	dsEmail: string
	idGoogle: string
	blRegisterCompleted: boolean
}
