'use strict'

const BOARD_SIZE = 4;
const colours = {
	''  : '#CFC1B4',
	2   : '#F0E4D8',
	4   : '#EFE1C7',
	8   : '#FCAF72',
	16  : '#FF8F57',
	32  : '#FF7050',
	64  : '#FF4613',
	128 : '#EFD26A',
	256 : '#EFCF56',
	512 : 'orange',
	1024: 'orange',
	2048: 'orange',
	4096: 'orange'
}

$(document).ready(function() {
	for (let i = 0; i < BOARD_SIZE; i++) {
		for (let j = 0; j < BOARD_SIZE; j++) {
			// $('.game').append(`<div id=square-${i*BOARD_SIZE+j}></div>`);
			$('.game').append(`<div class=square id=square-${i*BOARD_SIZE+j}></div>`);
		}
	}
	let board = newBoard();
	drawBoard(board);
	$('body').keyup(function(e) {
		board = move(e.keyCode, board);
		drawBoard(board);
	});
});

function twoOrFour() {
	return Math.random() < 0.75 ? 2 : 4;
}

function countUnoccipiedSquares(board) {
	let count = 0;
	for (let i = 0; i < BOARD_SIZE; i ++) {
		for (let j = 0; j < BOARD_SIZE; j++) {
			if (board[i][j] === "") {
				count++;
			}
		}
	}
	return count;
}

function populateIthSquare(board, i) {
	let counter = 0;
	for (let j = 0; j < BOARD_SIZE; j ++) {
		for (let k = 0; k < BOARD_SIZE; k++) {
			if (counter === i && board[j][k] === '') {
				board[j][k] = twoOrFour();
				return board;
			} else if (board[j][k] === '') {
				counter++;
			}
		}
	}
}

function newBoard() {
	let board = [];
	for (let i = 0; i < BOARD_SIZE; i++) {
		board.push(['', '', '', '']);
		// board.push(Array.apply(null, new Array(BOARD_SIZE)).map(Number.prototype.valueOf,0));
	}
	let firstOccupiedSquare = Math.floor(Math.random()*countUnoccipiedSquares(board));
	board = populateIthSquare(board, firstOccupiedSquare);
	let secondOccupiedSquare = Math.floor(Math.random()*countUnoccipiedSquares(board));
	board = populateIthSquare(board, secondOccupiedSquare);
	return [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], [4, 2, 2, '']];
	return board;
}

function padNumber(number, stringLength) {
	let paddingNeeded = stringLength - number.toString().length + 1;
	return Array(paddingNeeded).join(' ') + number;
}

function drawBoard(board) {
	let str = '';
	for (let i = 0; i < BOARD_SIZE; i++) {
		for (let j = 0; j < BOARD_SIZE; j++) {
			let $currSquare = $(`#square-${i*BOARD_SIZE+j}`)
			$currSquare.text(board[i][j]);
			let currNum = $currSquare.html();
			$currSquare.css('background-color', colours[currNum]);
		}
	}
}

function move(keyCode, board) {
	let direction;
	switch (keyCode) {
		case 37:
			return moveLeft(board);
		case 38:
			return moveUp(board);
		case 39:
			return moveRight(board);
		case 40: 
			return moveDown(board);
		default:
			return board;
	}
}

function moveLeft(board) {
	let moved = false;
	for (let row of board) {
		for (let i = 1; i < BOARD_SIZE; i++) {
			if (row[i] !== '') {
				let colsLeft = 0;
				while (i + colsLeft > 0 && row[i + colsLeft - 1] === '') {
					colsLeft--;
					moved = true;
				}
				if (row[i] === row[i + colsLeft - 1]) {
					moved = true;
					row[i] = '';
					row[i + colsLeft - 1] *= 2;
				} else if (row[i + colsLeft] === '') {
					row[i + colsLeft] = row[i];
					row[i] = '';
				}
			}
		}
	}
	if (moved) {
		let nextOccupiedSquare = Math.floor(Math.random()*countUnoccipiedSquares(board));
		board = populateIthSquare(board, nextOccupiedSquare);
	}
	return board;
}

function moveUp(board) {
	let moved = false;
	for (let colIndex = 0; colIndex < BOARD_SIZE; colIndex++) {
		for (let rowIndex = 1; rowIndex < BOARD_SIZE; rowIndex++) {
			if (board[rowIndex][colIndex] !== '') {
				let rowsUp = 0;
				while (rowIndex + rowsUp > 0 && board[rowIndex + rowsUp - 1][colIndex] === '') {
					rowsUp--;
					moved = true;
				}
				if (board[rowIndex + rowsUp - 1] && board[rowIndex][colIndex] === board[rowIndex + rowsUp - 1][colIndex]) {
					moved = true;
					board[rowIndex][colIndex] = '';
					board[rowIndex + rowsUp - 1][colIndex] *= 2;
				} else if (board[rowIndex + rowsUp][colIndex] === '') {
					board[rowIndex + rowsUp][colIndex] = board[rowIndex][colIndex];
					board[rowIndex][colIndex] = '';
				}
			}
		}
	}
	if (moved) {
		let nextOccupiedSquare = Math.floor(Math.random()*countUnoccipiedSquares(board));
		board = populateIthSquare(board, nextOccupiedSquare);
	}
	return board;
}

function moveRight(board) {
	let moved = false;
	for (let row of board) {
		for (let i = BOARD_SIZE - 2; i >= 0; i--) {
			if (row[i] !== '') {
				let colsRight = 0;
				while (i + colsRight < BOARD_SIZE && row[i + colsRight + 1] === '') {
					colsRight++;
					moved = true;
				}
				if (row[i] === row[i + colsRight + 1]) {
					moved = true;
					row[i] = '';
					row[i + colsRight + 1] *= 2;
				} else if (row[i + colsRight] === '') {
					row[i + colsRight] = row[i];
					row[i] = '';
				}
			}
		}
	}
	if (moved) {
		let nextOccupiedSquare = Math.floor(Math.random()*countUnoccipiedSquares(board));
		board = populateIthSquare(board, nextOccupiedSquare);
	}
	return board;
}

function moveDown(board) {
	let moved = false;
	for (let colIndex = 0; colIndex < BOARD_SIZE; colIndex++) {
		for (let rowIndex = BOARD_SIZE - 2; rowIndex >= 0; rowIndex--) {
			if (board[rowIndex][colIndex] !== '') {
				let rowsDown = 0;
				while (rowIndex + rowsDown < BOARD_SIZE - 1 && board[rowIndex + rowsDown + 1][colIndex] === '') {
					rowsDown++;
					moved = true;
				}
				if (board[rowIndex + rowsDown + 1] && board[rowIndex][colIndex] === board[rowIndex + rowsDown + 1][colIndex]) {
					moved = true;
					board[rowIndex][colIndex] = '';
					board[rowIndex + rowsDown + 1][colIndex] *= 2;
				} else if (board[rowIndex + rowsDown][colIndex] === '') {
					board[rowIndex + rowsDown][colIndex] = board[rowIndex][colIndex];
					board[rowIndex][colIndex] = '';
				}
			}
		}
	}
	if (moved) {
		let nextOccupiedSquare = Math.floor(Math.random()*countUnoccipiedSquares(board));
		board = populateIthSquare(board, nextOccupiedSquare);
	}
	return board;
}

function moveTiles(tiles) {
	for (let i = 0; i < tiles.length; i++) {
		
	}
}
