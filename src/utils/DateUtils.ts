export class DateUtils {
	private constructor() {}

	public static calculateAgeFromBirthDate(birthDate: Date | string) {
		if (typeof birthDate === 'string') {
			birthDate = new Date(birthDate.split('T').shift()!)
		}
		const today = new Date()
		let age = today.getFullYear() - birthDate.getFullYear()
		const m = today.getMonth() - birthDate.getMonth()
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--
		}
		return age
	}
}
