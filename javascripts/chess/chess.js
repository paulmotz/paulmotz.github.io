/**
 * TODOs
 * Visual:
 * -Make the occupied square one color and all attacking squares another (for testing)
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
		}

		// console.log(getSquare(x, y));
		
	});

	$('input[type=radio]').change(function() {
		if (this.value === 'white') {
			drawWhite();
		}
		else {
			drawBlack();
		}
	});

	var board = $board[0];
	var ctx = board.getContext('2d');

	// piece objects
	// king objects don't need to be arrays, I guess
	var wB = [];
	var wN = [];
	var wK = [];
	var wP = [];
	var wQ = [];
	var wR = [];
	var bB = [];
	var bN = [];
	var bK = [];
	var bP = [];
	var bQ = [];
	var bR = [];

	var whitePieces = {'B' : wB, 'N' : wN, 'K' : wK, 'P' : wP, 'Q' : wQ, 'R' : wR};
	var blackPieces = {'B' : bB, 'N' : bN, 'K' : bK, 'P' : bP, 'Q' : bQ, 'R' : bR};

	var files = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ''];
	var ranks = ['', '1', '2', '3', '4', '5', '6', '7', '8', ''];

	var pieceNames = {'B': 'Bishop', 'N': 'Knight', 'K': 'King', 'P': 'Pawn', 'Q': 'Queen', 'R': 'Rook'};
	var pieceCount = {'B': 2, 'N': 2, 'K': 1, 'P': 8, 'Q': 1, 'R': 2};

	// https://en.wikipedia.org/wiki/Chess_symbols_in_Unicode
	var whitePieceSymbols = {'B': '♗', 'N': '♘', 'K': '♔', 'P': '♙', 'Q': '♕', 'R': '♖'};
	var blackPieceSymbols = {'B': '♝', 'N': '♞', 'K': '♚', 'P': '♟', 'Q': '♛', 'R': '♜'};

	// kings and queens have arrays of length 1 for convenience in later methods
	var whitePieceStartingPositions = {'B' : [[3, 1], [6, 1]],
									   'N' : [[2, 1], [7, 1]],
									   'K' : [[5, 1]],
									   'P' : [[1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2]],
									   'Q' : [[4, 1]],
									   'R' : [[1, 1], [8, 1]]};

   var blackPieceStartingPositions = {'B' : [[3, 8], [6, 8]],
									  'N' : [[2, 8], [7, 8]],
									  'K' : [[5, 8]],
									  'P' : [[1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7]],
									  'Q' : [[4, 8]],
									  'R' : [[1, 8], [8, 8]]};

	// b1 = new Bishop('white', 3, 1);

	for (var pn in pieceNames) {
		for (var pc = 0; pc < pieceCount[pn]; pc++) {
			var file = whitePieceStartingPositions[pn][pc][0];
			var rank = whitePieceStartingPositions[pn][pc][1];
			switch (pn) {
				case 'B':
					wB.push(new Bishop('white', file, rank));
					break;
				case 'N':
					wN.push(new Knight('white', file, rank));
					break;
				case 'K':
					wK.push(new King('white', file, rank));
					break;
				case 'P':
					wP.push(new Pawn('white', file, rank));
					break;
				case 'Q':
					wQ.push(new Queen('white', file, rank));
					break;
				case 'R':
					wR.push(new Rook('white', file, rank));
					break;
			}
		}
	}

	for (var pn in pieceNames) {
		for (var pc = 0; pc < pieceCount[pn]; pc++) {
			var file = blackPieceStartingPositions[pn][pc][0];
			var rank = blackPieceStartingPositions[pn][pc][1];
			switch (pn) {
				case 'B':
					bB.push(new Bishop('black', file, rank));
					break;
				case 'N':
					bN.push(new Knight('black', file, rank));
					break;
				case 'K':
					bK.push(new King('black', file, rank));
					break;
				case 'P':
					bP.push(new Pawn('black', file, rank));
					break;
				case 'Q':
					bQ.push(new Queen('black', file, rank));
					break;
				case 'R':
					bR.push(new Rook('black', file, rank));
					break;
			}
		}
	}

	var whiteDown = true;
	drawWhite();

	// white pieces

	ctx.fillStyle = "#FFF";

	/**
	 * Draw the board with white at the bottom
	 */

	function drawWhite() {

		whiteDown = true;
		
		// redraw border to overwrite existing text
		// ctx.fillStyle = "#F5F5DC";
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
						// ctx.fillStyle = "#689B56";
						// ctx.fillStyle = "#302013";
						ctx.fillRect(f * squareSize, r * squareSize, squareSize, squareSize);
					}
					else {
						ctx.fillStyle = "#999";
						// ctx.fillStyle = "#ECEFD0";
						// ctx.fillStyle = "#eadabf";
						ctx.fillRect(f * squareSize, r * squareSize, squareSize, squareSize);
					}
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
		// ctx.fillStyle = "#F5F5DC";
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
						// ctx.fillStyle = "#689B56";
						ctx.fillRect(f * squareSize, r * squareSize, squareSize, squareSize);
					}
					else {
						ctx.fillStyle = "#999";
						// ctx.fillStyle = "#ECEFD0";
						ctx.fillRect(f * squareSize, r * squareSize, squareSize, squareSize);
					}
				}
			}
		}
		drawPieces();
	}

	function drawPieces() {
		// draw white pieces
		for (var pieceType in whitePieces) {
			var pieces = whitePieces[pieceType];
			for (var i in pieces) {
				var piece = pieces[i];
				var file = piece._file;
				var rank = piece.rank;
				var symbol = whitePieceSymbols[pieceType];
				drawOnSquare(file, rank, symbol);
			}
		}

		// draw black pieces
		ctx.fillStyle = "#000";
		for (var pieceType in blackPieces) {
			var pieces = blackPieces[pieceType];
			for (var i in pieces) {
				var piece = pieces[i];
				var file = piece._file;
				var rank = piece.rank;
				var symbol = blackPieceSymbols[pieceType];
				drawOnSquare(file, rank, symbol);
			}
		}
	}

	/**
	 * Maps the x and y co-ordinates to a 8x8 grid with 1-indexing
	 * @param {number} x - e.offsetX
	 * @param {number} y - e.offsetY
	 * @return {number[]} square - the indices of the square in the form [file, rank]
	 */

	function getSquare(x, y) {
		// console.log(x, y);
		var file = Math.floor(x/squareSize);
		var rank = Math.floor(y/squareSize);
		if (whiteDown) {
			var square = [file, 9 - rank];
			// var square = files[file] + (9 - rank).toString();
		}
		else {
			var square = [rank, 9 - file];
			// var square = files[9 - file] + rank.toString();
		}
		// console.log(square);
		return square;
	}

	/**
	 * Maps the rank and file of a square to x and y co-ordinates corresponding with its offset
	 * @param {number} file - the square's file: 1 - 8
	 * @param {number} rank - the square's rank: 1 - 8
	 * @return {number[]} offset - the offset of the square in the form [x, y]
	 */

	function getCoordinates(file, rank) {
		// console.log(file);
		if (whiteDown) {
			var x = file * squareSize;
			var y = (9 - rank) * squareSize;
		}
		else {
			var x = (9 - file) * squareSize;
			var y = rank * squareSize;
		}
		// console.log(x, y);
		return [x, y];
	}

	/**
	 * Draws on the square at the given co-ordinates
	 * @param {number} file - the square's file: 1 - 8
	 * @param {number} rank - the square's rank: 1 - 8
	 * @param {image} String - what to draw on the square
	 */

	function drawOnSquare(file, rank, image) {
		var coordinates = getCoordinates(file, rank);
		// console.log(coordinates);
		// ctx.fillStyle = "#000FFF";
		ctx.font = squareSize + "px serif";
		// ctx.fillText(image, 210, 540);
		ctx.fillText(image, coordinates[0] + (0.5 * squareSize), coordinates[1] + (0.5 * squareSize));
		// ctx.drawImage(image, coordinates[0] + (0.5 * squareSize), coordinates[1] + (0.5 * squareSize));
	}
});
