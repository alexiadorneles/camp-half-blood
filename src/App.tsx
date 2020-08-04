import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'
import { Login, Home } from './components/screens'

const App: React.FC = () => (
	<Router>
		<Suspense fallback={<div>Loading...</div>}>
			{/* <nav>
				<ul>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<Link to='/about'>About</Link>
					</li>
				</ul>
			</nav> */}
			<Switch>
				<Route path='/home'>
					<Home />
				</Route>
				<Route path='/'>
					<Login />
				</Route>
			</Switch>
		</Suspense>
	</Router>
)

export default App
