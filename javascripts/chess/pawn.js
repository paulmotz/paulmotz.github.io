class Pawn extends Piece {

	// TODO:
	// pawn promotion
	// en passant
	// capturing
	// 

	/*
	 * Creates a pawn of the given color at the given location
	 * @param {string} color - The color of the pawn: white || black
	 * @param {number} file - file rank of the pawn: 1 - 8
	 * @param {number} rank - the rank of the pawn: 1 - 8
	 * @param {boolean} hasMoved - whether or not the pawn has moved (used for checking if it can move two squares)
	 */

	constructor(color, file, rank, id, hasMoved) {
		super(color, file, rank, id)
		this._hasMoved = hasMoved;
	}

	moves(occupiedSquares) {
		var color = this.color;
 		var file = this._file;
 		var rank = this._rank;
 		var hasMoved = this._hasMoved;
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
 			if (occupiedSquares[squareToIndex([file - 1, rank + 1]) - 1] && occupiedSquares[squareToIndex([file - 1, rank + 1]) - 1][0] !== color) {
 				// console.log(occupiedSquares[squareToIndex([file - 1, rank + 1]) - 1][0]);
 				moves.push([file - 1, rank + 1]);
 			}
 			if (occupiedSquares[squareToIndex([file - 1, rank + 1]) - 1] && occupiedSquares[squareToIndex([file - 1, rank + 1]) - 1][0] !== color) {
 				moves.push([file + 1, rank + 1]);
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
 		}

 		return moves;
 	}
}
