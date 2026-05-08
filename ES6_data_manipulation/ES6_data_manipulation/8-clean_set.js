export default function cleanSet(set, startString) {
	return [...set]
	.filter(value => value.startsWith(startString) && startString.length > 0)
	.map(value => value.slice(startString.length))
	.join('-');
}

