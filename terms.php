<!doctype html>
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
                <div class="register"><a href="index.php">Home</a></div>
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
                        Terms and conditions text here.
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
