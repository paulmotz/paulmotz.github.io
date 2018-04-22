class Piece {

	/**
	 * Creates a piece of the given color at the given location
	 * @param {String} color - The color of the piece: white || black
	 * @param {String} abbr - The abbreviation of the piece: B, N, K, P, Q or R
	 * @param {Number} file - file rank of the piece: 1 - 8
	 * @param {Number} rank - the rank of the piece: 1 - 8
	 * @param {Number} id - the id of the piece: 1 - 10 (where 10 = max possible number of any given piece per color)
	 */

	constructor(color, abbr, file, rank, id) {
		this._color = color;
		this._abbr = abbr;
		this._file = file;
		this._rank = rank;
		this._id = id;
	}

	/**
	 * Get the piece's color
	 * @return {String} color - The color of the piece: white || black
	 */

	get color() {
		return this._color;
	}

	/**
	 * Get the piece's abbreviation
	 * @param {String} abbr - The abbreviation of the piece: B, N, K, P, Q or R
	 */

	get abbr() {
		return this._abbr;
	}

	/**
	 * Get the piece's file
	 * @return {Number} file - The file of the piece: 1 - 8
	 */

	get file() {
		return this._file;
	}

	/**
	 * Get the piece's rank
	 * @return {Number} rank - The rank of the piece: 1 - 8
	 */

	get rank() {
		return this._rank;
	}

	/**
	 * Get the piece's id
	 * @return {Number} id - The id of the piece: 1 - 10 (where 10 = max possible number of any given piece per color)
	 */

	get id() {
		return this._id;
	}

	/**
	 * Set the piece's color
	 * @param {String} color - The color of the piece: white || black
	 */

	set color(color) {
		if (color === 'white' || color === 'black') {
			this._color = color;
		}
	}

	/**
	 * Set the piece's abbreviation
	 * @param {String} abbr - The abbreviation of the piece: B, N, K, P, Q or R
	 */

	set abbr(abbr) {
		this._abbr = abbr;
	}

	/**
	 * Set the piece's color
	 * @param {Number} file - The file of the piece: 1 - 8
	 */

	set file(file) {
		if (file > 0 && file < 9) {
			this._file = file;
		}
	}

	/**
	 * Set the piece's rank
	 * @param {Number} rank - The rank of the piece: 1 - 8
	 */

	set rank(rank) {
		if (rank > 0 && rank < 9) {
			this._rank = rank;
		}
	}

	/**
	 * Get the piece's id
	 * @param {Number} id - The id of the piece: 1 - 10 (where 10 = max possible number of any given piece per color)
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
	 * @param {Number} file - the file that the piece is currently occupying: 1 - 8
	 * @param {Number} rank - the rank that the piece is currently occupying: 1 - 8
	 * @param {Number} f - the piece's movement between files: -1, 0, 1
	 * @param {Number} r - the piece's movement between ranks: -1, 0, 1
	 * @param {Boolean} defending - whether the move's being calculated are attacking or defending. Defending counts pieces of the same color guarded by the piece
	 * @return {Number[][]} moves - the moves of the piece as an array of co-ordinates (also an array)
	 */

	moveOneWay(file, rank, f, r, defending) {
		const moves = [];
		while (file + f >= 1 && file + f <= 8 && rank + r >= 1 && rank + r <= 8) {
			file += f;
			rank += r;
			const index = squareToIndex([file, rank]) - 1;
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
	 * @return {Number[]} kingDirection - the direction of the king from the piece, null if another piece is in the way
	 */

	getKingDirection() {
		let file = this.file;
		let rank = this.rank;
		const piece = occupiedSquares[squareToIndex([file, rank]) - 1];
		const pieceType = piece[1];
		if (pieceType === 'K') {
			return null; // TODO: maybe this should be a special value
		}
		const directions = [[-1,  1], [0,  1], [1,  1],
						  [-1,  0],          [1,  0],
						  [-1, -1], [0, -1], [1, -1]];

		for (const currDir of directions) {
			const [f, r] = currDir;
			while (file + f >= 1 && file + f <= 8 && rank + r >= 1 && rank + r <= 8) {
				file += f;
				rank += r;
				if (occupiedSquares[squareToIndex([file, rank]) - 1]) {
					if (occupiedSquares[squareToIndex([file, rank]) - 1][0] === this.color && occupiedSquares[squareToIndex([file, rank]) - 1][1] === 'K') {
						return currDir;
					} 
					else {
						break;
					}
				}
			}
			file = this.file;
			rank = this.rank;
		}
	}

	/**
	 * Checks to see if a piece is pinned and if so gets the direction of the pin
	 * @return {Number[]} pinDirection - the direciton of the pin (ie the direction which the piece may be able to move), null if no pin
	 */

	getPinDirection() {
		const kd = this.getKingDirection();
		if (!kd) return;
		else {
			let file = this.file;
			let rank = this.rank;
			const f = -kd[0];
			const r = -kd[1];

			// diagonal move
			if ((f + r) % 2 === 0) {
				while (file + f >= 1 && file + f <= 8 && rank + r >= 1 && rank + r <= 8) {
					file += f;
					rank += r;
					let inlinePiece = occupiedSquares[squareToIndex([file, rank]) - 1];
					if (inlinePiece) {
						if (inlinePiece[0] !== this.color && (inlinePiece[1] === 'B' || inlinePiece[1] === 'Q')) {
							return [f, r];
						} 
						else {
							break;
						}
					} 
				}
			}

			// horizontal/vertical move
			else {
				while (file + f >= 1 && file + f <= 8 && rank + r >= 1 && rank + r <= 8) {
					file += f;
					rank += r;
					let inlinePiece = occupiedSquares[squareToIndex([file, rank]) - 1];
					if (inlinePiece) {
						if (inlinePiece[0] !== this.color && (inlinePiece[1] === 'R' || inlinePiece[1] === 'Q')) {
							return [f, r];
						} 
						else {
							break;
						}
					} 
				}
			}
		}
	}
}
