class Square {

	/**
	 * Creates a square at the given color at the given location
	 * @param {number} file - file rank of the square: 1 - 8
	 * @param {number} rank - the rank of the square: 1 - 8
	 * @param {boolean} isOccupied - whether the square is being occupied by a piece
	 * @param {Piece} occupyingPiece - the Piece occupying the square
	 * @param {String} pccupyingPieceName - the variable name of the occupying piece
	 */

	constructor(file, rank, isOccupied, occupyingPiece, occupyingPieceName) {
		this._file = file;
		this._rank = rank;
		this._isOccupied = isOccupied;
		this._occupyingPiece = occupyingPiece;
		this._occupyingPieceName = occupyingPieceName;
	}

	/**
	 * Get the square's file
	 * @return {number} file - The file of the square: 1 - 8
	 */

	get file() {
		return this._file;
	}

	/**
	 * Get the square's rank
	 * @return {number} rank - The rank of the square: 1 - 8
	 */

	get rank() {
		return this._rank;
	}

	/**
	 * Is the square occupied?
	 * @return {boolean} isOccupied - Whether the square is occupied
	 */
	get isOccupied() {
		return this._isOccupied;
	}

	/**
	 * Get the square's occupying piece (if there is one)
	 * @return {Piece} occupyingPiece - The piece occupying the square
	 */
	get occupyingPiece() {
		return this._occupyingPiece;
	}

	/**
	 * Get the square's occupying piece's name (if there is one)
	 * @return {Strinbg} occupyingPieceName - The variable name of the occupying piece
	 */
	get occupyingPieceName() {
		return this._occupyingPieceName;
	}

	/**
	 * Set the occupying piece
	 * @param {Piece} occupinyPiece - The occupying piece
	 */

	set occupyingPiece(piece) {
		this._occupyingPiece = piece;
	}

	/**
	 * Set the occupying piece's name
	 * @param {String} occupinyPieceName - The variable name of the occupying piece
	 */

	set occupyingPieceName(pieceName) {
		this._occupyingPieceName = pieceName;
	}
}
