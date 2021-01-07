import React from 'react'
import { Edition } from '../model/Edition'
import { Camper } from '../model/Camper'

export interface GlobalContextType {
	edition?: Partial<Edition>
	dispatchEdition?: React.Dispatch<React.SetStateAction<Partial<Edition> | undefined>>
	camper?: Partial<Camper>
	dispatchCamper?: React.Dispatch<React.SetStateAction<Partial<Camper | undefined>>>
}

export const GlobalContext = React.createContext<GlobalContextType>({})
