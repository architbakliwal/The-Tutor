jQuery(document).ready(function($) {
    if ($('.floating-labels').length > 0) floatLabels();

    function floatLabels() {
        var inputFields = $('.floating-labels .cd-label').next();
        inputFields.each(function() {
            var singleInput = $(this);
            //check if user is filling one of the form fields 
            checkVal(singleInput);
            singleInput.on('change keyup', function() {
                checkVal(singleInput);
            });
        });
    }

    function checkVal(inputField) {
        (inputField.val() === '') ? inputField.prev('.cd-label').removeClass('float'): inputField.prev('.cd-label').addClass('float');
    }


    var container = document.getElementById("resultContainer");
    var content = document.getElementById("content");
    var navHeight = $('.top-bar').height();
    var pageHeight = $('.pt-page-2').height();
    console.log(navHeight);
    console.log(pageHeight);
    $('#resultContainer').css('height', parseInt(pageHeight - navHeight));

    // Initialize Scroller
    var scroller = new Scroller(render, {
        scrollingX: false
    });

    // Setup Scroller

    var rect = container.getBoundingClientRect();

    scroller.setPosition(rect.left + container.clientLeft, rect.top + container.clientTop);



    // Fill Scroller

    var insertItems = function() {

        for (var i = 0; i < 15; i++) {

            var row = document.createElement("div");
            row.className = "rowData";
            row.style.backgroundColor = i % 2 > 0 ? "#ddd" : "";
            row.innerHTML = i;

            content.appendChild(row);
        }

        // Update Scroller dimensions for changed content
        scroller.setDimensions(container.clientWidth, container.clientHeight, content.offsetWidth, content.offsetHeight + 15);

    };

    insertItems();



    // Event Handler

    if ('ontouchstart' in window) {

        container.addEventListener("touchstart", function(e) {
            // Don't react if initial down happens on a form element
            if (e.target.tagName.match(/input|textarea|select/i)) {
                return;
            }

            scroller.doTouchStart(e.touches, e.timeStamp);
            e.preventDefault();
        }, false);

        document.addEventListener("touchmove", function(e) {
            scroller.doTouchMove(e.touches, e.timeStamp);
        }, false);

        document.addEventListener("touchend", function(e) {
            scroller.doTouchEnd(e.timeStamp);
        }, false);

    } else {

        var mousedown = false;

        container.addEventListener("mousedown", function(e) {
            // Don't react if initial down happens on a form element
            if (e.target.tagName.match(/input|textarea|select/i)) {
                return;
            }

            scroller.doTouchStart([{
                pageX: e.pageX,
                pageY: e.pageY
            }], e.timeStamp);

            mousedown = true;
        }, false);

        document.addEventListener("mousemove", function(e) {
            if (!mousedown) {
                return;
            }

            scroller.doTouchMove([{
                pageX: e.pageX,
                pageY: e.pageY
            }], e.timeStamp);

            mousedown = true;
        }, false);

        document.addEventListener("mouseup", function(e) {
            if (!mousedown) {
                return;
            }

            scroller.doTouchEnd(e.timeStamp);

            mousedown = false;
        }, false);

    }
});
