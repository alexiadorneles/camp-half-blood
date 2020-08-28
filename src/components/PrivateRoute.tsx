import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router'
import { LocalStorageUtils } from '../utils'

export interface PrivateRoutePropTypes extends RouteProps {
	children: JSX.Element | JSX.Element[]
}

const hasToken = () => Boolean(LocalStorageUtils.getToken())

export function PrivateRoute({ children, ...rest }: PrivateRoutePropTypes) {
	return (
		<Route
			{...rest}
			render={props => (hasToken() ? children : <Redirect to={{ pathname: '/', state: { from: props.location } }} />)}
		/>
	)
}
