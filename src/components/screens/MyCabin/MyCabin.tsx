import { Avatar, Card, CardContent, LinearProgress, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { Camper } from '../../../model/Camper'
import { Edition } from '../../../model/Edition'
import { CabinStatistic, Statistic } from '../../../model/Statistic'
import { GlobalContext } from '../../../providers/GlobalContext'
import { CustomSwal } from '../../../providers/SwalProvider'
import { CamperService } from '../../../services'
import { EditionProvider } from '../../EditionProvider'
import { CHBCabinSelected } from '../../generics'
import './MyCabin.scss'

interface MyCabinPropTypes {
	camperService: CamperService
}

export function MyCabin({ camperService }: MyCabinPropTypes) {
	const [statistics, setStatistics] = useState<CabinStatistic>({} as CabinStatistic)

	useEffect(() => {
		const getStatistics = async () => {
			try {
				const data = await camperService.retrieveStatisticByCabinAndDay(6, '2021-02-28')
				setStatistics(data)
			} catch (error) {
				CustomSwal.fire(
					'Erro',
					'Um erro ocorreu ao tentar ativar sua inscrição. Por favor, contate os administradores',
					'error',
				)
			}
		}

		getStatistics()
	}, [])

	const renderStatistic = (statistic: Statistic) => {
		const progressClassName = () => {
			if (statistic.nrCorrectPercentage <= 60) return 'Statistic__progress--red'
			if (statistic.nrCorrectPercentage < 90) return 'Statistic__progress--yellow'
			if (statistic.nrCorrectPercentage >= 90) return 'Statistic__progress--green'
		}
		return (
			<Card className="Statistic">
				<CardContent className="Statistic__content">
					<div className="Statistic__header">
						<Avatar className="Statistic__image" alt={statistic.camper.dsName} src={statistic.camper.dsImageURL} />
						<span>
							<Typography>{statistic.camper.dsName}</Typography>
							<Typography variant="caption" display="block" gutterBottom>
								{statistic.camper.dsEmail}
							</Typography>
						</span>
						<Typography>{statistic.dsCorrectPercentage}</Typography>
					</div>
					<LinearProgress className={progressClassName()} variant="determinate" value={statistic.nrCorrectPercentage} />
				</CardContent>
			</Card>
		)
	}

	const { camper, edition } = useContext(GlobalContext)
	if (edition && edition.dtBegin && camper && camper.idCabin) {
		return (
			<div className="MyCabin">
				<CHBCabinSelected compact camper={camper as Camper} />
				<div className="MyCabin__container">
					<br />
					<div className="MyCabin__general">
						<Typography className="MyCabin__general--green" variant="caption" display="block" gutterBottom>
							{statistics?.answered?.length + ' responderam as atividades'}
						</Typography>
						<Typography className="MyCabin__general--red" variant="caption" display="block" gutterBottom>
							{statistics?.notAnswered?.length + ' não responderam as atividades'}
						</Typography>
					</div>
					<br />
					<div className="MyCabin__statisticContainer">{statistics?.answered?.map(renderStatistic)}</div>
				</div>
			</div>
		)
	}

	return EditionProvider(edition as Edition)
}
