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
	dsAlternative: string
	blCorrect: boolean
}

export interface EssayActivity {
	idQuestion: number
	idActivity: number
	dsQuestion: string
}

export interface CamperActivity {
	idCamper: number
	idActivity: number
	blCorrect: boolean
}

export type ActivityWithAnswers = Activity & { options?: ActivityOption[] }
