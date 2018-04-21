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
	512 : '#F1CB42',
	1024: '#F2C828',
	2048: '#F3C500',
	4096: '#3D3A31'
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
	for (let rowNum = 0; rowNum < BOARD_SIZE; rowNum++) {
		let oldRow = board[rowNum].reverse();
		board[rowNum] = moveTiles(oldRow).reverse();
		if (hasLineChanged(board[rowNum], oldRow)) {
			moved = true;
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
	for (let colNum = 0; colNum < BOARD_SIZE; colNum++) {
		let oldCol = [];
		for (let rowNum = BOARD_SIZE - 1; rowNum >= 0; rowNum--) {
			oldCol.push(board[rowNum][colNum]);
		}
		let newCol = moveTiles(oldCol);
		for (let rowNum = BOARD_SIZE - 1; rowNum >= 0; rowNum--) {
			board[rowNum][colNum] = newCol[BOARD_SIZE - rowNum - 1];
		}

		if (hasLineChanged(newCol, oldCol)) {
			moved = true;
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
	for (let rowNum = 0; rowNum < BOARD_SIZE; rowNum++) {
		let oldRow = board[rowNum];
		board[rowNum] = moveTiles(oldRow);
		if (hasLineChanged(board[rowNum], oldRow)) {
			moved = true;
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
	for (let colNum = 0; colNum < BOARD_SIZE; colNum++) {
		let oldCol = [];
		for (let rowNum = 0; rowNum < BOARD_SIZE; rowNum++) {
			oldCol.push(board[rowNum][colNum]);
		}
		let newCol = moveTiles(oldCol);
		for (let rowNum = 0; rowNum < BOARD_SIZE; rowNum++) {
			board[rowNum][colNum] = newCol[rowNum];
		}

		if (hasLineChanged(newCol, oldCol)) {
			moved = true;
		}
	}
	if (moved) {
		let nextOccupiedSquare = Math.floor(Math.random()*countUnoccipiedSquares(board));
		board = populateIthSquare(board, nextOccupiedSquare);
	}
	return board;
}

function moveTiles(tiles) {
	let tilesObj = [];
	for (const tile of tiles) {
		tilesObj.push({'value' : tile, 'merged' : false});
	}
	for (let i = BOARD_SIZE - 2; i >= 0; i--) {
		if (tilesObj[i].value !== '') {
			let j = i + 1;
			while (j < BOARD_SIZE - 1 && tilesObj[j].value === '') {
				j++;
			}
			if (tilesObj[j].value === tilesObj[i].value && !tilesObj[j].merged) {
				tilesObj[j].value *= 2;
				tilesObj[j].merged = true;
				tilesObj[i].value = '';
			}
			else if (tilesObj[j].value !== '') {
				if (j > i + 1) {
					tilesObj[j - 1].value = tilesObj[i].value;
					tilesObj[i].value = '';
				}
			}
			else {
				tilesObj[j].value = tilesObj[i].value;
				tilesObj[i].value = '';
			}
		}	
	}

	let newTiles = [];
	for (const tile of tilesObj) {
		newTiles.push(tile.value);	
	}
	return newTiles;
}

// moveTiles(['', '', 2, 2])
// moveTiles([2, '', 2, 2])
// moveTiles([2, 4, 2, 2])
// moveTiles([2, 4, 4, 2])
// moveTiles([4, 8, '', 8])
moveTiles([2, 4, 8, 4])

function hasLineChanged(newLine, oldLine) {
	for (let tileIndex in newLine) {
		if (newLine[tileIndex] !== oldLine[tileIndex]) {
			return true;
		}
	}
	return false;
}