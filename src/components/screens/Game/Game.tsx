import { Button } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { SweetAlertOptions } from 'sweetalert2'
import {
	Level,
	ObjectiveAnswer,
	ObjectiveQuestion,
	Round,
	QuestionsWithAnswers,
	QuestionWithAnswersAndActivity,
	ActivityType,
	AnswerType,
	BaseActivity,
} from '../../../model/Activity'
import { Edition } from '../../../model/Edicao'
import { CustomSwal } from '../../../providers/SwalProvider'
import './Game.scss'
import { CHBQuizDisplayer } from '../../generics'
import { TimeUtils } from '../../../utils'

const editionMock: Partial<Edition> = {
	idEdition: '1',
	dtBegin: null,
	nrCabinLimit: 25,
}

type RoundActivities = Round & { activities: QuestionWithAnswersAndActivity[] }
const quizActivity: BaseActivity = {
	idActivity: '1',
	tpType: ActivityType.QUIZ,
	tpAnswer: AnswerType.OBJECTIVE,
}
const roundMock: RoundActivities = {
	blFinished: false,
	dtBegin: new Date(),
	dtEnd: null,
	idEdition: editionMock.idEdition!,
	idRound: '1',
	activities: [
		{
			dsQuestion: 'Quem é o pai de Percy Jackson?',
			idActivity: '1',
			idQuestion: '1',
			tpLevel: Level.EASY,
			activity: quizActivity,
			options: [
				{
					blCorrect: false,
					dsAlternative: 'Atena',
					idAlternative: '1',
					idQuestion: '1',
				},
				{
					blCorrect: false,
					dsAlternative: 'Hermes',
					idAlternative: '2',
					idQuestion: '1',
				},
				{
					blCorrect: true,
					dsAlternative: 'Poseidon',
					idAlternative: '3',
					idQuestion: '1',
				},
				{
					blCorrect: false,
					dsAlternative: 'Hades',
					idAlternative: '4',
					idQuestion: '1',
				},
			],
		},
		{
			dsQuestion: 'Quem dá Anaklusmos à Percy?',
			idActivity: '1',
			idQuestion: '2',
			tpLevel: Level.EASY,
			activity: quizActivity,
			options: [
				{
					blCorrect: true,
					dsAlternative: 'Quíron',
					idAlternative: '5',
					idQuestion: '2',
				},
				{
					blCorrect: false,
					dsAlternative: 'Poseidon',
					idAlternative: '6',
					idQuestion: '2',
				},
				{
					blCorrect: true,
					dsAlternative: 'Sally',
					idAlternative: '7',
					idQuestion: '2',
				},
				{
					blCorrect: false,
					dsAlternative: 'Annabeth',
					idAlternative: '8',
					idQuestion: '2',
				},
			],
		},
	],
}

export function Game() {
	const [edition, setEdition] = useState(editionMock)
	const [round, setRound] = useState(roundMock)
	const [currentQuestion, setCurrentQuestion] = useState<
		(QuestionWithAnswersAndActivity & { hasSelected?: boolean }) | null
	>(null)
	const [questionNumber, setQuestionNumber] = useState(0)

	useEffect(() => {
		if (questionNumber > round.activities.length) {
			CustomSwal.close()
			setTimeout(() => {
				CustomSwal.fire({
					title: 'Pronto!',
					icon: 'success',
					text:
						'Você concluiu todas as questões desse round! Agora é só aguardar os resultados do ranking quando todos os campistas concluírem',
				})
			})
		}
	}, [questionNumber])

	function runNextQuestion() {
		setQuestionNumber(questionNumber + 1)
		setCurrentQuestion(round.activities[questionNumber])
	}

	function renderPopupInformation(): void {
		CustomSwal.fire({
			title: <strong>Instruções</strong>,
			icon: 'info',
			html: `Por favor, leia até o fim. Você está prestes a começar uma <b>rodada dos jogos</b>.
             As perguntas todas possuem <b>40 segundos</b> para serem respondidas.
             Se você sair dessa tela depois de clicar em iniciar, <b>você perde a rodada</b>.
             Boa sorte!`,
			showConfirmButton: true,
			focusConfirm: false,
			confirmButtonText: `Entendi e quero começar!`,
			onAfterClose: runNextQuestion,
		})
	}

	function renderRoundAvailable() {
		return (
			<>
				<p>RODADA DISPONÍVEIS</p>
				<p>
					Nessa rodada temos {round.activities.length} atividades que acontecem uma após a outra
					<br />
					Você deve demorar cerca de {TimeUtils.formatTimeFromSeconds(round.activities.length * 40)} nessa tarefa.
					Apenas a inicie quando tiver tempo de concluir ela no momento
				</p>
				<Button size='large' onClick={renderPopupInformation} variant='outlined' color='secondary'>
					Começar
				</Button>
			</>
		)
	}

	async function renderQuestion() {
		let timerInterval: NodeJS.Timeout

		const swalArgs: SweetAlertOptions = {
			showConfirmButton: false,
			footer: (
				<Button onClick={runNextQuestion} id='nextQuestion' disabled={false} size='large' variant='outlined'>
					Próxima
				</Button>
			),
			allowEscapeKey: false,
			allowOutsideClick: false,
			timer: 40000,
			timerProgressBar: true,
			title: (
				<div className='Game__dialog--titleContainer'>
					<p>Atividade {questionNumber}</p>
					<small>{currentQuestion!.activity.tpType}</small>
				</div>
			),
			html: (
				<div>
					<CHBQuizDisplayer quiz={currentQuestion!} onAnswerChosen={() => {}} />
					<span className='Game__dialog--timer'>
						Você tem <b>40</b> segundos para responder.
					</span>
				</div>
			),
			onBeforeOpen: () => {
				timerInterval = setInterval(() => {
					const content = CustomSwal.getContent()
					if (content) {
						const b = content.querySelector('b')
						if (b) {
							const milisecods = CustomSwal.getTimerLeft()!
							const seconds = milisecods / 1000
							b.textContent = seconds.toFixed(0)
						}
					}
				}, 1000)
			},
			onClose: () => {
				clearInterval(timerInterval)
			},
		}

		const result = await CustomSwal.fire(swalArgs)
		if (result.dismiss === CustomSwal.DismissReason.timer) {
			console.log('I was closed by the timer')
			if (questionNumber >= round.activities.length) {
				CustomSwal.close()
				setQuestionNumber(questionNumber + 100)
			}
			runNextQuestion()
		}

		return null
	}

	function callStart() {
		renderQuestion()
		return null
	}

	const allQuestionsAnswered = questionNumber > round.activities.length

	return (
		<div className='Game'>
			<div className='Game__container'>
				<div className='Game__container--inner'>
					{!currentQuestion && !allQuestionsAnswered && renderRoundAvailable()}
					{currentQuestion && callStart()}
					{allQuestionsAnswered && <p>Nenhum round disponível ainda. Cheque o cronograma para as próximas datas</p>}
				</div>
			</div>
		</div>
	)
}
