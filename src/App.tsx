import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'
import { CHBBottomNav, CHBLoader } from './components/generics'
import { CabinChoice, Game, Login, Profile } from './components/screens'
import { CamperService, HttpService, CabinService, CabinRequestService, RoundService } from './services'
import { LocalStorageUtils } from './utils/LocalStorageUtils'
import { EditionService } from './services/EditionService'

// TODO: remove it as soon as login starts working
// LocalStorageUtils.setItem('idCamper', 1)

const httpService = new HttpService()
const camperService = new CamperService(httpService)
const editionService = new EditionService(httpService)
const cabinService = new CabinService(httpService)
const cabinRequestService = new CabinRequestService(httpService)
const roundService = new RoundService(httpService)

const App: React.FC = () => (
	<>
		<CHBLoader />
		<Router>
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route path='/secured'>
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
			</Suspense>
		</Router>
	</>
)

export default App
