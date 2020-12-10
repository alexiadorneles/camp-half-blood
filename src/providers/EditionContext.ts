import React from 'react'
import { Edition } from '../model/Edition'

export interface EditionContextType {
	edition?: Partial<Edition>
	dispatchEdition?: React.Dispatch<React.SetStateAction<Partial<Edition> | undefined>>
}

export const EditionContext = React.createContext<EditionContextType>({})
