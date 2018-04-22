const queenDirections = [
	[-1, 0], 
	[+1, 0],
	[0, -1],
	[0, +1],
	[-1, -1],
	[-1, +1],
	[+1, -1],
	[+1, +1],
];

class Queen extends Piece {
	/**
	 * Get the Queen's moves
	 * @param {String[]} occupiedSquares - the squares that are currently occupied, array entries are piece names (eg wP3)
	 * @return {Number[][]} moves - the moves of the Queen as an array of co-ordinates (also an array)
	 */

	moves() {
		const moves = [];
		const file = this._file;
		const rank = this._rank;

		const pD = this.getPinDirection();
 		if (pD) {
 			const [f, r] = pD;

			// queen can only move in line with the pinning piece
			moves.push(...this.moveOneWay(file, rank,  f,  r, false));
			moves.push(...this.moveOneWay(file, rank, -f, -r, false));
			return moves;
 		}

 		for (const direction of queenDirections) {
 			moves.push(...this.moveOneWay(file, rank, ...direction, false));
 		}

		return moves;
	}

	/**
	 * Get the squares that the Queen protects
	 * @param {String[]} occupiedSquares - the squares that are currently occupied, array entries are piece names (eg wP3)
	 * @return {Number[][]} protectedSquares - the squares that the Queen protects as an array of co-ordinates (also an array)
	 */

	protectedSquares() {
		const protectedSquares = [];
		const file = this._file;
		const rank = this._rank;

		for (const direction of queenDirections) {
 			protectedSquares.push(...this.moveOneWay(file, rank, ...direction, true));
 		}

		return protectedSquares;
	}
}
