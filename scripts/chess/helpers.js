/**
 * Checks to see that there is at least one pair of bishop with opposing square colors
 * @return {Boolean} - true if there is a pair of bishops with opposing square colors
 */
function differentColorBishops() {
	// there are no bishops
	if (!allPieces['wB'].length && !allPieces['bB'].length) {
		return false;
	}
	const firstBishop = allPieces['wB'].length ? allPieces['wB'][0] : allPieces['bB'][0];
	const firstBishopSquareColor = (firstBishop.file + firstBishop.rank) % 2;
	for (const color of colors) {
		const bishops = allPieces[color + 'B'];
		for (const bishop in bishops) {
			if (firstBishopSquareColor !== (bishop.file + bishop.rank) % 2) {
				return true;
			}
		}
	}
	return false;
}

/**
 * Maps the rank and file of a square to an integer that is unique among other squares
 * @param {Number[]} square - the square's file, two numbers: 1 - 8
 * @return {Number} index - the index of the square: 1 - 64
 */
function squareToIndex(square) {
	if (checkSquareOnBoard(square)) {
		return (square[1] - 1) * 8 + square[0];
	}
}

/**
 * Maps the unique index of a square to its rank and file
 * @param {Number} index - the index of the square: 1 - 64
 * @return {Number[]} square - the indices of the square in the form [file, rank]
 */
function indexToSquare(index) {
	const file = index % 8 === 0 ? 8 : index % 8;
	return [file, Math.ceil(index / 8)];
}

/**
 * Maps the unique index of a square to its algebraic notation represantaion
 * @param {String} piece - the color of the piece followed by its type
 * @param {String} pieceId - the id of the piece
 * @param {Boolean} capture - whether the move captures a piece
 * @param {Number} squareIndex - the index of the square: 1 - 64
 * @param {Number[]} oldSquare - former location of the piece in the form [file, rank]
 * @return {String} algSquare - the algebraic notation representatino of the square e.g. e4
 */
function getAlgNotMove(piece, pieceId, capture, squareIndex, oldSquare) {
	const pieceType = piece[1];
	let pieceString = pieceType !== 'P' ? pieceType : '';
	pieceId = Number(pieceId); // ensure pieceId is a Number and not a string
	let capString = '';
	let promotionString = '';

	const oldFileLetter = String.fromCharCode(oldSquare[0] + 96);
	const square = indexToSquare(squareIndex);
	const newFileLetter = String.fromCharCode(square[0] + 96);

	// check if multiple pieces of that type can move to the same square and disambiguate if so
	if (pieceType !== 'P' && pieceType !== 'K') {		
		// find all pieces that can move to the square and keep track of their file/rank
		const algOldSquare = Array(2);
		const piecesArray = allPieces[piece];
		for (const piece of piecesArray) {
			if (piece.id !==  pieceId) {
				const pieceMoves = piece.moves().map(squareToIndex);
				if (!pieceMoves.includes(squareIndex)) {
					if (oldSquare[1] === piece.rank || (oldSquare[1] !== piece.rank && oldSquare[0] !== piece.file)) {
						algOldSquare[0] = oldFileLetter;
					}
					if (oldSquare[0] === piece.file) {
						algOldSquare[1] = oldSquare[1];
					}
				}
				
			}
		}
		pieceString += algOldSquare.join('');
	}

	if (pieceType === 'P') {
		// if the pawn is moving off of its file, it is capturing
		if (oldSquare[0] !== square[0]) {
			capString = oldFileLetter + 'x';
		}

		// check for promotion
		if (square[1] === 1 || square[1] === 8) {
			promotionString = `=${$('input[name=piece]:checked').val()}`;
		}
	}
	else if (capture) {
		capString = 'x';
	}

	const squareString =  newFileLetter + square[1];
	return pieceString + capString + squareString + promotionString;
}

/**
 * Creates a String representation of the board
 */
function getBoardString() {
	let boardString = '';

	// for in loop skips over undefined entries
	for (let i = 0; i < occupiedSquares.length; i++) {
		if (occupiedSquares[i]) {
			boardString += occupiedSquares[i].slice(0, 2);
		}
		else {
			// two underscores since piece names are color + piece type
			boardString += '__';
		}
	}
	return boardString;
}

/**
 * Returns the piece's location in its corresponding array. Due to captures, the piece's id may !== its index
 * @param {String} piece - the piece type to find an index for (eg. wP for white pawn)
 * @param {Number} id - the piece's id
 * @return {Number} index 
 */
function findPieceIndex(piece, id) {
	return allPieces[piece].findIndex(piece => Number(piece.id) === Number(id));
}

/**
 * Gets the legal moves of a piece when its king is in check
 * @param {String[]} checkingPieces - the pieces that are checking the piece's king
 * @param {String} clickedPiece - the piece that the player is trying to move
 * @return {Number[]} legalMoves - the legal moves, represented as an array of board square indices, that the clicked piece can make
 */
