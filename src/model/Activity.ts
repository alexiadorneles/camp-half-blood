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
	idRound: string
	idEdition: string
	dtBegin: Date
	dtEnd: Date | null
	blFinished: boolean
}

export interface RoundActivity {
	idRound: string
	idActivity: string
}

export interface BaseActivity {
	idActivity: string
	tpType: ActivityType
	tpAnswer: AnswerType
}

export enum Level {
	EASY,
	MEDIUM,
	HARD,
}

export interface ObjectiveQuestion {
	idQuestion: string
	idActivity: string
	dsQuestion: string
	tpLevel: Level
}

export interface ObjectiveAnswer {
	idAlternative: string
	idQuestion: string
	dsAlternative: string
	blCorrect: boolean
}

export interface EssayActivity {
	idQuestion: string
	idActivity: string
	dsQuestion: string
}

export interface CamperActivity {
	idCamper: string
	idActivity: string
	blCorrect: boolean
}

export type QuestionsWithAnswers = ObjectiveQuestion & { options?: ObjectiveAnswer[] }
export type QuestionWithAnswersAndActivity = QuestionsWithAnswers & { activity: BaseActivity }
