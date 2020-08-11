import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'
import { CHBBottomNav, CHBLoader } from './components/generics'
import { CabinChoice, Game, Login, Profile } from './components/screens'
import { CamperService, HttpService } from './services'
import { LocalStorageUtils } from './utils/LocalStorageUtils'

// TODO: remove it as soon as login starts working
LocalStorageUtils.setItem('idCamper', 1)

const httpService = new HttpService()
const camperService = new CamperService(httpService)

const App: React.FC = () => (
	<>
		<CHBLoader />
		<Router>
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route path='/secured'>
						<Switch>
							<Route path='/secured/cabin' component={CabinChoice} />
							<Route path='/secured/profile'>
								<Profile camperService={camperService} />
							</Route>
							<Route path='/secured/games' component={Game} />
						</Switch>
						<CHBBottomNav />
					</Route>
					<Route path='/' component={Login} />
				</Switch>
			</Suspense>
		</Router>
	</>
)

export default App
