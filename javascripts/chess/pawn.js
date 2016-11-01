class Pawn extends Piece {

	/*
	 * Creates a pawn of the given color at the given location
	 * @param {string} color - The color of the pawn: white || black
	 * @param {number} file - file rank of the pawn: 1 - 8
	 * @param {number} rank - the rank of the pawn: 1 - 8
	 */

	constructor(color, file, rank, id, hasMoved) {
		super(color, file, rank, id)
	}

	moves(occupiedSquares) {
		var color = this.color;
 		var file = this._file;
 		var rank = this._rank;
 		var moves = [];

 		// white pawns move up the ranks
 		if (color === 'w') {

 			if (!occupiedSquares[squareToIndex([file, rank + 1]) - 1]) {
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
 			if (file - 1 >= 1 && occupiedSquares[squareToIndex([file - 1, rank + 1]) - 1] && occupiedSquares[squareToIndex([file - 1, rank + 1]) - 1][0] !== color) {
 				moves.push([file - 1, rank + 1]);
 			}
 			if (file + 1 <= 8 && occupiedSquares[squareToIndex([file + 1, rank + 1]) - 1] && occupiedSquares[squareToIndex([file + 1, rank + 1]) - 1][0] !== color) {
 				moves.push([file + 1, rank + 1]);
 			}

 			// en passant
 			if (rank === 5) {
	 			// if (file - 1 >= 1 && occupiedSquares[squareToIndex([file - 1, rank]) - 1] && occupiedSquares[squareToIndex([file - 1, rank]) - 1][0] !== color && occupiedSquares[squareToIndex([file - 1, rank]) - 1] === enPassantPawn) {
	 				if (file - 1 >= 1 && occupiedSquares[squareToIndex([file - 1, rank]) - 1] && occupiedSquares[squareToIndex([file - 1, rank]) - 1] === enPassantPawn) {
	 				moves.push([file - 1, rank + 1]);
	 			}
	 			if (file + 1 <= 8 && occupiedSquares[squareToIndex([file + 1, rank]) - 1] && occupiedSquares[squareToIndex([file + 1, rank]) - 1] === enPassantPawn) {
	 				moves.push([file + 1, rank + 1]);
	 			}
	 		}
 		}

 		// black pawns move down the ranks
 		else {

 			if (!occupiedSquares[squareToIndex([file, rank - 1]) - 1]) {
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
 			if (file - 1 >= 1 && occupiedSquares[squareToIndex([file - 1, rank - 1]) - 1] && occupiedSquares[squareToIndex([file - 1, rank - 1]) - 1][0] !== color) {
 				moves.push([file - 1, rank - 1]);
 			}
 			if (file + 1 <= 8 && occupiedSquares[squareToIndex([file + 1, rank - 1]) - 1] && occupiedSquares[squareToIndex([file + 1, rank - 1]) - 1][0] !== color) {
 				moves.push([file + 1, rank - 1]);
 			}

 			// en passant
 			if (rank === 4) {
	 			if (file - 1 >= 1 && occupiedSquares[squareToIndex([file - 1, rank]) - 1] && occupiedSquares[squareToIndex([file - 1, rank]) - 1] === enPassantPawn) {
	 				moves.push([file - 1, rank - 1]);
	 			}
	 			if (file + 1 <= 8 && occupiedSquares[squareToIndex([file + 1, rank]) - 1] && occupiedSquares[squareToIndex([file + 1, rank]) - 1] === enPassantPawn) {
	 				moves.push([file + 1, rank - 1]);
	 			}
	 		}
 		}

 		return moves;
 	}

 	/**
	 * Get the squares that the Pawn protects
	 * @return {number[][]} protectedSquares - the squares that the Pawn protects as an array of co-ordinates (also an array)
	 */

 	protectedSquares(occupiedSquares) {
 		var color = this._color
 		var file = this._file;
 		var rank = this._rank;
		var protectedSquares = color === 'w' ? [[file - 1, rank + 1], [file + 1, rank + 1]] : [[file - 1, rank - 1], [file + 1, rank - 1]];

		// ensure protected squares are off the board. Only need to check file and not rank.
		var protectedSquares = protectedSquares.filter(function(square) {
			return square[0] > 0 && square[0] < 9;
		});

		return protectedSquares;
 	}
}
