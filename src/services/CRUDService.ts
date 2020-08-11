export interface CRUDService<T> {
	create(obj: T): Promise<T>
	findOne(key: number): Promise<T>
	findAll(): Promise<Array<T>>
	update(key: number, obj: T): Promise<T>
	delete(key: number): Promise<boolean>
}
