import React, { useState } from 'react'
import { ActivityWithAnswers, ActivityOption } from '../../../model/Activity'
import { Paper } from '@material-ui/core'

import './CHBQuizDisplayer.scss'

interface CHBQuizDisplayerPropTypes {
	quiz: ActivityWithAnswers
	onAnswerChosen: (answer: ActivityOption) => void
}

export function CHBQuizDisplayer({ quiz, onAnswerChosen }: CHBQuizDisplayerPropTypes) {
	const [selectedAlternative, setSelectedAlternative] = useState<ActivityOption | null>(null)

	function chooseAlternative(answer: ActivityOption): void {
		setSelectedAlternative(answer)
		onAnswerChosen(answer)
	}

	return (
		<div key={quiz.idQuestion} className='CHBQuizDisplayer'>
			<h2>{quiz.dsQuestion}</h2>
			<div className='CHBQuizDisplayer__optionsContainer'>
				{quiz.options!.map(op => (
					<Paper
						variant='elevation'
						className={`${
							selectedAlternative === op ? 'CHBQuizDisplayer__option--selected' : 'CHBQuizDisplayer__option'
						}`}
						onClick={chooseAlternative.bind(null, op)}
						key={op.idActivityOption}
						elevation={3}>
						{op.dsAlternative}
					</Paper>
				))}
			</div>
		</div>
	)
}
