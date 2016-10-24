class King extends Piece {
	
	// TODO:
	// check if the piece is in check
	// check if castling will put the piece in check
	// add castling as a move
	// restrict move if move would place the king in check

	/*
	 * Creates a king of the given color at the given location
	 * @param {string} color - The color of the king: white || black
	 * @param {number} file - file rank of the king: 1 - 8
	 * @param {number} rank - the rank of the king: 1 - 8
	 * @param {boolean} hasMoved - whether or not the king has moved (used for checking if castling is possible)
	 */

	constructor(color, file, rank, id, hasMoved) {
		super(color, file, rank, id)
		this._hasMoved = hasMoved;
	}

	/**
	 * Get the King's moves
	 * @return {number[][]} moves - the moves of the King as an array of co-ordinates (also an array)
	 */

 	get moves() {
 		var file = this._file;
 		var rank = this._rank;
 		var possibleMoves = [ [file - 1, rank + 1], [file, rank + 1], [file + 1, rank + 1], 
 							  [file - 1, rank],                       [file + 1, rank], 
 							  [file - 1, rank - 1], [file, rank - 1], [file + 1, rank - 1] ];

		var moves = possibleMoves.filter(function(square){
			return square[0] > 0 && square[0] < 9 && square[1] > 0 && square[1] < 9;
		});

		return moves;
 	}
}
