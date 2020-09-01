import React from 'react'
import Loader from 'react-loader-spinner'
import './CHBLoader.scss'
const LOADER_ID = 'camp-loader'

export const CHBLoader = () => {
	return (
		<div id={LOADER_ID}>
			<Loader type='BallTriangle' color='#00BFFF' height={100} width={100} />
		</div>
	)
}

CHBLoader.show = (): void => {
	const loader = document.getElementById(LOADER_ID)
	// const app = document.getElementsByClassName('App')[0];
	// (app as any).style.overflow = 'hidden'
	if (loader) {
		loader!.style.display = 'flex'
	}
}

CHBLoader.hide = (): void => {
	const loader = document.getElementById(LOADER_ID)
	// const app = document.getElementsByClassName('App')[0];
	// (app as any).style = ''
	if (loader) {
		loader!.style.display = 'none'
	}
}
