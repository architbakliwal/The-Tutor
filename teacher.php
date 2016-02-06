<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="">
<!--<![endif]-->

<?php include dirname( __FILE__ ).'/header.php'; ?>
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
                            <!-- <h1>The Tutor!</h1> -->
                            <img src="img/logo.png" class="logo-img"/>
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
                                        <ul class="cd-form-list skill-list">
                                            <li>
                                                <input type="checkbox" name="cd-skill[]" value="school" id="cd-skill1">
                                                <label for="cd-skill1">School</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" name="cd-skill[]" value="college" id="cd-skill2">
                                                <label for="cd-skill2">College</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" name="cd-skill[]" value="language" id="cd-skill3">
                                                <label for="cd-skill3">Language</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" name="cd-skill[]" value="computer" id="cd-skill4">
                                                <label for="cd-skill4">Computer</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" name="cd-skill[]" value="dance" id="cd-skill5">
                                                <label for="cd-skill5">Dance</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" name="cd-skill[]" value="music" id="cd-skill6">
                                                <label for="cd-skill6">Music</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" name="cd-skill[]" value="abacus" id="cd-skill7">
                                                <label for="cd-skill7">Abacus</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" name="cd-skill[]" value="calligraphy" id="cd-skill8">
                                                <label for="cd-skill8">Calligraphy</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" name="cd-skill[]" value="karate" id="cd-skill9">
                                                <label for="cd-skill9">Karate</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" name="cd-skill[]" value="ca-cs" id="cd-skill10">
                                                <label for="cd-skill10">CA / CS</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" name="cd-skill[]" value="driving" id="cd-skill11">
                                                <label for="cd-skill11">Driving</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" name="cd-skill[]" value="yoga" id="cd-skill12">
                                                <label for="cd-skill12">Yoga</label>
                                            </li>
                                            <li style="width: 100%">
                                                <input type="checkbox" name="cd-skill[]" value="playgroup" id="cd-skill13">
                                                <label for="cd-skill13">Play Group</label>
                                            </li>
                                            <li style="width: 100%">
                                                <input type="checkbox" name="cd-skill[]" value="law-judiciary" id="cd-skill14">
                                                <label for="cd-skill14">Law / Judiciary</label>
                                            </li>
                                            <li style="width: 100%">
                                                <input type="checkbox" name="cd-skill[]" value="drawing-craft" id="cd-skill15">
                                                <label for="cd-skill15">Drawing / Craft</label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="icon" id="div-board" hidden>
                                        <label class="cd-label" for="cd-board">Board</label>
                                        <input class="board" type="text" name="cd-board" id="cd-board">
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
                                            <li>
                                                <input type="checkbox" name="school-class[]" value="class 4" id="cd-checkbox4">
                                                <label for="cd-checkbox4">4</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" name="school-class[]" value="class 5" id="cd-checkbox5">
                                                <label for="cd-checkbox5">5</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" name="school-class[]" value="class 6" id="cd-checkbox6">
                                                <label for="cd-checkbox6">6</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" name="school-class[]" value="class 7" id="cd-checkbox7">
                                                <label for="cd-checkbox7">7</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" name="school-class[]" value="class 8" id="cd-checkbox8">
                                                <label for="cd-checkbox8">8</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" name="school-class[]" value="class 9" id="cd-checkbox9">
                                                <label for="cd-checkbox9">9</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" name="school-class[]" value="class 10" id="cd-checkbox10">
                                                <label for="cd-checkbox10">10</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" name="school-class[]" value="class 11" id="cd-checkbox11">
                                                <label for="cd-checkbox11">11</label>
                                            </li>
                                            <li>
                                                <input type="checkbox" name="school-class[]" value="class 12" id="cd-checkbox12">
                                                <label for="cd-checkbox12">12</label>
                                            </li>
                                        </ul>
                                    </div>
                                    <div id="div-stream" hidden>
                                        <h4>Stream</h4>
                                        <p class="cd-select icon">
                                            <select class="stream" id="cd-stream" name="cd-stream" required>
                                                <option value="">Select..</option>
                                                <option value="arts">Arts</option>
                                                <option value="commerce">Commerce</option>
                                                <option value="science">Science</option>
                                                <!-- <option value="law">Law</option> -->
                                            </select>
                                        </p>
                                    </div>
                                    <div class="icon" id="div-college-class" hidden>
                                        <label class="cd-label" for="cd-college-class">College class</label>
                                        <input class="class" type="text" name="cd-college-class" id="cd-college-class">
                                    </div>
                                    <div class="icon">
                                        <label class="cd-label" for="cd-subject">Subjects (optional)</label>
                                        <input class="subject" type="text" name="cd-subject" id="cd-subject">
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend>Location</legend>
                                    <div class="icon">
                                        <label class="cd-label" for="cd-address">Address</label>
                                        <input class="address" type="text" name="cd-address" id="cd-address" required>
                                        <h4>For better accuracy please mention PIN code in address.</h4>
                                    </div>

                                    <div class="icon">
                                        <label class="cd-label" for="cd-area">Area</label>
                                        <input class="area" type="text" name="cd-area" id="cd-area" required>
                                        <h4>Landmark / Area of the place where you teach.</h4>
                                    </div>
                                    <div class="icon">
                                        <label class="cd-label" for="cd-mobile">Mobile Number</label>
                                        <input class="mobile" type="text" name="cd-mobile" id="cd-mobile" required>
                                        <h4>10 digits only.</h4>
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
                                        <label class="cd-label" for="cd-education">Education Qualifications (optional)</label>
                                        <textarea class="message" name="cd-education" id="cd-education"></textarea>
                                    </div>
                                    <div class="icon">
                                        <label class="cd-label" for="cd-experience">Experience (optional)</label>
                                        <textarea class="message" name="cd-experience" id="cd-experience"></textarea>
                                    </div>
                                    <div>
                                        <input type="submit" value="Submit" id="save-teacher">
                                    </div>
                                    <!-- <div>
                                        <input type="button" value="Verify" id="modal">
                                    </div> -->
                                </fieldset>
                            </form>
                            <div id="map" class="gmap3"></div>
                        </div>
                    </div>
                    <hr>
                    <?php include 'footer.php'; ?>
                </div>
                <!-- /container -->
            </div>
        </div>
        <script type="text/javascript" src="js/vendor/jquery-1.11.2.min.js"></script>
        <script type="text/javascript" src="js/vendor/mootools-core-1.3.1.js"></script>
        <script type="text/javascript" src="js/vendor/mootools-more-1.3.1.1.js"></script>
        <script type="text/javascript" src="js/vendor/jquery.form.js"></script>
        <script type="text/javascript" src="js/vendor/jquery.validate.js"></script>
        <script type="text/javascript" src="js/vendor/jquery-autocomplete.js"></script>
        <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
        <script type="text/javascript" src="js/vendor/gmap3.min.js"></script>
        <script type="text/javascript" src="js/vendor/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/vendor/sweet-alert.min.js"></script>
        <script type="text/javascript" src="js/vendor/pagetransitions.js"></script>
        <script type="text/javascript" src="js/vendor/simple-modal.js"></script>
        <script type="text/javascript" src="js/teacher.js"></script>
        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
        /*(function(b, o, i, l, e, r) { b.GoogleAnalyticsObject = l; b[l] || (b[l] = function() { (b[l].q = b[l].q || []).push(arguments) }); b[l].l = +new Date; e = o.createElement(i); r = o.getElementsByTagName(i)[0]; e.src = '//www.google-analytics.com/analytics.js'; r.parentNode.insertBefore(e, r) }(window, document, 'script', 'ga')); ga('create', 'UA-XXXXX-X', 'auto'); ga('send', 'pageview');
         */
        </script>
</body>

</html>