function getLegalMoves(checkingPieces, clickedPiece) {
	const [king] = allPieces[clickedPiece[0] + 'K'];
	const kingSquare = [king.file, king.rank];
	const kingIndex = squareToIndex(kingSquare);

	const legalMoves = [];
	let clickedPieceColorAndType = clickedPiece.slice(0, 2);
	let clickedPieceId = clickedPiece[2];
	let clickedPieceIndex = findPieceIndex(clickedPieceColorAndType, clickedPieceId);
	let clickedPieceMoves = allPieces[clickedPieceColorAndType][clickedPieceIndex].moves().map(squareToIndex);

	// check if there is only one checkingPiece, it may be possible to capture or block it
	if (checkingPieces.length === 1) {
		const checkingPieceColorAndType = checkingPieces[0].slice(0, 2)
		let checkingPieceIndex = findPieceIndex(checkingPieceColorAndType, checkingPieces[0][2])
		const checkingPiece = allPieces[checkingPieceColorAndType][checkingPieceIndex];
		const checkingPieceSquare = [checkingPiece.file, checkingPiece.rank]
		checkingPieceIndex = squareToIndex(checkingPieceSquare);
		
		// can the piece be captured?
		const captureMove = clickedPieceMoves.indexOf(checkingPieceIndex);
		if (captureMove !== -1) {
			legalMoves.push(clickedPieceMoves[captureMove]);
		}

		// can the piece be blocked?
		// knights and pawns cannot be blocked
		if (checkingPieceColorAndType[1] !== 'N' && checkingPieceColorAndType[1] !== 'P') {
			const checkPath = getCheckPath(checkingPieceSquare, kingSquare, false).map(squareToIndex);
			for (const square of checkPath) {
				const blockMove = clickedPieceMoves.indexOf(square);
				if (blockMove !== -1) {
					legalMoves.push(clickedPieceMoves[blockMove]);
				} 
			}
		}
	}

	// only the king can move
	if (clickedPiece[1] === 'K') {
		const attackedSquares = [];
		for (const piece of checkingPieces) {
			const checkingPieceColorAndType = piece.slice(0, 2)
			const checkingPieceIndex = findPieceIndex(checkingPieceColorAndType, piece[2])
			const checkingPiece = allPieces[checkingPieceColorAndType][checkingPieceIndex];
			const checkingPieceSquare = [checkingPiece.file, checkingPiece.rank]

			// no need to get check path for knights and pawns
			if (checkingPieceColorAndType[1] !== 'N' && checkingPieceColorAndType[1] !== 'P') {
				const checkPath = getCheckPath(checkingPieceSquare, kingSquare, true).map(squareToIndex);

				for (const square of checkPath) {
					if (square !== kingIndex) {
						attackedSquares.push(square);
					}
				}
			}
		}

		const kingMoves = king.moves().map(squareToIndex);

		const legalKingMoves = kingMoves.filter((val) => {
			return !attackedSquares.includes(val);
		});

		for (const legalKingMove of legalKingMoves) {
			legalMoves.push(legalKingMove);
		}
	}

	return legalMoves;
}

/**
 * Calculates the path between a piece and a king if such a path exists
 * @param {Number[]} checkingPieceSquare - the square of one of the checking piece
 * @param {Number[]} kingSquare - the square of the other one of the king 
 * @param {Boolean} extend - whether the path should be extended (used for also including the square beyond the king)
 * @return {Number[][]} checkPath - an array of squares between the pieces, returns [] if no so path
 */
function getCheckPath(checkingPieceSquare, kingSquare, extend) {
	const checkPath = [];
	const delF = checkingPieceSquare[0] - kingSquare[0]; // change in file
	const delR = checkingPieceSquare[1] - kingSquare[1]; // change in rank
	const pieceDist = Math.max(Math.abs(delF), Math.abs(delR));

	// there is a valid path 
	if (delF === 0 || delR === 0 || Math.abs(delF / delR) === 1) {
		// extend the path so that it blocks the king from retreating in the direction of the check
		// TODO: this also includes the king's current square
		const pathLength = extend ? pieceDist + 2 : pieceDist;
		for (let i = 1; i < pathLength; i++) {
			checkPath.push([checkingPieceSquare[0] - i * delF / pieceDist, checkingPieceSquare[1] - i * delR / pieceDist]);
		}
	}

	return checkPath;
}


/**
 * Checks to see if the game is a draw
 * @param {String} color - the color for which to check (used in checkStalemate)
 * @param {String[]} boardStrings - an array of Strings representing board states
 * @return {Boolean} - whether the game is a draw
 */
