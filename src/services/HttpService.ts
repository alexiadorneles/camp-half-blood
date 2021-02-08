import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { History } from 'history'
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

const BASE_URL = process.env.REACT_APP_BACKEND_URL

export enum HTTPMethod {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	DELETE = 'delete',
}

export class HttpService {
	private axios: AxiosInstance

	constructor(private history: History) {
		this.axios = this.generateAxiosInstance()
	}

	public async get(url: string) {
		return this.handleRequest(() => this.axios.get(`${BASE_URL}${url}`, this.getConfig()))
	}

	public async post(url: string, data = {}, config = this.getConfig()) {
		return this.handleRequest(() => this.axios.post(`${BASE_URL}${url}`, data, config))
	}

	public async put(url: string, data = {}) {
		return this.handleRequest(() => this.axios.put(`${BASE_URL}${url}`, data, this.getConfig()))
	}

	public async delete(url: string) {
		return this.handleRequest(() => this.axios.delete(`${BASE_URL}${url}`, this.getConfig()))
	}

	private setHeader(header = {}) {
		CONFIG.headers = { ...CONTENT_TYPE, ...header }
	}

	getConfig() {
		this.setHeader({
			authorization: LocalStorageUtils.getToken(),
		})

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
				return Promise.reject(error)
			},
		)
	}

	private async handleRequest(fn: Function) {
		try {
			const response = await fn()
			if (_.get(response, 'data.token')) this.saveTokenAndRemoveIt(response)
			return response && response.data
		} catch (err) {
			this.handleError(err)
			throw err
		}
	}

	private handleError(err: any) {
		const isTokenError =
			_.get(err, 'response.data.error.name') === 'JsonWebTokenError' ||
			_.get(err, 'response.data.error.name') === 'TokenExpiredError'
		if (isTokenError) {
			LocalStorageUtils.setToken(null)
			this.history!.push('/')
			return
		}
		return CustomSwal.fire({
			title: 'Erro',
			text: _.get(err, 'response.data.error', 'Um erro ocorreu. Tente novamente mais tarde'),
			icon: 'error',
		})
	}

	private saveTokenAndRemoveIt(response: any) {
		LocalStorageUtils.setToken(response.data.token)
		delete response.data.token
		if (response.data.camper) {
			LocalStorageUtils.setItem('idCamper', response.data.camper.idCamper)
		}
	}
}
