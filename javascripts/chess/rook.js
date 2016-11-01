class Rook extends Piece {

	/*
	 * Creates a rook of the given color at the given location
	 * @param {string} color - The color of the rook: white || black
	 * @param {number} file - file rank of the rook: 1 - 8
	 * @param {number} rank - the rank of the rook: 1 - 8
	 * @param {boolean} hasMoved - whether or not the rook has moved (used for checking if castling is possible)
	 */

	constructor(color, file, rank, id, hasMoved) {
		super(color, file, rank, id)
		this._hasMoved = hasMoved;
	}

	hasMoved() {
		return this._hasMoved;
	}

	/**
	 * Get the Rook's moves
	 * @param {String[]} occupiedSquares - the squares that are currently occupied, array entries are piece names (eg wP3)
	 * @return {number[][]} moves - the moves of the Rook as an array of co-ordinates (also an array)
	 */

	moves(occupiedSquares) {
		var moves = [];

		var file = this._file;
		var rank = this._rank;

		// moves towards the left
		while (file > 1) {
			file--;
			var index = squareToIndex([file, rank]) - 1;
			if (occupiedSquares[index]) {
				if (occupiedSquares[index][0] !== this.color) {
					moves.push([file, rank]);
				}
				break;
			}
			moves.push([file, rank]);
		}

		file = this._file;

		// moves towards the right
		while (file < 8) {
			file++;
			var index = squareToIndex([file, rank]) - 1;
			if (occupiedSquares[index]) {
				if (occupiedSquares[index][0] !== this.color) {
					moves.push([file, rank]);
				}
				break;
			}
			moves.push([file, rank]);
		}

		file = this._file;

		// moves towards the bottom
		while (rank > 1) {
			rank--;
			var index = squareToIndex([file, rank]) - 1;
			if (occupiedSquares[index]) {
				if (occupiedSquares[index][0] !== this.color) {
					moves.push([file, rank]);
				}
				break;
			}
			moves.push([file, rank]);
		}

		rank = this._rank;

		// moves towards the top
		while (rank < 8) {
			rank++;
			var index = squareToIndex([file, rank]) - 1;
			if (occupiedSquares[index]) {
				if (occupiedSquares[index][0] !== this.color) {
					moves.push([file, rank]);
				}
				break;
			}
			moves.push([file, rank]);
		}

		return moves;
	}

	/**
	 * Get the Rook's moves in a particular direction
	 * @param {String[]} occupiedSquares - the squares that are currently occupied, array entries are piece names (eg wP3)
	 * @param {number} file - the file that the Rook is currently occupying
	 * @param {number} rank - the rank that the Rook is currently occupying
	 * @return {number[][]} moves - the moves of the Rook as an array of co-ordinates (also an array)
	 */

	moveOneWay(occupiedSquares, file, rank, f, r, defending) {

	}

	/**
 	 * Get whether the rook has moved
 	 */

 	get hasMoved() {
		return this._hasMoved;
	}

 	/**
 	 * Keep track of whether the rook has moved
 	 */

 	set hasMoved(hasMoved) {
		this._hasMoved = hasMoved;
	}
}
