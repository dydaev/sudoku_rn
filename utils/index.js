const utils = {
	generateNumberBetween: (min, max) => Math.floor(Math.random() * (max - min + 1) + min),
	getNumberRow: (numberBlock, numberCall) => ~~(numberCall / 3) + (~~(numberBlock / 3) * 3),
	getNumberColumn: (numberBlock, numberCall) => ((numberBlock % 3) * 3) + (numberCall % 3),
	getRow: (num, board) => {
		const blocksLine = ~~(num / 3);
		const blocks =  board.slice(blocksLine * 3, blocksLine * 3 + 3);

		const callLine = num % 3;
		return blocks.reduce((line, block) => 
			[ ...line, ...block.slice(callLine * 3, callLine * 3 + 3)]
			, []);
	},
	getColumn: (num, board) => {
		const blockLine = ~~(num / 3);
		const callLine = num % 3;

		return board.reduce((blocks, block, ind) =>
			[ ...blocks, ...((ind - blockLine) % 3 ? [] : (
				Array.isArray(block)
				? utils.getColumn(callLine, block)
				: [block]
			))]
		, [])
	},
	isValueInArray: (value, callsArray) => !callsArray.every(call => call.value !== value),
};

export default utils;