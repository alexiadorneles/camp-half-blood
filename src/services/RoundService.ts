import { HttpService } from './HttpService'

export class RoundService {
	constructor(private httpService: HttpService) {}

	public findByCamper(idCamper: number) {
		return this.httpService.get(`/rounds/${idCamper}`)
	}
}
