class Bishop extends Piece {

	// TODO: account for pieces that could be blocking the bishop
	/**
	 * Get the Bishop's moves
	 * @return {number[][]} moves - the moves of the Bishop as an array of co-ordinates (also an array)
	 */

	get moves() {
		var moves = [];

		var file = this._file;
		var rank = this._rank;

		// moves towards the bottom-left
		while (rank > 1 && file > 1 && file <= 8){
			file--;
			rank--;
			moves.push([file, rank]);
		}

		file = this._file;
		rank = this._rank;

		// moves towards the bottom-right
		while (rank > 1 && file >= 1 && file < 8){
			file++;
			rank--;
			moves.push([file, rank]);
		}

		file = this._file;
		rank = this._rank;

		// moves towards the top-left
		while (rank < 8 && file > 1 && file <= 8){
			file--;
			rank++;
			moves.push([file, rank]);
		}

		file = this._file;
		rank = this._rank;

		// moves towards the top-right
		while (rank < 8 && file >= 1 && file < 8){
			rank++;
			file++;
			moves.push([file, rank]);
		}

		return moves;
	}
}
