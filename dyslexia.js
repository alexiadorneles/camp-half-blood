const randomNumber = (min, max) => Math.random() * (max - min) + min
const log = something => console.log(something)
const dyslexia = word => {
	const newWord = []
	const letters = word.split('')
	let cont = 0
	while (newWord.filter(Boolean).length < word.length) {
		const position = Math.ceil(randomNumber(0, word.length))
		if (newWord[position]) continue
		newWord[position] = letters[cont]
		cont++
	}

	return newWord.join('')
}
