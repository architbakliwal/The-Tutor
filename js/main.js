jQuery(document).ready(function($) {

    if ($('.floating-labels').length > 0) floatLabels();

    var latitude, longitude;

    var container = document.getElementById("resultContainer");
    var content = document.getElementById("content");
    var navHeight = $('.top-bar').height();
    var pageHeight = $('.pt-page-2').height();
    $('#resultContainer').css('height', parseInt(pageHeight - navHeight));

    // Initialize Scroller
    var scroller = new Scroller(render, {
        scrollingX: false
    });

    // Setup Scroller

    var rect = container.getBoundingClientRect();

    scroller.setPosition(rect.left + container.clientLeft, rect.top + container.clientTop);


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

    $pages.each(function() {
        var $page = $(this);
        $page.data('originalClassList', $page.attr('class'));
    });

    $pages.eq(current).addClass('pt-page-current');

    var UID, itemUID;

    function isValid(object) {
        if (object === undefined || object === null || object.length === 0) {
            return false;
        } else {
            return true;
        }
    }

    function createCookie(value, days) {
        var expires;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        // document.cookie = name + "=" + value + expires + "; path=/; domain=.thetutor.in";
        document.cookie = "thetutorregistered=" + value + expires + "; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

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

    $('#imap').gmap3({
        getgeoloc: {
            callback: function(latLng) {
                if (latLng) {
                    latitude = latLng.lat();
                    longitude = latLng.lng();
                } else {
                    swal({
                        title: "Error!",
                        text: 'Location permission is denied. Search results might not be accurate',
                        type: "error",
                        animation: false
                    });
                }
            }
        }
    });

    $(document).on('click touchstart', '#listData #viewmore i', function(el) {
        el.stopPropagation();
        el.preventDefault();
        var cookieVal = readCookie("thetutorregistered");
        // console.log(el);
        itemUID = el.target.dataset.uid;
        // console.log(document.cookie);
        if (isValid(cookieVal)) {
            viewMore(itemUID);
        } else {
            var SM1 = new SimpleModal({
                "closeButton": false,
                "hideFooter": true,
                "overlayClick": false
            });
            SM1.show({
                "model": "modal",
                "title": "Verification",
                "contents": '<form class="cd-form floating-labels" id="student-register" method="POST" action="student-processor.php" autocomplete="off"> <input autocomplete="false" name="hidden" type="text" style="display:none;"> <fieldset style="margin:10px 0;"> <h4>Please enter your full name and mobile number for one time registration. An OTP would be sent for verification.</h4> <div class="icon"><label class="cd-label" for="cd-name">Name</label><input class="user" type="text" name="cd-name" id="cd-name" required></div><div class="icon"><label class="cd-label" for="cd-mobile">Mobile Number</label><input class="mobile" type="text" name="cd-mobile" id="cd-mobile" required><h4>10 digits only.</h4></div> <div> <input type="submit" value="Register" id="register" style="float: left; margin-left:15px;"> </div><div> <input type="button" value="Cancel" id="cancel" style="float: left; margin-left:15px;"> </div></fieldset> </form>'
            });
            if ($('.floating-labels').length > 0) floatLabels();
            registerStudent();
        }
    });

    function registerStudent() {
        $("#student-register").validate({
            rules: {
                'cd-mobile': {
                    required: true,
                    number: true,
                    minlength: 10,
                    maxlength: 10
                }
            },
            submitHandler: function(form) {
                $(form).ajaxSubmit({
                    success: function(responseText, statusText, xhr, $form) {
                        var response = JSON.parse(responseText);

                        UID = (JSON.parse(response[1]).UID) - 1;

                        if (JSON.parse(response[0]).Status === "Success") {
                            // Remove Overlay
                            try {
                                $('#simple-modal-overlay').remove()();
                            } catch (err) {}

                            // Remove Modal
                            try {
                                $('#simple-modal').remove()();
                            } catch (err) {}


                            var SM2 = new SimpleModal({
                                "closeButton": false,
                                "hideFooter": true,
                                "overlayClick": false
                            });
                            SM2.show({
                                "model": "modal",
                                "title": "OTP Verification",
                                "contents": '<form class="cd-form floating-labels" id="student-otp" method="POST" action="student-otp.php" autocomplete="off"> <input autocomplete="false" name="hidden" type="text" style="display:none;"> <fieldset style="margin:10px 0;"> <h4>Please enter the latest 4-digit OTP you have received on your registered mobile address.</h4> <div class="icon"> <label class="cd-label" for="cd-otp">OTP</label> <input class="user" type="number" name="cd-otp" id="cd-otp" required> </div> <input type="text" name="cd-uid" id="cd-uid" style="display:none;"> <div> <input type="submit" value="Verify" id="verify" style="float: left;"> </div> <div> <input type="button" value="Cancel" id="cancel" style="float: left; margin-left:15px;"> </div> </fieldset> <span>If you don\'t receive OTP in 2 minutes click on resend OTP link.</span> <a href="#" style="text-decoration: underline;font-weight: bold;" id="resendOTPStudent">Resend OTP</a></form>'
                            });

                            $('#student-otp #cd-uid').val(UID);

                            if ($('.floating-labels').length > 0) floatLabels();
                            submitOTP();
                        } else {
                            swal({
                                title: "Error!",
                                text: JSON.parse(response[0]).Status,
                                type: "error",
                                animation: false
                            });
                        }
                    }
                });
            }
        });

        $('#student-register #cancel').click(function() {
            // Remove Overlay
            try {
                $('#simple-modal-overlay').remove()();
            } catch (err) {}

            // Remove Modal
            try {
                $('#simple-modal').remove()();
            } catch (err) {}
        });
    }

    function submitOTP() {
        $('#resendOTPStudent').click(function() {
            var uid = $('#student-otp #cd-uid').val();
            $.ajax({
                type: "POST",
                url: "resend-student-otp.php",
                data: {
                    'uid': uid
                },
                success: function(responseText, statusText, xhr) {
                    swal({
                        title: "Success!",
                        text: "OPT Resend Successful",
                        type: "success",
                        animation: false
                    });
                }
            });
        });

        $("#student-otp").validate({
            rules: {
                'cd-otp': {
                    required: true,
                    number: true,
                    minlength: 4,
                    maxlength: 4
                }
            },
            submitHandler: function(form) {
                $(form).ajaxSubmit({
                    success: function(responseText, statusText, xhr, $form) {
                        // console.log(responseText, statusText, xhr);
                        if (responseText === "P" && statusText === "success") {
                            // Remove Overlay
                            try {
                                $('#simple-modal-overlay').remove()();
                            } catch (err) {}

                            // Remove Modal
                            try {
                                $('#simple-modal').remove()();
                            } catch (err) {}

                            createCookie(Math.floor((Math.random() * 1000000) + 1), 365);
                            viewMore(itemUID);
                        } else {
                            swal({
                                title: "Error!",
                                text: "Incorrect OTP.",
                                type: "error",
                                animation: false
                            });
                        }
                    }
                });
            }
        });

        $('#student-otp #cancel').click(function() {
            // Remove Overlay
            try {
                $('#simple-modal-overlay').remove()();
            } catch (err) {}

            // Remove Modal
            try {
                $('#simple-modal').remove()();
            } catch (err) {}
        });
    }

    function viewMore(uid) {
        $.ajax({
            type: "POST",
            url: "viewmore-data.php",
            data: {
                'uid': uid
            },
            success: function(responseText, statusText, xhr) {
                if (isValid(responseText)) {
                    var detail = JSON.parse(responseText)[0];
                    // console.log(detail);
                    if (isValid(detail)) {
                        // Remove Overlay
                        try {
                            $('#simple-modal-overlay').remove()();
                        } catch (err) {}

                        // Remove Modal
                        try {
                            $('#simple-modal').remove()();
                        } catch (err) {}

                        var SM3 = new SimpleModal({
                            "closeButton": false,
                            "hideFooter": true,
                            "overlayClick": false
                        });
                        SM3.show({
                            "model": "modal",
                            "title": detail.name,
                            "contents": "<div id='details'> <div class='container-fluid'> <div class='row'> <div class='col-xs-6' style=''> <div class='row'> <div class='col-xs-12' style=''><span class='modal-label'>Contact: </span><a href='#' id='mobile-link'><span id='mobile'></span></a></div></div><div class='row'> <div class='col-xs-12' style=''><span class='modal-label'>Area: </span><span id='area'></span></div></div></div><div class='col-xs-6' style='text-align: right;'><span class='modal-label'>Address: </span><span id='address'></span></div></div><div class='row'> <div class='col-xs-12' style=''> <hr> </div></div><div class='row'> <div class='col-xs-6' style=''><span class='modal-label'>Skill: </span><span id='skill'></span></div><div class='col-xs-6' style='text-align: right;'><span class='modal-label'>Stream: </span><span id='stream'></span></div></div><div class='row'> <div class='col-xs-12' style=''><span class='modal-label'>Board: </span><span id='board'></span></div></div><div class='row'> <div class='col-xs-12' style=''><span class='modal-label'>Class: </span><span id='class'></span></div></div><div class='row'> <div class='col-xs-12' style=''><span class='modal-label'>Subject: </span><span id='subject'></span></div></div><div class='row'> <div class='col-xs-12' style=''> <hr> </div></div><div class='row'> <div class='col-xs-12' style=''><span class='modal-label'>Mode of Teaching: </span><span id='mode'></span></div></div><div class='row'> <div class='col-xs-12' style=''><input type='button' value='Cancel' id='cancel' style=''></div></div></div></div>"
                        });

                        $('#details #cancel').click(function() {
                            // Remove Overlay
                            try {
                                $('#simple-modal-overlay').remove()();
                            } catch (err) {}

                            // Remove Modal
                            try {
                                $('#simple-modal').remove()();
                            } catch (err) {}
                        });

                        $('#details #mobile').text(detail.mobile_number);
                        $('#details #mobile-link').attr('href', 'tel:+91' + detail.mobile_number);
                        $('#details #area').text(detail.area);
                        $('#details #address').text(detail.address);
                        $('#details #skill').text(detail.skill);
                        $('#details #stream').text(detail.stream);
                        $('#details #board').text(detail.board);
                        $('#details #class').text(detail.class);
                        $('#details #subject').text(detail.subject);
                        $('#details #mode').text(detail.mode);
                    }
                }
            }
        });
    }

    $(document).on('click', '#btn-search', function() {
        var param = $('#cd-search').val();

        $.ajax({
            type: "POST",
            url: "search.php",
            data: {
                'searchType': 'all',
                'searchVal': param
            },
            success: function(responseText, statusText, xhr) {
                if (isValid(responseText)) {
                    // console.log(JSON.parse(responseText));
                    insertItems(JSON.parse(responseText));
                }
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
                if (isValid(responseText)) {
                    // console.log(JSON.parse(responseText));
                    insertItems(JSON.parse(responseText));
                }
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

    $(document).on('click', '.c-class', function(el) {
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
                if (isValid(responseText)) {
                    // console.log(JSON.parse(responseText));
                    insertItems(JSON.parse(responseText));
                }
            }
        });

        if (isAnimating) {
            return false;
        }

        animcursor.animation = 1;
        animcursor.currentPage = 1;
        animcursor.nextPage = 3;

        nextPage(animcursor);
    });

    $(document).on('click', '.c-stream', function(el) {
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
                if (isValid(responseText)) {
                    // console.log(JSON.parse(responseText));
                    insertItems(JSON.parse(responseText));
                }
            }
        });

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

    // Fill Scroller

    var insertItems = function(items) {
        // console.log(items.length);
        content.empty();

        for (var i = 0; i < items.length; i++) {

            var row = document.createElement("div");
            row.className = "rowData";
            row.style.backgroundColor = i % 2 > 0 ? "#ddd" : "";
            var teacherName = items[i].name;
            // var data = "<div><span>Teacher name " + i + "</span><button class='btn btn-info' type='button'>Contact</button></div>";
            var data = "<div id='listData'><div id='name'>" + teacherName + "</div><div id='viewmore'><i class='fa fa-plus-square-o' data-uid='" + items[i].uid + "'></i></div></div>";
            row.innerHTML = data;

            content.appendChild(row);
        }

        // Update Scroller dimensions for changed content
        scroller.setDimensions(container.clientWidth, container.clientHeight, content.offsetWidth, content.offsetHeight + 15);

    };

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
