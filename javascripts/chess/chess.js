/**
 * TODOs
 * Visual:
 * -Make the occupied square one color and all attacking squares another (for testing)
 * -Overwrite the orange stroke as necessary
 *
 * Logic:
 * - is the king in check
 * - is the piece pinned (moving it in a certain direction leaves the king in check)
*/

$(document).ready(function() {
	var $board = $('#chessboard');

	// TODO: what if height !== width?
	var height = parseInt($board.css('height'));
	var width = parseInt($board.css('width'));
	var squareSize = height/10;
	var lineWidth = 5;
	var markedSquares = new Set();

	$board.on('click', function(e) {
		var x = e.offsetX;
		var y = e.offsetY;

		// make sure the user clicked on the board
		if (x > squareSize && y > squareSize && x < 9 * squareSize && y < 9 * squareSize) {
			var square = getSquare(x, y);  
			var c = getCoordinates(square[0], square[1]);
			ctx.rect(c[0] +lineWidth/2, c[1] + lineWidth/2, squareSize - lineWidth, squareSize - lineWidth);			
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = "orange";
			ctx.stroke();
			var index = squareToIndex(square);
			console.log(gameBoard[index - 1]);
			// for (var ms of markedSquares.keys()) {
			// 	var oldSquare = indexToSquare(ms);
			// 	var oldCoordinates = getCoordinates(oldSquare[0], oldSquare[1]);
			// 	console.log(oldSquare);
			// 	if ((oldSquare[0] + oldSquare[1]) % 2 === 1) {
			// 		ctx.fillStyle = "#999";
			// 	}
			// 	else {
			// 		ctx.fillStyle = "#444";
			// 	}
			// 	ctx.fillRect(oldSquare[0] * squareSize, (9 - oldSquare[1]) * squareSize, squareSize, squareSize);
			// 	markedSquares.delete(ms);
			// }
			// markedSquares.add(index);
			// console.log(markedSquares);
		}		
	});

	$('input[type=radio]').change(function() {
		if (this.value === 'white') {
			whiteDownNextGame = true;
		}
		else {
			whiteDownNextGame = false;
		}
	});

	$('.btn').on('click', function() {
		if ($('#radio-white').is(':checked')) {
			whiteDown = true;
			drawWhite();
		}
		else {
			whiteDown = false;
			drawBlack();
		}

	});

	var board = $board[0];
	var ctx = board.getContext('2d');

	// piece objects
	// king objects don't need to be arrays, I guess
	var wB = [],
		wN = [],
		wK = [],
		wP = [],
		wQ = [],
		wR = [];
		bB = [],
		bN = [],
		bK = [],
		bP = [],
		bQ = [],
		bR = [];

	var colors = ['w', 'b'];

	var whitePieces = {'B' : wB, 'N' : wN, 'K' : wK, 'P' : wP, 'Q' : wQ, 'R' : wR};
	var blackPieces = {'B' : bB, 'N' : bN, 'K' : bK, 'P' : bP, 'Q' : bQ, 'R' : bR};

	var allPieces = {'wB' : [], 'wN' : [], 'wK' : [], 'wP' : [], 'wQ' : [], 'wR' : [], 'bB' : [], 'bN' : [], 'bK' : [], 'bP' : [], 'bQ' : [], 'bR' : [] };

	var files = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ''];
	var ranks = ['', '1', '2', '3', '4', '5', '6', '7', '8', ''];

	var pieceNames = {'B' : 'Bishop', 'N' : 'Knight', 'K' : 'King', 'P' : 'Pawn', 'Q' : 'Queen', 'R' : 'Rook'};
	var pieceSymbols = {'Bishop' : 'B', 'Knight' : 'N', 'King' : 'K', 'Pawn' : 'P', 'Queen' : 'Q', 'Rook' : 'R'};
	var pieceCount = {'B': 2, 'N': 2, 'K': 1, 'P': 8, 'Q': 1, 'R': 2};

	// https://en.wikipedia.org/wiki/Chess_symbols_in_Unicode
	// var whitePieceSymbols = {'B': '♗', 'N': '♘', 'K': '♔', 'P': '♙', 'Q': '♕', 'R': '♖'};
	// var blackPieceSymbols = {'B': '♝', 'N': '♞', 'K': '♚', 'P': '♟', 'Q': '♛', 'R': '♜'};
	var pieceSymbols = {'bB': '♝', 'bN': '♞', 'bK': '♚', 'bP': '♟', 'bQ': '♛', 'bR': '♜', 'wB': '♗', 'wN': '♘', 'wK': '♔', 'wP': '♙', 'wQ': '♕', 'wR': '♖'};

	// kings and queens have arrays of length 1 for convenience in later methods
	var pieceStartingPositions = {'bB' : [[3, 8], [6, 8]],
									  'bN' : [[2, 8], [7, 8]],
									  'bK' : [[5, 8]],
									  'bP' : [[1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7]],
									  'bQ' : [[4, 8]],
									  'bR' : [[1, 8], [8, 8]],
									  'wB' : [[3, 1], [6, 1]],
									  'wN' : [[2, 1], [7, 1]],
									  'wK' : [[5, 1]],
									  'wP' : [[1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2]],
									  'wQ' : [[4, 1]],
									  'wR' : [[1, 1], [8, 1]]
									};

	// var whitePieceStartingPositions = {'wB' : [[3, 1], [6, 1]],
	// 								   'wN' : [[2, 1], [7, 1]],
	// 								   'wK' : [[5, 1]],
	// 								   'wP' : [[1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2]],
	// 								   'wQ' : [[4, 1]],
	// 								   'wR' : [[1, 1], [8, 1]]};

 //   var blackPieceStartingPositions = {'bB' : [[3, 8], [6, 8]],
	// 								  'bN' : [[2, 8], [7, 8]],
	// 								  'bK' : [[5, 8]],
	// 								  'bP' : [[1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7]],
	// 								  'bQ' : [[4, 8]],
	// 								  'bR' : [[1, 8], [8, 8]]};



	// var startingPositions = [whitePieceStartingPositions, blackPieceStartingPositions];

	// initilize all pieces
	for (var color in colors) {
		for (var pn in pieceNames) {
			var colorAndPiece = colors[color] + pn;
			for (var pc = 0; pc < pieceCount[pn]; pc++) {
				var file = pieceStartingPositions[colorAndPiece][pc][0];
				var rank = pieceStartingPositions[colorAndPiece][pc][1];
				switch (pn) {
					case 'B':
						allPieces[colorAndPiece].push(new Bishop(colors[color], file, rank, pc));
						break;
					case 'N':
						allPieces[colorAndPiece].push(new Knight(colors[color], file, rank, pc));
						break;
					case 'K':
						allPieces[colorAndPiece].push(new King(colors[color], file, rank, pc, false));
						break;
					case 'P':
						allPieces[colorAndPiece].push(new Pawn(colors[color], file, rank, pc, false));
						break;
					case 'Q':
						allPieces[colorAndPiece].push(new Queen(colors[color], file, rank, pc));
						break;
					case 'R':
						allPieces[colorAndPiece].push(new Rook(colors[color], file, rank, pc, false));
						break;
				}
			}
		}
	}

	var occupiedSquares = new Set();

	// console.log(bP[0].moves);
	// console.log(whitePieces);

	var gameBoard = initializeBoard();

	var whiteDown = true;
	var whiteDownNextGame = true;

	drawWhite();

	// console.log(occupiedSquares);

	ctx.fillStyle = "#FFF";

	/**
	 * Initializes a board by creating an 8x8 grid of Square objects
	 * @return {Square[]} gameBoard - A 1-d array of 64 squares
	 */
	function initializeBoard() {
		var gameBoard = [];
		for (var r = 1; r <= 8; r++) {
			for (var f = 1; f <= 8; f++) {
				gameBoard.push(new Square(f, r, false, null, null));
			}
		}
		return gameBoard;
	}

	/**
	 * Draw the board with white at the bottom
	 */
	function drawWhite() {

		whiteDown = true;
		
		// redraw border to overwrite existing text
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, squareSize * 10, squareSize * 10);

		ctx.textAlign = "center";
		ctx.textBaseline = "middle"; 
		ctx.font = "20px serif";

		for (var r = 0; r < 10; r++) {
			for (var f = 0; f < 10; f++) {

				// rank falls off the board 
				if (r === 0 || r === 9) {
					ctx.fillStyle = "#FFF";
					ctx.fillText(ranks[9-f], (r + 0.5) * squareSize, (f + 0.5) * squareSize);
				}

				// file falls off the board
				else if (f === 0 || f === 9) {
					ctx.fillStyle = "#FFF";
					ctx.fillText(files[r], (r + 0.5) * squareSize, (f + 0.5) * squareSize);
				}

				// draw square
				else {
					if ((r + f) % 2 === 1) {
						ctx.fillStyle = "#444";
					}
					else {
						ctx.fillStyle = "#999";
					}
					ctx.fillRect(f * squareSize, r * squareSize, squareSize, squareSize);
				}
			}
		}
		drawPieces();
	}

	/**
	 * Draw the board with black at the bottom
	 */

	function drawBlack() {

		whiteDown = false;

		// redraw border to overwrite existing text
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, squareSize * 10, squareSize * 10);

		ctx.textAlign = "center";
		ctx.textBaseline = "middle"; 
		ctx.font = "20px serif";

		for (var r = 0; r < 10; r++) {
			for (var f = 0; f < 10; f++) {

				// rank falls off the board 
				if (r === 0 || r === 9) {
					ctx.fillStyle = "#FFF";
					ctx.fillText(ranks[f], (r + 0.5) * squareSize, (f + 0.5) * squareSize);
				}

				// file falls off the board
				else if (f === 0 || f === 9) {
					ctx.fillStyle = "#FFF";
					ctx.fillText(files[9-r], (r + 0.5) * squareSize, (f + 0.5) * squareSize);
				}

				// draw square
				else {
					if ((r + f) % 2 === 1) {
						ctx.fillStyle = "#444";
					}
					else {
						ctx.fillStyle = "#999";
					}
					ctx.fillRect(f * squareSize, r * squareSize, squareSize, squareSize);
				}
			}
		}
		drawPieces();
	}

	/**
	 * Draws the pieces on the board
	 */

	function drawPieces() {

		for (var pieceType in allPieces) {
			var pieces = allPieces[pieceType];
			// console.log(pieces);
			for (var i in pieces) {
				var piece = pieces[i];
				var file = piece._file;
				var rank = piece.rank;
				var index = squareToIndex([file, rank]);
				var square = gameBoard[index - 1];
				square.occupyingPiece = piece;
				square.occupyingPieceName = pieceType + i;
				occupiedSquares.add(index);

				// draw the piece in the correct color
				if (pieceType[0] === 'w') {
					ctx.fillStyle = "#FFF";
				}
				else {
					ctx.fillStyle = "#000";
				}
				var symbol = pieceSymbols[pieceType];
				drawOnSquare(file, rank, symbol);
			}
		}
	}

	/**
	 * Maps the rank and file of a square to an integer that is unique among other squares
	 * @param {number} file - the square's file: 1 - 8
	 * @param {number} rank - the square's rank: 1 - 8
	 * @return {number} index - the indicex of the square: 1 - 64
	 */

	// function squareToIndex(file, rank) {
	// 	console.log('hi');
	// 	return (rank - 1) * 8 + file;
	// }

	/**
	 * Maps the rank and file of a square to an integer that is unique among other squares
	 * @param {number[]} square - the square's file, two numbers: 1 - 8
	 * @return {number} index - the indicex of the square: 1 - 64
	 */

	function squareToIndex(square) {
		return (square[1] - 1) * 8 + square[0];
	}

	/**
	 * Maps the rank and file of a square to an integer that is unique among other squares
	 * @param {number} index - the indicex of the square: 1 - 64
	 * @return {number[]} square - the indices of the square in the form [file, rank]
	 */

	function indexToSquare(index) {
		var file = index % 8 === 0 ? 8 : index % 8;
		// if (file === 0)
		return [file, Math.ceil(index / 8)];
	}

	/**
	 * Maps the x and y co-ordinates to a 8x8 grid with 1-indexing
	 * @param {number} x - e.offsetX
	 * @param {number} y - e.offsetY
	 * @return {number[]} square - the indices of the square in the form [file, rank]
	 */

	function getSquare(x, y) {
		var file = Math.floor(x/squareSize);
		var rank = Math.floor(y/squareSize);
		if (whiteDown) {
			var square = [file, 9 - rank];
		}
		else {
			var square = [9-file, rank];
		}
		return square;
	}

	/**
	 * Maps the rank and file of a square to x and y co-ordinates corresponding with its offset
	 * @param {number} file - the square's file: 1 - 8
	 * @param {number} rank - the square's rank: 1 - 8
	 * @return {number[]} offset - the offset of the square in the form [x, y]
	 */

	function getCoordinates(file, rank) {
		if (whiteDown) {
			var x = file * squareSize;
			var y = (9 - rank) * squareSize;
		}
		else {
			var x = (9 - file) * squareSize;
			var y = rank * squareSize;
		}
		return [x, y];
	}

	/**
	 * Draws on the square at the given co-ordinates
	 * @param {number} file - the square's file: 1 - 8
	 * @param {number} rank - the square's rank: 1 - 8
	 * @param {String} symbol - what to draw on the square
	 */

	function drawOnSquare(file, rank, symbol) {
		var coordinates = getCoordinates(file, rank);
		// ctx.fillStyle = "#000FFF";
		ctx.font = squareSize + "px serif";
		// ctx.fillText(image, 210, 540);
		ctx.fillText(symbol, coordinates[0] + (0.5 * squareSize), coordinates[1] + (0.5 * squareSize));
		// ctx.drawImage(image, coordinates[0] + (0.5 * squareSize), coordinates[1] + (0.5 * squareSize));
	}

	/**
	 * Draws on the square at the given co-ordinates
	 * @param {number} file - the square's file: 1 - 8
	 * @param {number} rank - the square's rank: 1 - 8
	 */

	function unmarkSquare(file, rank) {
		if ((rank + file) % 2 === 1) {
			ctx.fillStyle = "#444";
		}
		else {
			ctx.fillStyle = "#999";
		}
		ctx.rect(c[0] +lineWidth/2, c[1] + lineWidth/2, squareSize - lineWidth, squareSize - lineWidth);			
		ctx.lineWidth = lineWidth;
		ctx.stroke();
	}
});
