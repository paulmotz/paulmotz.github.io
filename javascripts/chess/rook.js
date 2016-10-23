class Rook extends Piece {

	// TODO:
	// add castling as a move (maybe this is just a king move)
	
	/*
	 * Creates a rook of the given color at the given location
	 * @param {string} color - The color of the rook: white || black
	 * @param {number} file - file rank of the rook: 1 - 8
	 * @param {number} rank - the rank of the rook: 1 - 8
	 * @param {boolean} hasMoved - whether or not the rook has moved (used for checking if castling is possible)
	 */

	constructor(color, file, rank, hasMoved) {
		super(color, file, rank)
		this._hasMoved = hasMoved;
	}

	// TODO: account for pieces that could be blocking the rook
	/**
	 * Get the Rook's moves
	 * @return {number[][]} moves - the moves of the Rook as an array of co-ordinates (also an array)
	 */

	get moves() {
		var moves = [];

		var file = this._file;
		var rank = this._rank;

		// moves towards the left
		while (file > 1) {
			file--;
			moves.push([file, rank]);
		}

		file = this._file;

		// moves towards the right
		while (file < 8) {
			file++;
			moves.push([file, rank]);
		}

		file = this._file;

		// moves towards the bottom
		while (rank > 1) {
			rank--;
			moves.push([file, rank]);
		}

		rank = this._rank;

		// moves towards the top
		while (rank < 8) {
			rank++;
			moves.push([file, rank]);
		}

		return moves;
	}


}