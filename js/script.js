// DOCUMENT-METHOD
$(document).ready(function () {

	// TOGGLE-MENU
	$(".nav-toggle").click(function () {
		$("nav").slideToggle();
	});

	// ACTIVE-LINK-ON-CLICK
	$('nav ul li a').click(function () {
		$('nav ul li a').removeClass("active-link");
		$(this).addClass("active-link");
	});

	// HEADLINE-JS
	var animationDelay = 0,
		revealDuration = 1000,
		revealAnimationDelay = 500;
	initHeadline();
	function initHeadline() {
		animateHeadline($('.cd-headline'));
	}
	function animateHeadline($headlines) {
		var duration = animationDelay;
		$headlines.each(function () {
			var headline = $(this);

			if (headline.hasClass('loading-bar')) {
				duration = barAnimationDelay;
				setTimeout(function () { headline.find('.cd-words-wrapper').addClass('is-loading') }, barWaiting);
			} else if (headline.hasClass('clip')) {
				var spanWrapper = headline.find('.cd-words-wrapper'),
					newWidth = spanWrapper.width() + 10
				spanWrapper.css('width', newWidth);
			} else if (!headline.hasClass('type')) {
				var words = headline.find('.cd-words-wrapper b'),
					width = 0;
				words.each(function () {
					var wordWidth = $(this).width();
					if (wordWidth > width) width = wordWidth;
				});
				headline.find('.cd-words-wrapper').css('width', width);
			};
			setTimeout(function () { hideWord(headline.find('.is-visible').eq(0)) }, duration);
		});
	}
	function hideWord($word) {
		var nextWord = takeNext($word);
		if ($word.parents('.cd-headline').hasClass('type')) {
			var parentSpan = $word.parent('.cd-words-wrapper');
			parentSpan.addClass('selected').removeClass('waiting');
			setTimeout(function () {
				parentSpan.removeClass('selected');
				$word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
			}, selectionDuration);
			setTimeout(function () { showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);
		} else if ($word.parents('.cd-headline').hasClass('letters')) {
			var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
			hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
			showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);
		} else if ($word.parents('.cd-headline').hasClass('clip')) {
			$word.parents('.cd-words-wrapper').animate({ width: '2px' }, revealDuration, function () {
				switchWord($word, nextWord);
				showWord(nextWord);
			});

		} else if ($word.parents('.cd-headline').hasClass('loading-bar')) {
			$word.parents('.cd-words-wrapper').removeClass('is-loading');
			switchWord($word, nextWord);
			setTimeout(function () { hideWord(nextWord) }, barAnimationDelay);
			setTimeout(function () { $word.parents('.cd-words-wrapper').addClass('is-loading') }, barWaiting);

		} else {
			switchWord($word, nextWord);
			setTimeout(function () { hideWord(nextWord) }, animationDelay);
		}
	}

	function showWord($word, $duration) {
		if ($word.parents('.cd-headline').hasClass('type')) {
			showLetter($word.find('i').eq(0), $word, false, $duration);
			$word.addClass('is-visible').removeClass('is-hidden');

		} else if ($word.parents('.cd-headline').hasClass('clip')) {
			$word.parents('.cd-words-wrapper').animate({ 'width': $word.width() + 10 }, revealDuration, function () {
				setTimeout(function () { hideWord($word) }, revealAnimationDelay);
			});
		}
	}
	function takeNext($word) {
		return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
	}
	function switchWord($oldWord, $newWord) {
		$oldWord.removeClass('is-visible').addClass('is-hidden');
		$newWord.removeClass('is-hidden').addClass('is-visible');
	}

	// FILTER-GALLERY
	$('.filters ul li a').click(function () {
		$('.filters ul li a').removeClass('active');
		$(this).addClass('active');

		var data = $(this).attr('data-filter');
		$gallery.isotope({
			filter: data,
		})
	});

	var $gallery = $(".gallery").isotope({
		itemSelector: ".all",
		percentPosition: true,
		masonry: {
			columnWidth: ".all"
		}
	});

	// THEME-SWITCHER
	$(document).ready(function () {
		$(".color-icon").click(function () {
			$(".color-palate").toggleClass("slide-left");
		});

		$(".color-palate ul li").click(function () {
			var color = $(this).css("background-color");
			$(":root").css("--color-green", color)
		});
		$(".color-palate ul + a").click(function () {
			$(":root").css("--color-green", '#20c997')
		});
	});
});

// WINDOW-METHOD
$(window).scroll(function () {

	// ACTIVE-LINK-ON-SCROLL
	var scrollTop = $(this).scrollTop();
	var currentSection = null;
	$("section").each(function () {
		if ($(this).offset().top <= scrollTop) {
			currentSection = this;
		} else {
			return false;
		}
	});
	if (currentSection) {
		var currentLink = $("header nav ul li a[href='#" + currentSection.id + "']");
		$("header nav ul li a").removeClass("active-link");
		currentLink.addClass("active-link");
	}

	// BACK-TO-TOP
	if ($(this).scrollTop() > 100) {
		$(".back-to-top").fadeIn();
	}
	else {
		$(".back-to-top").fadeOut();
	}

});