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
 * Maps the rank and file of a square to an integer that is unique among other squares
 * @param {number} index - the indicex of the square: 1 - 64
 * @return {number[]} square - the indices of the square in the form [file, rank]
 */

function indexToSquare(index) {
	var file = index % 8 === 0 ? 8 : index % 8;
	return [file, Math.ceil(index / 8)];
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
		var attackedSquares = [];
		for (var piece in checkingPieces) {
			var checkingPieceColorAndType = checkingPieces[piece].slice(0, 2)
			var checkingPieceIndex = findPieceIndex(checkingPieceColorAndType, checkingPieces[piece][2])
			var checkingPiece = allPieces[checkingPieceColorAndType][checkingPieceIndex];
			var checkingPieceSquare = [checkingPiece.file, checkingPiece.rank]
			var checkPath = getCheckPath(checkingPieceSquare, kingSquare, true).map(squareToIndex);

			for (var c in checkPath) {
				if (checkPath[c] !== kingIndex) {
					attackedSquares.push(checkPath[c]);
				}
			}

		}

		var kingMoves = king.moves().map(squareToIndex);

		var legalKingMoves = kingMoves.filter(function(val) {
			return attackedSquares.indexOf(val) === -1;
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
