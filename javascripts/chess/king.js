class King extends Piece {
	/**
	 * Get the King's moves
	 * @return {number[][]} moves - the moves of the King as an array of co-ordinates (also an array)
	 */

 	get moves() {
 		var file = this._file;
 		var rank = this._rank;
 		var possibleMoves = [ [file - 1, rank + 1], [file, rank + 1], [file + 1, rank + 1], 
 							  [file - 1, rank],                       [file + 1, rank], 
 							  [file - 1, rank - 1], [file, rank - 1], [file + 1, rank - 1] ];

			var moves = possibleMoves.filter(function(square){
				return square[0] > 0 && square[0] < 9 && square[1] > 0 && square[1] < 9;
			});

			return moves;
 	}
}
