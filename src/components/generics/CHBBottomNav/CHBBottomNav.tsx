import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { AccountBalance, AssignmentInd, EventSeat, TouchApp } from '@material-ui/icons'
import React, { ChangeEvent, ReactNode, useState } from 'react'
import { useHistory } from 'react-router'
import { SECURED_ROUTES } from '../../../config/Routes'
import { Edition } from '../../../model/Edition'
import { GlobalContext } from '../../../providers/GlobalContext'
import './CHBBottomNav.scss'
import { Camper } from '../../../model/Camper'

const ITEM_LABEL = {
	CABIN_CHOICE: 'Escolher Chalé',
	MY_CABIN: 'Meu Chalé',
	RANKING: 'Ranking',
	GAMES: 'Jogos',
	PROFILE: 'Meu Perfil',
}

interface MenuItem {
	icon: ReactNode
	label: string
	value: string
	route: string
	visibilityFunction: () => boolean
}

export function CHBBottomNav() {
	const [value, setValue] = useState('')
	const history = useHistory()

	const getMenuItems = (edition: Partial<Edition> | undefined): MenuItem[] => [
		{
			icon: <EventSeat color='primary' />,
			label: ITEM_LABEL.CABIN_CHOICE,
			value: ITEM_LABEL.CABIN_CHOICE,
			route: SECURED_ROUTES.CABIN_CHOICE,
			visibilityFunction: () => Boolean(edition && !edition.dtBegin),
		},
		{
			icon: <AccountBalance color='primary' />,
			label: ITEM_LABEL.MY_CABIN,
			value: ITEM_LABEL.MY_CABIN,
			route: SECURED_ROUTES.MY_CABIN,
			visibilityFunction: () => Boolean(edition && edition.dtBegin),
		},
		{
			icon: <TouchApp color='primary' />,
			label: ITEM_LABEL.GAMES,
			value: ITEM_LABEL.GAMES,
			route: SECURED_ROUTES.GAMES,
			visibilityFunction: () => true,
		},
		{
			icon: <AssignmentInd color='primary' />,
			label: ITEM_LABEL.PROFILE,
			value: ITEM_LABEL.PROFILE,
			route: SECURED_ROUTES.PROFILE,
			visibilityFunction: () => true,
		},
	]

	function onChange(event: ChangeEvent<{}>, newValue: string, edition?: Partial<Edition>) {
		setValue(newValue)
		const menuItem = getMenuItems(edition).find(item => item.value === newValue)!
		history.push(menuItem.route)
	}

	function isCamperRegisteredCompletely(camper: Partial<Camper> | undefined): boolean {
		return Boolean(camper && camper.blRegisterCompleted)
	}

	return (
		<GlobalContext.Consumer>
			{({ edition, camper }) =>
				isCamperRegisteredCompletely(camper) && (
					<div className='CHBBottomNav'>
						<BottomNavigation
							value={value}
							onChange={(event, newValue) => onChange(event, newValue, edition)}
							showLabels>
							{getMenuItems(edition)
								.filter(item => item.visibilityFunction())
								.map(({ visibilityFunction, ...actionProps }) => (
									<BottomNavigationAction key={actionProps.route} {...actionProps} />
								))}
						</BottomNavigation>
					</div>
				)
			}
		</GlobalContext.Consumer>
	)
}
