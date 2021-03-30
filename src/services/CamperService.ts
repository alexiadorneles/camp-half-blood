import { CamperActivity } from '../model/Activity'
import { Camper } from '../model/Camper'
import { CabinStatistic } from '../model/Statistic'
import { BaseCRUDService } from './BaseCRUDService'
import { HttpService } from './HttpService'

export class CamperService extends BaseCRUDService<Camper> {
	constructor(httpService: HttpService) {
		super(httpService, '/campers')
	}

	public retrieveStatisticByCabinAndDay(idCabin: number, date: string): Promise<CabinStatistic> {
		return this.httpService.get(`/campers/statistics/${idCabin}/${date}`)
	}

	public async login() {
		return this.httpService.get('/campers/login')
	}

	public async completeRegister(camper: Partial<Camper>): Promise<Camper[] | number> {
		return this.httpService.put('/campers/complete-register', camper)
	}

	public async getProfile(): Promise<Camper> {
		return this.httpService.get('/campers/profile')
	}

	public async setCabin(idCamper: number, idCabin: number): Promise<number> {
		return this.httpService.put(`/campers/${idCamper}/cabin`, { idCabin })
	}

	public async answerActivity(idCamper: number, answer: Partial<CamperActivity>): Promise<CamperActivity> {
		answer.idCamper = idCamper
		return this.httpService.post(`/campers/${idCamper}/answer`, answer)
	}

	public async answerTimedOut(
		idCamper: number,
		idActivity: number,
		idEdition: number,
		idRound: number,
	): Promise<CamperActivity> {
		return this.httpService.post(`/campers/${idCamper}/answer-timed-out`, { idActivity, idEdition, idRound })
	}

	public async activateInscription(data: { code: string }): Promise<void> {
		return this.httpService.post('/campers/activate-paid-inscription', data)
	}
}
