import { CamperActivity } from '../model/Activity'
import { Camper } from '../model/Camper'
import { BaseCRUDService } from './BaseCRUDService'
import { HttpService } from './HttpService'

export class CamperService extends BaseCRUDService<Camper> {
	constructor(httpService: HttpService) {
		super(httpService, '/campers')
	}

	public async setCabin(idCamper: number, idCabin: number): Promise<number> {
		return this.httpService.put(`/campers/${idCamper}/cabin`, { idCabin })
	}

	public async answerActivity(idCamper: number, answer: Partial<CamperActivity>): Promise<CamperActivity> {
		answer.idCamper = idCamper
		return this.httpService.post(`/campers/${idCamper}/answer`, answer)
	}
}
