import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'
import { CHBBottomNav } from './components/generics'
import { CabinChoice, Login, Profile, Game } from './components/screens'

const App: React.FC = () => (
	<Router>
		<Suspense fallback={<div>Loading...</div>}>
			<Switch>
				<Route path='/secured'>
					<Switch>
						<Route path='/secured/cabin' component={CabinChoice} />
						<Route path='/secured/profile' component={Profile} />
						<Route path='/secured/games' component={Game} />
					</Switch>
					<CHBBottomNav />
				</Route>
				<Route path='/' component={Login} />
			</Switch>
		</Suspense>
	</Router>
)

export default App
