const levels = {
	1: {
		title: 'move a bit',
		description: 'Try out the move func by moving along a bit',
		docs: ['move'],
		delivered: [],
		position: '21'
	},
	2: {
		title: 'move a bit more',
		description: 'Try out the move func by moving along a bit along the path',
		docs: ['move', 'deliver'],
		delivered: [],
		position: '51'
	},
	3: {
		title: 'move the lot',
		description: 'Try out the move func with numbers',
		docs: ['move', 'deliver'],
		delivered: [2],
		position: '51'
	},
	4: {
		title: 'move the lot',
		description: 'Try out the move func with numbers',
		docs: ['move', 'deliver'],
		delivered: [1, 2]
	},
	5: {
		title: 'move the lot',
		description: 'Try out the move func with numbers',
		docs: ['move', 'deliver', 'turn'],
		delivered: [],
		position: '62'
	},
	6: {
		title: 'move the lot',
		description: 'Try out the move func with numbers',
		docs: ['move', 'deliver', 'turn'],
		delivered: [1, 3]
	},
	7: {
		title: 'move the lot',
		description: 'Try out the move func with numbers',
		docs: ['move', 'deliver', 'turn'],
		delivered: [],
		position: '11'
	},
	8: {
		title: 'move the lot',
		description: 'Try out the move func with numbers',
		docs: ['move', 'deliver', 'turn'],
		delivered: [],
		position: '51'
	},
	9: {
		title: 'move the lot',
		description: 'Try out the move func with numbers',
		docs: ['move', 'deliver', 'turn'],
		delivered: [],
		position: '11'
	},
	10: {
		title: 'move the lot',
		description: 'Try out the move func with numbers',
		docs: ['move', 'deliver', 'turn'],
		delivered: [1,2,3,4,5,6,7,8]
	}
};

const docs = {
	move: {cmd: 'move(n)', desc: 'move by amount'},
	deliver: {cmd: 'deliverLetter()',  desc: 'sends a letter if outside house door'},
	turn: {cmd: 'turn(d)', desc: 'turns left or right (pass \'L\' or \'R\')'}
}

export {levels, docs};