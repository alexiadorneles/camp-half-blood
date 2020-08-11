import { BaseCRUDService } from './BaseCRUDService'
import { CabinRequest } from '../model/CabinRequest'
import { HttpService } from './HttpService'

export class CabinRequestService extends BaseCRUDService<CabinRequest> {
	constructor(httpService: HttpService) {
		super(httpService, '/cabin-requests')
	}
}
