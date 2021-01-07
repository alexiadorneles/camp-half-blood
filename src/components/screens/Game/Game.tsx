import { Button } from '@material-ui/core'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { SweetAlertOptions } from 'sweetalert2'
import { ActivityOption, ActivityWithOptions, CamperActivity, Round } from '../../../model/Activity'
import { CustomSwal } from '../../../providers/SwalProvider'
import { CamperService, RoundService } from '../../../services'
import { TimeUtils } from '../../../utils'
import { LocalStorageUtils } from '../../../utils/LocalStorageUtils'
import { CHBQuizDisplayer } from '../../generics'
import './Game.scss'

let scopeRound: any = null
let scopeChanged: boolean = false
let started: boolean = false
let idActivity: number | null = null

const storeRound = (roundParam: any) => {
	scopeRound = roundParam
}

const storeActivity = (idActivityParam: any) => {
	idActivity = idActivityParam
}

type RoundActivities = Round & { activities: ActivityWithOptions[] }

export interface GamePropTypes {
	roundService: RoundService
	camperService: CamperService
}

export function Game({ roundService, camperService }: GamePropTypes) {
	let currentOptionChosen: ActivityOption | null = null
	const [round, setRound] = useState<RoundActivities | null>(null)
	const [currentQuestion, setCurrentQuestion] = useState<
		| (ActivityWithOptions & {
				hasSelected?: boolean
		  })
		| null
	>(null)
	const [questionNumber, setQuestionNumber] = useState(0)

	const idCamper = Number(LocalStorageUtils.getItem('idCamper'))

	useEffect(() => {
		async function loadCurrentRound(): Promise<void> {
			const round = await roundService.findByCamper(idCamper)
			setRound(round)
			storeRound(round)
			return round
		}

		setInterval(checkFocus, 8000)

		function checkFocus() {
			if (!document.hasFocus() && scopeRound && !scopeChanged && started) {
				scopeChanged = true
				CustomSwal.close()
				roundService.finishCurrentActivity(idActivity!)
				CustomSwal.fire({
					icon: 'info',
					title: 'Você saiu da tela',
					text: 'Você não poderá responder a esta pergunta, mas ainda pode responder as próximas',
				})
				setTimeout(() => window.location.reload(), 5000)
			}
		}

		loadCurrentRound()
	}, [])

	useEffect(() => {
		if (round && questionNumber > round.activities.length) {
			CustomSwal.close()
			finishRound()
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

	function finishRound(): void {
		roundService.finish(round!.idRound)
	}

	function answerQuestion(): void {
		if (!currentOptionChosen) return
		const answer: Partial<CamperActivity> = {
			idRound: round!.idRound,
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
		storeActivity(_.get(round, 'round.activities[questionNumber].idActivity', null))
	}

	function onAnswerChosen(optionChosen: ActivityOption): void {
		currentOptionChosen = optionChosen
	}

	function renderPopupInformation(): void {
		CustomSwal.fire({
			title: <strong>Instruções</strong>,
			icon: 'info',
			html: `Por favor, leia até o fim. Você está prestes a começar uma rodada dos jogos.
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
			camperService.answerTimedOut(idCamper, currentQuestion!.idActivity, round!.idEdition, round!.idRound)
			if (round && questionNumber >= round.activities.length) {
				CustomSwal.close()
				setQuestionNumber(questionNumber + 100)
			}
			runNextQuestion()
		}

		return null
	}

	function callStart() {
		started = true
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
