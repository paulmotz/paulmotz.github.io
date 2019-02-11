class Pawn extends Piece {

	/**
	 * Get the list of Pawn moves
	 * @return {Number[][]} moves - the squares to which the Pawn can move as an array of co-ordinates (also an array)
	 */
	moves() {
		const color = this.color;
 		const file = this._file;
 		const rank = this._rank;
 		const moves = [];
 		let rookPin = false; // a vertical pin
 		let bishopPinBD = false; // a diagonal pin that is parallel with the large black diagonal (A1-H8)
 		let bishopPinWD = false; // a diagonal pin that is parallel with the large white diagonal (A8-H1)

 		// pawn pin checks work, but I don't think it is very elegant
		const pD = this.getPinDirection();
 		if (pD) {
 			const [f, r] = pD;

 			// horizontal/vertical pin
 			if ((f + r) % 2 !== 0) {
 				if (r === -0) {

 					// a horizontally pinned pawn cannot move at all
 					return moves;
 				}
 				else {
 					rookPin = true;
 				}
 			}
 			else {
 				if (f === r) {
 					bishopPinBD = true;
 				}
 				else {
 					bishopPinWD = true;
 				}
 			}
 		}

		
 		// white pawns move up the ranks
 		if (color === 'w') {
 			if (!occupiedSquares[squareToIndex([file, rank + 1]) - 1] && !bishopPinBD && !bishopPinWD) {
 				moves.push([file, rank + 1]);

 				// a white pawn has not moved if it is on the 2nd rank
 				// this has to be nested since if the square one rank above is blocked, the pawn cannot move two squares
	 			if (rank === 2) {
	 				if (!occupiedSquares[squareToIndex([file, rank + 2]) - 1]) {
		 				moves.push([file, rank + 2]);
		 			}
	 			}
 			}	

 			// normal capturing
 			if (file - 1 >= 1 && occupiedSquares[squareToIndex([file - 1, rank + 1]) - 1] && occupiedSquares[squareToIndex([file - 1, rank + 1]) - 1][0] !== color && !rookPin && !bishopPinBD) {
 				moves.push([file - 1, rank + 1]);
 			}
 			if (file + 1 <= 8 && occupiedSquares[squareToIndex([file + 1, rank + 1]) - 1] && occupiedSquares[squareToIndex([file + 1, rank + 1]) - 1][0] !== color && !rookPin && !bishopPinWD) {
 				moves.push([file + 1, rank + 1]);
 			}

 			// en passant
 			if (rank === 5) {
	 			// if (file - 1 >= 1 && occupiedSquares[squareToIndex([file - 1, rank]) - 1] && occupiedSquares[squareToIndex([file - 1, rank]) - 1][0] !== color && occupiedSquares[squareToIndex([file - 1, rank]) - 1] === enPassantPawn) {
 				if (file - 1 >= 1 && occupiedSquares[squareToIndex([file - 1, rank]) - 1] && occupiedSquares[squareToIndex([file - 1, rank]) - 1] === enPassantPawn && !rookPin && !bishopPinBD) {
	 				moves.push([file - 1, rank + 1]);
	 			}
	 			if (file + 1 <= 8 && occupiedSquares[squareToIndex([file + 1, rank]) - 1] && occupiedSquares[squareToIndex([file + 1, rank]) - 1] === enPassantPawn && !rookPin && !bishopPinWD) {
	 				moves.push([file + 1, rank + 1]);
	 			}
	 		}
 		}

 		// black pawns move down the ranks
 		else {

 			if (!occupiedSquares[squareToIndex([file, rank - 1]) - 1] && !bishopPinBD && !bishopPinWD) {
 				moves.push([file, rank - 1]);

 				// a black pawn has not moved if it is on the 7th rank
 				// this has to be nested since if the square one rank below is blocked, the pawn cannot move two squares
	 			if (rank === 7) {
	 				if (!occupiedSquares[squareToIndex([file, rank - 2]) - 1]) {
		 				moves.push([file, rank - 2]);
		 			}
	 			}
 			}	

 			// normal capturing
 			if (file - 1 >= 1 && occupiedSquares[squareToIndex([file - 1, rank - 1]) - 1] && occupiedSquares[squareToIndex([file - 1, rank - 1]) - 1][0] !== color && !rookPin && !bishopPinWD) {
 				moves.push([file - 1, rank - 1]);
 			}
 			if (file + 1 <= 8 && occupiedSquares[squareToIndex([file + 1, rank - 1]) - 1] && occupiedSquares[squareToIndex([file + 1, rank - 1]) - 1][0] !== color && !rookPin && !bishopPinBD) {
 				moves.push([file + 1, rank - 1]);
 			}

 			// en passant
 			if (rank === 4) {
	 			if (file - 1 >= 1 && occupiedSquares[squareToIndex([file - 1, rank]) - 1] && occupiedSquares[squareToIndex([file - 1, rank]) - 1] === enPassantPawn && !rookPin && !bishopPinWD) {
	 				moves.push([file - 1, rank - 1]);
	 			}
	 			if (file + 1 <= 8 && occupiedSquares[squareToIndex([file + 1, rank]) - 1] && occupiedSquares[squareToIndex([file + 1, rank]) - 1] === enPassantPawn && !rookPin && !bishopPinBD) {
	 				moves.push([file + 1, rank - 1]);
	 			}
	 		}
 		}

 		return moves;
 	}

 	/**
	 * Get the squares that the Pawn protects
	 * @return {Number[][]} protectedSquares - the squares that the Pawn protects as an array of co-ordinates (also an array)
	 */
 	protectedSquares(occupiedSquares) {
 		const color = this._color
 		const file = this._file;
 		const rank = this._rank;
		let protectedSquares = color === 'w' ? [[file - 1, rank + 1], [file + 1, rank + 1]] : 
			[[file - 1, rank - 1], [file + 1, rank - 1]];

		protectedSquares = protectedSquares.filter(checkSquareOnBoard);

		return protectedSquares;
 	}
}
