class Piece {

	/**
	 * Creates a piece of the given color at the given location
	 * @param {string} color - The color of the piece: white || black
	 * @param {number} file - file rank of the piece: 1 - 8
	 * @param {number} rank - the rank of the piece: 1 - 8
	 * @param {number} id - the id of the piece: 1 - 10 (where 10 = max possible number of any given piece per color)
	 */

	constructor(color, file, rank, id) {
		this._color = color;
		this._file = file;
		this._rank = rank;
		this._id = id;
	}

	/**
	 * Get the piece's color
	 * @return {string} color - The color of the piece: white || black
	 */

	get color() {
		return this._color;
	}

	/**
	 * Get the piece's file
	 * @return {number} file - The file of the piece: 1 - 8
	 */

	get file() {
		return this._file;
	}

	/**
	 * Get the piece's rank
	 * @return {number} rank - The rank of the piece: 1 - 8
	 */

	get rank() {
		return this._rank;
	}

	/**
	 * Get the piece's id
	 * @return {number} id - The id of the piece: 1 - 10 (where 10 = max possible number of any given piece per color)
	 */

	get id() {
		return this._id;
	}

	/**
	 * Set the piece's color
	 * @param {string} color - The color of the piece: white || black
	 */

	set color(color) {
		if (color === 'white' || color === 'black') {
			this._color = color;
		}
	}

	/**
	 * Set the piece's color
	 * @param {number} file - The file of the piece: 1 - 8
	 */

	set file(file) {
		if (file > 0 && file < 9) {
			this._file = file;
		}
	}

	/**
	 * Set the piece's rank
	 * @param {number} rank - The rank of the piece: 1 - 8
	 */

	set rank(rank) {
		if (rank > 0 && rank < 9) {
			this._rank = rank;
		}
	}

	/**
	 * Get the piece's id
	 * @param {number} id - The id of the piece: 1 - 10 (where 10 = max possible number of any given piece per color)
	 */

	set id(id) {
		this._id = id;
	}

	// TODO: not sure if this is right, read up on this
	// get moves() {
	// 	return [];
	// }
}