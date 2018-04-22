const bishopDirections = [
	[-1, -1],
	[-1, +1],
	[+1, -1],
	[+1, +1],
];

class Bishop extends Piece {

	/**
	 * Get the Bishop's moves
	 * @param {String[]} occupiedSquares - the squares that are currently occupied, array entries are piece names (eg wP3)
	 * @return {Number[][]} moves - the moves of the Bishop as an array of co-ordinates (also an array)
	 */

	moves() {
		const moves = [];

		const file = this._file;
		const rank = this._rank;

		const pD = this.getPinDirection();
 		if (pD) {
 			const [f, r] = pD;

 			// horizontal/vertical pin, bishop cannot move
 			if ((f + r) % 2 !== 0) {
 				return moves;
 			}
 			else {
 				// bishop can only move in line with the pinning piece
 				moves.push(...this.moveOneWay(file, rank,  f,  r, false));
 				moves.push(...this.moveOneWay(file, rank, -f, -r, false));
 				return moves;
 			}
 		}

		for (const direction of bishopDirections) {
 			moves.push(...this.moveOneWay(file, rank, ...direction, false))
 		}

		return moves;
	}

	/**
	 * Get the squares that the Bishop protects
	 * @param {String[]} occupiedSquares - the squares that are currently occupied, array entries are piece names (eg wP3)
	 * @return {Number[][]} protectedSquares - the squares that the Bishop protects as an array of co-ordinates (also an array)
	 */

	protectedSquares() {
		const protectedSquares = [];

		const file = this._file;
		const rank = this._rank;

		for (const direction of bishopDirections) {
 			protectedSquares.push(...this.moveOneWay(file, rank, ...direction, false))
 		}

		return protectedSquares;
	}
}
