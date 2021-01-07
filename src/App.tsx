// pick a date util library
import DateFnsUtils from '@date-io/date-fns'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.scss'
import { CHBLoader } from './components/generics'
import { Middleware } from './Middleware'

// TODO: remove it as soon as login starts working
// LocalStorageUtils.setItem('idCamper', 1)

const App: React.FC = () => {
	return (
		<MuiThemeProvider
			theme={createMuiTheme({
				palette: {
					secondary: {
						main: '#383737',
					},
					primary: {
						main: '#c49a6b',
					},
				},
			})}>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<>
					<CHBLoader />
					<Router>
						<Middleware />
					</Router>
				</>
			</MuiPickersUtilsProvider>
		</MuiThemeProvider>
	)
}

export default App
