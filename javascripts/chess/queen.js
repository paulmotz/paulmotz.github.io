class Queen extends Piece {

	// TODO: account for pieces that could be blocking the bishop
	/**
	 * Get the Queen's moves
	 * @return {number[][]} moves - the moves of the Queen as an array of co-ordinates (also an array)
	 */

	moves(occupiedSquares) {
		var moves = [];

		var file = this._file;
		var rank = this._rank;

		// moves towards the bottom-left
		while (rank > 1 && file > 1 && file <= 8){
			file--;
			rank--;
			var index = squareToIndex([file, rank]) - 1;
			if (occupiedSquares[index]) {
				break;
			}
			moves.push([file, rank]);
		}

		file = this._file;
		rank = this._rank;

		// moves towards the bottom-right
		while (rank > 1 && file >= 1 && file < 8){
			file++;
			rank--;
			var index = squareToIndex([file, rank]) - 1;
			if (occupiedSquares[index]) {
				break;
			}
			moves.push([file, rank]);
		}

		file = this._file;
		rank = this._rank;

		// moves towards the top-left
		while (rank < 8 && file > 1 && file <= 8){
			file--;
			rank++;
			var index = squareToIndex([file, rank]) - 1;
			if (occupiedSquares[index]) {
				break;
			}
			moves.push([file, rank]);
		}

		file = this._file;
		rank = this._rank;

		// moves towards the top-right
		while (rank < 8 && file >= 1 && file < 8){
			rank++;
			file++;
			var index = squareToIndex([file, rank]) - 1;
			if (occupiedSquares[index]) {
				break;
			}
			moves.push([file, rank]);
		}

		file = this._file;
		rank = this._rank;

		// moves towards the left
		while (file > 1) {
			file--;
			var index = squareToIndex([file, rank]) - 1;
			if (occupiedSquares[index]) {
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
				break;
			}
			moves.push([file, rank]);
		}

		return moves;
	}
}
