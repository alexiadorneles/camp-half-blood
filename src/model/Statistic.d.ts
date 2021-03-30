import { Camper } from './Camper'

export interface CabinStatistic {
	answered: Statistic[]
	notAnswered: Camper[]
}

export interface Statistic {
	camper: Camper
	corrects: number
	dsCorrectPercentage: string
	nrCorrectPercentage: number
}
