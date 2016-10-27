/**
 * TODOs
 *
 * Logic:
 * - add castling rule checks (can't castle through check or if in check)
 * - pawn promotion
 * - add en passant
 * - is the king in check
 * - is the piece pinned (moving it in a certain direction leaves the king in check)
 * - draw rules
*/

var allPieces;

$(document).ready(function() {
	var $board = $('#chessboard');
	var delay = 0;

	// TODO: what if height !== width?
	// visual/layout variables
	var height = parseInt($board.css('height'));
	var width = parseInt($board.css('width'));
	var squareSize = height/10;
	var lineWidth = 5;

	var markedSquares = new Set();

	var board = $board[0];
	var ctx = board.getContext('2d');
	var files = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ''];
	var ranks = ['', '1', '2', '3', '4', '5', '6', '7', '8', ''];

	// game/logic variables

	// used for checking 50-move draw rule
	var moveCounter;

	// the two players' colors
	var colors = ['w', 'b'];

	var pieceNames = {'B' : 'Bishop', 'N' : 'Knight', 'K' : 'King', 'P' : 'Pawn', 'Q' : 'Queen', 'R' : 'Rook'};
	var pieceAbbreviations = {'Bishop' : 'B', 'Knight' : 'N', 'King' : 'K', 'Pawn' : 'P', 'Queen' : 'Q', 'Rook' : 'R'};
	var pieceCount = {'B': 2, 'N': 2, 'K': 1, 'P': 8, 'Q': 1, 'R': 2};

	// https://en.wikipedia.org/wiki/Chess_symbols_in_Unicode
	var pieceSymbols = {'bB': '♝', 'bN': '♞', 'bK': '♚', 'bP': '♟', 'bQ': '♛', 'bR': '♜', 'wB': '♗', 'wN': '♘', 'wK': '♔', 'wP': '♙', 'wQ': '♕', 'wR': '♖'};

	// kings and queens have arrays of length 1 for convenience in later methods
	var pieceStartingPositions = {'wB' : [[3, 1], [6, 1]],
									  'wN' : [[2, 1], [7, 1]],
									  'wK' : [[5, 1]],
									  'wP' : [[1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2]],
									  'wQ' : [[4, 1]],
									  'wR' : [[1, 1], [8, 1]],
									  'bB' : [[3, 8], [6, 8]],
									  'bN' : [[2, 8], [7, 8]],
									  'bK' : [[5, 8]],
									  'bP' : [[1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7]],
									  'bQ' : [[4, 8]],
									  'bR' : [[1, 8], [8, 8]]
									};


	var piecePositions = {};

	var occupiedSquares;
	
	// var piecePositions = jQuery.extend({}, pieceStartingPositions);

	// represent all pieces as entries in arrays for dynamic access (kings could have been single entry)
	allPieces = {'wB' : [], 'wN' : [], 'wK' : [], 'wP' : [], 'wQ' : [], 'wR' : [], 'bB' : [], 'bN' : [], 'bK' : [], 'bP' : [], 'bQ' : [], 'bR' : [] };

	// create an array of 64 square objects
	var gameBoard = initializeBoard();

	var whiteDown = true;
	var whiteToMove = true;

	var markedSquares = new Set();

	$('.btn').on('click', function() {
		if ($('#radio-white').is(':checked')) {
			whiteDown = true;
		}
		else {
			whiteDown = false;
		}
		newGame();

	});

	newGame();
	
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
	 * Initializes all the pieces 
	 */

	function initializePieces() {

		// reset allPieces object
		for (var key in allPieces) {
			allPieces[key] = [];
		}
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
	}

	/**
	 * Draw the board
	 */

	function drawBoard() {

		// redraw border to overwrite existing text
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, squareSize * 10, squareSize * 10);

		ctx.textAlign = "center";
		ctx.textBaseline = "middle"; 
		ctx.font = "20px serif";

		for (var r = 0; r < 10; r++) {
			for (var f = 0; f < 10; f++) {

				var fileIndex = whiteDown ? f : 9 - f;
				var rankIndex = whiteDown ? 9 - r : r;

				// rank falls off the board, write the file name
				if (r === 0 || r === 9) {
					ctx.fillStyle = "#FFF";
					ctx.fillText(files[fileIndex], (f + 0.5) * squareSize, (r + 0.5) * squareSize);
				}

				// file falls off the board, write the rank name
				else if (f === 0 || f === 9) {
					ctx.fillStyle = "#FFF";
					ctx.fillText(ranks[rankIndex], (f + 0.5) * squareSize, (r + 0.5) * squareSize);
				}

				// draw square
				else {
					if ((f + r) % 2 === 1) {
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
		occupiedSquares = Array(64); // reset the occupied squares if it is a new game
		for (var pieceType in allPieces) {
			var pieces = allPieces[pieceType];
			for (var i in pieces) {
				var piece = pieces[i];
				var file = piece._file;
				var rank = piece.rank;
				var index = squareToIndex([file, rank]);
				occupiedSquares[index - 1] = pieceType + i;
				var symbol = pieceSymbols[pieceType];
				drawOnSquare(file, rank, symbol, pieceType[0]);
			}
		}
	}

	/**
	 * Starts a new game
	 */

	function newGame() {
		moveCounter = 0;
		initializePieces();
		drawBoard();

		// initialize piecePositions array based on starting positions
		for (var key in pieceStartingPositions) {
			piecePositions[key] = [];
			for (var i in pieceStartingPositions[key]) {
				piecePositions[key].push(pieceStartingPositions[key][i]);
			}
		}

		var whiteInCheckmate = false;
		var blackInCheckmate = false;
		var count = 0; // to prevent infinite loops during development
		move('w');
		// while (!whiteInCheckmate && !blackInCheckmate && count < 1000) {
		// 	whiteMove();
		// 	blackMove();
		// 	count++; 
		// }
	}

	/**
	 * Generates or listens for a move
	 */

	function move(color) {

		console.log(allPieces);
		console.log(occupiedSquares);

		// isCheckMate();
		moveCounter++;
		checkDraw();

		// if human is moving, allow him/her to move
		if (whiteDown && color === 'w' || !whiteDown && color === 'b') {
			var fromTo = [];
			var moves = [];
			var selectedPiece = '';
			$board.on('click', function(e) {
				var x0 = e.offsetX;
				var y0 = e.offsetY;

				if (x0 > squareSize && y0 > squareSize && x0 < 9 * squareSize && y0 < 9 * squareSize) {
					var square = getSquare(x0, y0);
					var index = squareToIndex(square);					
					fromTo.push(index);

					// if the two clicked squares represent a valid move, move the piece
					if (moves.indexOf(index) !== -1) {

						var nextMove =  {'piece' : selectedPiece.slice(0, 2), 'id' : selectedPiece[2], 'move' : square};
						movePiece(nextMove);

						var pieceType = selectedPiece[1];

						// if a king or rook moves, set its hasMoved status to true
						if (pieceType === 'K' || pieceType === 'R' && !allPieces[selectedPiece.slice(0, 2)][selectedPiece[2]].hasMoved) {
							allPieces[selectedPiece.slice(0, 2)][selectedPiece[2]].hasMoved = true;
						}

						// if (pieceType === 'K' && Math.abs(fromTo[0] - fromTo[1]) === 2) {
						// 	castleRook(color, fromTo);
						// }

						// kingside castling
						if (pieceType === 'K' && fromTo[0] - fromTo[1] === -2) {
							if (color === 'w') {
								var rookMove = {'piece' : 'wR', 'id' : 1, 'move' : [6, 1]};
							}
							else {
								var rookMove = {'piece' : 'bR', 'id' : 1, 'move' : [6, 8]};
							}
							movePiece(rookMove);
						}

						// queenside castling
						if (pieceType === 'K' && fromTo[0] - fromTo[1] === 2) {
							if (color === 'w') {
								var rookMove = {'piece' : 'wR', 'id' : 0, 'move' : [4, 1]};
							}
							else {
								var rookMove = {'piece' : 'bR', 'id' : 0, 'move' : [4, 8]};
							}
							movePiece(rookMove);
						}

						fromTo = [];

						
						allPieces[selectedPiece.slice(0, 2)][selectedPiece[2]].moves(occupiedSquares);

						// TODO: this prevents multiple click events being bound to the board.
						// However, I REALLY don't like this solution.
						$(this).off(e);
						if (color === 'w') move('b');
						else move('w');
					}

					// reset the move sequence if it is invalid
					else if (fromTo.length === 2) {
						for (var s in fromTo) {
							redrawSquare(fromTo[s]);
						}
						fromTo = [];
					}

					// the piece in the first square the user clicked
					else {
						selectedPiece = occupiedSquares[index - 1];
					}
					
					// if the clicked square has a piece of the correct color in it, get its moves
					if (selectedPiece && selectedPiece[0] === color && fromTo.length === 1) {
						ctx.beginPath();
						var c = getCoordinates(square[0], square[1]);
						ctx.rect(c[0] +lineWidth/2, c[1] + lineWidth/2, squareSize - lineWidth, squareSize - lineWidth);			
						ctx.lineWidth = lineWidth;
						ctx.strokeStyle = "orange";
						ctx.stroke();
						ctx.closePath();
						var pieceName = selectedPiece.slice(0, 2);
						var id = selectedPiece[2]; // only need one digit since id can never be greater than 9 (8 pawns promoted to B/N/R)
						moves = allPieces[pieceName][id].moves(occupiedSquares).map(squareToIndex);
					}	

					// reset move to empty array so that the next click will be the "from" part of the move
					else {
						fromTo = [];
					}
				}
			});
		}

		// if computer is moving, pick a random move
		else {

			// construct array of possible moves
			var moves = [];
			for (pieceTypes in allPieces) {
				var pieceType = pieceTypes[1];

				// only get moves from the correct color of pieces
				if (pieceTypes[0] === color) {
					var pieceArray = allPieces[pieceTypes];
					for (var piece in pieceArray) {
						var pieceMoves = pieceArray[piece].moves(occupiedSquares);
						for (var i in pieceMoves) {
							var m =  {'piece' : pieceTypes, 'id' : pieceArray[piece].id, 'move' : pieceMoves[i]};
							moves.push(m);
						}
					}
				}
			}
			var numMoves = moves.length;
			var r = Math.floor(Math.random() * numMoves);
			console.log(moves);
			console.log(moves[r]);
			setTimeout(function() { movePiece(moves[r]) }, delay);
			if (color === 'w') move('b');
			else move('w');
		}
	}

	/**
	 * Moves a piece on the board
	 * @param {object} move - an object consisting of the piece, its id (an int) and the square to move to
	 */

	function movePiece(move) {

		// pawn moves reset the fifty-move rule counter
		if (move.piece[1] === 'P') {
			moveCounter = 0;
		}

		var color = move.piece[0];
		var piece = move.piece;
		var id = move.id;
		var file = move.move[0];
		var rank = move.move[1];
		var newIndex = squareToIndex(move.move);

		if (occupiedSquares[newIndex - 1]) {
			capturePiece(occupiedSquares[newIndex  - 1], move.move);
		}

		var symbol = pieceSymbols[piece];
		drawOnSquare(file, rank, symbol, color);

		var oldSquare = piecePositions[piece][id];
		var oldIndex = squareToIndex(oldSquare);
		piecePositions[piece][id] = move.move; // update position of piece

		// console.log(allPieces);
		// console.log("move piece: " + piece + " " + id);

		var pieceType = allPieces[piece];

		// find piece with matching id (can't use indices since capturing shifts)
		for (var p = 0; p < pieceType.length; p++) {
			// console.log(pieceType[p].id);
			// console.log(id);

			// different type (.id is a string, id is a number), so use == operator
			if (pieceType[p].id == id) {
				// console.log('t');
				// console.log(move);
				// console.log(pieceType[p].id);
				allPieces[piece][p].file = move.move[0];
				allPieces[piece][p].rank = move.move[1];
				console.log(allPieces[piece][pieceType[p].id]);
			}
		}

		// console.log(allPieces);
		// console.log("move piece: " + piece + " " + id);

		occupiedSquares[oldIndex - 1] = null;
		occupiedSquares[newIndex - 1] = piece + id;
		drawOverPiece(oldSquare);
		updateMoves(piece, id);
	}

	/**
	 * Removes a piece from the board and the game
	 * @param {String} pieceToCapture - the string representation (colorPieceIndex) of the piece being captured
	 * @index {number[]} square - the indices of the square of the piece being captured in the form [file, rank]
	 */

	function capturePiece(pieceToCapture, square) {

		// console.log(pieceToCapture);

		// captures reset the fifty-move rule counter
		moveCounter = 0;

		var piece = pieceToCapture.slice(0, 2);
		var i = pieceToCapture[2];
		var pieceType = allPieces[piece];
		pieceType.splice(pieceType.indexOf(pieceType[i]), 1);
		// console.log(allPieces);
		drawOverPiece(square);
	}

	/**
	 * Checks to see if the game is a draw
	 */

	function checkDraw() {
		checkDrawIn();
		checkDrawRep();
		checkDraw50();
		isStalemate();
	}

	/**
	 * Checks to see if the game is a draw by insufficient mating material
	 */

	function checkDrawIn() {

	}

	/**
	 * Checks to see if the game is a draw by repetition
	 */

	function checkDrawRep() {

	}

	/**
	 * Checks to see if the game is a draw by the fifty-move rule
	 */

	function checkDraw50() {

		// a turn if one move from each player
		if (moveCounter === 100) {
			alert("Draw by fifty-move rule");
		}
	}

	/**
	 * Checks to see if the game is a draw by stalemate
	 */

	function isStalemate() {

	}

	function updateMoves(piece, id) {
		// console.log(piecePositions);
		// console.log(occupiedSquares);
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
	 * Draws on the square at the given co-ordinates
	 * @param {number} file - the square's file: 1 - 8
	 * @param {number} rank - the square's rank: 1 - 8
	 * @param {String} symbol - what to draw on the square
	 * @param {String} color - the piece's color: w or b
	 */

	function drawOnSquare(file, rank, symbol, color) {
		if (color === 'w') {
			ctx.fillStyle = "#FFF";
		}
		else {
			ctx.fillStyle = "#000";
		}
		var coordinates = getCoordinates(file, rank);
		ctx.font = squareSize + "px serif";
		ctx.fillText(symbol, coordinates[0] + (0.5 * squareSize), coordinates[1] + (0.5 * squareSize));
	}

	/**
	 * Draws over a piece at the square at the given co-ordinates
	 * @param {number} file - the square's file: 1 - 8
	 * @param {number} rank - the square's rank: 1 - 8
	 */

	function drawOverPiece(square) {
		var file = square[0];
		var rank = square[1];
		var coordinates = getCoordinates(file, rank);
		if ((file + rank) % 2 === 0) {
			ctx.fillStyle = "#444";
		}
		else {
			ctx.fillStyle = "#999";
		}
		ctx.fillRect(coordinates[0], coordinates[1], squareSize, squareSize);
	}

	/**
	 * Redraws a square and (if occupied) its piece at the given index
	 * @param {number} index - the square's index: 1 - 63
	 */

	function redrawSquare(index) {
		var square = indexToSquare(index);
		drawOverPiece(square);
		unmarkSquare(square[0], square[1]);
		var piece = occupiedSquares[index - 1];
		
		// if redrawn square had a piece on it, redraw it
		if (piece) {
			var color = piece[0];
			drawOnSquare(square[0], square[1], pieceSymbols[piece.slice(0, 2)], color);
		}	
	}


	/**
	 * Draws on the square at the given co-ordinates
	 * @param {number} file - the square's file: 1 - 8
	 * @param {number} rank - the square's rank: 1 - 8
	 */

	function unmarkSquare(file, rank) {
		ctx.beginPath();
		if ((rank + file) % 2 === 0) {
			ctx.strokeStyle = "#444";
		}
		else {
			ctx.strokeStyle = "#999";
		}
		var c = getCoordinates(file, rank);
		ctx.rect(c[0] + lineWidth/2, c[1] + lineWidth/2, squareSize - lineWidth, squareSize - lineWidth);			
		ctx.lineWidth = lineWidth;
		ctx.stroke();
		ctx.closePath();
	}
});

/**
 * Maps the rank and file of a square to an integer that is unique among other squares
 * @param {number[]} square - the square's file, two numbers: 1 - 8
 * @return {number} index - the index of the square: 1 - 64
 */

function squareToIndex(square) {
	if (square[0]  < 1 && square[0] > 8 && square[1] < 1 && square[1] > 8) {
		return undefined;
	}
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
