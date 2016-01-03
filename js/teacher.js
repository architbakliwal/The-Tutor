jQuery(document).ready(function($) {

    var UID;

    function isValid(object) {
        if (object === undefined || object === null || object.length === 0) {
            return false;
        } else {
            return true;
        }
    }

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

    $('#teacher-form #cd-skill').on('change', function() {
        var skill = $(this).val();
        if (skill === "school") {
            $("#teacher-form #div-board").show();
            $("#teacher-form #cd-board").attr("required", true);

            $("#teacher-form #div-school-class").show();
            $("#teacher-form #cd-school-class").attr("required", true);

            $("#teacher-form #div-college-class").hide();
            $("#teacher-form #cd-college-class").attr("required", false);

            $("#teacher-form #div-stream").hide();
            $("#teacher-form #cd-stream").attr("required", false);
        } else if (skill === "college") {
            $("#teacher-form #div-board").hide();
            $("#teacher-form #cd-board").attr("required", false);

            $("#teacher-form #div-school-class").hide();
            $("#teacher-form #cd-school-class").attr("required", false);

            $("#teacher-form #div-college-class").show();
            $("#teacher-form #cd-college-class").attr("required", true);

            $("#teacher-form #div-stream").show();
            $("#teacher-form #cd-stream").attr("required", true);
        } else {
            $("#teacher-form #div-board").hide();
            $("#teacher-form #cd-board").attr("required", false);

            $("#teacher-form #div-school-class").hide();
            $("#teacher-form #cd-school-class").attr("required", false);

            $("#teacher-form #div-college-class").hide();
            $("#teacher-form #cd-college-class").attr("required", false);

            $("#teacher-form #div-stream").hide();
            $("#teacher-form #cd-stream").attr("required", false);
        }
    });

    $("#teacher-form").validate({
        rules: {
            'cd-mobile': {
                required: true,
                number: true,
                minlength: 10,
                maxlength: 10
            }
        },
        submitHandler: function(form) {
            var skill = $('#cd-skill').val();
            if (skill === "school") {
                if ($('input[name="school-class[]"]:checked').length === 0) {
                    swal({
                        title: "Error!",
                        text: "Please select atleast one Class which you teach",
                        type: "error",
                        animation: false
                    });
                    return false;
                }
            }
            if (!isValid($('input[name="radio-mode"]:checked').val())) {
                swal({
                    title: "Error!",
                    text: "Teaching mode is a required field",
                    type: "error",
                    animation: false
                });
                return false;
            }
            var addr = $('#cd-address').val();
            if (!addr || !addr.length) return;
            $("#map").gmap3({
                getlatlng: {
                    address: addr,
                    callback: function(results) {
                        if (!results) return;
                        $('#cd-latitude').val(results[0].geometry.location.lat());
                        $('#cd-longitude').val(results[0].geometry.location.lng());
                    }
                }
            });
            $(form).ajaxSubmit({
                success: function(responseText, statusText, xhr, $form) {
                    var response = JSON.parse(responseText);
                    // console.log(response);
                    // console.log(JSON.parse(response[0]));
                    // console.log(JSON.parse(response[1]));
                    // console.log(JSON.parse(response[1]).UID);

                    UID = (JSON.parse(response[1]).UID) - 1;
                    // console.log(UID);
                    if (JSON.parse(response[0]).Status === "Success") {
                        var SM = new SimpleModal({
                            "closeButton": false,
                            "hideFooter": true,
                            "overlayClick": false
                        });
                        SM.show({
                            "model": "modal",
                            "title": "OTP Verification",
                            "contents": '<form class="cd-form floating-labels" id="teacher-otp" method="POST" action="teacher-otp.php" autocomplete="off"> <input autocomplete="false" name="hidden" type="text" style="display:none;"> <fieldset style="margin:10px 0;"> <h4>Please enter the latest 4-digit OTP you have received on your registered mobile address.</h4> <div class="icon"> <label class="cd-label" for="cd-otp">OTP</label> <input class="user" type="number" name="cd-otp" id="cd-otp" required> </div> <input type="text" name="cd-uid" id="cd-uid" style="display:none;"> <div> <input type="submit" value="Verify" id="verify" style="float: left;"> </div> </fieldset> <span>If you don\'t received OTP in 2 minutes click on resend OTP link.</span> <a href="#" style="text-decoration: underline;font-weight: bold;" id="resendOTP">Resend OTP</a></form>'
                        });

                        $('#cd-uid').val(UID);

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


    $('#save-latlng').click(function() {
        var addr = $('#cd-address').val();
        if (!addr || !addr.length) return;
        $("#map").gmap3({
            getlatlng: {
                address: addr,
                callback: function(results) {
                    if (!results) return;
                    $('#cd-latitude').val(results[0].geometry.location.lat());
                    $('#cd-longitude').val(results[0].geometry.location.lng());
                }
            }
        });
    });

    $("#map").gmap3();

    $("#cd-address").autocomplete({
        source: function() {
            $("#map").gmap3({
                getaddress: {
                    address: $(this).val(),
                    callback: function(results) {
                        if (!results) return;
                        var data = [];
                        $.each(results, function(i, result) {
                            for (var j = 0; j < result.address_components.length; j++) {
                                if (result.address_components[j].short_name == "IN") {
                                    data.push(result);
                                    return;
                                }
                            }
                        });
                        if (data.length) {
                            $('#cd-address').autocomplete('display', data, false);
                        }
                    }
                }
            });
        },
        cb: {
            cast: function(item) {
                return item.formatted_address;
            },
            select: function(item) {
                $('#cd-latitude').val(item.geometry.location.lat());
                $('#cd-longitude').val(item.geometry.location.lng());
            }
        }
    });

    /* OTP Modal */
    $('#modal').click(function() {
        var SM = new SimpleModal({
            "closeButton": false,
            "hideFooter": true,
            "overlayClick": false
        });
        SM.show({
            "model": "modal",
            "title": "OTP Verification",
            "contents": '<form class="cd-form floating-labels" id="teacher-otp" method="POST" action="teacher-otp.php" autocomplete="off"> <input autocomplete="false" name="hidden" type="text" style="display:none;"> <fieldset style="margin:10px 0;"> <h4>Please enter the latest 4-digit OTP you have received on your registered mobile address.</h4> <div class="icon"> <label class="cd-label" for="cd-otp">OTP</label> <input class="user" type="number" name="cd-otp" id="cd-otp" required> </div> <input type="text" name="cd-uid" id="cd-uid" style="display:none;"> <div> <input type="submit" value="Verify" id="verify" style="float: left;"> </div> </fieldset> <span>If you don\'t received OTP in 2 minutes click on resend OTP link.</span> <a href="#" style="text-decoration: underline;font-weight: bold;" id="resendOTP">Resend OTP</a></form>'
        });

        $('#cd-uid').val(UID);

        if ($('.floating-labels').length > 0) floatLabels();
        submitOTP();
    });


    function submitOTP() {
        $('#resendOTP').click(function() {
            var uid = $('#cd-uid').val();
            $.ajax({
                type: "POST",
                url: "resend-otp.php",
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

        $("#teacher-otp").validate({
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
                        if (responseText === "P" && statusText === "success") {
                            swal({
                                title: "Success!",
                                text: "Thank you registering!!",
                                type: "success",
                                animation: false
                            });
                            // Remove Overlay
                            try {
                                $('#simple-modal-overlay').remove()();
                            } catch (err) {}

                            // Remove Modal
                            try {
                                $('#simple-modal').remove()();
                            } catch (err) {}
                            $("#teacher-form")[0].reset();
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
    }
});
