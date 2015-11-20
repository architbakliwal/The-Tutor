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
});
