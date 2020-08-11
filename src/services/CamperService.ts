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
}
