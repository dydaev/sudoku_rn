const utils = {
	uniq: a => [...new Set(a)],
	shakeArr:  arr => arr.sort(() => 0.5-Math.random()),
	getColumn:  (rows, indexColumn) => rows.map(row => row[indexColumn]),
	getRandom:  (min, max) => Math.floor(Math.random() * (max - min + 1) + min),
	checkSquare:  (rows, indexColumn, num) => utils.getSquare(rows,indexColumn).includes(num),
	checkColumns:  (rows, row) => row.some((call, index) => rows.some(arr => arr[index] === call)),
	arrayCleaner:  (arr, badNumbers) => {
		badNumbers.forEach(badNumber => arr.splice(arr.indexOf(badNumber), 1));
		return arr;
	},
	getRandomNum: (exept1, exept2 = []) => {
		let arr = [1,2,3,4,5,6,7,8,9];

		const exept = exept1.concat(exept2);
		exept.forEach(exeptNum => {
		    const ind = arr.indexOf(exeptNum);
		    return ind >= 0 ? arr.splice(ind, 1) : arr
		})

		const res = arr[Math.floor(Math.random() * (arr.length))];
		return res;
	},
	getSquare: (rows, indexColumn, indexLine) => {
		const indexRow = indexLine || rows.length;

		const startLine = ~~(indexRow / 3) * 3;

		const startColumn = ~~(indexColumn / 3) * 3;
		const endColumn = startColumn + 3;

		let block = [];
		for (let rowIndex = startLine; rowIndex < indexRow ; rowIndex++) {
		    block = Array.isArray(rows[0]) ? [ ...block, ...rows[rowIndex].slice(startColumn, endColumn) ] : [ ...block ];
		}

		return block
	},
	getRows: (rows, row) => {
	    const newRows = utils.checkColumns(rows, row) ? [ ...rows ] : (row.length ? [ ...rows, row ] : [ ...rows ]);

	    if (newRows.length === 9) return newRows;

	    let attempt = 0;
	    let newLine;
	    do {
	        attempt++;
	        newLine = utils.getLine(newRows, [])
	        if (attempt > 2) {
	            newRows.pop();
	            attempt = 0;
	        }
	    } while (newLine === undefined)

	    return utils.getRows(newRows, newLine);
	},
	getLine: (rows, row) => {
		let possibleNums=[1,2,3,4,5,6,7,8,9];
	    const indexRow = rows.length;
	    const indexColumn = row.length;

	    let impossibleNums = utils.getSquare(rows, indexColumn).concat(utils.getColumn(rows, indexColumn), row);

	    impossibleNums = utils.uniq(impossibleNums);

	    possibleNums = utils.arrayCleaner(possibleNums, impossibleNums);
	    possibleNums = utils.shakeArr(possibleNums);

	    if (row.length === 8 && possibleNums.length === 1) return [ ...row, possibleNums[0] ];

	    let result;
	    while (possibleNums.length && !result) {
	        result = utils.getLine(rows, [ ...row, possibleNums.shift() ]);
	    }
	    return result;
	},
	LinesBlocksConverter: board => {
		return board.reduce((blocks, line, indexLine) => {
	        const blockLine = ~~(indexLine / 3) * 3;

	        do {
	            let blockIndex = ((-1 * line.length) + 9) / 3;
	            blocks[blockLine + blockIndex] = [...blocks[blockLine + blockIndex], ...line.splice(0, 3)]
        	} while (line.length)
	        return blocks
	    }, new Array(9).fill([]))
	},
};

export default utils;