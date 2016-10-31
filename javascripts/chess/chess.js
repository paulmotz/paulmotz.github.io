/**
 * TODOs
 *
 * Logic:
 * - add castling rule checks (can't castle through check or if in check)
 * - add en passant
 * - is the king in check
 * - is the piece pinned (moving it in a certain direction leaves the king in check)
 * - draw rules
 *
 * Check:
 * - pawn promotion
*/

var allPieces;
var occupiedSquares;
var enPassantPawn;

$(document).ready(function() {

	var $board = $('#chessboard');
	var delay = 0;

	// TODO: what if height !== width?
	// visual/layout variables
	var height = parseInt($board.css('height'));
	var width = parseInt($board.css('width'));
	var squareSize = height / 10;
	var lineWidth = height / 100;

	var markedSquares = new Set();

	var board = $board[0];
	var ctx = board.getContext('2d');
	var files = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ''];
	var ranks = ['', '1', '2', '3', '4', '5', '6', '7', '8', ''];

	// game/logic variables

	// display the number of moves
	// TODO: maybe later, algebraic notation can be displayed
	var moveCounter = 0;

	// used for checking 50-move draw rule
	var drawMoveCounter;

	// the two players' colors
	var colors = ['w', 'b'];

	var pieceNames = {'B' : 'Bishop', 'N' : 'Knight', 'K' : 'King', 'P' : 'Pawn', 'Q' : 'Queen', 'R' : 'Rook'};
	var pieceAbbreviations = {'Bishop' : 'B', 'Knight' : 'N', 'King' : 'K', 'Pawn' : 'P', 'Queen' : 'Q', 'Rook' : 'R'};
	var pieceCount = {'B': 2, 'N': 2, 'K': 1, 'P': 8, 'Q': 1, 'R': 2};

	// https://en.wikipedia.org/wiki/Chess_symbols_in_Unicode
	var pieceSymbols = {'bB': '♝', 'bN': '♞', 'bK': '♚', 'bP': '♟', 'bQ': '♛', 'bR': '♜', 'wB': '♗', 'wN': '♘', 'wK': '♔', 'wP': '♙', 'wQ': '♕', 'wR': '♖'};

	// // kings and queens have arrays of length 1 for convenience in later methods
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


	// remove pieces for testing purposes
	// var pieceCount = {'B': 2, 'N': 2, 'K': 1, 'P': 1, 'Q': 1, 'R': 2};
	// var pieceNames = {'P' : 'Pawn'};

	// // kings and queens have arrays of length 1 for convenience in later methods
	// var pieceStartingPositions = {
	// 							  // 'bP' : [[1, 4], [2, 7], [3, 7], [4, 4], [5, 7], [6, 7], [7, 4], [8, 7]],
	// 							  // 'wP' : [[2, 2], [2, 3], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2]],
	// 							  // 'bP' : [[1, 7], [2, 7], [3, 7], [4, 4], [5, 7], [6, 7], [7, 4], [8, 7]],
	// 							  // 'wP' : [[2, 4], [2, 3], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2]],
	// 							  // 'bp' : [[1, 4]],
	// 							  // 'wp' : [[2, 2]]
	// 							};

	
	// represent all pieces as entries in arrays for dynamic access (kings could have been single entry)
	allPieces = {'wB' : [], 'wN' : [], 'wK' : [], 'wP' : [], 'wQ' : [], 'wR' : [], 'bB' : [], 'bN' : [], 'bK' : [], 'bP' : [], 'bQ' : [], 'bR' : [] };

	// create an array of 64 square objects
	var gameBoard = initializeBoard();

	var whiteDown = true;
	var humanTurn;
	var whiteToMove = true;

	var markedSquares = new Set();

	$('.btn').on('click', function() {
		$('.radio-piece').each(function() {
			var selection = $(this).parent().find('input');
			var piece = selection.val();
			if ($('#radio-white').is(':checked')) {
				whiteDown = true;
				$(this).parent().find('label').html(pieceSymbols['w' + piece] + " " + pieceNames[piece]);
			}
			else {
				whiteDown = false;
				$(this).parent().find('label').html(pieceSymbols['b' + piece] + " " + pieceNames[piece]);
			}
		});
		// turn off click events bound to the board before starting a new game
		$board.off('click');
		newGame();
	});

	initializePieces();
	drawBoard();
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
					addPiece(colorAndPiece, file, rank, pc, false);
				}
			}
		}
	}

	/**
	 * adds a piece to the allPieces object
	 * @param {String} colorAndPiece - the color and piece of the piece ie: wB = white bishop
	 * @param {number} file - the file of the new piece
	 * @param {number} rank - the rank of the new piece
	 * @param {number} id - the id of the new piece
	 * @param {boolean} hasMoved - whether the piece has moved or not (used to check if castling is allowed)
	 */

	function addPiece(colorAndPiece, file, rank, id, hasMoved) {
		var color = colorAndPiece[0];
		var piece = colorAndPiece[1];
		switch (piece) {
			case 'B':
				allPieces[colorAndPiece].push(new Bishop(color, file, rank, id));
				break;
			case 'N':
				allPieces[colorAndPiece].push(new Knight(color, file, rank, id));
				break;
			case 'K':
				allPieces[colorAndPiece].push(new King(color, file, rank, id, hasMoved));
				break;
			case 'P':
				allPieces[colorAndPiece].push(new Pawn(color, file, rank, id));
				break;
			case 'Q':
				allPieces[colorAndPiece].push(new Queen(color, file, rank, id));
				break;
			case 'R':
				allPieces[colorAndPiece].push(new Rook(color, file, rank, id, hasMoved));
				break;
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
		drawMoveCounter = 0;
		$('#move-counter').html(moveCounter);
		initializePieces();
		drawBoard();

		var whiteInCheckmate = false;
		var blackInCheckmate = false;
		move('w', 'b');
	}

	/**
	 * Generates or listens for a move
	 * @param {String} currentColor - the color of the piece being moved: 'w' or 'b'
	 * @param {String} opponentColor - the color of the opponenet's pieces: 'w' or 'b'
	 */

	function move(currentColor, opponentColor) {

		// console.log(occupiedSquares);
		// console.log(allPieces);

		// isCheckMate();
		checkDraw();

		// if human is moving, allow him/her to move
		if (whiteDown && currentColor === 'w' || !whiteDown && currentColor === 'b') {
			humanTurn = true;
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

						if (pieceType === 'K' && Math.abs(fromTo[0] - fromTo[1]) === 2) {
							castle(indexToSquare(fromTo[1]));
						}

						fromTo = [];

						var piece = selectedPiece.slice(0, 2);
						var id = selectedPiece[2];
						var index = findPieceIndex(piece, id);

						// update move counters (for display and draw checking)
						updateMoves(currentColor);

						inCheck(opponentColor, currentColor);

						// TODO: this prevents multiple click events being bound to the board.
						// However, I REALLY don't like this solution.
						$(this).off(e);

						move(opponentColor, currentColor);
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
					if (selectedPiece && selectedPiece[0] === currentColor && fromTo.length === 1) {
						ctx.beginPath();
						var c = getCoordinates(square[0], square[1]);
						ctx.rect(c[0] +lineWidth/2, c[1] + lineWidth/2, squareSize - lineWidth, squareSize - lineWidth);			
						ctx.lineWidth = lineWidth;
						ctx.strokeStyle = "orange";
						ctx.stroke();
						ctx.closePath();
						var pieceName = selectedPiece.slice(0, 2);
						var id = selectedPiece[2]; // only need one digit since id can never be greater than 9 (8 pawns promoted to B/N/R)
						var index = findPieceIndex(pieceName, id);
						moves = allPieces[pieceName][index].moves(occupiedSquares).map(squareToIndex);
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

			humanTurn = false;

			// construct array of possible moves
			var moves = [];
			for (pieceTypes in allPieces) {
				var pieceType = pieceTypes[1];

				// only get moves from the correct color of pieces
				if (pieceTypes[0] === currentColor) {
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

			var compMove = moves[r];
			var piece = compMove.piece;
			var pieceType = piece[1];
			var pieceId = piece + compMove.id;

			// check for castling
			if (pieceType === 'K') {
				if (!allPieces[piece][compMove.id].hasMoved) {

					// piece is known to be king that has not yet moved (so its location is [5, 1] or [5, 8])
					var king = allPieces[piece][0];
					var newSquare = compMove.move;

					castle(newSquare);

					// this is the king's first move, set its hasMoved property to true
					allPieces[piece][compMove.id].hasMoved = true;
				}
			}

			// movePiece checks whether a king or rook has moved. This should be done after checking for castling
			movePiece(moves[r]);

			updateMoves(currentColor);

			inCheck(opponentColor, currentColor);

			// setTimeout(function() { movePiece(moves[r]) }, delay);
			move(opponentColor, currentColor);
		}
	}

	/**
	 * Moves a piece on the board
	 * @param {object} move - an object consisting of the piece, its id (an int) and the square to move to
	 */

	function movePiece(move) {

		var color = move.piece[0];
		var piece = move.piece;
		var id = move.id;
		var newSquare = move.move
		var newIndex = squareToIndex(newSquare);
		var file = newSquare[0];
		var rank = newSquare[1];

		// pawn moves reset the fifty-move rule counter
		if (move.piece[1] === 'P') {
			drawMoveCounter = 0;
		}

		if (occupiedSquares[newIndex - 1]) {
			capturePiece(occupiedSquares[newIndex  - 1], newSquare);
		}

		var symbol = pieceSymbols[piece];
		drawOnSquare(file, rank, symbol, color);

		var index = findPieceIndex(piece, id);
		var oldFile = allPieces[piece][index].file;
		var oldRank = allPieces[piece][index].rank;
		var oldSquare = [oldFile, oldRank];
		var oldIndex = squareToIndex(oldSquare);

		allPieces[piece][index].file = newSquare[0];
		allPieces[piece][index].rank = newSquare[1];

		// the piece is a king or rook, record the fact that it has moved
		if (piece[1] === 'K' || piece[1] === 'R') {
			allPieces[piece][index].hasMoved = true;
		}

		occupiedSquares[oldIndex - 1] = null;
		occupiedSquares[newIndex - 1] = piece + id;


		// capture was en passant
		if (piece[1] === 'P' && enPassantPawn) {

			// need to specify color otherwise consecutive two-square pawn moves trigger a capture (eg: e4 followed by e5 captures the e4 pawn)
			if (color === 'w' && occupiedSquares[newIndex - 9] === enPassantPawn) {
				capturePiece(enPassantPawn, [file, rank - 1]);
				occupiedSquares[newIndex - 9] = null;
			}
			else if (color === 'b' && occupiedSquares[newIndex + 7] === enPassantPawn) {
				capturePiece(enPassantPawn, [file, rank + 1]);
				occupiedSquares[newIndex + 7] = null;
			}
		}

		// if a pawn moves two squares, make it able to be captured en passant
		if (piece[1] === 'P' && Math.abs(rank - oldRank) === 2) {
			enPassantPawn = piece  + id;
		}
		else {
			enPassantPawn = null;
		}

		// the piece is a pawn that has reached the last rank
		if (piece[1] === 'P' && (newSquare[1] === 8 || newSquare[1] === 1)) {
			promote(piece, index, newIndex, newSquare);
		}

		// piece and id are incorrect if there was a pawn promotion
		// TODO: refactor so that this else isn't necessary
		else {
			occupiedSquares[newIndex - 1] = piece + id;
		}
		drawOverPiece(oldSquare);
	}

	/** Promotes a pawn to a non-king piece (B, N, Q, R)
	 * @param {string} piece - the color and type of the piece
	 * @param {number} pieceIndex - the index of the piece in its corresponding array
	 * @param {number} newIndex - the index of the square the pawn is moving to
	 * @param {number[]} newSquare - the square the pawn is moving to
	 */

	function promote(piece, pieceIndex, newIndex, newSquare) {

		// newIndex is calculated using 1-indexing, it is only used for array accesses in this function
		newIndex--;
		var color = piece[0];
		var file = newSquare[0];
		var rank = newSquare[1];
		if (humanTurn) {
			var pieceName = $('input[name=piece]:checked').val();
		}
		else {
			var pieces = ['B', 'N', 'Q', 'R'];
			var pieceName = pieces[Math.floor(Math.random() * pieces.length)];
		}
		var newPiece = color + pieceName;
		var index = allPieces[newPiece].length > 0 ? allPieces[newPiece][allPieces[newPiece].length - 1].id + 1 : allPieces[newPiece].length;
		var symbol = pieceSymbols[newPiece];
		drawOverPiece(newSquare);
		drawOnSquare(file, rank, symbol, newPiece[0]);
		addPiece(newPiece, file, rank, index, true);
		allPieces[piece].splice(pieceIndex, 1);
		var pieceId = newPiece + index;
		occupiedSquares[newIndex] = pieceId;
	}

	/**
	 * Moves a rook as part of castling
	 * @param {number[]} kingSquare - the file and rank of the king's move
	 */
	function castle(kingSquare) {

		// queenside castling
		if (kingSquare[0] === 3) {

			// white
			if (kingSquare[1] === 1) {
				var rookMove = {'piece' : 'wR', 'id' : 0, 'move' : [4, 1]};
			}

			// black
			else {
				var rookMove = {'piece' : 'bR', 'id' : 0, 'move' : [4, 8]};
			}

			movePiece(rookMove);
		}

		// kingside castling
		else if (kingSquare[0] === 7) {

			// white
			if (kingSquare[1] === 1) {
				var rookMove = {'piece' : 'wR', 'id' : 1, 'move' : [6, 1]};
			}

			// black
			else {
				var rookMove = {'piece' : 'bR', 'id' : 1, 'move' : [6, 8]};
			}

			movePiece(rookMove);
		}
	}

	/**
	 * Creates a new set of indices corresponding to the squares that a color is attacking
	 * @param {String} color - the color of the pieces for which this is calculated
	 * @return {number[]} attackedSquares - the squares that are being attacked
	 */

	function getAttackedSquares(color) {
		var attackedSquares = new Set();
		for (var pieceType in allPieces) {
			if (pieceType[0] === color) {
				var pieceArray = allPieces[pieceType];
				for (var piece in pieceArray) {
					var pieceMoves = pieceArray[piece].moves(occupiedSquares);
					for (var i in pieceMoves) {
						attackedSquares.add(squareToIndex(pieceMoves[i]));
					}
				}
			}
			
		}
		// console.log(squares);
		return attackedSquares;
	}




	/**
	 * Checks whether the king of the opposing color is in check
	 * @param {String} color - the color of the king to check whether it is in check
	 */

	function inCheck(defendingColor, attackingColor) {

		var attackedSquares = getAttackedSquares(attackingColor);
		var opponentKing = allPieces[defendingColor + 'K'][0];

		console.log(opponentKing);

		console.log(attackedSquares);

		var opponentKingIndex = squareToIndex([opponentKing.file, opponentKing.rank]);

		if (attackedSquares.has(opponentKingIndex)) {
			drawCheckSquare(defendingColor);
		}
	}

	/**
	 * Removes a piece from the board and the game
	 * @param {String} pieceToCapture - the string representation (colorPieceIndex) of the piece being captured
	 * @param {number[]} square - the indices of the square of the piece being captured in the form [file, rank]
	 */

	function capturePiece(pieceToCapture, square) {

		// captures reset the fifty-move rule counter
		drawMoveCounter = 0;

		var piece = pieceToCapture.slice(0, 2);
		var id = pieceToCapture[2];
		var pieceType = allPieces[piece];
		var index = findPieceIndex(piece, id);
		pieceType.splice(index, 1);
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
		if (drawMoveCounter === 50) {
			alert("Draw by fifty-move rule");
		}
	}

	/**
	 * Checks to see if the game is a draw by stalemate
	 */

	function isStalemate() {

	}

	/**
	 * Returns the piece's location in its corresponding array. Due to captures, the piece's id may !== its index
	 * @param {String} piece - the piece type to find an index for (eg. wP for white pawn)
	 * @param {number} id - the piece's id
	 * @return {number} index 
	 */

	function findPieceIndex(piece, id) {

		var pieceType = allPieces[piece];

		// find and remove piece with matching id (can't use indices since capturing shifts)
		for (var p = 0; p < pieceType.length; p++) {

			// different type (.id is a string, id is a number), so use == operator
			if (pieceType[p].id == id) {
				return p;
			}
		}
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
	 * Marks the square if the king is in check
	 * @param {String} color - the color of the king in check: 'w' or 'b'
	 */

	function drawCheckSquare(color) {
		var king = color + 'K';
		var file = allPieces[king][0].file;
		var rank = allPieces[king][0].rank;
		var symbol = pieceSymbols[king];
		var coordinates = getCoordinates(file, rank);
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(coordinates[0], coordinates[1], squareSize, squareSize);
		drawOnSquare(file, rank, symbol, color);
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

	function updateMoves(color) {
		if (color === 'w') {
			moveCounter++;
			$('#move-counter').html(moveCounter);
			// $('#draw-move-counter').html(50 - drawMoveCounter);
			drawMoveCounter++;
		}
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
	return [file, Math.ceil(index / 8)];
}
