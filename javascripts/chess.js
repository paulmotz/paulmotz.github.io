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

	var whiteDown = true;

	// TOD0: what if height !== width?
	var height = parseInt($board.css('height'));
	var width = parseInt($board.css('width'));
	var squareSize = height/10;

	drawWhite();

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
	 * Maps the x and y co-ordinates to a square using algebraic notation
	 * @param {number} x - e.offsetX
	 * @param {number} y - e.offsetY
	 * @return {String} - square in algebraic notation
	 */

	// TODO: should this return an array of two values instead of a string?

	function getSquare(x, y) {
		var file = Math.floor(x/squareSize);
		var rank = Math.floor(y/squareSize);
		if (whiteDown) {
			var square = files[file] + (9 - rank).toString();
		}
		else {
			var square = files[9 - file] + rank.toString();
		}
		return square;
	}

});
