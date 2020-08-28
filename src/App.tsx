// pick a date util library
import DateFnsUtils from '@date-io/date-fns'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'
import { CHBBottomNav, CHBLoader } from './components/generics'
import { CHBHeader } from './components/generics/CHBHeader/CHBHeader'
import { CabinChoice, Game, Login, Profile } from './components/screens'
import { CabinRequestService, CabinService, CamperService, HttpService, RoundService } from './services'
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
	<MuiThemeProvider
		theme={createMuiTheme({
			palette: {
				secondary: {
					main: 'rgba(0, 0, 0, 0.8)',
				},
				primary: {
					main: '#FF9800',
				},
			},
		})}>
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<>
				<CHBLoader />
				<Router>
					<Suspense fallback={<div>Loading...</div>}>
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
					</Suspense>
				</Router>
			</>
		</MuiPickersUtilsProvider>
	</MuiThemeProvider>
)

export default App
