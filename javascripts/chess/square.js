class Square {

	/**
	 * Creates a square at the given color at the given location
	 * @param {number} file - file rank of the square: 1 - 8
	 * @param {number} rank - the rank of the square: 1 - 8
	 * @param {boolean} isOccupied - whether the square is being occupied by a piece
	 */

	constructor(file, rank, isOccupied, occupyingPiece) {
		this._file = file;
		this._rank = rank;
		this._isOccupied = isOccupied;
		this._occupyingPiece = occupyingPiece;
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
}