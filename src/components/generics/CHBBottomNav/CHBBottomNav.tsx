import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { AccountBalance, BarChart, TouchApp, AssignmentInd } from '@material-ui/icons'
import React, { ChangeEvent, ReactNode, useState } from 'react'
import './CHBBottomNav.scss'
import { SECURED_ROUTES } from '../../../config/Routes'
import { useHistory } from 'react-router'

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

	const menuItems: MenuItem[] = [
		{
			icon: <AccountBalance />,
			label: ITEM_LABEL.CABIN,
			value: ITEM_LABEL.CABIN,
			route: SECURED_ROUTES.HOME,
			visibilityFunction: () => true,
		},
		{
			icon: <BarChart />,
			label: ITEM_LABEL.RANKING,
			value: ITEM_LABEL.RANKING,
			route: SECURED_ROUTES.RANKING,
			visibilityFunction: () => true,
		},
		{
			icon: <TouchApp />,
			label: ITEM_LABEL.GAMES,
			value: ITEM_LABEL.GAMES,
			route: SECURED_ROUTES.GAMES,
			visibilityFunction: () => true,
		},
		{
			icon: <AssignmentInd />,
			label: ITEM_LABEL.PROFILE,
			value: ITEM_LABEL.PROFILE,
			route: SECURED_ROUTES.PROFILE,
			visibilityFunction: () => true,
		},
	]

	function onChange(event: ChangeEvent<{}>, newValue: string) {
		setValue(newValue)
		const menuItem = menuItems.find(item => item.value === newValue)!
		history.push(menuItem.route)
	}

	return (
		<div className='CHBBottomNav'>
			<BottomNavigation value={value} onChange={onChange} showLabels color='red'>
				{menuItems
					.filter(item => item.visibilityFunction())
					.map(({ visibilityFunction, ...actionProps }) => (
						<BottomNavigationAction key={actionProps.route} {...actionProps} />
					))}
			</BottomNavigation>
		</div>
	)
}
