import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import _ from 'lodash'
import { CHBLoader } from '../components/generics'
import { CustomSwal } from '../providers/SwalProvider'
import { LocalStorageUtils } from '../utils/LocalStorageUtils'

const CONTENT_TYPE = { 'Content-Type': 'application/json' }
const CONFIG: Partial<AxiosRequestConfig> = {
	headers: {
		...CONTENT_TYPE,
	},
}

const BASE_URL = 'http://localhost:3333'

export enum HTTPMethod {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	DELETE = 'delete',
}

export class HttpService {
	private axios: AxiosInstance

	constructor() {
		this.axios = this.generateAxiosInstance()
	}

	public async get(url: string) {
		const response = await this.axios.get(`${BASE_URL}${url}`, this.getConfig())
		if (_.get(response, 'data.token')) {
			LocalStorageUtils.setToken(response.data.token)
			delete response.data.token
		}
		return response && response.data
	}

	public async post(url: string, data = {}, config = this.getConfig()) {
		const response = await this.axios.post(`${BASE_URL}${url}`, data, config)
		if (_.get(response, 'data.token')) {
			LocalStorageUtils.setToken(response.data.token)
			delete response.data.token
		}
		return response && response.data
	}

	public async put(url: string, data = {}) {
		const response = await this.axios.put(`${BASE_URL}${url}`, data, this.getConfig())
		return response && response.data
	}

	public async delete(url: string) {
		const response = await this.axios.delete(`${BASE_URL}${url}`, this.getConfig())
		return response && response.data
	}

	async health() {
		return this.get('health')
	}

	protected setHeader(header = {}) {
		CONFIG.headers = { ...CONTENT_TYPE, ...header }
	}

	getConfig() {
		if (!CONFIG.headers.authorization) {
			console.log(LocalStorageUtils.getToken())
			this.setHeader({
				authorization: LocalStorageUtils.getToken(),
			})
		}

		return CONFIG
	}

	private generateAxiosInstance() {
		const instance = axios.create()
		this.showLoaderInRequest(instance)
		this.hideLoaderInResponse(instance)
		return instance
	}

	private showLoaderInRequest(instance: AxiosInstance): void {
		instance.interceptors.request.use(config => {
			CHBLoader.show()
			return config
		}, Promise.reject)
	}

	private hideLoaderInResponse(instance: AxiosInstance): void {
		instance.interceptors.response.use(
			response => {
				CHBLoader.hide()
				return response
			},
			error => {
				CHBLoader.hide()
				CustomSwal.fire({ title: 'Erro', text: 'Um erro ocorreu. Tente novamente mais tarde', icon: 'error' })
				Promise.reject(error)
			},
		)
	}
}
