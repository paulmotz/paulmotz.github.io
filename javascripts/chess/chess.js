/**
 * TODOs
 * Visual:
 * -Make the occupied square one color and all attacking squares another (for testing)
 *
 * Logic:
 * - is the king in check
 * - is the piece pinned (moving it in a certain direction leaves the king in check)
*/

$.getScript('./javascripts/chess/piece.js', function() {
	var $board = $('#chessboard');

	// TODO: what if height !== width?
	var height = parseInt($board.css('height'));
	var width = parseInt($board.css('width'));
	var squareSize = height/10;

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
	var ctx = board.getContext('2d');
	var files = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ''];
	var ranks = ['', '1', '2', '3', '4', '5', '6', '7', '8', ''];

	// https://en.wikipedia.org/wiki/Chess_symbols_in_Unicode
	var whitePieces = {'B': '♗', 'N': '♘', 'K': '♔', 'P': '♙', 'Q': '♕', 'R': '♖'};
	var blackPieces = {'B': '♝', 'N': '♞', 'K': '♚', 'P': '♟', 'Q': '♛', 'R': '♜'};

	var whiteDown = true;
	drawWhite();

	// white pieces

	ctx.fillStyle = "#FFF";

	var b1 = new Bishop('white', 3, 1);
	// var bIconW = document.getElementById('bw');
	drawOnSquare(b1.file, b1.rank, whitePieces['B']);
	// bMoves = b.moves;
	// for (var m in bMoves) {
	// 	drawOnSquare(bMoves[m][0], bMoves[m][1], 'BA');
	// }

	var b2 = new Bishop('white', 6, 1);
	drawOnSquare(b2.file, b2.rank, whitePieces['B']);

	var k = new King('white', 5, 1);
	drawOnSquare(k.file, k.rank, whitePieces['K']);
	// kMoves = k.moves;
	// for (var m in kMoves) {
	// 	drawOnSquare(kMoves[m][0], kMoves[m][1], 'KA');
	// }

	var n = new Knight('white', 2, 1);
	drawOnSquare(n.file, n.rank, whitePieces['N']);

	var n = new Knight('white', 7, 1);
	drawOnSquare(n.file, n.rank, whitePieces['N']);

	for (var i = 1; i <= 8; i++) {
		var p = new Pawn('white', i, 2);
		drawOnSquare(p.file, p.rank, whitePieces['P']);
	}

	var q = new Queen('white', 4, 1);
	drawOnSquare(q.file, q.rank, whitePieces['Q']);
	// qMoves = q.moves;
	// for (var m in qMoves) {
	// 	drawOnSquare(qMoves[m][0], qMoves[m][1], 'QA');
	// }

	var r = new Rook('white', 1, 1);
	drawOnSquare(r.file, r.rank, whitePieces['R']);
	// rMoves = r.moves;
	// for (var m in rMoves) {
	// 	drawOnSquare(rMoves[m][0], rMoves[m][1], 'RA');
	// }

	var r = new Rook('white', 8, 1);
	drawOnSquare(r.file, r.rank, whitePieces['R']);

	// black Pieces

	ctx.fillStyle = "#000";

	var b1 = new Bishop('white', 3, 8);
	// var bIconW = document.getElementById('bw');
	drawOnSquare(b1.file, b1.rank, blackPieces['B']);
	// bMoves = b.moves;
	// for (var m in bMoves) {
	// 	drawOnSquare(bMoves[m][0], bMoves[m][1], 'BA');
	// }

	var b2 = new Bishop('white', 6, 8);
	drawOnSquare(b2.file, b2.rank, blackPieces['B']);

	var k = new King('white', 5, 8);
	drawOnSquare(k.file, k.rank, blackPieces['K']);
	// kMoves = k.moves;
	// for (var m in kMoves) {
	// 	drawOnSquare(kMoves[m][0], kMoves[m][1], 'KA');
	// }

	var n = new Knight('white', 2, 8);
	drawOnSquare(n.file, n.rank, blackPieces['N']);

	var n = new Knight('white', 7, 8);
	drawOnSquare(n.file, n.rank, blackPieces['N']);

	for (var i = 1; i <= 8; i++) {
		var p = new Pawn('white', i, 7);
		drawOnSquare(p.file, p.rank, blackPieces['P']);
	}

	var q = new Queen('white', 4, 8);
	drawOnSquare(q.file, q.rank, blackPieces['Q']);
	// qMoves = q.moves;
	// for (var m in qMoves) {
	// 	drawOnSquare(qMoves[m][0], qMoves[m][1], 'QA');
	// }

	var r = new Rook('white', 1, 8);
	drawOnSquare(r.file, r.rank, blackPieces['R']);
	// rMoves = r.moves;
	// for (var m in rMoves) {
	// 	drawOnSquare(rMoves[m][0], rMoves[m][1], 'RA');
	// }

	var r = new Rook('white', 8, 8);
	drawOnSquare(r.file, r.rank, blackPieces['R']);

	/**
	 * Draw the board with white at the bottom
	 */

	function drawWhite() {

		whiteDown = true;
		
		// redraw border to overwrite existing text
		// ctx.fillStyle = "#F5F5DC";
		ctx.fillStyle = "#000";
		ctx.fillRect(0, 0, squareSize * 10, squareSize * 10);

		ctx.textAlign = "center";
		ctx.textBaseline = "middle"; 
		ctx.font = "20px serif";

		for (var r = 0; r < 10; r++) {
			for (var f = 0; f < 10; f++) {

				// rank falls off the board 
				if (r === 0 || r === 9) {
					ctx.fillStyle = "#FFF";
					ctx.fillText(ranks[9-f], (r + 0.5) * squareSize, (f + 0.5) * squareSize);
				}

				// file falls off the board
				else if (f === 0 || f === 9) {
					ctx.fillStyle = "#FFF";
					ctx.fillText(files[r], (r + 0.5) * squareSize, (f + 0.5) * squareSize);
				}

				// draw square
				else {
					if ((r + f) % 2 === 1) {
						ctx.fillStyle = "#444";
						// ctx.fillStyle = "#689B56";
						// ctx.fillStyle = "#302013";
						ctx.fillRect(f * squareSize, r * squareSize, squareSize, squareSize);
					}
					else {
						ctx.fillStyle = "#999";
						// ctx.fillStyle = "#ECEFD0";
						// ctx.fillStyle = "#eadabf";
						ctx.fillRect(f * squareSize, r * squareSize, squareSize, squareSize);
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
		// ctx.fillStyle = "#F5F5DC";
		class Knight extends Piece {

	}
		ctx.fillRect(0, 0, squareSize * 10, squareSize * 10);

		for (var r = 0; r < 10; r++) {
			for (var f = 0; f < 10; f++) {

				// rank falls off the board 
				if (r === 0 || r === 9) {
					ctx.fillStyle = "#FFF";
					ctx.fillText(ranks[f], (r + 0.5) * squareSize, (f + 0.5) * squareSize);
				}

				// file falls off the board
				else if (f === 0 || f === 9) {
					ctx.fillStyle = "#FFF";
					ctx.fillText(files[9-r], (r + 0.5) * squareSize, (f + 0.5) * squareSize);
				}

				// draw square
				else {
					if ((r + f) % 2 === 1) {
						ctx.fillStyle = "#444";
						// ctx.fillStyle = "#689B56";
						ctx.fillRect(f * squareSize, r * squareSize, squareSize, squareSize);
					}
					else {
						ctx.fillStyle = "#999";
						// ctx.fillStyle = "#ECEFD0";
						ctx.fillRect(f * squareSize, r * squareSize, squareSize, squareSize);
					}
				}
			}
		}
	}

	function drawPieces() {
		if (whiteDown) {

		}
		else {

		}
	}
	
	/**
	 * Maps the x and y co-ordinates to a 8x8 grid with 1-indexing
	 * @param {number} x - e.offsetX
	 * @param {number} y - e.offsetY
	 * @return {number[]} square - the indices of the square in the form [file, rank]
	 */

	function getSquare(x, y) {
		console.log(x, y);
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
		// console.log(square);
		return square;
	}

	/**
	 * Maps the rank and file of a square to x and y co-ordinates corresponding with its offset
	 * @param {number} file - the square's file: 1 - 8
	 * @param {number} rank - the square's rank: 1 - 8
	 * @return {number[]} offset - the offset of the square in the form [x, y]
	 */

	function getCoordinates(file, rank) {
		// console.log(file);
		if (whiteDown) {
			var x = file * squareSize;
			var y = (9 - rank) * squareSize;
		}
		else {
			var x = (9 - file) * squareSize;
			var y = rank * squareSize;
		}
		// console.log(x, y);
		return [x, y];
	}

	/**
	 * Draws on the square at the given co-ordinates
	 * @param {number} file - the square's file: 1 - 8
	 * @param {number} rank - the square's rank: 1 - 8
	 * @param {image} String - what to draw on the square
	 */

	function drawOnSquare(file, rank, image) {
		var coordinates = getCoordinates(file, rank);
		// console.log(coordinates);
		// ctx.fillStyle = "#000FFF";
		ctx.font = squareSize +"px serif";
		// ctx.fillText(image, 210, 540);
		ctx.fillText(image, coordinates[0] + (0.5 * squareSize), coordinates[1] + (0.5 * squareSize));
		// ctx.drawImage(image, coordinates[0] + (0.5 * squareSize), coordinates[1] + (0.5 * squareSize));
	}
});

$(document).ready(function() {
	
});
