import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { SweetAlertOptions } from 'sweetalert2'
import { ActivityType, AnswerType, Level, Round, ActivityWithOptions } from '../../../model/Activity'
import { Edition } from '../../../model/Edition'
import { CustomSwal } from '../../../providers/SwalProvider'
import { TimeUtils } from '../../../utils'
import { CHBQuizDisplayer } from '../../generics'
import './Game.scss'

const editionMock: Partial<Edition> = {
	idEdition: 1,
	dtBegin: null,
	nrCabinLimit: 25,
}

type RoundActivities = Round & { activities: ActivityWithOptions[] }
const roundMock: RoundActivities = {
	blFinished: false,
	dtBegin: new Date(),
	dtEnd: null,
	idEdition: editionMock.idEdition!,
	idRound: 1,
	activities: [
		{
			dsQuestion: 'Quem é o pai de Percy Jackson?',
			idActivity: 1,
			idQuestion: 1,
			tpLevel: Level.EASY,
			tpActivity: ActivityType.QUIZ,
			options: [
				{
					blCorrect: false,
					dsAlternative: 'Atena',
					idActivityOption: 1,
					idActivity: 1,
				},
				{
					blCorrect: false,
					dsAlternative: 'Hermes',
					idActivityOption: 2,
					idActivity: 1,
				},
				{
					blCorrect: true,
					dsAlternative: 'Poseidon',
					idActivityOption: 3,
					idActivity: 1,
				},
				{
					blCorrect: false,
					dsAlternative: 'Hades',
					idActivityOption: 4,
					idActivity: 1,
				},
			],
		},
		{
			dsQuestion: 'Quem dá Anaklusmos à Percy?',
			idActivity: 1,
			idQuestion: 2,
			tpLevel: Level.EASY,
			tpActivity: ActivityType.QUIZ,
			options: [
				{
					blCorrect: true,
					dsAlternative: 'Quíron',
					idActivityOption: 5,
					idActivity: 2,
				},
				{
					blCorrect: false,
					dsAlternative: 'Poseidon',
					idActivityOption: 6,
					idActivity: 2,
				},
				{
					blCorrect: true,
					dsAlternative: 'Sally',
					idActivityOption: 7,
					idActivity: 2,
				},
				{
					blCorrect: false,
					dsAlternative: 'Annabeth',
					idActivityOption: 8,
					idActivity: 2,
				},
			],
		},
	],
}

export function Game() {
	const [edition, setEdition] = useState(editionMock)
	const [round, setRound] = useState(roundMock)
	const [currentQuestion, setCurrentQuestion] = useState<(ActivityWithOptions & { hasSelected?: boolean }) | null>(
		null,
	)
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
					<small>{currentQuestion!.tpActivity}</small>
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
