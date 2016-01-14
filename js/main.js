jQuery(document).ready(function($) {
    if ($('.floating-labels').length > 0) floatLabels();
    var UID;

    function isValid(object) {
        if (object === undefined || object === null || object.length === 0) {
            return false;
        } else {
            return true;
        }
    }

    $(document).on('click', '#listData #viewmore', function() {
        var cookieVal = readCookie("thetutorregistered");
        if (isValid(cookieVal)) {

        } else {
            var SM1 = new SimpleModal({
                "closeButton": false,
                "hideFooter": true,
                "overlayClick": false
            });
            SM1.show({
                "model": "modal",
                "title": "Verification",
                "contents": '<form class="cd-form floating-labels" id="student-register" method="POST" action="student-processor.php" autocomplete="off"> <input autocomplete="false" name="hidden" type="text" style="display:none;"> <fieldset style="margin:10px 0;"> <h4>Please enter your full name and mobile number for one time registration. An OTP would be sent for verification.</h4> <div class="icon"><label class="cd-label" for="cd-name">Name</label><input class="user" type="text" name="cd-name" id="cd-name" required></div><div class="icon"><label class="cd-label" for="cd-mobile">Mobile Number</label><input class="mobile" type="text" name="cd-mobile" id="cd-mobile" required><h4>10 digits only.</h4></div> <div> <input type="submit" value="Register" id="register" style="float: left;"> </div></fieldset> </form>'
            });
        }
        // createCookie("9920383123", 365);
        console.log(document.cookie);


    });

    function createCookie(value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else var expires = "";
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
                        var SM2 = new SimpleModal({
                            "closeButton": false,
                            "hideFooter": true,
                            "overlayClick": false
                        });
                        SM2.show({
                            "model": "modal",
                            "title": "OTP Verification",
                            "contents": '<form class="cd-form floating-labels" id="student-otp" method="POST" action="student-otp.php" autocomplete="off"> <input autocomplete="false" name="hidden" type="text" style="display:none;"> <fieldset style="margin:10px 0;"> <h4>Please enter the latest 4-digit OTP you have received on your registered mobile address.</h4> <div class="icon"> <label class="cd-label" for="cd-otp">OTP</label> <input class="user" type="number" name="cd-otp" id="cd-otp" required> </div> <input type="text" name="cd-uid" id="cd-uid" style="display:none;"> <div> <input type="submit" value="Verify" id="verify" style="float: left;"> </div> </fieldset> <span>If you don\'t receive OTP in 2 minutes click on resend OTP link.</span> <a href="#" style="text-decoration: underline;font-weight: bold;" id="resendOTPStudent">Resend OTP</a></form>'
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



    // Fill Scroller

    var insertItems = function() {

        for (var i = 0; i < 25; i++) {

            var row = document.createElement("div");
            row.className = "rowData";
            row.style.backgroundColor = i % 2 > 0 ? "#ddd" : "";
            // var data = "<div><span>Teacher name " + i + "</span><button class='btn btn-info' type='button'>Contact</button></div>";
            var data = "<div id='listData'><div id='name'>Teacher name " + i + "</div><div id='viewmore'><i class='fa fa-plus-square-o'></i></div></div>";
            row.innerHTML = data;

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
