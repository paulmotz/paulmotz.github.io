$(document).ready(function() {
	var $board = $('#chessboard');

	$board.on('click', function(e) {
		var x = e.offsetX;
		var y = e.offsetY;

		// make sure the user clicked on the board
		if (x > squareSize && y > squareSize && x < 9 * squareSize && y < 9 * squareSize) {
			getSquare(x, y);  
		}
	});

	$('input[type=radio]').change(function() {
		if (this.value === 'white') {
			drawWhite();
		}
		else {
			drawBlack();
		}
	});

	var board = $board[0];
	var boardctx = board.getContext('2d');
	var files = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ''];
	var ranks = ['', '1', '2', '3', '4', '5', '6', '7', '8', ''];

	
	// TODO: what if height !== width?
	var height = parseInt($board.css('height'));
	var width = parseInt($board.css('width'));
	var squareSize = height/10;

	var whiteDown = true;
	drawWhite();

	class Piece {

		/**
		 * Creates a piece of the given color at the given location
		 * @param {string} color - The color of the piece: white || black
		 * @param {number} file - file rank of the piece: 1 - 8
		 * @param {number} rank - the rank of the piece: 1 - 8
		 */

		constructor(color, file, rank) {
			this._color = color;
			this._file = file;
			this._rank = rank;
		}

		/**
		 * Get the piece's color
		 * @return {string} color - The color of the piece: white || black
		 */

		get color() {
			return this._color;
		}

		/**
		 * Get the piece's color
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
	}

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

	class Rook extends Piece {
		
		/*
		 * Creates a rook of the given color at the given location
		 * @param {string} color - The color of the rook: white || black
		 * @param {number} file - file rank of the rook: 1 - 8
		 * @param {number} rank - the rank of the rook: 1 - 8
		 * @param {boolean} hasMoved - whether or not the rook has moved (used for checking if castling is possible)
		 */

		constructor(color, file, rank, hasMoved) {
			super(color, file, rank)
			this._hasMoved = hasMoved;
		}

		// TODO: account for pieces that could be blocking the rook
		/**
		 * Get the Rook's moves
		 * @return {number[][]} moves - the moves of the Rook as an array of co-ordinates (also an array)
		 */

		get moves() {
			var moves = [];

			var file = this._file;
			var rank = this._rank;

			// moves towards the left
			while (file > 1) {
				file--;
				moves.push([file, rank]);
			}

			file = this._file;

			// moves towards the right
			while (file < 8) {
				file++;
				moves.push([file, rank]);
			}

			file = this._file;

			// moves towards the bottom
			while (rank > 1) {
				rank--;
				moves.push([file, rank]);
			}

			rank = this._rank;

			// moves towards the top
			while (rank < 8) {
				rank++;
				moves.push([file, rank]);
			}

			return moves;
		}


	}

	var p = new Rook('white', 1, 1, false);
	console.log(p);
	p.color = 'red';
	console.log(p);
	console.log(p.moves);

	/**
	 * Draw the board with white at the bottom
	 */

	function drawWhite() {

		whiteDown = true;
		
		// redraw border to overwrite existing text
		boardctx.fillStyle = "#F5F5DC"
		boardctx.fillRect(0, 0, squareSize * 10, squareSize * 10);

		for (var r = 0; r < 10; r++) {
			for (var f = 0; f < 10; f++) {

				// rank falls off the board 
				if (r === 0 || r === 9) {
					boardctx.fillStyle = "#000000";
					boardctx.fillText(ranks[9-f], (r + 0.5) * squareSize, (f + 0.5) * squareSize);
				}

				// file falls off the board
				else if (f === 0 || f === 9) {
					boardctx.fillStyle = "#000000";
					boardctx.fillText(files[r], (r + 0.5) * squareSize, (f + 0.5) * squareSize);
				}

				// draw square
				else {
					if ((r + f) % 2 === 1) {
						boardctx.fillStyle = "#000000";
						// boardctx.fillStyle = "#302013";
						boardctx.fillRect(f * squareSize, r * squareSize, squareSize, squareSize);
					}
					else {
						boardctx.fillStyle = "#FFFFFF";
						// boardctx.fillStyle = "#eadabf";
						boardctx.fillRect(f * squareSize, r * squareSize, squareSize, squareSize);
					}
				}
			}
		}
	}

	/**
	 * Draw the board with black at the bottom
	 */

	function drawBlack() {

		whiteDown = false;

		// redraw border to overwrite existing text
		boardctx.fillStyle = "#F5F5DC"
		boardctx.fillRect(0, 0, squareSize * 10, squareSize * 10);

		for (var r = 0; r < 10; r++) {
			for (var f = 0; f < 10; f++) {

				// rank falls off the board 
				if (r === 0 || r === 9) {
					boardctx.fillStyle = "#000000";
					boardctx.fillText(ranks[f], (r + 0.5) * squareSize, (f + 0.5) * squareSize);
				}

				// file falls off the board
				else if (f === 0 || f === 9) {
					boardctx.fillStyle = "#000000";
					boardctx.fillText(files[9-r], (r + 0.5) * squareSize, (f + 0.5) * squareSize);
				}

				// draw square
				else {
					if ((r + f) % 2 === 1) {
						boardctx.fillStyle = "#000000";
						boardctx.fillRect(f * squareSize, r * squareSize, squareSize, squareSize);
					}
					else {
						boardctx.fillStyle = "#FFFFFF";
						boardctx.fillRect(f * squareSize, r * squareSize, squareSize, squareSize);
					}
				}
			}
		}
	}
	
	/**
	 * Maps the x and y co-ordinates to a 8x8 grid with 1-indexing
	 * @param {number} x - e.offsetX
	 * @param {number} y - e.offsetY
	 * @return {number[]} square - the indices of the square in the form [file, rank]
	 */

	function getSquare(x, y) {
		var file = Math.floor(x/squareSize);
		var rank = Math.floor(y/squareSize);
		if (whiteDown) {
			var square = [file, 9 - rank];
			// var square = files[file] + (9 - rank).toString();
		}
		else {
			var square = [rank, 9 - file];
			// var square = files[9 - file] + rank.toString();
		}
		console.log(square);
		return square;
	}

});
