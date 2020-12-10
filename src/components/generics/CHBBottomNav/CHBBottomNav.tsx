import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { AccountBalance, AssignmentInd, TouchApp } from '@material-ui/icons'
import React, { ChangeEvent, ReactNode, useState } from 'react'
import { useHistory } from 'react-router'
import { SECURED_ROUTES } from '../../../config/Routes'
import { Edition } from '../../../model/Edition'
import { EditionContext } from '../../../providers/EditionContext'
import './CHBBottomNav.scss'

const ITEM_LABEL = {
	CABIN: 'Chalé',
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
	// const { edition } = useContext(EditionContext)

	const getMenuItems = (edition: Partial<Edition> | undefined): MenuItem[] => [
		{
			icon: <AccountBalance color='primary' />,
			label: ITEM_LABEL.CABIN,
			value: ITEM_LABEL.CABIN,
			route: SECURED_ROUTES.CABIN_CHOICE,
			visibilityFunction: () => Boolean(edition && !edition.dtBegin),
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

	return (
		<EditionContext.Consumer>
			{({ edition }) => (
				<div className='CHBBottomNav'>
					<BottomNavigation value={value} onChange={(event, newValue) => onChange(event, newValue, edition)} showLabels>
						{getMenuItems(edition)
							.filter(item => item.visibilityFunction())
							.map(({ visibilityFunction, ...actionProps }) => (
								<BottomNavigationAction key={actionProps.route} {...actionProps} />
							))}
					</BottomNavigation>
				</div>
			)}
		</EditionContext.Consumer>
	)
}
