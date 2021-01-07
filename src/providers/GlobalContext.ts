import React from 'react'
import { Edition } from '../model/Edition'

export interface GlobalContextType {
	edition?: Partial<Edition>
	dispatchEdition?: React.Dispatch<React.SetStateAction<Partial<Edition> | undefined>>
}

export const GlobalContext = React.createContext<GlobalContextType>({})
