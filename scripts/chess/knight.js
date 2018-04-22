class Knight extends Piece {
	/**
	 * Get the possible Knight's moves
	 * @param {Number} file - file rank of the knight: 1 - 8
	 * @param {Number} rank - the rank of the knight: 1 - 8
	 * @return {Number[][]} moves - the moves of the Knight as an array of co-ordinates (also an array)
	 */
	getPossibleMoves(file, rank) {
		return [
			[file - 1, rank + 2], [file + 1, rank + 2], 
			[file - 2, rank + 1], [file + 2, rank + 1],                       
			[file - 2, rank - 1], [file + 2, rank - 1], 
			[file - 1, rank - 2], [file + 1, rank - 2] 
		]
	}

	/**
	 * Get the Knight's moves
	 * @return {Number[][]} moves - the moves of the Knight as an array of co-ordinates (also an array)
	 */
 	moves() {
 		// pinned knights cannot move
 		if (this.getPinDirection()) {
 			return [];
 		}
 		
 		const color = this._color
 		const file = this._file;
 		const rank = this._rank;
 		const possibleMoves = this.getPossibleMoves(file, rank);

 		// in addition to not being able to move off the board, a knight can only move to a square that is unoccupied or is occupied by a piece of the opposite color
		const moves = possibleMoves.filter((square) => {
			return square[0] >= 1 && square[0] <= 8 && square[1] >= 1 && square[1] <= 8 && 
				(!occupiedSquares[squareToIndex([square[0], square[1]]) - 1] || occupiedSquares[squareToIndex([square[0], square[1]]) - 1][0] !== color);
		});

		return moves;
 	}

 	/**
	 * Get the squares that the Knight protects
	 * @return {Number[][]} protectedSquares - the squares that the Knight protects as an array of co-ordinates (also an array)
	 */
 	protectedSquares() {
 		const color = this._color
 		const file = this._file;
 		const rank = this._rank;
 		const possibleMoves = this.getPossibleMoves(file, rank);

		const protectedSquares = possibleMoves.filter((square) => {
			return square[0] >= 1 && square[0] <= 8 && square[1] >= 1 && square[1] <= 8;
		});

		return protectedSquares;
 	}
}
