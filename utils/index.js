const utils = {
	generateNumberBetween: (min, max) => Math.floor(Math.random()*(max-min+1)+min),
	numRow2numBlock: row => {
		//5  row
	    //4,5,6 block
	},
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
		return board.reduce((blocks, block, ind) => {
			return [ ...blocks, ...((ind - blockLine) % 3 ? [] : (
				Array.isArray(block) ?
				utils.getColumn(callLine, block)
				: [block]
			))]
		}, [])
	},
	numRow2numCallInBlock: row => {
		//5  row
	    //6,7,8 call
	    const blockLine = ~~(row / 3); //1
	    const calls = 5 % 3; //2
	},
	numColumn2numBlock: column => {

	},
	numColumn2numCallInBlock: column => {

	},
	checkRow: (row, column) => {
	    
	},
};

export default utils;