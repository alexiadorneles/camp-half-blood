export enum ActivityType {
	QUIZ = 'Quiz',
	MISSION = 'Missão',
	WHO_SAID = 'Quem disse?',
	DYSLEXIA = 'Dislexia',
	PROPHECY = 'Profecy',
}

export enum AnswerType {
	OBJECTIVE = 'Objetiva',
	ESSAY = 'Dissertativa',
}

export interface Round {
	idRound: number
	idEdition: number
	dtBegin: Date
	dtEnd: Date | null
	blFinished: boolean
}

export interface RoundActivity {
	idRound: number
	idActivity: number
}

export enum Level {
	EASY,
	MEDIUM,
	HARD,
}

export interface Activity {
	idQuestion: number
	idActivity: number
	dsQuestion: string
	tpLevel: Level
	tpActivity: ActivityType
}

export interface ActivityOption {
	idActivityOption: number
	idActivity: number
	dsOption: string
	blCorrect: boolean
}

export interface EssayActivity {
	idQuestion: number
	idActivity: number
	dsQuestion: string
}

export interface CamperActivity {
	idCamperActivity: number
	idCamper: number
	idRound: number
	idActivity: number
	idActivityOption: number
	idEdition: number
	blCorrect: boolean
}

export type ActivityWithOptions = Activity & { options?: ActivityOption[] }

export interface ActivityConfig {
	tpActivity: ActivityType
	tpLevel: Level
	nrActivities: number
}

export interface RoundConfig {}

/*
		ROUND (linked to edition) -> RoundConfig (activity specified) -> 
*/
