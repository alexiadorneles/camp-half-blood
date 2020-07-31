import { BrazilianState, Country } from './Places'

export interface Camper {
	idCamper: string
	idCabin: string
	dsName: string
	nrDiscordID: number
	dsInstagramNick: string
	dtBirth: Date
	tpState: BrazilianState
	tpCountry: Country
	dsPronouns: string
	dsDescription: string
	dsImageURL: string
}
