/**
 * Checks to see that there is at least one pair of bishop with opposing square colors
 * @return {boolean} - true if there is a pair of bishops with opposing square colors
 */

function differentColorBishops() {

	// no bishops, TODO, funciton shouldn't even be called
	if (!allPieces['wB'].length && !allPieces['bB'].length) return false;
	var firstBishop = allPieces['wB'].length ? allPieces['wB'][0] : allPieces['bB'][0];
	var firstBishopSquareColor = (firstBishop.file + firstBishop.rank) % 2;
	for (var c in colors) {
		var bishops = allPieces[colors[c] + 'B'];
		for (var j in bishops) {
			if (firstBishopSquareColor !== (bishops[j].file + bishops[j].rank) % 2) {
				return true;
			}
		}
	}
	return false;
}

/**
 * Maps the rank and file of a square to an integer that is unique among other squares
 * @param {number[]} square - the square's file, two numbers: 1 - 8
 * @return {number} index - the index of the square: 1 - 64
 */

function squareToIndex(square) {
	if (square[0] >= 1 && square[0] <= 8 && square[1] >= 1 && square[1] <= 8) {
		return (square[1] - 1) * 8 + square[0];
	}
}

/**
 * Maps the unique index of a square to its rank and file
 * @param {number} index - the index of the square: 1 - 64
 * @return {number[]} square - the indices of the square in the form [file, rank]
 */

function indexToSquare(index) {
	var file = index % 8 === 0 ? 8 : index % 8;
	return [file, Math.ceil(index / 8)];
}

/**
 * Maps the unique index of a square to its algebraic notation represantaion
 * @param {String} piece - the color of the piece followed by its type
 * @param {String} pieceId - the id of the piece
 * @param {boolean} capture - whether the move captures a piece
 * @param {number} squareIndex - the index of the square: 1 - 64
 * @param {number[]} oldSquare - former location of the piece in the form [file, rank]
 * @return {String} algSquare - the algebraic notation representatino of the square e.g. e4
 */

function getAlgNotMove(piece, pieceId, capture, squareIndex, oldSquare) {
	var pieceType = piece[1];
	var pieceString = pieceType !== "P" ? pieceType : "";
	pieceId = Number(pieceId); ///ensure pieceId is a number and not a string
	var capString = '';
	var promotionString = '';

	var oldFileLetter = String.fromCharCode(oldSquare[0] + 96);
	var square = indexToSquare(squareIndex);
	var newFileLetter = String.fromCharCode(square[0] + 96);

	// check if multiple pieces of that type can move to the same square and disambiguate if so
	if (pieceType !== "P" && pieceType !== "K") {
		var piecesArray = allPieces[piece];
		
		// find all pieces that can move to the square and keep track of their file/rank
		var algOldSquare = Array(2);
		for (var p in piecesArray) {
			if (piecesArray[p].id !==  pieceId) {
				var pieceMoves = piecesArray[p].moves().map(squareToIndex);
				if (pieceMoves.indexOf(squareIndex) !== -1) {
					if (oldSquare[1] === piecesArray[p].rank || (oldSquare[1] !== piecesArray[p].rank && oldSquare[0] !== piecesArray[p].file)) {
						algOldSquare[0] = oldFileLetter;
					}
					if (oldSquare[0] === piecesArray[p].file) {
						algOldSquare[1] = oldSquare[1];
					}
				}
				
			}
		}
		pieceString += algOldSquare.join('');
	}

	if (pieceType === "P") {

		// if the pawn is moving off of its file, it is capturing
		if (oldSquare[0] !== square[0]) {
			capString = oldFileLetter + "x";
		}

		// check for promotion
		if (square[1] === 1 || square[1] === 8) {
			promotionString = "=" + $('input[name=piece]:checked').val();
		}
	}
	else if (capture) {
		capString = "x";
	}

	var squareString =  newFileLetter + square[1];
	return pieceString + capString + squareString + promotionString;
}

/**
 * Creates a string representation of the board
 */

function getBoardString() {
	var boardString = '';

	// for in loop skips over undefined entries
	for (var i = 0; i < occupiedSquares.length; i++) {
		if (occupiedSquares[i]) {
			boardString += occupiedSquares[i].slice(0, 2);
		}
		else {
			boardString += '_';
		}
	}
	return boardString;
}

/**
 * Returns the piece's location in its corresponding array. Due to captures, the piece's id may !== its index
 * @param {String} piece - the piece type to find an index for (eg. wP for white pawn)
 * @param {number} id - the piece's id
 * @return {number} index 
 */

function findPieceIndex(piece, id) {

	var pieceType = allPieces[piece];

	for (var p = 0; p < pieceType.length; p++) {

		// different type (.id is a string, id is a number), so use == operator
		if (pieceType[p].id == id) {
			return p;
		}
	}
}

