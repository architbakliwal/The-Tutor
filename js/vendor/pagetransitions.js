var PageTransitions = (function() {

    var animcursor = {};

    var $main = $('#pt-main'),
        $pages = $main.children('div.pt-page'),
        // animcursor = 1,
        pagesCount = $pages.length,
        current = 0,
        isAnimating = false,
        endCurrPage = false,
        endNextPage = false,
        animEndEventNames = {
            'WebkitAnimation': 'webkitAnimationEnd',
            'OAnimation': 'oAnimationEnd',
            'msAnimation': 'MSAnimationEnd',
            'animation': 'animationend'
        },
        // animation end event name
        animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],
        // support css animations
        support = Modernizr.cssanimations;

    function init() {

        $pages.each(function() {
            var $page = $(this);
            $page.data('originalClassList', $page.attr('class'));
        });

        $pages.eq(current).addClass('pt-page-current');

        $(document).on('click', '#btn-search', function() {
            if (isAnimating) {
                return false;
            }

            animcursor.animation = 1;
            animcursor.currentPage = 0;
            animcursor.nextPage = 3;

            nextPage(animcursor);
        });

        $(document).on('click', '.c-skill', function(el) {
            // console.log(el);
            var param = el.target.id;

            $.ajax({
                type: "POST",
                url: "search.php",
                data: {
                    'searchType': 'basic',
                    'searchVal': param
                },
                success: function(responseText, statusText, xhr) {
                    // console.log(JSON.parse(responseText));
                }
            });

            if (isAnimating) {
                return false;
            }

            animcursor.animation = 1;
            animcursor.currentPage = 0;
            animcursor.nextPage = 3;

            nextPage(animcursor);
        });

        $(document).on('click', '.label-school', function() {
            if (isAnimating) {
                return false;
            }

            animcursor.animation = 1;
            animcursor.currentPage = 0;
            animcursor.nextPage = 1;

            nextPage(animcursor);
        });

        $(document).on('click', '.label-college', function() {
            if (isAnimating) {
                return false;
            }

            animcursor.animation = 1;
            animcursor.currentPage = 0;
            animcursor.nextPage = 2;

            nextPage(animcursor);
        });

        $(document).on('click', '.label-class', function(el) {
            if (isAnimating) {
                return false;
            }

            animcursor.animation = 1;
            animcursor.currentPage = 1;
            animcursor.nextPage = 3;

            nextPage(animcursor);
        });

        $(document).on('click', '.label-stream', function(el) {
            if (isAnimating) {
                return false;
            }

            animcursor.animation = 1;
            animcursor.currentPage = 2;
            animcursor.nextPage = 3;

            nextPage(animcursor);
        });

        $(document).on('click', '#btn-back', function() {
            if (isAnimating) {
                return false;
            }

            animcursor.animation = 2;
            animcursor.currentPage = 3;
            animcursor.nextPage = 0;

            nextPage(animcursor);
        });

        $(document).on('click', '#btn-back1', function() {
            if (isAnimating) {
                return false;
            }

            animcursor.animation = 2;
            animcursor.currentPage = 1;
            animcursor.nextPage = 0;

            nextPage(animcursor);
        });

        $(document).on('click', '#btn-back2', function() {
            if (isAnimating) {
                return false;
            }

            animcursor.animation = 2;
            animcursor.currentPage = 2;
            animcursor.nextPage = 0;

            nextPage(animcursor);
        });

    }

    function nextPage(options) {
        var animation = options.animation;
        current = options.currentPage;

        if (isAnimating) {
            return false;
        }

        isAnimating = true;

        var $currPage = $pages.eq(current);

        var $nextPage = $pages.eq(options.nextPage).addClass('pt-page-current'),
            outClass = '',
            inClass = '';

        switch (animation) {

            case 1:
                outClass = 'pt-page-moveToLeft';
                inClass = 'pt-page-moveFromRight';
                break;
            case 2:
                outClass = 'pt-page-moveToRight';
                inClass = 'pt-page-moveFromLeft';
                break;

        }

        $currPage.addClass(outClass).on(animEndEventName, function() {
            $currPage.off(animEndEventName);
            endCurrPage = true;
            if (endNextPage) {
                onEndAnimation($currPage, $nextPage);
            }
        });

        $nextPage.addClass(inClass).on(animEndEventName, function() {
            $nextPage.off(animEndEventName);
            endNextPage = true;
            if (endCurrPage) {
                onEndAnimation($currPage, $nextPage);
            }
        });

        if (!support) {
            onEndAnimation($currPage, $nextPage);
        }
    }

    function onEndAnimation($outpage, $inpage) {
        endCurrPage = false;
        endNextPage = false;
        resetPage($outpage, $inpage);
        isAnimating = false;
    }

    function resetPage($outpage, $inpage) {
        $outpage.attr('class', $outpage.data('originalClassList'));
        $inpage.attr('class', $inpage.data('originalClassList') + ' pt-page-current');
    }

    init();

    return {
        init: init,
        nextPage: nextPage,
    };

})();
