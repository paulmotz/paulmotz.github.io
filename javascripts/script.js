/**
 * TODO:
 * - live preivew instead of still image
 * - larger photos?
 *
 */

$(document).ready(function() {

	// http://stackoverflow.com/questions/18712338/make-header-and-footer-files-to-be-included-in-multiple-html-pages
	$("#header").load("header.html");
	$("#footer").load("footer.html");

	var urls = ["https://67.media.tumblr.com/2fd8913a7817348ba5bda61f76a1879f/tumblr_oe2qjweZ991sxd6n3o1_540.png",
	"https://68.media.tumblr.com/66c5a3d114e61586de53826c98f5905b/tumblr_oeu8qdzCRd1sxd6n3o1_540.png",
	"https://68.media.tumblr.com/de54b55c40f34024c4e6d9ce90938693/tumblr_ogylgaJqz81sxd6n3o1_540.png"];

	var r = Math.floor(Math.random() * urls.length);

	$("#fcc-img").attr("src", urls[r]);

	alignOverlay();
	  $(window).resize(function() {
	    alignOverlay();
	  });
});

function alignOverlay () {
  var $pWidth = parseInt($('.project').css('width'));
  var $oWidth = parseInt($('.project-overlay').css('width'));
  var $l = $('.project').offset().left;
  var m = ($pWidth - $oWidth) / 2;
  $('.project-overlay').css('margin', '0 ' + m + 'px');
}
