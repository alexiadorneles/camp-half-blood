import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { SweetAlertOptions } from 'sweetalert2'
import { ActivityWithOptions, Round, ActivityOption, CamperActivity } from '../../../model/Activity'
import { CustomSwal } from '../../../providers/SwalProvider'
import { RoundService, CamperService } from '../../../services'
import { TimeUtils } from '../../../utils'
import { LocalStorageUtils } from '../../../utils/LocalStorageUtils'
import { CHBQuizDisplayer } from '../../generics'
import './Game.scss'

type RoundActivities = Round & { activities: ActivityWithOptions[] }

export interface GamePropTypes {
	roundService: RoundService
	camperService: CamperService
}

export function Game({ roundService, camperService }: GamePropTypes) {
	let currentOptionChosen: ActivityOption | null = null
	const [round, setRound] = useState<RoundActivities | null>(null)
	const [currentQuestion, setCurrentQuestion] = useState<(ActivityWithOptions & { hasSelected?: boolean }) | null>(null)
	const [questionNumber, setQuestionNumber] = useState(0)

	const idCamper = Number(LocalStorageUtils.getItem('idCamper'))

	useEffect(() => {
		async function loadCurrentRound(): Promise<void> {
			const round = await roundService.findByCamper(idCamper)
			setRound(round)
		}

		loadCurrentRound()
	}, [])

	useEffect(() => {
		if (round && questionNumber > round.activities.length) {
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

	function answerQuestion(): void {
		if (!currentOptionChosen) return
		const answer: Partial<CamperActivity> = {
			idActivity: currentOptionChosen!.idActivity,
			idActivityOption: currentOptionChosen!.idActivityOption,
			idEdition: (round && round.idEdition) || 0,
			blCorrect: currentOptionChosen!.blCorrect,
		}
		camperService.answerActivity(idCamper, answer)
	}

	function runNextQuestion() {
		answerQuestion()
		setQuestionNumber(questionNumber + 1)
		setCurrentQuestion(round && round.activities[questionNumber])
	}

	function onAnswerChosen(optionChosen: ActivityOption): void {
		currentOptionChosen = optionChosen
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
					Nessa rodada temos {round && round.activities.length} atividades que acontecem uma após a outra
					<br />
					Você deve demorar cerca de {TimeUtils.formatTimeFromSeconds(round ? round.activities.length * 40 : 0)} nessa
					tarefa. Apenas a inicie quando tiver tempo de concluir ela no momento
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
					<CHBQuizDisplayer quiz={currentQuestion!} onAnswerChosen={onAnswerChosen} />
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
			if (round && questionNumber >= round.activities.length) {
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

	const allQuestionsAnswered = round === null || questionNumber > round.activities.length

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
