/**
 * Ideas for improvement:
 * -Refactor to make code more OO
 * -Make promotion piece options change color during free play to represent the player moving ()
 *
*/

var allPieces;
var occupiedSquares;
var enPassantPawn;
var attackedSquares = { 'w' : new Set(), 'b' : new Set() };

// the two players' colors
var colors = ['w', 'b'];
var colorAbbreviations = {'w' : 'White', 'b' : 'Black'};

// square colors
var dark = '#555';
var light = '#999';
var clicked = "orange";
var highlightedDark = "Green";
var highlightedLight = "lime";
var check = "#FF0000";

// board colors
var edge = "#000";
var text = "#FFF";

// piece colors
var whitePieces = "#FFF";
var blackPieces = "#000";

$(document).ready(function() {

	// want element to still take up space on page, so don't use hide
	$('.moves-display').css('visibility', 'hidden');

	var $board = $('#chessboard');
	var delay = 500;

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
	var moveCounter = 0;

	// used for checking 50-move draw rule
	var drawMoveCounter;

	var lastMove = {};	

	var pieceNames = {'B' : 'Bishop', 'N' : 'Knight', 'K' : 'King', 'P' : 'Pawn', 'Q' : 'Queen', 'R' : 'Rook'};
	var pieceAbbreviations = {'Bishop' : 'B', 'Knight' : 'N', 'King' : 'K', 'Pawn' : 'P', 'Queen' : 'Q', 'Rook' : 'R'};

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
	// var pieceNames = {'N' : 'Knight', 'K' : 'King'};

	// var pieceStartingPositions = {'wB' : [[6, 3], [6, 1]],
	// 								  'wN' : [[2, 1], [7, 1]],
	// 								  'wK' : [[8, 1]],
	// 								  'wP' : [[1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2]],
	// 								  'wQ' : [[3, 6], [3, 4], [1, 4]],
	// 								  'wR' : [[1, 1], [8, 1]],
	// 								  'bB' : [[4, 8], [6, 8]],
	// 								  'bN' : [[2, 8], [7, 8]],
	// 								  'bK' : [[8, 8]],
	// 								  'bP' : [[1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7]],
	// 								  'bQ' : [[7, 7], [7, 5], [1, 5]],
	// 								  'bR' : [[1, 8], [8, 8]]
	// 								};

	// represent all pieces as entries in arrays for dynamic access (kings could have been single entry)
	allPieces = {'wB' : [], 'wN' : [], 'wK' : [], 'wP' : [], 'wQ' : [], 'wR' : [], 'bB' : [], 'bN' : [], 'bK' : [], 'bP' : [], 'bQ' : [], 'bR' : [] };

	var whiteDown = true;
	var humanTurn;
	var whiteToMove = true;

	var markedSquares = new Set();
	var boardStrings;

	newGame();

	$('.btn').on('click', function() {
		$('.radio-piece').each(function() {
			var selection = $(this).parent().find('input');
			var piece = selection.val();
			if ($('#radio-white').is(':checked') || $('#radio-human').is(':checked')) {
				whiteDown = true;
				$(this).parent().find('span').html(pieceSymbols['w' + piece] + " " + pieceNames[piece])
			}
			else {
				whiteDown = false;
				$(this).parent().find('span').html(pieceSymbols['b' + piece] + " " + pieceNames[piece]);
			}
		});

		// turn off click events bound to the board before starting a new game
		$board.off('click');
		newGame();
	});

	/**
	 * Starts a new game and initialized global variables to starting values
	 */

	function newGame() {
		lastMove = {};
		moveCounter = 0;
		drawMoveCounter = 0;
		$('.moves-display').css('visibility', 'visible');
		initializePieces();
		drawBoard(true);
		boardStrings = [];
		$('.move-history').html('');
		$('.result').html('');
		$('.result-container').html('');
		move('w', 'b', $('#radio-human').is(':checked'));	
	}

	/**
	 * Stores the pieces into global allPieces object
	 */

	function initializePieces() {

		// reset allPieces object
		for (var key in allPieces) {
			allPieces[key] = [];
		}
 		for (var color in colors) {
			for (var pn in pieceNames) {
				var colorAndPiece = colors[color] + pn;
				for (var pc = 0; pc < pieceStartingPositions[colorAndPiece].length; pc++) {					
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
				allPieces[colorAndPiece].push(new Bishop(color, piece, file, rank, id));
				break;
			case 'N':
				allPieces[colorAndPiece].push(new Knight(color, piece, file, rank, id));
				break;
			case 'K':
				allPieces[colorAndPiece].push(new King(color, piece, file, rank, id, hasMoved));
				break;
			case 'P':
				allPieces[colorAndPiece].push(new Pawn(color, piece, file, rank, id));
				break;
			case 'Q':
				allPieces[colorAndPiece].push(new Queen(color, piece, file, rank, id));
				break;
			case 'R':
				allPieces[colorAndPiece].push(new Rook(color, piece, file, rank, id, hasMoved));
				break;
		}
	}

	/**
	 * Draw the board
	 * @param {boolean} newGame - whether it is a new game or not
	 */

	function drawBoard(newGame) {

		// redraw border to overwrite existing text
		ctx.fillStyle = edge;
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
					ctx.fillStyle = text;
					ctx.fillText(files[fileIndex], (f + 0.5) * squareSize, (r + 0.5) * squareSize);
				}

				// file falls off the board, write the rank name
				else if (f === 0 || f === 9) {
					ctx.fillStyle = text;
					ctx.fillText(ranks[rankIndex], (f + 0.5) * squareSize, (r + 0.5) * squareSize);
				}

				// draw square
				else {
					if ((f + r) % 2 === 1) {
						ctx.fillStyle = dark;
					}
					else {
						ctx.fillStyle = light;
					}
					ctx.fillRect(f * squareSize, r * squareSize, squareSize, squareSize);
				}
			}
		}
		drawPieces(newGame);
	}

	/**
	 * Draws the pieces on the board
	 * @param {boolean} newGame - whether it is a new game or not
	 */

	function drawPieces(newGame) {
		if (newGame) occupiedSquares = Array(64); // reset the occupied squares if it is a new game

		// if (bs) {
		// 	for (var i = 0; i < bs.length; i+=2) {
		// 		if (bs[i] != '_') {
		// 			var piece = bs.slice(i, i + 2);
		// 			var index = (i + 2) / 2;
		// 			var file = indexToSquare(index)[0];
		// 			var rank = indexToSquare(index)[1];
		// 			drawOnSquare(file, rank, pieceSymbols[piece], piece[0]);
		// 		}
		// 	}
		// }

		// else {
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
		// }
	}

	/**
	 * Generates or listens for a move
	 * @param {String} currentColor - the color of the piece being moved: 'w' or 'b'
	 * @param {String} opponentColor - the color of the opponenet's pieces: 'w' or 'b'
	 * @param {Boolean} noComp - play human vs human
	 */

	function move(currentColor, opponentColor, noComp) {

		var boardString = getBoardString();
		
		boardStrings.push(boardString);

		// used in king.js for getting legal king moves
		attackedSquares = getAttackedSquares();

		var checkingPieces = inCheck(currentColor);

		// only draw the last move if there was a last move
		if (lastMove['oldSquare']) {
			drawLastMove(lastMove, opponentColor, false);
		}

		// if the king is in check, it might be checkmate
		if (checkingPieces.length) {
			if (checkCheckmate(currentColor, opponentColor, checkingPieces)) {
				return;
			}
		}		

		if (checkDraw(currentColor, boardStrings, drawMoveCounter)) {
			$('.result').html('<sup>1</sup>/<sub>2</sub>-<sup>1</sup>/<sub>2</sub>');
			return;
		}

		$('.result-description').html(colorAbbreviations[currentColor] + " to move");

		// if human is moving, allow him/her to move
		if (whiteDown && currentColor === 'w' || !whiteDown && currentColor === 'b' || noComp) {
		
			humanTurn = true;

			inCheck(currentColor);

			var fromTo = [];
			var legalMoves = [];
			var selectedPiece = '';
			$board.on('click', function(e) {

				var x0 = e.offsetX;
				var y0 = e.offsetY;

				if (x0 > squareSize && y0 > squareSize && x0 < 9 * squareSize && y0 < 9 * squareSize) {
					var square = getSquare(x0, y0);
					var index = squareToIndex(square);	

					fromTo.push(index); 		

					// if the two clicked squares represent a valid move, move the piece
					if (legalMoves.indexOf(index) !== -1) {

						var nextMove =  {'piece' : selectedPiece.slice(0, 2), 'id' : selectedPiece[2], 'move' : square};
						var algNot = movePiece(nextMove);

						if (lastMove['oldSquare']) {
							drawLastMove(lastMove, opponentColor, true);
						}

						lastMove['oldSquare'] = indexToSquare(fromTo[0]);
						lastMove['newSquare'] = indexToSquare(fromTo[1]);
						lastMove['piece'] = selectedPiece;

						fromTo = [];
											
						// prevent multiple click events being bound to the board.
						$(this).off(e);

						// recolor square when king is out of check
						inCheck(currentColor);

						// update move counters (for display and draw checking)
						updateMoves(currentColor, algNot, checkingPieces);	

						move(opponentColor, currentColor, noComp);
					}

					// reset the move sequence if it is invalid
					else if (fromTo.length === 2) {
						for (var s in fromTo) {
							redrawSquare(fromTo[s]);
						}
						fromTo = [];
						legalMoves = [];
					}

					// the piece in the first square the user clicked
					else {
						selectedPiece = occupiedSquares[index - 1];
					}

					// if the clicked square has a piece of the correct color in it, get its moves
					if (selectedPiece && selectedPiece[0] === currentColor && fromTo.length === 1) {
						ctx.beginPath();
						var c = getCoordinates(square[0], square[1]);
						ctx.rect(c[0] + lineWidth/2, c[1] + lineWidth/2, squareSize - lineWidth, squareSize - lineWidth);			
						ctx.lineWidth = lineWidth;
						ctx.strokeStyle = clicked;
						ctx.stroke();
						ctx.closePath();
						var pieceName = selectedPiece.slice(0, 2);
						var id = selectedPiece[2]; // only need one digit since id can never be greater than 9 (8 pawns promoted to B/N/R)
						var index = findPieceIndex(pieceName, id);
						
						// if the king is not in check
						if (!checkingPieces.length) {
							legalMoves = allPieces[pieceName][index].moves().map(squareToIndex);
						}

						// the king is in check, restricting the moves of other pieces
						else {
							legalMoves = getLegalMoves(checkingPieces, selectedPiece);
						}
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

						var pieceMoves;

						if (!checkingPieces.length) {
							pieceMoves = pieceArray[piece].moves();
						}

						else {
							var selectedPiece = currentColor + pieceArray[piece].abbr + pieceArray[piece].id;
							pieceMoves = getLegalMoves(checkingPieces, selectedPiece).map(indexToSquare);
						}

						for (var i in pieceMoves) {
							var m =  {'piece' : pieceTypes, 'id' : pieceArray[piece].id, 'move' : pieceMoves[i]};
							moves.push(m);
						}
					}
				}
			}
			var numMoves = moves.length;

			if (!numMoves && inCheck(currentColor).length) {
				var winningColor = colorAbbreviations[opponentColor]
				$('.result-description').html("Checkmate! " + winningColor + " wins!");
				var resultString = winningColor === 'White' ? '1-0' : '0-1';
				$('.move-container').append(resultString);
				$('.move-container').append("<span class='result'>" + resultString + "</span>");
				drawCheckSquare(currentColor, false); // make the square the normal color
				return;			
			}

			var r = Math.floor(Math.random() * numMoves);

			var compMove = moves[r];
			var piece = compMove.piece;
			var pieceObject = allPieces[piece][findPieceIndex(piece, compMove.id)];
			if (lastMove['oldSquare']) {
				drawLastMove(lastMove, opponentColor, true);
			}
			lastMove = {'oldSquare' : [pieceObject.file, pieceObject.rank] , 'newSquare' : compMove.move, 'piece' : piece + compMove.id};
			var pieceType = piece[1];

			// movePiece checks whether a king or rook has moved. This should be done after checking for castling
			var algNot = movePiece(moves[r]);

			inCheck(currentColor);

			updateMoves(currentColor, algNot);

			// setTimeout(function() { move(opponentColor, currentColor, false) }, delay);
			move(opponentColor, currentColor, false);
		}
	}

	/**
	 * Moves a piece on the board
	 * @param {object} move - an object consisting of the piece, its id (an int) and the square to move to
	 * @return {String} algNot - the algebraic notation representation of the move (e.g. "e4")
	 */

	function movePiece(move) {

		var algNot = '';

		var piece = move.piece;
		var color = piece[0];
		var pieceType = piece[1];
		var id = move.id;
		var newSquare = move.move;
		var newIndex = squareToIndex(newSquare);
		var file = newSquare[0];
		var rank = newSquare[1];

		// pawn moves reset the fifty-move rule counter
		if (pieceType === 'P') {
			drawMoveCounter = 0;
		}

		var symbol = pieceSymbols[piece];

		drawOnSquare(file, rank, symbol, color);

		var pieceIndex = findPieceIndex(piece, id);

		var oldFile = allPieces[piece][pieceIndex].file;
		var oldRank = allPieces[piece][pieceIndex].rank;
		var oldSquare = [oldFile, oldRank];
		var oldIndex = squareToIndex(oldSquare);

		if (occupiedSquares[newIndex - 1]) {
			algNot = getAlgNotMove(piece, id, true, newIndex, oldSquare)
			capturePiece(occupiedSquares[newIndex  - 1], newSquare);
		}

		else {
			algNot = getAlgNotMove(piece, id, false, newIndex, oldSquare);
		}

		if (pieceType === 'K') {
			if ((file - oldFile) === 2) {
				algNot = "0-0";
				castle(newSquare);
			}
			if ((file - oldFile) === -2) {
				algNot = "0-0-0";
				castle(newSquare);
			}
		}

		allPieces[piece][pieceIndex].file = newSquare[0];
		allPieces[piece][pieceIndex].rank = newSquare[1];

		// the piece is a king or rook, record the fact that it has moved
		if (piece[1] === 'K' || piece[1] === 'R') {
			allPieces[piece][pieceIndex].hasMoved = true;
		}

		occupiedSquares[oldIndex - 1] = null;
		occupiedSquares[newIndex - 1] = piece + id;

		// capture was en passant
		if (pieceType === 'P' && enPassantPawn) {

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
		if (pieceType === 'P' && Math.abs(rank - oldRank) === 2) {
			enPassantPawn = piece  + id;
		}
		else {
			enPassantPawn = null;
		}

		// the piece is a pawn that has reached the last rank
		if (pieceType === 'P' && (newSquare[1] === 8 || newSquare[1] === 1)) {
			promote(piece, pieceIndex, newIndex, newSquare);
		}

		// piece and id are incorrect if there was not a pawn promotion
		// TODO: refactor so that this else isn't necessary
		else {
			occupiedSquares[newIndex - 1] = piece + id;
		}
		drawOverPiece(oldSquare);

		var defendingColor = color === 'w' ? 'b' : 'w'; 

		var checkingPieces = inCheck(defendingColor);
	
		return algNot;
	}

	/** Promotes a pawn to a non-king piece (B, N, Q, R)
	 * @param {string} piece - the color and type of the piece
	 * @param {number} pieceIndex - the index of the piece in its corresponding array
	 * @param {number} newIndex - the index of the square the pawn is moving to
	 * @param {number[]} newSquare - the square the pawn is moving to
	 */

	function promote(piece, pieceIndex, newIndex, newSquare) {

		// newIndex is calculated using 1-indexing, it is only used for array accesses in this function, so decrement it
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
		boardStrings = [];
	}

	/**
	 * Moves a rook as part of castling
	 * @param {number[]} kingSquare - the file and rank of the king's move
	 */
	function castle(kingSquare) {

		var kingFile = kingSquare[0];
		var kingRank = kingSquare[1];
		if ((kingFile !== 3 && kingFile !== 7) || (kingRank !== 1 && kingRank !== 8)) return;

		// queenside castling
		if (kingFile === 3) {

			// white
			if (kingRank === 1) {
				var rookMove = {'piece' : 'wR', 'id' : 0, 'move' : [4, 1]};
			}

			// black
			else if (kingRank === 8) {
				var rookMove = {'piece' : 'bR', 'id' : 0, 'move' : [4, 8]};
			}

			movePiece(rookMove);
		}

		// kingside castling
		else if (kingFile === 7) {

			// white
			if (kingRank === 1) {
				var rookMove = {'piece' : 'wR', 'id' : 1, 'move' : [6, 1]};
			}

			// black
			else if (kingRank === 8) {
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

	function getAttackedSquares() {
		var attackedSquares = { 'w' : new Set(), 'b' : new Set() };
		for (var pieceType in allPieces) {
			// if (pieceType[0] === color) {
				var pieceArray = allPieces[pieceType];
				for (var piece in pieceArray) {
					var pieceMoves = pieceArray[piece].protectedSquares();
					for (var i in pieceMoves) {
						attackedSquares[pieceType[0]].add(squareToIndex(pieceMoves[i]));
					}
				}
			// }	
		}
		return attackedSquares;
	}

	/**
	 * Finds all pieces of a given color that are attacking a given square
	 * @param {String} color - the color of the pieces to return
	 * @param {number} squareIndex - the index of the square for which the attacking pieces are desired
	 * @return {number[]} attackingPieces - the pices that are attacking the square
	 */

	function getAttackingPieces(color, squareIndex) {
		var attackingPieces = [];
		for (var pieceType in allPieces) {
			if (pieceType[0] === color) {
				var pieceArray = allPieces[pieceType];
				for (var piece in pieceArray) {

					// use protectedSquares instead of move since pinned pieces can still check
					var pieceMoves = pieceArray[piece].protectedSquares();
					for (var i in pieceMoves) {
						if (squareToIndex(pieceMoves[i]) === squareIndex) {
							attackingPieces.push(color + pieceArray[piece].abbr + pieceArray[piece].id);
						}
					}
				}
			}
		}
		return attackingPieces;
	}

	/**
	 * Checks whether the king of the defending color is in check and returns the pieces
	 * @param {String} color - the color of the king to check whether it is in check
	 * @return {String} attackingPieces - the piece(s) that is/are delivering check
	 */

	function inCheck(defendingColor) {

		var attackingColor = otherColor(defendingColor);

		var king = allPieces[defendingColor + 'K'][0];
		var kingIndex = squareToIndex([king.file, king.rank]);
		var attackingPieces = getAttackingPieces(attackingColor, kingIndex);
		if (attackingPieces.length) {
			drawCheckSquare(defendingColor, true);
		}

		else {
			drawCheckSquare(defendingColor, false);
		}

		return attackingPieces;
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

		// remove this since want to go to previous position
		// boardStrings = [];
	}

	/**
	 * Checks to see if a player is in checkmate
	 * @param {string} currentColor - the player who is in check
	 * @param {string} opponentColor - the player who is giving check
	 * @param {String[]} checkingPieces - the pieces that are giving check
	 * @return {boolean} - whether the player is in checkmate
	 */

	function checkCheckmate(currentColor, opponentColor, checkingPieces) {
		for (var pieceType in allPieces) {
			if (pieceType[0] === currentColor) {
				var pieces = allPieces[pieceType];
				for (var j in pieces) {
					var selectedPiece = pieces[j].color + pieces[j].abbr + pieces[j].id;
					if (getLegalMoves(checkingPieces, selectedPiece).length) {
						return false;
					}
				}
			}
		}
		var winningColor = colorAbbreviations[opponentColor]
		$('.result-description').html("Checkmate! " + winningColor + " wins!");
		var resultString = winningColor === 'White' ? '1-0' : '0-1';
		$('.result').html(resultString);
		drawCheckSquare(currentColor, false); // make the square the normal color
		return true;
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
			var square = [9 - file, rank];
		}
		return square;
	}

	/**
	 * Highlights the two squares involved in the last move
	 * @param {object} lastMove - the last move that was played (consists of old square, new square and piece that was moved)
	 * @param {String} color - the color of the piece that was moved
	 * @param {boolean} drawOver - whether the move is drawing over a previously highlighted move (true) or is highlighting a move (false)
	 */

	function drawLastMove(lastMove, color, drawOver) {
		var oldFile = lastMove['oldSquare'][0];
		var oldRank = lastMove['oldSquare'][1];
		var newFile = lastMove['newSquare'][0];
		var newRank = lastMove['newSquare'][1];
		var oldSquareCoordinates = getCoordinates(oldFile, oldRank);
		var newSquareCoordinates = getCoordinates(newFile, newRank);

		if ((oldFile + oldRank) % 2 === 0) {
			ctx.fillStyle = drawOver ? dark : highlightedDark;
		}
		else {
			ctx.fillStyle = drawOver ? light : highlightedLight;
		}
		ctx.fillRect(oldSquareCoordinates[0], oldSquareCoordinates[1], squareSize, squareSize);
		if ((newFile + newRank) % 2 === 0) {
			ctx.fillStyle = drawOver ? dark : highlightedDark;
		}
		else {
			ctx.fillStyle = drawOver ? light : highlightedLight;
		}
		ctx.fillRect(newSquareCoordinates[0], newSquareCoordinates[1], squareSize, squareSize);

		var piece = lastMove.piece.slice(0, 2);
		var id = lastMove.piece[2];

		// TODO: clean up this ternary and if statement

		// write an empty string instead of the piece symbol if the piece is being captured but is not on the square that the new piece is moving to (en passant)
		var symbol = allPieces[piece][findPieceIndex(piece, id)] ? pieceSymbols[piece] : '';

		// pawn that has reached the last rank
		if (piece === 'wP' && newRank === 8 || piece === 'bP' && newRank === 1) {
			symbol = pieceSymbols[occupiedSquares[squareToIndex([newFile, newRank]) - 1].slice(0, 2)];
		}

		drawOnSquare(newFile, newRank, symbol, color)
	}

	/**
	 * Draws on the square at the given co-ordinates
	 * @param {number} file - the square's file: 1 - 8
	 * @param {number} rank - the square's rank: 1 - 8
	 * @param {String} symbol - what to draw on the square
	 * @param {String} color - the piece's color: w or b
	 */

	function drawOnSquare(file, rank, symbol, color) {
		ctx.fillStyle = colorAbbreviations[color];
		var coordinates = getCoordinates(file, rank);
		ctx.font = squareSize + "px serif";
		ctx.fillText(symbol, coordinates[0] + (0.5 * squareSize), coordinates[1] + (0.5 * squareSize));
	}

	/**
	 * Draws a square and accounts for issues that may arrise by using floating-point values
	 * @param {number[]} coordinates - the top left corner of the rectangle
	 * @param {number} squareSize - the height and width of the square
	 */

	function drawSquare(coordinates, squareSize) {

		var drawLocationF = coordinates[0];
		var drawLocationR = coordinates[1];
		var drawSizeF = squareSize;
		var drawSizeR = squareSize;

		// floating point values cause sub pixel rendering which causes red to linger even after square is drawn over

		// round the floating point values to integers and make sure they don't exceed the square size
		if (Math.round(drawLocationF + drawSizeF) < Math.round(drawLocationF) + Math.round(drawSizeF)) {
			drawSizeF--;
		}

		// round the floating point values to integers and make sure they aren't smaller the square size
		else if (Math.round(drawLocationF + drawSizeF) > Math.round(drawLocationF) + Math.round(drawSizeF)) {
			drawSizeF++;
		}

		// round the floating point values to integers and make sure they don't exceed the square size
		if (Math.round(drawLocationR + drawSizeR) < Math.round(drawLocationR) + Math.round(drawSizeR)) {
			drawSizeR--;
		}

		// round the floating point values to integers and make sure they aren't smaller the square size
		else if (Math.round(drawLocationR + drawSizeR) > Math.round(drawLocationR) + Math.round(drawSizeR)) {
			drawSizeR++;
		}

		ctx.fillRect(Math.round(drawLocationF), Math.round(drawLocationR), Math.round(drawSizeF), Math.round(drawSizeR));
	}

	/**
	 * Marks the square if the king is in check
	 * @param {String} color - the color of the king in check: 'w' or 'b'
	 * @param {boolean} inCheck - whether the king is in check
	 */

	function drawCheckSquare(color, inCheck) {
		var king = color + 'K';
		var file = allPieces[king][0].file;
		var rank = allPieces[king][0].rank;
		var symbol = pieceSymbols[king];
		var coordinates = getCoordinates(file, rank);
		if (inCheck) {
			ctx.fillStyle = check;
		}
		else {
			if ((file + rank) % 2 === 0) {
				ctx.fillStyle = dark;
			}
			else {
				ctx.fillStyle = light;
			}
		}

		drawSquare(coordinates, squareSize);

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
			ctx.fillStyle = dark;
		}
		else {
			ctx.fillStyle = light;
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
			ctx.strokeStyle = dark;
		}
		else {
			ctx.strokeStyle = light;
		}
		var c = getCoordinates(file, rank);
		ctx.rect(c[0] + lineWidth/2, c[1] + lineWidth/2, squareSize - lineWidth, squareSize - lineWidth);			
		ctx.lineWidth = lineWidth;
		ctx.stroke();
		ctx.closePath();
	}

	/**
	 * Keeps track of how many moves have been played. Displays the move count
	 * @param {String} color - the color of the pieces of the player whose turn it is
	 * @param {String} algNot - the last move represented as algebraic notation
	 */

	function updateMoves(color, algNot) {

		var defendingColor = otherColor(color)
		var checkingPieces = inCheck(defendingColor);
		var checkSymbol = '';

		if (checkingPieces.length) {

			// have to update attackedSquares so that king's legal moves are updated...not a fan of this approach
			// maybe just check for mate and add the checkSymbol before the next turn with the rest of the mate checks
			attackedSquares = getAttackedSquares();
			if (checkCheckmate(defendingColor, color, checkingPieces)) {
				checkSymbol = "#";
			}
			else {
				checkSymbol = "+".repeat(checkingPieces.length)
			}
		}

		algNot += checkSymbol;

		if (color === 'w') {
			moveCounter++;
			drawMoveCounter++;
			$('.move-history').append("<div class='move'></div>");
			$('.move').last().append("<span class='turn move-count'>" + moveCounter + "</span> <span class='turn player-move white-move'>" + algNot + " </span>");
		}
		else {
			$('.move').last().append("<span class='turn player-move black-move'>" + algNot + "</span>");
		}

		// // 2 click events will be bound to each white move if click events are not turned off
		// $('.player-move').off('click');

		// $('.player-move').on('click', function(e) {

		// 	// should really be decremented by one, but the first boardString is the starting position, 
		// 	// which means that the index will need to be incremented by one
		// 	var colorIndex = $(this).index();
		// 	var moveIndex = $(this).parent().index();
		// 	console.log(boardStrings[2 * moveIndex + colorIndex]);
		// 	drawBoard(false, boardStrings[2 * moveIndex + colorIndex]);
		// });

		$('.move-history').scrollTop($('.move-history')[0].scrollHeight);
	}
});
