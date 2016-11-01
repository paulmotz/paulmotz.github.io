class Queen extends Piece {

	/**
	 * Get the Queen's moves
	 * @param {String[]} occupiedSquares - the squares that are currently occupied, array entries are piece names (eg wP3)
	 * @return {number[][]} moves - the moves of the Queen as an array of co-ordinates (also an array)
	 */

	moves(occupiedSquares) {
		var moves = [];
		var file = this._file;
		var rank = this._rank;

		moves = this.moveOneWay(occupiedSquares, file, rank, -1, 0, moves, false);
		moves = this.moveOneWay(occupiedSquares, file, rank, +1, 0, moves, false);
		moves = this.moveOneWay(occupiedSquares, file, rank, 0, -1, moves, false);
		moves = this.moveOneWay(occupiedSquares, file, rank, 0, +1, moves, false);
		moves = this.moveOneWay(occupiedSquares, file, rank, -1, -1, moves, false);
		moves = this.moveOneWay(occupiedSquares, file, rank, -1, +1, moves, false);
		moves = this.moveOneWay(occupiedSquares, file, rank, +1, -1, moves, false);
		moves = this.moveOneWay(occupiedSquares, file, rank, +1, +1, moves, false);

		return moves;
	}

	/**
	 * Get the squares the Queen protects
	 * @param {String[]} occupiedSquares - the squares that are currently occupied, array entries are piece names (eg wP3)
	 * @return {number[][]} moves - the moves of the Queen as an array of co-ordinates (also an array)
	 */

	protectedSquares(occupiedSquares) {
		var moves = [];
		var file = this._file;
		var rank = this._rank;

		moves = this.moveOneWay(occupiedSquares, file, rank, -1, 0, moves, true);
		moves = this.moveOneWay(occupiedSquares, file, rank, +1, 0, moves, true);
		moves = this.moveOneWay(occupiedSquares, file, rank, 0, -1, moves, true);
		moves = this.moveOneWay(occupiedSquares, file, rank, 0, +1, moves, true);
		moves = this.moveOneWay(occupiedSquares, file, rank, -1, -1, moves, true);
		moves = this.moveOneWay(occupiedSquares, file, rank, -1, +1, moves, true);
		moves = this.moveOneWay(occupiedSquares, file, rank, +1, -1, moves, true);
		moves = this.moveOneWay(occupiedSquares, file, rank, +1, +1, moves, true);

		return moves;
	}
}