/**
 * Gets the legal moves of a piece when its king is in check
 * @param {String[]} checkingPieces - the pieces that are checking the piece's king
 * @param {String} clickedPiece - the piece that the player is trying to move
 * @return {number[]} legalMoves - the legal moves, represented as an array of board square indices, that the clicked piece can make
 */

function getLegalMoves(checkingPieces, clickedPiece) {

	var king = allPieces[clickedPiece[0] + 'K'][0];
	var kingSquare = [king.file, king.rank];
	var kingIndex = squareToIndex(kingSquare);

	var legalMoves = [];
	var clickedPieceColorAndType = clickedPiece.slice(0, 2);
	var clickedPieceId = clickedPiece[2];
	var clickedPieceIndex = findPieceIndex(clickedPieceColorAndType, clickedPieceId);
	var clickedPieceMoves = allPieces[clickedPieceColorAndType][clickedPieceIndex].moves().map(squareToIndex);

	// check if there is only one checkingPiece, it may be possible to capture or block it
	if (checkingPieces.length === 1) {
		var checkingPieceColorAndType = checkingPieces[0].slice(0, 2)
		var checkingPieceIndex = findPieceIndex(checkingPieceColorAndType, checkingPieces[0][2])
		var checkingPiece = allPieces[checkingPieceColorAndType][checkingPieceIndex];
		var checkingPieceSquare = [checkingPiece.file, checkingPiece.rank]
		var checkingPieceIndex = squareToIndex(checkingPieceSquare);
		
		// can the piece be captured?
		var captureMove = clickedPieceMoves.indexOf(checkingPieceIndex);
		if (captureMove !== -1) {
			legalMoves.push(clickedPieceMoves[captureMove]);
		}

		// can the piece be blocked?
		// knights and pawns cannot be blocked
		if (checkingPieceColorAndType[1] !== 'N' && checkingPieceColorAndType[1] !== 'P') {
			var checkPath = getCheckPath(checkingPieceSquare, kingSquare, false).map(squareToIndex);
			for (var i = 0; i < checkPath.length; i++) {
				var blockMove = clickedPieceMoves.indexOf(checkPath[i]);
				if (blockMove !== -1) {
					legalMoves.push(clickedPieceMoves[blockMove]);
				} 
			}
		}
	}

	// only the king can move
	if (clickedPiece[1] === 'K') {

		var attackedSquaresA = [];
		for (var piece in checkingPieces) {
			var checkingPieceColorAndType = checkingPieces[piece].slice(0, 2)
			var checkingPieceIndex = findPieceIndex(checkingPieceColorAndType, checkingPieces[piece][2])
			var checkingPiece = allPieces[checkingPieceColorAndType][checkingPieceIndex];
			var checkingPieceSquare = [checkingPiece.file, checkingPiece.rank]
			var checkPath = getCheckPath(checkingPieceSquare, kingSquare, true).map(squareToIndex);

			for (var c in checkPath) {
				if (checkPath[c] !== kingIndex) {
					attackedSquaresA.push(checkPath[c]);
				}
			}
		}

		var kingMoves = king.moves().map(squareToIndex);

		var legalKingMoves = kingMoves.filter(function(val) {
			return attackedSquaresA.indexOf(val) === -1;
		});

		for (var m in legalKingMoves) {
			legalMoves.push(legalKingMoves[m]);
		}
	}

	return legalMoves;
}

/**
 * Calculates the path between a piece and a king if such a path exists
 * @param {number[]} checkingPieceSquare - the square of one of the checking piece
 * @param {number[]} kingSquare - the square of the other one of the king 
 * @param {boolean} extend - whether the path should be extended (used for also including the square beyond the king)
 * @return {number[][]} checkPath - an array of squares between the pieces, returns [] if no so path
 */

function getCheckPath(checkingPieceSquare, kingSquare, extend) {
	var checkPath = [];
	var delF = checkingPieceSquare[0] - kingSquare[0]; // change in file
	var delR = checkingPieceSquare[1] - kingSquare[1]; // change in rank
	var pieceDist = Math.max(Math.abs(delF), Math.abs(delR));

	// there is a valid path 
	if (delF === 0 || delR === 0 || Math.abs(delF/delR) === 1) {

		// extend the path so that it blocks the king from retreating in the direction of the check
		// TODO: this also includes the king's current square
		var pathLength = extend ? pieceDist + 2 : pieceDist;
		for (var i = 1; i < pathLength; i++) {
			checkPath.push([checkingPieceSquare[0] - i * delF/pieceDist, checkingPieceSquare[1] - i * delR/pieceDist]);
		}
	}

	return checkPath;
}


/**
 * Checks to see if the game is a draw
 * @param {String} color - the color for which to check (used in checkStalemate)
 * @param {String[]} boardStrings - an array of strings representing board states
 * @return {boolean} - whether the game is a draw
 */

