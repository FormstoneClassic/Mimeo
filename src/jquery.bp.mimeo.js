;(function ($, window) {
	"use strict";
	
	var $window = $(window),
		$pictures;
		/* nativeSupport = (document.createElement('picture') && window.HTMLPictureElement) */
	
	// Default Options
	var options = {
	};
	
	// Public Methods
	var pub = {
		
		// Update watched elements
		update: function() {
			$pictures = $("picture");
			
			$pictures.each(function(i, picture) {
				var $sources = $(picture).find("source");
				
				for (var j = 0, count = $sources.length; j < count; j++) {
					var $source = $sources.eq(j),
						media = $source.attr("media");
					
					if (media) {
						var _mq = window.matchMedia(media.replace(Infinity, "100000px"));
						_mq.addListener(_respond);
						$source.data("mimeo-match", _mq);
					}
				}
			});
			
			_respond();
		}
	};
	
	// Private Methods
	
	// Init 
	function _init(opts) {
		$.extend(options, opts || {});
		
		/*
		if (nativeSupport) {
			return;
		}
		*/
		
		pub.update();
	}
	
	// Handle event
	function _respond() {
		$pictures.each(function() {
			var $target = $(this),
				$image = $target.find("img"),
				$sources = $target.find("source"),
				index = false;
			
			for (var i = 0, count = $sources.length; i < count; i++) {
				var match = $sources.eq(i).data("mimeo-match");
				
				if (match) {
					if (match.matches) {
						index = i;
					}
				}
			}
			
			if (index === false) {
				index = $sources.length - 1;
			}
			
			$image.attr("src", $sources.eq(index).attr("src"));
		});
	}
	
	// Define Plugin
	$.mimeo = function(method) {
		if (pub[method]) {
			return pub[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return _init.apply(this, arguments);
		}
		return this;
	};
})(jQuery, window);