import React, { useState } from 'react'
import { Route, Switch, useHistory } from 'react-router'
import { CHBBottomNav, CHBHeader } from './components/generics'
import { PrivateRoute } from './components/PrivateRoute'
import { CabinChoice, Game, Login, Profile } from './components/screens'
import { Edition } from './model/Edition'
import { GlobalContext } from './providers/GlobalContext'
import { CabinService, CamperService, EditionService, HttpService, RoundService } from './services'
import { Camper } from './model/Camper'
import { MyCabin } from './components/screens/MyCabin/MyCabin'

export function Middleware() {
	const [edition, dispatchEdition] = useState<Partial<Edition>>()
	const [camper, dispatchCamper] = useState<Partial<Camper>>()

	const history = useHistory()

	const httpService = new HttpService(history)
	const camperService = new CamperService(httpService)
	const editionService = new EditionService(httpService)
	const cabinService = new CabinService(httpService)
	const roundService = new RoundService(httpService)

	return (
		<GlobalContext.Provider value={{ edition, dispatchEdition, dispatchCamper, camper }}>
			<Switch>
				<PrivateRoute camperService={camperService} editionService={editionService} path='/secured'>
					<CHBHeader />
					<Switch>
						<Route path='/secured/cabin-choice'>
							<CabinChoice cabinService={cabinService} editionService={editionService} camperService={camperService} />
						</Route>
						<Route path='/secured/my-cabin'>
							<MyCabin />
						</Route>
						<Route path='/secured/profile'>
							<Profile camperService={camperService} />
						</Route>
						<Route path='/secured/games'>
							<Game roundService={roundService} camperService={camperService} />
						</Route>
					</Switch>
					<CHBBottomNav />
				</PrivateRoute>
				<Route path='/'>
					<Login camperService={camperService} />
				</Route>
			</Switch>
		</GlobalContext.Provider>
	)
}
