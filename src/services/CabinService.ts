import { Cabin } from '../model/Cabin'
import { BaseCRUDService } from './BaseCRUDService'
import { HttpService } from './HttpService'

export class CabinService extends BaseCRUDService<Cabin> {
	constructor(httpService: HttpService) {
		super(httpService, '/cabins')
	}
}
