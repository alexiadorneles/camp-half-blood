import React from 'react'
import { Route, Switch, useHistory } from 'react-router'
import { CHBBottomNav, CHBHeader } from './components/generics'
import { CabinChoice, Game, Login, Profile } from './components/screens'
import { CabinRequestService, CabinService, CamperService, EditionService, HttpService, RoundService } from './services'

export function Middleware() {
	const history = useHistory()

	const httpService = new HttpService(history)
	const camperService = new CamperService(httpService)
	const editionService = new EditionService(httpService)
	const cabinService = new CabinService(httpService)
	const cabinRequestService = new CabinRequestService(httpService)
	const roundService = new RoundService(httpService)

	return (
		<Switch>
			<Route path='/secured'>
				<CHBHeader />
				<Switch>
					<Route path='/secured/cabin-choice'>
						<CabinChoice
							cabinRequestService={cabinRequestService}
							cabinService={cabinService}
							editionService={editionService}
							camperService={camperService}
						/>
					</Route>
					<Route path='/secured/profile'>
						<Profile camperService={camperService} />
					</Route>
					<Route path='/secured/games'>
						<Game roundService={roundService} camperService={camperService} />
					</Route>
				</Switch>
				<CHBBottomNav />
			</Route>
			<Route path='/'>
				<Login camperService={camperService} />
			</Route>
		</Switch>
	)
}
