class Bishop extends Piece {

	/**
	 * Get the Bishop's moves
	 * @param {String[]} occupiedSquares - the squares that are currently occupied, array entries are piece names (eg wP3)
	 * @return {number[][]} moves - the moves of the Bishop as an array of co-ordinates (also an array)
	 */

	moves() {
		var moves = [];

		var file = this._file;
		var rank = this._rank;

		var pD = this.getPinDirection();
 		if (pD) {

 			var f = pD[0];
 			var r = pD[1];

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
	 * @return {number[][]} protectedSquares - the squares that the Bishop protects as an array of co-ordinates (also an array)
	 */

	protectedSquares() {
		var protectedSquares = [];

		var file = this._file;
		var rank = this._rank;

		protectedSquares = this.moveOneWay(file, rank, -1, -1, protectedSquares, true);
		protectedSquares = this.moveOneWay(file, rank, -1, +1, protectedSquares, true);
		protectedSquares = this.moveOneWay(file, rank, +1, -1, protectedSquares, true);
		protectedSquares = this.moveOneWay(file, rank, +1, +1, protectedSquares, true);

		return protectedSquares;
	}
}
