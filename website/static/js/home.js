$( document ).ready(
	function () {
		// Load Slick Slider.
		$( '.slider' ).slick(
			{
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				autoplaySpeed: 7500,
				speed: 1500,
				arrows: false,
				dots: true,
				fade: true,
				pauseOnHover: false,
				infinite: true,
			}
		);

		stretchSliderToFitHeight();
		$( window ).resize(
			function() {
				stretchSliderToFitHeight();
			}
		);
	}
);

function stretchSliderToFitHeight(){
	let slide     = $( '.td-home .frontpage .slider .slide' );
	slide.css( 'min-height', '' );
	let minHeight = $( '.td-main' ).height();
	if ( minHeight > 689 ) {
		slide.css( 'min-height', minHeight );
		$( '.slider' ).slick( 'resize' );
	}
}
