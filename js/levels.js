const levels = {
	1: {
		title: 'Let\'s get moving',
		description: `What's all this then?
		<br>Using the code area above, we can program instructions for the postman 
		to complete his tasks.
		<br><br>
		Let's begin. Above, remove the comment on line 1 and enter:
		<br><em>move();</em>
		<br><br>This is a <strong>function</strong> which will make the postman move.`,
		docs: ['move'],
		delivered: [],
		position: '21'
	},
	2: {
		title: 'Moving some more..',
		description: `Great work!
		<br>So, a function is always followed by brackets and a semicolon. This means we can put stuff in the brackets to change the function.
		<br><br>For example, if you put a number in the brackets of our <em>move()</em>
		function, the postman will walk that amount of spaces.
		<br><br>Use the <em>move()</em> function with a number to walk to house 2`,
		docs: ['move'],
		delivered: [],
		position: '51'
	},
	3: {
		title: 'Deliver a letter',
		description: `Cool, so now lets deliver a letter!
		<br>So, we know how to walk to house 2, but how do we deliver a letter?
		<br>For this, use the <em>deliverLetter()</em> function. Again, this function needs to be one word (without spaces) and followed by brackets and semicolon
		<br><br>For this challenge, first use <em>move()</em> to walk to house 2, then use <em>deliverLetter()</em> to deliver to house 2`,
		docs: ['move', 'deliver'],
		delivered: [2],
		position: '51'
	},
	4: {
		title: 'More deliveries',
		description: `Lets practice that a bit more.
		<br><br>This time, use a combination of functions to deliver to house 1 and 2`,
		docs: ['move', 'deliver'],
		delivered: [1, 2]
	},
	5: {
		title: 'Turning the corner',
		description: `Ok, so now lets move a little further.
		<br><br>In order to turn the corner and walk to the other houses, we need a new function. Use the <em>turn()</em> function to make the postman turn, however you 
		need to add 'L' or 'R' inside the brackets to turn left or right respectively.
		<br><br>For example, turn right by adding <em>turn('R')</em>
		<br>For this task simply walk to house 3`,
		docs: ['move', 'deliver', 'turn'],
		delivered: [],
		position: '62'
	},
	6: {
		title: 'Even more deliveries..',
		description: `Ok, so this time you need to deliver a letter to houses 1 and 3. You will need to use <em>move()</em>, <em>turn()</em> and <em>deliverLetter()</em> to achieve this`,
		docs: ['move', 'deliver', 'turn'],
		delivered: [1, 3]
	},
	7: {
		title: 'The big walk!',
		description: `Ok, so use your <em>move()</em> and <em>turn()</em> functions to walk all the way round the road, passing every house. Finish on the exact same spot that you started`,
		docs: ['move', 'deliver', 'turn'],
		delivered: [],
		position: '11'
	},
	8: {
		title: 'Introducing for loops',
		description: `great work!
		<br><br>Now, looking at that code, there is quite alot of duplication, which 
		can quickly become messy and hard to maintain. Is there a simpler way?
		<br><br>In Javascript, you can use a <strong>for loop</strong> to make code repeat multiple times. This is how it looks:
		<br><br>for (var i = 0; i < 3; i++) {
		<br>&emsp;move();
		<br>}
		<br><br>This looks complicated, but it will simply repeat all the code inside the curly braces, in this example the <em>move()</em> function. It will repeat 3 times because we set this in the rules of the loop (the <em>i < 3</em> bit).
		<br>Add this example code to test out a for loop`,
		docs: ['move', 'deliver', 'turn'],
		delivered: [],
		position: '41'
	},
	9: {
		title: 'Walk the circuit again',
		description: `Now that you have built a for loop, you can adapt it to achieve more. For this task, you need to once more walk the loop, passing each house. 
		<br><br>You will need to adapt the code inside the for loop, as well as the number of times to repeat`,
		docs: ['move', 'deliver', 'turn'],
		delivered: [],
		position: '11'
	},
	10: {
		title: 'Deliver that mail!',
		description: `Ok, this is it, time to do the rounds!
		<br><br>We have learnt how to call functions, letting us walk, turn and deliver. We have also learnt how to use a for loop to repeat tasks. Now lets use them all together!
		<br><br>So, to complete this task and section, deliver a letter to every house in the street. Good luck!`,
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