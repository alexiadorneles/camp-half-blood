export interface Edition {
	idEdition: string
	dtBegin: Date
	dtEnd: Date
	dsName: string
	nrParticipants: number
  nrCabinLimit: number
  
  // TODO: save winner, find a way to create a history
  // about which cabin a camper was, it's data from the game
}
