export interface Edition {
	idEdition: number
	dtBegin: Date | null
	dtEnd: Date | null
	dsName: string
	nrParticipants: number
	nrCabinLimit: number

	// TODO: save winner, find a way to create a history
	// about which cabin a camper was, it's data from the game
}
