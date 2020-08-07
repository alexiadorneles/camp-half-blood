import React, { useState } from 'react'
import { QuestionsWithAnswers, ObjectiveAnswer } from '../../../model/Activity'
import { Paper } from '@material-ui/core'

import './CHBQuizDisplayer.scss'

interface CHBQuizDisplayerPropTypes {
	quiz: QuestionsWithAnswers
	onAnswerChosen: (answer: ObjectiveAnswer) => void
}

export function CHBQuizDisplayer({ quiz, onAnswerChosen }: CHBQuizDisplayerPropTypes) {
	const [selectedAlternative, setSelectedAlternative] = useState<ObjectiveAnswer | null>(null)

	function chooseAlternative(answer: ObjectiveAnswer): void {
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
						key={op.idAlternative}
						elevation={3}>
						{op.dsAlternative}
					</Paper>
				))}
			</div>
		</div>
	)
}
