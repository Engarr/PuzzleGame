const puzzle = document.querySelectorAll('.puzzle');
const gameBoard = document.querySelector('.game-board');
const gameStatus = [
	[puzzle[0], puzzle[1], puzzle[2], puzzle[3]],
	[puzzle[4], puzzle[5], puzzle[6], puzzle[7]],
	[puzzle[8], puzzle[9], puzzle[10], puzzle[11]],
	[puzzle[12], puzzle[13], puzzle[14], puzzle[15]],
];

function changePuzzle(gameBoard, gameStatus) {
	gameStatus.forEach((row, rowIndex) => {
		row.forEach((column, columnIndex) => {
			column.style.top = `${rowIndex * 100.5}px`;
			column.style.left = `${columnIndex * 100.5}px`;

			column.style[`background-position-y`] = `-${rowIndex * 100}px`;
			column.style[`background-position-x`] = `-${columnIndex * 100}px`;

			gameBoard.appendChild(column);
		});
	});
}

function movepuzzle(puzzle1, puzzle2) {
	const tempTop = puzzle1.style.top;
	const tempLeft = puzzle1.style.left;

	puzzle1.style.top = puzzle2.style.top;
	puzzle1.style.left = puzzle2.style.left;
	puzzle2.style.top = tempTop;
	puzzle2.style.left = tempLeft;
}
gameBoard.addEventListener('click', (e) => {
	const target = e.target;
	let x, y;

	gameStatus.forEach((row, rowIndex) => {
		row.forEach((column, columnIndex) => {
			if (column === target) {
				x = rowIndex;
				y = columnIndex;
			}
		});
	});

	let emptyX, emptyY;
	gameStatus.forEach((row, rowIndex) => {
		row.forEach((column, columnIndex) => {
			if (column.innerText == '') {
				emptyX = rowIndex;
				emptyY = columnIndex;
			}
		});
	});

	if (
		(y === emptyY && (x + 1 === emptyX || x - 1 === emptyX)) ||
		(x === emptyX && (y + 1 === emptyY || y - 1 === emptyY))
	) {
		movepuzzle(gameStatus[x][y], gameStatus[emptyX][emptyY]);
		const temp = gameStatus[x][y];
		gameStatus[x][y] = gameStatus[emptyX][emptyY];
		gameStatus[emptyX][emptyY] = temp;
	}
});
changePuzzle(gameBoard, gameStatus);
