export class DateUtils {
	private constructor() {}

	public static calculateAgeFromBirthDate(birthDate: Date | string) {
		if (typeof birthDate === 'string') {
			birthDate = this.convertStringToDate(birthDate)
		}

		const today = new Date()
		let age = today.getFullYear() - birthDate.getFullYear()
		const m = today.getMonth() - birthDate.getMonth()
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--
		}
		return age
	}

	private static convertStringToDate(date: string): Date {
		const dateWithoutTimezone = date.split('T').shift()!
		const dateWithoutTime = dateWithoutTimezone.split(' ').shift()!
		const [year, month, day] = dateWithoutTime.split('-').map(Number)
		return new Date(year, month, day)
	}
}
