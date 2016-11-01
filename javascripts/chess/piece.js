class Piece {

	/**
	 * Creates a piece of the given color at the given location
	 * @param {string} color - The color of the piece: white || black
	 * @param {number} file - file rank of the piece: 1 - 8
	 * @param {number} rank - the rank of the piece: 1 - 8
	 * @param {number} id - the id of the piece: 1 - 10 (where 10 = max possible number of any given piece per color)
	 */

	constructor(color, file, rank, id) {
		this._color = color;
		this._file = file;
		this._rank = rank;
		this._id = id;
	}

	/**
	 * Get the piece's color
	 * @return {string} color - The color of the piece: white || black
	 */

	get color() {
		return this._color;
	}

	/**
	 * Get the piece's file
	 * @return {number} file - The file of the piece: 1 - 8
	 */

	get file() {
		return this._file;
	}

	/**
	 * Get the piece's rank
	 * @return {number} rank - The rank of the piece: 1 - 8
	 */

	get rank() {
		return this._rank;
	}

	/**
	 * Get the piece's id
	 * @return {number} id - The id of the piece: 1 - 10 (where 10 = max possible number of any given piece per color)
	 */

	get id() {
		return this._id;
	}

	/**
	 * Set the piece's color
	 * @param {string} color - The color of the piece: white || black
	 */

	set color(color) {
		if (color === 'white' || color === 'black') {
			this._color = color;
		}
	}

	/**
	 * Set the piece's color
	 * @param {number} file - The file of the piece: 1 - 8
	 */

	set file(file) {
		if (file > 0 && file < 9) {
			this._file = file;
		}
	}

	/**
	 * Set the piece's rank
	 * @param {number} rank - The rank of the piece: 1 - 8
	 */

	set rank(rank) {
		if (rank > 0 && rank < 9) {
			this._rank = rank;
		}
	}

	/**
	 * Get the piece's id
	 * @param {number} id - The id of the piece: 1 - 10 (where 10 = max possible number of any given piece per color)
	 */

	set id(id) {
		this._id = id;
	}

	// TODO: not sure if this is right, read up on this
	// get moves() {
	// 	return [];
	// }

	/**
	 * Get the piece's moves in a particular direction, used for "ranged" pieces (bishop, queen and rook)
	 * @param {String[]} occupiedSquares - the squares that are currently occupied, array entries are piece names (eg wP3)
	 * @param {number} file - the file that the piece is currently occupying: 1 - 8
	 * @param {number} rank - the rank that the piece is currently occupying: 1 - 8
	 * @param {number} f - the piece's movement between files: -1, 0, 1
	 * @param {number} r - the piece's movement between ranks: -1, 0, 1
	 * @return {number[][]} moves - the moves of the piece that have already been calculated
	 * @param {boolean} defending - whether the move's being calculated are attacking or defending. Defending counts pieces of the same color guarded by the piece
	 * @return {number[][]} moves - the moves of the piece as an array of co-ordinates (also an array)
	 */

	moveOneWay(file, rank, f, r, moves, defending) {
		while (file + f >= 1 && file + f <= 8 && rank + r >= 1 && rank + r <= 8) {
			file += f;
			rank += r;
			var index = squareToIndex([file, rank]) - 1;
			if (occupiedSquares[index]) {
				if (defending) {
					moves.push([file, rank]);
				}
				else if (occupiedSquares[index][0] !== this.color) {
					moves.push([file, rank]);
				}
				break;
			}
			moves.push([file, rank]);
		}
		return moves;
	}

	/**
	 * Returns the direction of the king from the piece. Used for checking for pinned pieces
	 * @param {String[]} occupiedSquares - the squares that are currently occupied, array entries are piece names (eg wP3)
	 * @param {number[]} kingDirection - the direction of the king from the piece, null if another piece is in the way
	 */


	getKingDirection() {
		var file = this.file;
		var rank = this.rank;
		var piece = allPieces;
		console.log(occupiedSquares);
	}
}