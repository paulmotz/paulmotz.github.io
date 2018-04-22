class King extends Piece {
	/**
	 * Get the Kings's possible moves
	 * @param {Number} file - file rank of the king: 1 - 8
	 * @param {Number} rank - the rank of the king: 1 - 8
	 * @return {Number[][]} moves - the moves of the king as an array of co-ordinates (also an array)
	 */
	getPossibleMoves(file, rank) {
		return [ 
			[file - 1, rank + 1], [file, rank + 1], [file + 1, rank + 1], 
			[file - 1, rank],                       [file + 1, rank], 
			[file - 1, rank - 1], [file, rank - 1], [file + 1, rank - 1] 
		];
	}

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
		super(color, abbr, file, rank, id);
		this._hasMoved = hasMoved;
	}

	/**
	 * Get the King's moves
	 * @return {Number[][]} moves - the moves of the King as an array of co-ordinates (also an array)
	 */
 	moves() {
 		const color = this._color;
 		const opponentColor = otherColor(color);
 		const file = this._file;
 		const rank = this._rank;
 		const hasMoved = this._hasMoved;
 		const possibleMoves = this.getPossibleMoves(file, rank);

		const moves = possibleMoves.filter((square) => {
			return checkSquareOnBoard(square) && 
			(!occupiedSquares[squareToIndex([square[0], square[1]]) - 1] || occupiedSquares[squareToIndex([square[0], square[1]]) - 1][0] !== color) &&
			!attackedSquares[opponentColor].has(squareToIndex(square));			
		});

		const colorRook = color + 'R';
		const queensideRook = allPieces[colorRook][findPieceIndex(colorRook, 0)];

		// queenside castling
		if (!hasMoved && queensideRook && !queensideRook.hasMoved && 
			!occupiedSquares[squareToIndex([file - 1, rank]) - 1] && !occupiedSquares[squareToIndex([file - 2, rank]) - 1] && !occupiedSquares[squareToIndex([file - 3, rank]) - 1] && 
			!attackedSquares[opponentColor].has(squareToIndex([file, rank])) && !attackedSquares[opponentColor].has(squareToIndex([file - 1, rank])) && !attackedSquares[opponentColor].has(squareToIndex([file - 2, rank]))) {
			moves.push([file - 2, rank]);
		}

		const kingsideRook = allPieces[colorRook][findPieceIndex(colorRook, 1)];

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
 		const color = this._color;
 		const file = this._file;
 		const rank = this._rank;
 		const hasMoved = this._hasMoved;
 		const possibleMoves = this.getPossibleMoves(file, rank);

 		// only need to check if square is on the board
		const protectedSquares = possibleMoves.filter(checkSquareOnBoard);

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
