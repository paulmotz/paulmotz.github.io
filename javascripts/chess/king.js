class King extends Piece {
	
	// TODO:
	// check if the piece is in check
	// restrict move if move would place the king in check

	/*
	 * Creates a king of the given color at the given location
	 * @param {String} color - The color of the king: white || black
	 * @param {String} abbr - The abbreviation of the piece: K for King
	 * @param {Number} file - file rank of the king: 1 - 8
	 * @param {Number} rank - the rank of the king: 1 - 8
	 * @param {bBoolean} hasMoved - whether or not the king has moved (used for checking if castling is possible)
	 */

	constructor(color, abbr, file, rank, id, hasMoved) {
		super(color, abbr, file, rank, id)
		this._hasMoved = hasMoved;
	}

	/**
	 * Get the King's moves
	 * @return {Number[][]} moves - the moves of the King as an array of co-ordinates (also an array)
	 */

 	moves() {

 		let color = this._color;
 		let opponentColor = otherColor(color);
 		let file = this._file;
 		let rank = this._rank;
 		let hasMoved = this._hasMoved;
 		let possibleMoves = [ [file - 1, rank + 1], [file, rank + 1], [file + 1, rank + 1], 
 							  [file - 1, rank],                       [file + 1, rank], 
 							  [file - 1, rank - 1], [file, rank - 1], [file + 1, rank - 1] ];



		let moves = possibleMoves.filter(function(square){
			return square[0] > 0 && square[0] < 9 && square[1] > 0 && square[1] < 9 && 
			(!occupiedSquares[squareToIndex([square[0], square[1]]) - 1] || occupiedSquares[squareToIndex([square[0], square[1]]) - 1][0] !== color) &&
			!attackedSquares[opponentColor].has(squareToIndex(square));			
		});

		let colorRook = color + 'R';
		let queensideRook = allPieces[colorRook][findPieceIndex(colorRook, 0)];

		// queenside castling
		if (!hasMoved && queensideRook && !queensideRook.hasMoved && 
			!occupiedSquares[squareToIndex([file - 1, rank]) - 1] && !occupiedSquares[squareToIndex([file - 2, rank]) - 1] && !occupiedSquares[squareToIndex([file - 3, rank]) - 1] && 
			!attackedSquares[opponentColor].has(squareToIndex([file, rank])) && !attackedSquares[opponentColor].has(squareToIndex([file - 1, rank])) && !attackedSquares[opponentColor].has(squareToIndex([file - 2, rank]))) {
			moves.push([file - 2, rank]);
		}

		let kingsideRook = allPieces[colorRook][findPieceIndex(colorRook, 1)];

		// kingside castling
		if (!hasMoved && kingsideRook && !kingsideRook.hasMoved && 
			!occupiedSquares[squareToIndex([file + 1, rank]) - 1] && !occupiedSquares[squareToIndex([file + 2, rank]) - 1] && 
			!attackedSquares[opponentColor].has(squareToIndex([file, rank])) && !attackedSquares[opponentColor].has(squareToIndex([file + 1, rank])) && !attackedSquares[opponentColor].has(squareToIndex([file + 2, rank]))) {
			moves.push([file + 2, rank]);
		}

		return moves;
 	}

 	/**
	 * Get the squares that the King protects
	 * @return {number[][]} protectedSquares - the squares that the King protects as an array of co-ordinates (also an array)
	 */

 	protectedSquares() {
 		let color = this._color;
 		let file = this._file;
 		let rank = this._rank;
 		let hasMoved = this._hasMoved;
 		let possibleMoves = [ [file - 1, rank + 1], [file, rank + 1], [file + 1, rank + 1], 
 							  [file - 1, rank],                       [file + 1, rank], 
 							  [file - 1, rank - 1], [file, rank - 1], [file + 1, rank - 1] ];

 		// only need to check if square is on the board
		let protectedSquares = possibleMoves.filter(function(square){
			return square[0] > 0 && square[0] < 9 && square[1] > 0 && square[1] < 9;			
		});

		return protectedSquares;
 	}

 	/**
 	 * Get whether the king has moved
 	 */

 	get hasMoved() {
		return this._hasMoved;
	}

 	/**
 	 * Keep track of whether the king has moved
 	 */

 	set hasMoved(hasMoved) {
		this._hasMoved = hasMoved;
	}
}
