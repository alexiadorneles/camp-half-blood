import { CamperActivity } from '../model/Activity'
import { Camper } from '../model/Camper'
import { BaseCRUDService } from './BaseCRUDService'
import { HttpService } from './HttpService'

export class CamperService extends BaseCRUDService<Camper> {
	constructor(httpService: HttpService) {
		super(httpService, '/campers')
	}

	public async completeRegister(camper: Partial<Camper>): Promise<Camper[] | number> {
		return this.httpService.put('/campers/complete-register', camper)
	}

	public async getProfile(): Promise<Camper> {
		return this.httpService.get('/campers/profile')
	}

	public async create(camper: Partial<Camper>): Promise<Camper> {
		const data = ((await super.create(camper)) as any) as { camper: Camper }
		return data.camper
	}

	public async setCabin(idCamper: number, idCabin: number): Promise<number> {
		return this.httpService.put(`/campers/${idCamper}/cabin`, { idCabin })
	}

	public async answerActivity(idCamper: number, answer: Partial<CamperActivity>): Promise<CamperActivity> {
		answer.idCamper = idCamper
		return this.httpService.post(`/campers/${idCamper}/answer`, answer)
	}

	public async answerTimedOut(idCamper: number, idActivity: number, idEdition: number): Promise<CamperActivity> {
		return this.httpService.post(`/campers/${idCamper}/answer-timed-out`, { idActivity, idEdition })
	}
}
