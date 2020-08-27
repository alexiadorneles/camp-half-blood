import { CRUDService } from './CRUDService'
import { HttpService } from './HttpService'

export class BaseCRUDService<T> implements CRUDService<T> {
	constructor(protected httpService: HttpService, private controllerPrefix: string) {}

	public create(obj: Partial<T>): Promise<T> {
		return this.httpService.post(`${this.controllerPrefix}`, obj)
	}

	public findOne(key: number): Promise<T> {
		return this.httpService.get(`${this.controllerPrefix}/${key}`)
	}

	public findAll(): Promise<T[]> {
		return this.httpService.get(`${this.controllerPrefix}`)
	}

	public update(key: number, obj: T): Promise<T> {
		return this.httpService.put(`${this.controllerPrefix}/${key}`, obj)
	}

	public delete(key: number): Promise<boolean> {
		return this.httpService.delete(`${this.controllerPrefix}/${key}`)
	}
}
