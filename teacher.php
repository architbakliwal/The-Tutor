<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="">
<!--<![endif]-->

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>The Tutor</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/bootstrap_new.css">
    <link rel="stylesheet" type="text/css" href="css/component.css" />
    <link rel="stylesheet" type="text/css" href="css/animations.css" />
    <link rel="stylesheet" href="css/main.css">
    <script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
</head>

<body>
    <?php include dirname( __FILE__ ).'/config.php'; ?>
        <div id="pt-main" class="pt-perspective">
            <div class="pt-page pt-page-1">
                <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
                <!-- Main jumbotron for a primary marketing message or call to action -->
                <nav class="top-bar">
                    <div class="register"><a href="index.php">Do a search</a></div>
                </nav>
                <div class="container">
                    <div class="jumbotron">
                        <div class="container">
                            <h1>The Tutor!</h1>
                        </div>
                    </div>
                    <!-- Example row of columns -->
                    <div class="row">
                        <div class="col-md-12">
                            <form class="cd-form floating-labels" id="teacher-form" method="POST" action="teacher-processor.php" autocomplete="off">
                                <input autocomplete="false" name="hidden" type="text" style="display:none;">
                                <fieldset>
                                    <legend>Personal Info</legend>
                                    <div class="icon">
                                        <label class="cd-label" for="cd-name">Name</label>
                                        <input class="user" type="text" name="cd-name" id="cd-name" required>
                                    </div>
                                    <div>
                                        <h4>What do you teach?</h4>
                                        <p class="cd-select icon">
                                            <select class="skill" id="cd-skill" name="cd-skill" required>
                                                <option value="">Select..</option>
                                                <option value="school">School</option>
                                                <option value="college">College</option>
                                                <option value="guitar">Guitar</option>
                                                <option value="dance">Dance</option>
                                            </select>
                                        </p>
                                    </div>
                                    <div class="icon" id="div-board" hidden>
                                        <label class="cd-label" for="cd-board">Board</label>
                                        <input class="board" type="text" name="cd-board" id="cd-board">
                                    </div>
                                    <div id="div-stream" hidden>
                                        <h4>Stream</h4>
                                        <p class="cd-select icon">
                                            <select class="stream" id="cd-stream" name="cd-stream" required>
                                                <option value="">Select..</option>
                                                <option value="arts">Arts</option>
                                                <option value="commerce">Commerce</option>
                                                <option value="science">Science</option>
                                                <option value="law">Law</option>
                                            </select>
                                        </p>
                                    </div>
                                    <div id="div-school-class" hidden>
                                        <h4>Class</h4>
                                        <ul class="cd-form-list">
                                            <li>
                                                <input type="checkbox" name="school-class[]" value="class 1" id="cd-checkbox1">
                                                <label for="cd-checkbox1">1</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" name="school-class[]" value="class 2" id="cd-checkbox2">
                                                <label for="cd-checkbox2">2</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" name="school-class[]" value="class 3" id="cd-checkbox3">
                                                <label for="cd-checkbox3">3</label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="icon" id="div-college-class" hidden>
                                        <label class="cd-label" for="cd-college-class">Class</label>
                                        <input class="class" type="text" name="cd-college-class" id="cd-college-class">
                                    </div>
                                    <div class="icon">
                                        <label class="cd-label" for="cd-subject">Subject (optional)</label>
                                        <input class="subject" type="text" name="cd-subject" id="cd-subject">
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend>Location</legend>
                                    <div class="icon">
                                        <label class="cd-label" for="cd-address">Address</label>
                                        <input class="address" type="text" name="cd-address" id="cd-address" required>
                                    </div>
                                    <div class="icon">
                                        <label class="cd-label" for="cd-area">Area of teaching</label>
                                        <input class="area" type="text" name="cd-area" id="cd-area" required>
                                    </div>
                                    <div class="icon">
                                        <label class="cd-label" for="cd-mobile">Mobile Number</label>
                                        <input class="mobile" type="text" name="cd-mobile" id="cd-mobile" required>
                                    </div>
                                    <input type="text" name="cd-latitude" id="cd-latitude" style="display:none">
                                    <input type="text" name="cd-longitude" id="cd-longitude" style="display:none">
                                </fieldset>
                                <fieldset>
                                    <div>
                                        <legend>Additional Info</legend>
                                        <h4>Mode of teaching?</h4>
                                        <ul class="cd-form-list">
                                            <li>
                                                <input type="radio" name="radio-mode" value="private tutor" id="cd-radio-1">
                                                <label for="cd-radio-1">Private Tutor</label>
                                            </li>
                                            <li>
                                                <input type="radio" name="radio-mode" value="classes" id="cd-radio-2">
                                                <label for="cd-radio-2">Classes</label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="icon">
                                        <label class="cd-label" for="cd-education">Education Qualifications</label>
                                        <textarea class="message" name="cd-education" id="cd-education"></textarea>
                                    </div>
                                    <div class="icon">
                                        <label class="cd-label" for="cd-experience">Experience</label>
                                        <textarea class="message" name="cd-experience" id="cd-experience"></textarea>
                                    </div>
                                    <div>
                                        <input type="submit" value="Submit" id="save-teacher">
                                    </div>
                                </fieldset>
                            </form>
                            <div id="map" class="gmap3"></div>
                        </div>
                    </div>
                    <hr>
                    <footer>
                        <p>
                            <span>&copy; thetutor.in <?php echo $year ?></span>
                            <span style="float:right"><a href="terms.php">Terms & Conditions</a></span>
                        </p>
                    </footer>
                </div>
                <!-- /container -->
            </div>
        </div>
        <script src="js/vendor/jquery-1.11.2.min.js"></script>
        <script src="js/vendor/jquery.form.js"></script>
        <script src="js/vendor/jquery.validate.js"></script>
        <script src="js/vendor/jquery-autocomplete.js"></script>
        <script src="http://maps.googleapis.com/maps/api/js?sensor=false" type="text/javascript"></script>
        <script src="js/vendor/gmap3.min.js" type="text/javascript"></script>
        <script src="js/vendor/bootstrap.min.js"></script>
        <script src="js/vendor/pagetransitions.js"></script>
        <script src="js/teacher.js"></script>
        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
        /*(function(b, o, i, l, e, r) { b.GoogleAnalyticsObject = l; b[l] || (b[l] = function() { (b[l].q = b[l].q || []).push(arguments) }); b[l].l = +new Date; e = o.createElement(i); r = o.getElementsByTagName(i)[0]; e.src = '//www.google-analytics.com/analytics.js'; r.parentNode.insertBefore(e, r) }(window, document, 'script', 'ga')); ga('create', 'UA-XXXXX-X', 'auto'); ga('send', 'pageview');
         */
        </script>
</body>

</html>
