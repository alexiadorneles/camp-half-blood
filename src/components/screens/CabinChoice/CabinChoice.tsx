import { Avatar, Button, Fab } from '@material-ui/core'
import { Done } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { Cabin } from '../../../model/Cabin'
import { CabinRequest, Status } from '../../../model/CabinRequest'
import { Camper } from '../../../model/Camper'
import { Edition } from '../../../model/Edition'
import { CabinRequestService, CamperService, CRUDService, EditionService } from '../../../services'
import { LocalStorageUtils } from '../../../utils/LocalStorageUtils'
import './CabinChoice.scss'

export interface CabinChoicePropTypes {
	editionService: EditionService
	cabinService: CRUDService<Cabin>
	cabinRequestService: CabinRequestService
	camperService: CamperService
}

export function CabinChoice({
	editionService,
	cabinService,
	cabinRequestService,
	camperService,
}: CabinChoicePropTypes) {
	const [cabins, setCabins] = useState<Cabin[]>([])
	const [edition, setEdition] = useState<Edition | null>(null)
	const [option, setOption] = useState(1)
	const [selectedCabinsIds, setSelectedCabinsIds] = useState<number[]>([])
	const [singleCabinSelected, setSingleCabinSelected] = useState<Cabin | null>(null)
	const [userRequestedCabins, setUserRequestedCabins] = useState(false)
	const [camper, setCamper] = useState<Camper | null>(null)

	const idCamper = Number(LocalStorageUtils.getItem('idCamper'))

	useEffect(() => {
		async function getEdition() {
			const edition = await editionService.findCurrent()
			setEdition(edition)
		}

		getEdition()
	}, [])

	useEffect(() => {
		async function getCabins() {
			const cabins = (await cabinService.findAll()) as Cabin[]
			setCabins(cabins)
		}

		getCabins()
	}, [])

	useEffect(() => {
		async function checkRequest() {
			const value = await cabinRequestService.checkUserHasRequests(idCamper)
			setUserRequestedCabins(value)
		}

		checkRequest()
	}, [])

	async function getCamper() {
		const result = await camperService.getProfile()
		setCamper(result)
	}

	useEffect(() => {
		getCamper()
	}, [])

	function selectSingleCabin(cabin: Cabin): void {
		setSingleCabinSelected(cabin)
	}

	function selectCabin(cabin: Cabin): void {
		setOption(option + 1)
		setSelectedCabinsIds(selected => [...selected, cabin.idCabin])
	}

	function unselectCabin(cabin: Cabin): void {
		setOption(option - 1)
		const newValue = selectedCabinsIds.filter(id => id !== cabin.idCabin)
		setSelectedCabinsIds([...newValue])
	}

	async function setCabinToCamper() {
		if (edition!.dtBegin && singleCabinSelected) {
			await camperService.setCabin(idCamper, singleCabinSelected.idCabin)
			getCamper()
		}
	}

	async function saveCabinRequest() {
		const cabinRequest: CabinRequest = {
			idCamper,
			idEdition: edition!.idEdition,
			idFirstOptionCabin: selectedCabinsIds[0],
			idSecondOptionCabin: selectedCabinsIds[1],
			idThirdOptionCabin: selectedCabinsIds[2],
			status: Status.UNRESOLVED,
		}
		await cabinRequestService.create(cabinRequest)
		setUserRequestedCabins(true)
	}

	function renderButtonCabinAction(cabin: Cabin) {
		const isSelected = selectedCabinsIds.includes(cabin.idCabin) || singleCabinSelected === cabin
		const isFull = cabin.campers!.length >= edition!.nrCabinLimit!
		const editionStarted = Boolean(edition!.dtBegin)

		if (isSelected && !editionStarted) {
			return (
				<Button onClick={unselectCabin.bind(null, cabin)} color='primary' variant='outlined'>
					Remover dos Selecionados
				</Button>
			)
		}

		if (isSelected && editionStarted) {
			return (
				<Button disabled={true} variant='outlined' color='secondary'>
					Chalé escolhido!
				</Button>
			)
		}

		if (!editionStarted) {
			return (
				<Button
					onClick={selectCabin.bind(null, cabin)}
					disabled={selectedCabinsIds.length >= 3}
					variant='contained'
					color='secondary'>
					{option < 4 ? `Escolher como ${option}a opção` : 'Você já selecionou suas 3 opções'}
				</Button>
			)
		}

		return (
			<Button onClick={selectSingleCabin.bind(null, cabin)} disabled={isFull} variant='outlined' color='secondary'>
				{isFull ? 'Chalé lotado' : 'Escolher este chalé'}
			</Button>
		)
	}

	function renderCabin(cabin: Cabin) {
		const isSelected = selectedCabinsIds.includes(cabin.idCabin)
		return (
			<div key={cabin.idCabin} className={`CabinPage__cabin${isSelected ? '--selected' : ''}`}>
				<Avatar className='CabinPage__cabin--image' src={cabin.dsImageURL} alt='imagem do chalé' />
				<p>{cabin.dsName}</p>
				{renderButtonCabinAction(cabin)}
			</div>
		)
	}

	function renderCabinChoiceBeforeGameStarts() {
		return (
			<div className='CabinPage'>
				<div className='CabinPage__container'>
					<div className='CabinPage__container--inner'>
						<p>
							Bem vindo a escolha de chalés!
							<br />
							<br />
							Temos uma limitação de {edition!.nrCabinLimit} pessoas por chalé nessa edição, então NÃO podemos garantir
							que você consiga ficar na primeira opção. Qualquer dúvida sobre a escolha só mandar uma mensagem para{' '}
							<a target='blank' href='https://instagram.com/portalpercyjackson'>
								Portal Percy Jackson
							</a>
							<br />
							<br />
							Ao finalizar, clique no ícone de flutuante no canto direito da página
						</p>
						{cabins.map(renderCabin)}
					</div>
				</div>
				<Fab
					onClick={saveCabinRequest}
					className='bottom-floating-button'
					color='primary'
					disabled={selectedCabinsIds.length < 3}>
					<Done />
				</Fab>
			</div>
		)
	}

	function renderCabinChoiceAfterGameStarted() {
		return (
			<div className='CabinPage'>
				<div className='CabinPage__container'>
					<div className='CabinPage__container--inner'>
						{/* <p>
							Bem vindo! Nossa edição já começou e nenhum participante poderá entrar no momento. Mas fique tranquilo,
							você pode voltar a participar na nova edição que acontecerá em alguns meses. Fique ligado nas notícias do
							Instagram
						</p> */}
						<p>
							Bem vindo a escolha de chalés!
							<br />
							<br />
							Nossos jogos já estão em andamento, então alguns chalés podem já estar lotados.
							<br />
							Escolha um dos chalés disponíveis abaixo e clique no botão flutuante no canto inferior direito para
							confirmar a sua escolha.
						</p>
						{cabins.filter(cabin => cabin.campers!.length < edition!.nrCabinLimit).map(renderCabin)}
					</div>
				</div>
				<Fab onClick={setCabinToCamper} className='bottom-floating-button' color='secondary'>
					<Done />
				</Fab>
			</div>
		)
	}

	function renderCabinRequestPending() {
		return (
			<div className='CabinPage'>
				<div className='CabinPage__container'>
					<div className='CabinPage__container--inner-textOnly'>
						<p>
							Você já escolheu os seus chalés, agora é com a gente!
							<br />
							Assim que tivermos novidades sobre os chalés, você será notificado.
							<br />
							Enquanto isso que tal passar o tempo?
							<br />
							<br />
							Verifique o nosso <a href='https://instagram.com/portalpercyjackson'>Instagram</a>
							<br />
							<br />
							Verifique a nossa <a href='https://facebook.com/portalpercyjackson'>página no Facebook</a>
							<br />
							<br />
							Verifique o nosso <a href='https://twitter.com/Portal_PJO'>Twitter</a>
							<br />
							<br />
							Participe a nossa <a href='https://discord.gg/9WZD77C'>comunidade do Discord</a>
							<br />
						</p>
					</div>
				</div>
			</div>
		)
	}

	function renderPage() {
		if (camper && camper.idCabin) {
			return (
				<>
					<h1>Você está no Chalé {camper.idCabin}</h1>
					<br />
					<br />
					<h6>
						Para conhecer os outros membros do seu chalé, entre no nosso{' '}
						<a href='https://discord.gg/9WZD77C'>Discord</a>{' '}
					</h6>
				</>
			)
		}
		return !edition ? null : (
			<div>{!edition.dtBegin ? renderBeforeGameStarted() : renderCabinChoiceAfterGameStarted()}</div>
		)
	}

	function renderBeforeGameStarted() {
		return userRequestedCabins ? renderCabinRequestPending() : renderCabinChoiceBeforeGameStarts()
	}

	return renderPage()
}
