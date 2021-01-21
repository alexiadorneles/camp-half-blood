import React, { useEffect, useContext } from 'react'
import { Route, Redirect, RouteProps, useHistory } from 'react-router'
import { LocalStorageUtils } from '../utils'
import { GlobalContext } from '../providers/GlobalContext'
import { EditionService, CamperService } from '../services'
import { SECURED_ROUTES } from '../config/Routes'

export interface PrivateRoutePropTypes extends RouteProps {
	children: JSX.Element | JSX.Element[]
	editionService: EditionService
	camperService: CamperService
}

const hasToken = () => Boolean(LocalStorageUtils.getToken())

export function PrivateRoute({ editionService, camperService, children, ...rest }: PrivateRoutePropTypes) {
	const { dispatchEdition, dispatchCamper, camper } = useContext(GlobalContext)
	const history = useHistory()

	useEffect(() => {
		async function getEdition() {
			const edition = await editionService.findCurrent()
			dispatchEdition && dispatchEdition(edition)
		}

		async function getCamper() {
			const camper = await camperService.getProfile()
			dispatchCamper && dispatchCamper(camper)
		}

		getEdition()
		getCamper()
	}, [])

	if (camper && !camper.blRegisterCompleted && !window.location.href.includes(SECURED_ROUTES.PROFILE)) {
		history.push(SECURED_ROUTES.PROFILE)
	}

	return (
		<Route
			{...rest}
			render={props => (hasToken() ? children : <Redirect to={{ pathname: '/', state: { from: props.location } }} />)}
		/>
	)
}
