import { Button } from '@material-ui/core'
import React from 'react'
import Swal from 'sweetalert2'
import './Game.scss'

export function Game() {
	function startGame() {
		console.log('HERE')
	}

	function renderPopupInformation(): void {
		Swal.fire({
			title: '<strong>Instruções</u></strong>',
			icon: 'info',
			html: `Por favor, leia até o fim. Você está prestes a começar uma <b>rodada dos jogos</b>.
             As perguntas todas possuem <b>40 segundos</b> para serem respondidas.
             Se você sair dessa tela depois de clicar em iniciar, <b>você perde a rodada</b>.
             Boa sorte!`,
			showConfirmButton: true,
			focusConfirm: false,
			confirmButtonText: `Entendi e quero começar!`,
			onAfterClose: startGame,
		})
	}

	return (
		<div className='Game'>
			<p>JOGOS DISPONÍVEIS</p>
			<Button onClick={renderPopupInformation} variant='outlined' color='secondary'>
				Começar
			</Button>
		</div>
	)
}
