import React, { useEffect, useContext } from 'react'
import { Route, Redirect, RouteProps } from 'react-router'
import { LocalStorageUtils } from '../utils'
import { EditionContext } from '../providers/EditionContext'
import { EditionService } from '../services'

export interface PrivateRoutePropTypes extends RouteProps {
	children: JSX.Element | JSX.Element[]
	editionService: EditionService
}

const hasToken = () => Boolean(LocalStorageUtils.getToken())

export function PrivateRoute({ editionService, children, ...rest }: PrivateRoutePropTypes) {
	const { dispatchEdition } = useContext(EditionContext)

	useEffect(() => {
		async function getEdition() {
			const edition = await editionService.findCurrent()
			dispatchEdition && dispatchEdition(edition)
		}

		getEdition()
	}, [])

	return (
		<Route
			{...rest}
			render={props => (hasToken() ? children : <Redirect to={{ pathname: '/', state: { from: props.location } }} />)}
		/>
	)
}
