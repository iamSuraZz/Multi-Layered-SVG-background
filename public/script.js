// First attempt at creating a changing and fading multi-layered background.
// Used here : http://billsearle.me

$(document).ready(function(){
	// set #background-* to full window height and fade in the body
	var width = $(window).width();
	var height = $(window).height();
		$('#background-container, #background-1, #background-2').css({
			'min-width': width,
			'min-height': height
		});

	// call new svg and start recreate svg timeout
	svgNew();
	recreateSvg();
});

// set global svg object
var svg = {};
// used to determine which background to draw to
var draw = 1;
// create new svg 
var svgNew = function(){
	svg.t = new Trianglify({
		noiseIntensity: 0,
	});
	// set svg size to window height and width
	svg.width = $(window).width();
	svg.height = $(window).height();
	svg.pattern = svg.t.generate(svg.width, svg.height);
	// draw svg on to either background 1 or 2
	if (draw === 1) {
		svgDraw1();
	} else {
		svgDraw2();
	}
}; // end svgNew

// draw svg on to bg1 and call fade
// if called with resize, redraw the svg to match new size and do not call fade
var svgDraw1 = function (resize){
	draw = 2;
	if (resize === 'resize') {	
		svg.pattern = svg.t.generate(svg.width, svg.height);
		$('#background-1').css({
			'min-width': svg.width,
			'min-height': svg.height,
			'background': svg.pattern.dataUrl
		});
		$('#contact-background-1').css({
			'min-width': svg.width,
			'min-height': (svg.height / 2),
			'background': svg.pattern.dataUrl
		});
	} else {
		$('.background-1').css({
			'background': svg.pattern.dataUrl
		});
		fade1();
	}
}; // end svgDraw1

// same as above but for bg2
var svgDraw2 = function(resize){
	draw = 1;
	if (resize === 'resize') {	
		svg.pattern = svg.t.generate(svg.width, svg.height);
		$('#background-2').css({
			'min-width': svg.width,
			'min-height': svg.height,
			'background': svg.pattern.dataUrl
		});
		$('#contact-background-2').css({
			'min-width': svg.width,
			'min-height': (svg.height / 2),
			'background': svg.pattern.dataUrl
		});
	} else {
		$('.background-2').css({
			'background': svg.pattern.dataUrl
		});
		fade2();
	}
}; // end svgDraw2

// fade in bg1 and fade our bg2
var fade1 = function(){
	$('.background-1').velocity("fadeIn", { duration: 3000 });
	$('.background-2').velocity("fadeOut", { duration: 4000 });
};
// fade in bg2 and fade out bg1
var fade2 = function(){
	$('.background-2').velocity("fadeIn", { duration: 3000 });
	$('.background-1').velocity("fadeOut", { duration: 4000 });
};

// timeout function to create new svg every 5 seconds
var recreateSvg = function(){
 	window.setInterval(svgNew, 5000);
};

// redraw the current svg to match screen size on resize
$(window).resize(function() {
	svg.width = $(window).width();
	svg.height = $(window).height();
	$('#background-container').css({
		'min-width': svg.width,
		'min-height': svg.height
	});
	$('#contact-container').css({
		'min-width': svg.width,
		'min-height': (svg.height / 2)
	});
	svgDraw1('resize');
	svgDraw2('resize');
});