/**
 * TODO:
 * - live preivew instead of still image
 * - larger photos?
 *
 */

$(document).ready(function() {
	const locs = ['images/FCC/Quote540.png', 'images/FCC/Weather540.png', 'images/FCC/Wiki540.png', 'images/FCC/AOM540.png', 'images/FCC/Calc540.png', 'images/FCC/Pomo540.png', 'images/FCC/TicTacToe540.png', 'images/FCC/Simon540.png'];

	const r = Math.floor(Math.random() * locs.length);

	// $("#fcc-img").attr("src", urls[r]);
	$("#fcc-img").attr("src", locs[r]);

	alignOverlay();
	  $(window).resize(function() {
	    alignOverlay();
	  });
});

function alignOverlay () {
	const $pWidth = parseInt($('.project').css('width'));
	const $oWidth = parseInt($('.project-overlay').css('width'));
	const $l = $('.project').offset().left;
	const m = ($pWidth - $oWidth) / 2;
	$('.project-overlay').css('margin', '0 ' + m + 'px');
}
