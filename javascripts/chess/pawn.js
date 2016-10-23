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

	constructor(color, file, rank, hasMoved) {
		super(color, file, rank)
		this._hasMoved = hasMoved;
	}

	get moves() {
		var color = this.color;
 		var file = this._file;
 		var rank = this._rank;
 		var hasMoved = this._hasMoved;
 		var moves = [];

 		// white pawns move up the ranks
 		if (color === 'white') {
 			moves.push([file, rank + 1]);

 			// a white pawn has not moved if it is on the 2nd rank
 			if (rank === 2) {
 				moves.push([file, rank + 2]);
 			}
 		}

 		// black pawns move down the ranks
 		else {
 			moves.push([file, rank - 1]);

 			// a black pawn has not moved if it is on the 7th rank
 			if (rank === 7) {
 				moves.push([file, rank - 2]);
 			}
 		}

 		return moves;
 	}
}
