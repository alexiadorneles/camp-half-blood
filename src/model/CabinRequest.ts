export enum Status {
	RESOLVED = 'resolved',
	UNRESOLVED = 'unresolved',
}

export interface CabinRequest {
	idCamper: number
	idEdition: number
	idFirstOptionCabin: number
	idSecondOptionCabin: number
	idThirdOptionCabin: number
	status: Status
}
