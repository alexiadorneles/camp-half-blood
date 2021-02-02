import { Avatar, Button, Fab, TextField } from '@material-ui/core'
import { Done } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { Cabin } from '../../../model/Cabin'
import { Camper } from '../../../model/Camper'
import { Edition } from '../../../model/Edition'
import { CustomSwal } from '../../../providers/SwalProvider'
import { CamperService, CRUDService, EditionService } from '../../../services'
import { LocalStorageUtils } from '../../../utils/LocalStorageUtils'
import { CHBCabinSelected } from '../../generics/CHBCabinSelected/CHBCabinSelected'
import './CabinChoice.scss'

const { REACT_APP_PAID_INSCRIPTION_FLAG, REACT_APP_PRIORITY_INSCRIPTION_FLAG } = process.env

export interface CabinChoicePropTypes {
	editionService: EditionService
	cabinService: CRUDService<Cabin>
	camperService: CamperService
}

export function CabinChoice({ editionService, cabinService, camperService }: CabinChoicePropTypes) {
	const [cabins, setCabins] = useState<Cabin[]>([])
	const [edition, setEdition] = useState<Edition | null>(null)
	const [singleCabinSelected, setSingleCabinSelected] = useState<Cabin | null>(null)
	const [camper, setCamper] = useState<Camper | null>(null)
	const [code, setCode] = useState('')
	const [hasPriority, setHasPriority] = useState(false)

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
			setCabins(cabins.sort((a, b) => a.idCabin - b.idCabin))
		}

		getCabins()
	}, [])

	useEffect(() => {
		async function validatePriorityInscription() {
			if (REACT_APP_PRIORITY_INSCRIPTION_FLAG === 'true') {
				const result = await camperService.validatePriorityInscription()
				setHasPriority(result)
			}
		}

		validatePriorityInscription()
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

	function unselectSingleCabin(): void {
		setSingleCabinSelected(null)
	}

	async function setCabinToCamper() {
		if (singleCabinSelected) {
			await camperService.setCabin(idCamper, singleCabinSelected.idCabin)
			getCamper()
		} else {
			CustomSwal.fire('Por favor escolha um chalé', undefined, 'warning')
		}
	}

	async function activatePaidInscription() {
		if (!code) {
			return CustomSwal.fire('Erro', 'Informe o código para ativar sua inscrição', 'error')
		}

		try {
			await camperService.activateInscription({ code })
			await getCamper()
		} catch (err) {
			return CustomSwal.fire(
				'Erro',
				'Um erro ocorreu ao tentar ativar sua inscrição. Por favor, contate os administradores',
				'error',
			)
		}
	}

	function renderButtonCabinAction(cabin: Cabin) {
		const isFull = cabin.campers!.length >= edition!.nrCabinLimit!
		const isSelected = singleCabinSelected && singleCabinSelected.idCabin === cabin.idCabin
		const label = isSelected ? 'Sair deste chalé' : 'Escolher este chalé'
		const callback = isSelected ? unselectSingleCabin : selectSingleCabin.bind(null, cabin)
		const color = isSelected ? 'primary' : 'secondary'

		return (
			<Button onClick={callback} disabled={isFull} variant='outlined' color={color}>
				{isFull ? 'Chalé lotado' : label}
			</Button>
		)
	}

	function renderCabin(cabin: Cabin) {
		const isSelected = singleCabinSelected && singleCabinSelected.idCabin === cabin.idCabin
		return (
			<div key={cabin.idCabin} className={`CabinPage__cabin${isSelected ? '--selected' : ''}`}>
				<Avatar className='CabinPage__cabin--image' src={cabin.dsImageURL} alt='imagem do chalé' />
				<p>{cabin.dsName}</p>
				{renderButtonCabinAction(cabin)}
			</div>
		)
	}

	function renderCabinSelection() {
		return (
			<div className='CabinPage'>
				<div className='CabinPage__container'>
					<div className='CabinPage__container--inner'>
						<p>
							Bem vindo a escolha de chalés!
							<br />
							<br />
							Os chalés tiveram suas vagas a venda e as restantes são por ordem de chegada. Se você ficar muito tempo
							com essa tela aberta sem escolher um chalé, pode acabar perdendo a vaga.
							<br />
							Escolha um dos chalés disponíveis abaixo e clique no botão flutuante no canto inferior direito para
							confirmar a sua escolha. <b>VOCÊ SÓ ENTRA NO CHALÉ APÓS CLICAR NO BOTÃO FLUTUANTE</b>
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

	function renderCabinAlreadySelected() {
		return <CHBCabinSelected camper={camper!} />
	}

	function renderNotStartedYet() {
		return (
			<h2>
				Nossa edição ainda não começou, por favor cheche nossas redes sociais para mais informações
				(@portalpercyjackson)
			</h2>
		)
	}

	function renderPaidInscriptionValidation() {
		return (
			<div className='CabinPage'>
				<p>ATIVAR INSCRIÇÃO PAGA</p>
				<br />
				<TextField
					className='CabinPage__input'
					variant='outlined'
					label='código de ativação'
					value={code}
					onChange={e => setCode(e.target.value)}
				/>
				<Button className='CabinPage__button' size='large' variant='outlined' onClick={activatePaidInscription}>
					Ativar inscrição
				</Button>
				<br />
				<br />
				<p className='CabinPage__subtext'>
					Você recebe um código de ativação quando realiza a compra de uma vaga em um chalé. Ao colar o código e clicar
					no botão, você será adicionado em seu chalé
				</p>
			</div>
		)
	}

	function renderPage() {
		if (camper && camper.idCabin) {
			return renderCabinAlreadySelected()
		}

		if (REACT_APP_PAID_INSCRIPTION_FLAG === 'true') {
			return renderPaidInscriptionValidation()
		}

		if (REACT_APP_PRIORITY_INSCRIPTION_FLAG === 'true' && !hasPriority) {
			return (
				<div className='CabinPage'>
					<h1>Oops!</h1>
					<p>
						Parece que você não tem prioridade de inscrição. Por favor verifique com seu conselheiro chefe se seu email
						foi enviado na lista
					</p>
				</div>
			)
		}

		return edition && !edition.dtBegin && <div>{renderCabinSelection()}</div>
	}

	return renderPage() || renderNotStartedYet()
}
