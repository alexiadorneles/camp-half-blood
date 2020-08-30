const PREFIX = 'CAMP_PPJ_'
const USER_AUTH_TOKEN = 'USER_AUTH_TOKEN'

export class LocalStorageUtils {
	private constructor() {}

	public static getItem(key: string): string | null {
		return localStorage.getItem(PREFIX + key)
	}

	public static setItem(key: string, value: any): void {
		if (value === null) {
			return localStorage.removeItem(PREFIX + key)
		}
		localStorage.setItem(PREFIX + key, typeof value === 'string' ? value : JSON.stringify(value))
	}

	public static getToken(): string {
		return this.getItem(USER_AUTH_TOKEN)!
	}

	public static setToken(token: string | null): void {
		this.setItem(USER_AUTH_TOKEN, token ? `Bearer ${token}` : null)
	}
}
