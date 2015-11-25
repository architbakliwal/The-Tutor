jQuery(document).ready(function($) {

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
                    alert('Please select atleast one Class which you teach');
                    return false;
                }
            }
            if (!isValid($('input[name="radio-mode"]:checked').val())) {
                alert('Teaching mode is a required field');
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
                    console.log(statusText);
                }
            });
        }
    });

    /*$("#save-teacher").click(function() {
        jQuery('#teacher-form').ajaxSubmit({
            beforeSubmit: function(p1, p2, p3) {
                console.log(p1, p2, p3);
            },
            success: function(responseText, statusText, xhr, $form) {
                console.log(responseText);
            }
        });
    });
    */

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
        })
        .focus();
});
