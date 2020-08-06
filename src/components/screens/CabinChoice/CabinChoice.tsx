import { Avatar, Button, Fab } from '@material-ui/core'
import { Done } from '@material-ui/icons'
import React, { useState } from 'react'
import { Cabin, CabinUserCount } from '../../../model/Cabin'
import { Edition } from '../../../model/Edicao'
import { Divinity } from '../../../model/Mythology'
import './CabinChoice.scss'

const editionMock: Partial<Edition> = {
	dtBegin: new Date(),
	nrCabinLimit: 25,
}

const cabinsMock: Array<Cabin & CabinUserCount> = [
	{
		dsName: 'Chalé 1 - Zeus',
		idCabin: '1',
		tpDivinityRelated: Divinity.ZEUS,
		dsImageURL:
			'https://cdna.artstation.com/p/assets/images/images/011/621/560/medium/elinor-riley-cabin-1-concept-2.jpg?1530538576',
		nrCampers: 15,
	},
	{
		dsName: 'Chalé 2 - Hera',
		idCabin: '2',
		tpDivinityRelated: Divinity.HERA,
		dsImageURL:
			'https://cdna.artstation.com/p/assets/images/images/011/621/570/large/elinor-riley-cabin-2-concept-finished.jpg?1530538598',
		nrCampers: 8,
	},

	{
		dsName: 'Chalé 3 - Poseidon',
		idCabin: '3',
		tpDivinityRelated: Divinity.POSEIDON,
		dsImageURL:
			'https://cdna.artstation.com/p/assets/images/images/011/621/578/small/elinor-riley-cabin-3-concept-complete.jpg?1530538627',
		nrCampers: 25,
	},
	{
		dsName: 'Calé 4 - Deméter',
		idCabin: '4',
		tpDivinityRelated: Divinity.DEMETER,
		dsImageURL:
			'https://cdnb.artstation.com/p/assets/images/images/011/621/585/small/elinor-riley-cabin-4-concept-croped.jpg?1530538665',
		nrCampers: 20,
	},
	{
		dsName: 'Chalé 5 - Ares',
		idCabin: '5',
		tpDivinityRelated: Divinity.ARES,
		dsImageURL:
			'https://cdnb.artstation.com/p/assets/images/images/011/621/589/small/elinor-riley-cabin-5-concept.jpg?1530538681',
		nrCampers: 20,
	},
	{
		dsName: 'Chalé 6 - Atena',
		idCabin: '6',
		tpDivinityRelated: Divinity.ATHENA,
		dsImageURL:
			'https://cdnb.artstation.com/p/assets/images/images/011/621/599/small/elinor-riley-cabin-6-concept.jpg?1530538696',
		nrCampers: 25,
	},
	{
		dsName: 'Chalé 7 - Apolo',
		idCabin: '7',
		tpDivinityRelated: Divinity.APOLLO,
		dsImageURL:
			'https://cdna.artstation.com/p/assets/images/images/012/833/146/small/elinor-riley-cabin-7-cocnept.jpg?1536747378',
		nrCampers: 25,
	},
	{
		dsName: 'Chalé 8 - Ártemis',
		idCabin: '8',
		tpDivinityRelated: Divinity.ARTEMIS,
		dsImageURL:
			'https://cdna.artstation.com/p/assets/images/images/012/833/148/small/elinor-riley-cabin-8-concept.jpg?1536746958',
		nrCampers: 20,
	},
	{
		dsName: 'Chalé 9 - Hefesto',
		idCabin: '9',
		tpDivinityRelated: Divinity.HEPHAESTUS,
		dsImageURL:
			'https://cdnb.artstation.com/p/assets/images/images/012/833/149/small/elinor-riley-cabin-9-concept.jpg?1536746961',
		nrCampers: 23,
	},
	{
		dsName: 'Chalé 10 - Afrodite',
		idCabin: '10',
		tpDivinityRelated: Divinity.APHRODITE,
		dsImageURL:
			'https://cdna.artstation.com/p/assets/images/images/012/833/152/small/elinor-riley-cabin-10-concpet.jpg?1536746965',
		nrCampers: 25,
	},
	{
		dsName: 'Chalé 11 - Hermes',
		idCabin: '11',
		tpDivinityRelated: Divinity.HERMES,
		dsImageURL:
			'https://cdnb.artstation.com/p/assets/images/images/012/833/153/small/elinor-riley-cabin-11-concept.jpg?1536746971',
		nrCampers: 10,
	},
	{
		dsName: 'Chalé 12 - Dionísio',
		idCabin: '11',
		tpDivinityRelated: Divinity.DIONYSUS,
		dsImageURL:
			'https://cdnb.artstation.com/p/assets/images/images/012/833/145/small/elinor-riley-cabin-12-concept.jpg?1536746941',
		nrCampers: 10,
	},
]

export function CabinChoice() {
	const [cabins, setCabins] = useState(cabinsMock)
	const [edition, setEdition] = useState(editionMock)
	const [option, setOption] = useState(1)
	const [selectedCabinsIds, setSelectedCabinsIds] = useState<string[]>([])
	const [singleCabinSelected, setSingleCabinSelected] = useState<(Cabin & CabinUserCount) | null>(null)

	function selectSingleCabin(cabin: Cabin & CabinUserCount): void {
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

	function renderButtonCabinAction(cabin: Cabin & CabinUserCount) {
		const isSelected = selectedCabinsIds.includes(cabin.idCabin) || singleCabinSelected === cabin
		const isFull = cabin.nrCampers >= edition.nrCabinLimit!
		const editionStarted = Boolean(edition.dtBegin)

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
					variant='outlined'
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

	function renderCabin(cabin: Cabin & CabinUserCount) {
		const isSelected = selectedCabinsIds.includes(cabin.idCabin)
		return (
			<div className={`CabinPage__cabin${isSelected ? '--selected' : ''}`}>
				<Avatar className='CabinPage__cabin--image' key={cabin.idCabin} src={cabin.dsImageURL} alt='imagem do chalé' />
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
							Temos uma limitação de {edition.nrCabinLimit} pessoas por chalé nessa edição, então NÃO podemos garantir
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
				<Fab className='bottom-floating-button' color='secondary'>
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
						<p>
							Bem vindo a escolha de chalés!
							<br />
							<br />
							Nossos jogos já estão em andamento, então alguns chalés podem já estar lotados.
							<br />
							Escolha um dos chalés disponíveis abaixo e clique no botão flutuante no canto inferior direito para
							confirmar a sua escolha.
						</p>
						{cabins.map(renderCabin)}
					</div>
				</div>
				<Fab className='bottom-floating-button' color='secondary'>
					<Done />
				</Fab>
			</div>
		)
	}

	return <div>{!edition.dtBegin ? renderCabinChoiceBeforeGameStarts() : renderCabinChoiceAfterGameStarted()}</div>
}
