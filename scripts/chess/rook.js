const rookDirections = [
	[-1, 0], 
	[+1, 0],
	[0, -1],
	[0, +1]
];

class Rook extends Piece {

	/*
	 * Creates a rook of the given color at the given location
	 * @param {String} color - The color of the rook: white || black
	 * @param {String} abbr - The abbreviation of the piece: R for Rook
	 * @param {Number} file - file rank of the rook: 1 - 8
	 * @param {Number} rank - the rank of the rook: 1 - 8
	 * @param {Boolean} hasMoved - whether or not the rook has moved (used for checking if castling is possible)
	 */

	constructor(color, abbr, file, rank, id, hasMoved) {
		super(color, abbr, file, rank, id)
		this._hasMoved = hasMoved;
	}

	hasMoved() {
		return this._hasMoved;
	}

	/**
	 * Get the Rook's moves
	 * @return {Number[][]} moves - the moves of the Rook as an array of co-ordinates (also an array)
	 */

	moves() {
		const moves = [];
		const file = this._file;
		const rank = this._rank;

		const pD = this.getPinDirection();
 		if (pD) {
 			const [f, r] = pD;

 			// diagonal pin, rook cannot move
 			if ((f + r) % 2 === 0) {
 				return moves;
 			}
 			else {
 				// rook can only move in line with the pinning piece
 				moves.push(...this.moveOneWay(file, rank,  f,  r, false));
 				moves.push(...this.moveOneWay(file, rank, -f, -r, false));
 				return moves;
 			}
 		}

		for (const direction of rookDirections) {
 			moves.push(...this.moveOneWay(file, rank, ...direction, false));
 		}

		return moves;
	}

	/**
	 * Get the squares that the Rook protects
	 * @return {Number[][]} protectedSquares - the squares that the Rook protects as an array of co-ordinates (also an array)
	 */

	protectedSquares() {
		const protectedSquares = [];
		const file = this._file;
		const rank = this._rank;

		for (const direction of rookDirections) {
 			protectedSquares.push(...this.moveOneWay(file, rank, ...direction, true));
 		}

		return protectedSquares;
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
