import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'
import { CHBBottomNav } from './components/generics'
import { Home, Login } from './components/screens'

const App: React.FC = () => (
	<Router>
		<Suspense fallback={<div>Loading...</div>}>
			<Switch>
				<Route path='/secured'>
					<Switch>
						<Route path='/secured/home'>
							<Home />
						</Route>
					</Switch>
					<CHBBottomNav />
				</Route>
				<Route path='/'>
					<Login />
				</Route>
			</Switch>
		</Suspense>
	</Router>
)

export default App
