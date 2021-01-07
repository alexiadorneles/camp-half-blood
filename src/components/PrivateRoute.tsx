import React, { useEffect, useContext } from 'react'
import { Route, Redirect, RouteProps } from 'react-router'
import { LocalStorageUtils } from '../utils'
import { GlobalContext } from '../providers/GlobalContext'
import { EditionService, CamperService } from '../services'

export interface PrivateRoutePropTypes extends RouteProps {
	children: JSX.Element | JSX.Element[]
	editionService: EditionService
	camperService: CamperService
}

const hasToken = () => Boolean(LocalStorageUtils.getToken())

export function PrivateRoute({ editionService, camperService, children, ...rest }: PrivateRoutePropTypes) {
	const { dispatchEdition, dispatchCamper } = useContext(GlobalContext)

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

	return (
		<Route
			{...rest}
			render={props => (hasToken() ? children : <Redirect to={{ pathname: '/', state: { from: props.location } }} />)}
		/>
	)
}
