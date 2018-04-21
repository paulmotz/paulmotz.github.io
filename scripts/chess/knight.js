class Knight extends Piece {

	/**
	 * Get the Knight's moves
	 * @return {Number[][]} moves - the moves of the Knight as an array of co-ordinates (also an array)
	 */

 	moves() {

 		// pinned knights cannot move
 		if (this.getPinDirection()) {
 			return [];
 		}
 		
 		let color = this._color
 		let file = this._file;
 		let rank = this._rank;
 		let possibleMoves = [ [file - 1, rank + 2], [file + 1, rank + 2], 
 							  [file - 2, rank + 1], [file + 2, rank + 1],                       
 							  [file - 2, rank - 1], [file + 2, rank - 1], 
 							  [file - 1, rank - 2], [file + 1, rank - 2] ];

		let moves = possibleMoves.filter(function(square) {
			return square[0] > 0 && square[0] < 9 && square[1] > 0 && square[1] < 9 && 
			(!occupiedSquares[squareToIndex([square[0], square[1]]) - 1] || occupiedSquares[squareToIndex([square[0], square[1]]) - 1][0] !== color);
		});

		return moves;
 	}

 	/**
	 * Get the squares that the Knight protects
	 * @return {Number[][]} protectedSquares - the squares that the Knight protects as an array of co-ordinates (also an array)
	 */

 	protectedSquares() {
 		let color = this._color
 		let file = this._file;
 		let rank = this._rank;
 		let possibleMoves = [ [file - 1, rank + 2], [file + 1, rank + 2], 
 							  [file - 2, rank + 1], [file + 2, rank + 1],                       
 							  [file - 2, rank - 1], [file + 2, rank - 1], 
 							  [file - 1, rank - 2], [file + 1, rank - 2] ];

		let protectedSquares = possibleMoves.filter(function(square) {
			return square[0] > 0 && square[0] < 9 && square[1] > 0 && square[1] < 9;
		});

		return protectedSquares;
 	}
}
