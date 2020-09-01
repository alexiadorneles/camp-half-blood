import { BaseCRUDService } from './BaseCRUDService'
import { Edition } from '../model/Edition'
import { HttpService } from './HttpService'

export class EditionService extends BaseCRUDService<Edition> {
	constructor(httpService: HttpService) {
		super(httpService, '/editions')
	}

	public findCurrent() {
		return this.httpService.get('/editions/current')
	}
}
