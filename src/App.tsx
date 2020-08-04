import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'
import { Login } from './components/screens'
const About = lazy(() => import('./About'))
const Home = lazy(() => import('./Home'))

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
				<Route path='/about'>
					<About />
				</Route>
				<Route path='/'>
					<Login />
					{/* <Home /> */}
				</Route>
			</Switch>
		</Suspense>
	</Router>
)

export default App
