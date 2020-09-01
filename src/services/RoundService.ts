import { HttpService } from './HttpService'

export class RoundService {
	constructor(private httpService: HttpService) {}

	public finish(idRound: number) {
		return this.httpService.put(`/rounds/finish/${idRound}`)
	}

	public findByCamper(idCamper: number) {
		return this.httpService.get(`/rounds/campers/${idCamper}`)
	}
}
