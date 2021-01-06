import { Avatar, Button, Fab } from '@material-ui/core'
import { Done } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { Cabin } from '../../../model/Cabin'
import { Camper } from '../../../model/Camper'
import { Edition } from '../../../model/Edition'
import { CustomSwal } from '../../../providers/SwalProvider'
import { CamperService, CRUDService, EditionService } from '../../../services'
import { LocalStorageUtils } from '../../../utils/LocalStorageUtils'
import './CabinChoice.scss'

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

	function renderButtonCabinAction(cabin: Cabin) {
		const isFull = cabin.campers!.length >= edition!.nrCabinLimit!
		const isSelected = singleCabinSelected && singleCabinSelected.idCabin === cabin.idCabin
		const label = isSelected ? 'Sair deste chalé' : 'Escolher este chalé'
		const callback = isSelected ? unselectSingleCabin : selectSingleCabin.bind(null, cabin)

		return (
			<Button onClick={callback} disabled={isFull} variant='outlined' color='secondary'>
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
		return (
			<div className='CabinPage'>
				<div className='CabinPage__container'>
					<div className='CabinPage__container--inner-textOnly'>
						<p>
							<h1>Você está no Chalé {camper && camper.idCabin}</h1>
							<br />
							Você já escolheu o seu chalé, agora é com a gente!
							<br />
							Assim que tivermos novidades sobre os chalés, você será notificado.
							<br />
							Enquanto isso que tal passar o tempo?
							<br />
							<br />
							Verifique o nosso <a href='https://instagram.com/portalpercyjackson'>Instagram</a>
							<br />
							<br />
							Conheça o nosso <a href='https://portalpercyjackson.com'>site</a>
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

	function renderNotStartedYet() {
		return (
			<h2>
				Nossa edição ainda não começou, por favor cheche nossas redes sociais para mais informações
				(@portalpercyjackson)
			</h2>
		)
	}

	function renderPage() {
		if (camper && camper.idCabin) {
			return renderCabinAlreadySelected()
		}

		return edition && !edition.dtBegin && <div>{renderCabinSelection()}</div>
	}

	return renderPage() || renderNotStartedYet()
}
