export class TimeUtils {
	private constructor() {}

	public static formatTimeFromSeconds(seconds: number) {
		const minutes = Math.floor(seconds / 60)
		const secondsLeft = seconds % 60
		if (minutes === 0) {
			return `${secondsLeft} segundos`
		}

		if (secondsLeft === 0) {
			return `${minutes} minutos`
		}

		return `${minutes} minutos e ${secondsLeft} segundos`
	}
}
