class Bishop extends Piece {

	/**
	 * Get the Bishop's moves
	 * @param {String[]} occupiedSquares - the squares that are currently occupied, array entries are piece names (eg wP3)
	 * @return {Number[][]} moves - the moves of the Bishop as an array of co-ordinates (also an array)
	 */

	moves() {
		let moves = [];

		let file = this._file;
		let rank = this._rank;

		let pD = this.getPinDirection();
 		if (pD) {

 			let f = pD[0];
 			let r = pD[1];

 			// horizontal/vertical pin, bishop cannot move
 			if ((f + r) % 2 !== 0) {
 				return moves;
 			}
 			else {

 				// bishop can only move in line with the pinning piece
 				moves = this.moveOneWay(file, rank,  f,  r, moves, false);
 				moves = this.moveOneWay(file, rank, -f, -r, moves, false);
 				return moves;
 			}
 		}

		moves = this.moveOneWay(file, rank, -1, -1, moves, false);
		moves = this.moveOneWay(file, rank, -1, +1, moves, false);
		moves = this.moveOneWay(file, rank, +1, -1, moves, false);
		moves = this.moveOneWay(file, rank, +1, +1, moves, false);

		return moves;
	}

	/**
	 * Get the squares that the Bishop protects
	 * @param {String[]} occupiedSquares - the squares that are currently occupied, array entries are piece names (eg wP3)
	 * @return {Number[][]} protectedSquares - the squares that the Bishop protects as an array of co-ordinates (also an array)
	 */

	protectedSquares() {
		let protectedSquares = [];

		let file = this._file;
		let rank = this._rank;

		protectedSquares = this.moveOneWay(file, rank, -1, -1, protectedSquares, true);
		protectedSquares = this.moveOneWay(file, rank, -1, +1, protectedSquares, true);
		protectedSquares = this.moveOneWay(file, rank, +1, -1, protectedSquares, true);
		protectedSquares = this.moveOneWay(file, rank, +1, +1, protectedSquares, true);

		return protectedSquares;
	}
}
