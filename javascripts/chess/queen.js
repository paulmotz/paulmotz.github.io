class Queen extends Piece {

	/**
	 * Get the Queen's moves
	 * @param {String[]} occupiedSquares - the squares that are currently occupied, array entries are piece names (eg wP3)
	 * @return {Number[][]} moves - the moves of the Queen as an array of co-ordinates (also an array)
	 */

	moves() {
		let moves = [];
		let file = this._file;
		let rank = this._rank;

		let pD = this.getPinDirection();
 		if (pD) {
 			let f = pD[0];
 			let r = pD[1];

			// queen can only move in line with the pinning piece
			moves = this.moveOneWay(file, rank,  f,  r, moves, false);
			moves = this.moveOneWay(file, rank, -f, -r, moves, false);
			return moves;
 		}

		moves = this.moveOneWay(file, rank, -1, 0, moves, false);
		moves = this.moveOneWay(file, rank, +1, 0, moves, false);
		moves = this.moveOneWay(file, rank, 0, -1, moves, false);
		moves = this.moveOneWay(file, rank, 0, +1, moves, false);
		moves = this.moveOneWay(file, rank, -1, -1, moves, false);
		moves = this.moveOneWay(file, rank, -1, +1, moves, false);
		moves = this.moveOneWay(file, rank, +1, -1, moves, false);
		moves = this.moveOneWay(file, rank, +1, +1, moves, false);

		return moves;
	}

	/**
	 * Get the squares that the Queen protects
	 * @param {String[]} occupiedSquares - the squares that are currently occupied, array entries are piece names (eg wP3)
	 * @return {Number[][]} protectedSquares - the squares that the Queen protects as an array of co-ordinates (also an array)
	 */

	protectedSquares() {
		let protectedSquares = [];
		let file = this._file;
		let rank = this._rank;

		protectedSquares = this.moveOneWay(file, rank, -1, 0, protectedSquares, true);
		protectedSquares = this.moveOneWay(file, rank, +1, 0, protectedSquares, true);
		protectedSquares = this.moveOneWay(file, rank, 0, -1, protectedSquares, true);
		protectedSquares = this.moveOneWay(file, rank, 0, +1, protectedSquares, true);
		protectedSquares = this.moveOneWay(file, rank, -1, -1, protectedSquares, true);
		protectedSquares = this.moveOneWay(file, rank, -1, +1, protectedSquares, true);
		protectedSquares = this.moveOneWay(file, rank, +1, -1, protectedSquares, true);
		protectedSquares = this.moveOneWay(file, rank, +1, +1, protectedSquares, true);

		return protectedSquares;
	}
}