function checkDraw(color, boardStrings, drawMoveCounter) {
	return !checkMatingMaterial() || checkDrawRep(boardStrings) || checkDraw50(drawMoveCounter) || checkStalemate(color);
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
 * @return {Boolean} - whether or not there is enough material to a plater to checkmate
 */
function checkMatingMaterial() {
	// no more major pieces or pawns
	if (allPieces['wQ'].length === 0 && allPieces['bQ'].length === 0 &&
		allPieces['wR'].length === 0 && allPieces['bR'].length === 0 &&
		allPieces['wP'].length === 0 && allPieces['bP'].length === 0) {

		for (let i = 0; i < colors.length; i++) {
			let p1 = colors[i];
			let p2 = colors[(i + 1) % 2];

			// one player has no pieces, can the other mate?
			if (!allPieces[p1 + 'B'].length && !allPieces[p1 + 'N'].length) {

				// if the other player has no knights does the other player have at least one pair of bishops with opposite colored squares
				if (!allPieces[p2 + 'N'].length && !differentColorBishops()) {
					$('.result-description').html(`It's a draw by insufficient mating material!`);
					return false;
				}

				// only one of bishop or knight
				if (allPieces[p2 + 'B'].length + allPieces[p2 + 'N'].length < 2) {
					$('.result-description').html(`It's a draw by insufficient mating material!`);
					return false;
				}
			}
		}

		// no knights left, are there different colored bishops?
		if (!allPieces['wN'].length && !allPieces['bN'].length) {
			if (!differentColorBishops()) {
				$('.result-description').html(`It's a draw by insufficient mating material!`);
				return false;
			}
		}

		// no bishops left, do both players have one or fewer knights?
		else if (!allPieces['wB'].length && !allPieces['bB'].length) {
			if (allPieces['wN'].length <= 1 && allPieces['bN'].length <= 1) {
				$('.result-description').html(`It's a draw by insufficient mating material!`);
				return false;
			}
		}
	}
	return true;
}

/**
 * Checks to see if the game is a draw by repetition
 * @return {Boolean} - whether the game is a draw
 */
function checkDrawRep(boardStrings) {
	const currBoardString = boardStrings[boardStrings.length - 1];
	let counter = 1;
	for (let i = 0; i < boardStrings.length - 1; i++) {
		if (boardStrings[i] === currBoardString) {
			counter++;
		}
		if (counter === 3) {
			$('.result-description').html(`It's a draw by repetition!`);
			return true;
		}
	}
	return false;
}

/**
 * Checks to see if the game is a draw by the fifty-move rule
 * @return {Boolean} - whether the game is a draw
 */
function checkDraw50(drawMoveCounter) {

	// a turn if one move from each player
	if (drawMoveCounter === 50) {
		$('.result-description').html(`It's a draw by the fifty-move rule!`);
		return true;
	}
	return false;
}

/**
 * Checks to see if the game is a draw by stalemate
 * @param {String} color - the color to check if there are any legal moves
 * @return {Boolean} - whether the game is a draw
 */
function checkStalemate(color) {
	for (const pieceType in allPieces) {
		if (pieceType[0] === color) {
			const pieces = allPieces[pieceType];
			for (const piece of allPieces[pieceType]) {
				if (piece.moves().length) {
					return false;
				}
			}
		}
	}
	$('.result-description').html(`It's a draw by stalemate!`);
	return true;
}	


/**
 * Checks to see if a player is in checkmate
 * @param {string} currentColor - the player who is in check
 * @param {String} opponentColor - the player who is giving check
 * @param {String[]} checkingPieces - the pieces that are giving check
 * @return {Boolean} - whether the player is in checkmate
 */
function checkCheckmate(currentColor, opponentColor, checkingPieces) {
	for (const pieceType in allPieces) {
		if (pieceType[0] === currentColor) {
			for (const piece of allPieces[pieceType]) {
				const selectedPiece = piece.color + piece.abbr + piece.id;
				if (getLegalMoves(checkingPieces, selectedPiece).length) {
					return false;
				}
			}
		}
	}
	const winningColor = colorAbbreviations[opponentColor]
	$('.result-description').html(`Checkmate! ${winningColor} wins!`);
	const resultString = winningColor === 'White' ? '1-0' : '0-1';
	$('.result').html(resultString);
	drawCheckSquare(currentColor, false); // make the square the normal color
	return true;
}

/**
 * Returns the color of the otehr player
 * @param {String} color - the player's color
 * @return {String} - the opposite color
 */
function otherColor(color) {
	return color === 'w' ? 'b' : 'w';
}

/**
 * Checks whether the square is on the board
 * @param {Number[]} square - the square's file, two numbers: 1 - 8
 * @return {Boolen} - whether the square is on the board
 */
function checkSquareOnBoard(square) {
	return square[0] >= 1 && square[0] <= 8 && square[1] >= 1 && square[1] <= 8
}
