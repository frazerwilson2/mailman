const levels = {
	1: {
		title: 'move a bit',
		description: 'Try out the move func by moving along a bit',
		docs: ['move'],
		delivered: [1]
	},
	2: {
		title: 'move a bit more',
		description: 'Try out the move func by moving along a bit along the path',
		docs: ['move', 'deliver'],
		delivered: [2]
	},
	3: {
		title: 'move the lot',
		description: 'Try out the move func with numbers',
		docs: ['move', 'deliver'],
		delivered: [3]
	},
};

const docs = {
	move: {cmd: 'move(n)', desc: 'move by amount'},
	deliver: {cmd: 'deliverLetter()',  desc: 'sends a letter if outside house door'}
}

export {levels, docs};