function checkDraw(color, boardStrings, drawMoveCounter) {
	if (!checkMatingMaterial() || checkDrawRep(boardStrings) || checkDraw50(drawMoveCounter) || checkStalemate(color)) {
		return true;
	}
	return false;
}

/**
 * Checks to see if the game is a draw by insufficient mating material.
 * Material is based on whether a checkmate is possible and not whehter a forced checkmate is possible.
 * Some examples of winnable games:
 * 2 N + K vs K
 * 1B + K vs 1B + K (provided that the bishops have opposite colors)
 * Some example of drawn games:
 * 1-8 B + K vs K + 1-8 B (provided that all bishops have the same colors)
 * 1N + K vs 1N + K
 * @return {boolean} - whether or not there is enough material to a plater to checkmate
 */

function checkMatingMaterial() {

	// no more major pieces or pawns
	if (allPieces['wQ'].length === 0 && allPieces['bQ'].length === 0 &&
		allPieces['wR'].length === 0 && allPieces['bR'].length === 0 &&
		allPieces['wP'].length === 0 && allPieces['bP'].length === 0) {

		for (var i = 0; i < colors.length; i++) {
			var p1 = colors[i];
			var p2 = colors[(i + 1) % 2];

			// one player has no pieces, can the other mate?
			if (!allPieces[p1 + 'B'].length && !allPieces[p1 + 'N'].length) {

				// if the other player has no knights does the other player have at least one pair of bishops with opposite colored squares
				if (!allPieces[p2 + 'N'].length && !differentColorBishops()) {
					$('.result-description').html("It's a draw by insufficient mating material!");
					return false;
				}

				// only one of bishop or knight
				if (allPieces[p2 + 'B'].length + allPieces[p2 + 'N'].length < 2) {
					$('.result-description').html("It's a draw by insufficient mating material!");
					return false;
				}
			}
		}

		// no knights left, are there different colored bishops?
		if (!allPieces['wN'].length && !allPieces['bN'].length) {
			if (!differentColorBishops()) {
				$('.result-description').html("It's a draw by insufficient mating material!");
				return false;
			}
		}

		// no bishops left, does either player have two or more knights?
		else if (!allPieces['wB'].length && !allPieces['bB'].length) {
			return allPieces['wN'].length > 1 || allPieces['bN'].length > 1;
		}
	}
	return true;
}

/**
 * Checks to see if the game is a draw by repetition
 * @return {boolean} - whether the game is a draw
 */

function checkDrawRep(boardStrings) {
	var currBoardString = boardStrings[boardStrings.length - 1];
	var counter = 1;
	for (var i = 0; i < boardStrings.length - 1; i++) {
		if (boardStrings[i] === currBoardString) {
			counter++;
		}
		if (counter === 3) {
			$('.result-description').html("It's a draw by repetition!");
			return true;
		}
	}
	return false;
}

/**
 * Checks to see if the game is a draw by the fifty-move rule
 * @return {boolean} - whether the game is a draw
 */

function checkDraw50(drawMoveCounter) {

	// a turn if one move from each player
	if (drawMoveCounter === 50) {
		$('.result-description').html("It's a draw by the fifty-move rule!");
		return true;
	}
	return false;
}

/**
 * Checks to see if the game is a draw by stalemate
 * @param {string} color - the color to check if there are any legal moves
 * @return {boolean} - whether the game is a draw
 */

function checkStalemate(color) {
	for (var pieceType in allPieces) {
		if (pieceType[0] === color) {
			var pieces = allPieces[pieceType];
			for (var i in pieces) {
				if (pieces[i].moves().length) {
					return false;
				}
			}
		}
	}
	$('.result-description').html("It's a draw by stalemate!");
	return true;
}

/**
 * Checks to see if a player is in checkmate
 * @param {string} currentColor - the player who is in check
 * @param {string} opponentColor - the player who is giving check
 * @param {String[]} color - the pieces that are giving check
 * @return {boolean} - whether the player is in checkmate
 */

function checkCheckmate(currentColor, opponentColor, checkingPieces) {
	for (var pieceType in allPieces) {
		if (pieceType[0] === currentColor) {
			var pieces = allPieces[pieceType];
			for (var j in pieces) {
				var colorAndType = pieces[j].color + pieces[j].abbr;
				var selectedPiece = colorAndType + pieces[j].id;
				if (getLegalMoves(checkingPieces, selectedPiece).length) {
					return false;
				}
			}
		}
	}
	$('.result-description').html("Checkmate! " + colorAbbreviations[opponentColor] + " wins!");
	drawCheckSquare(currentColor, false); // make the square the normal color
	return true;
}

function otherColor(color) {
	return color === 'w' ? 'b' : 'w';
}
