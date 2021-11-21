<!DOCTYPE html>

<html>
<head>
	<title>DML Google Map Plugin for PHP</title>
	<!---JQUERY MUST BE REFERENCED FOR DMLMAP-->
	<!---VIEWPORT is needed to design a responsive page.-->
	<!---If your webpage is already has VIEWPORT and JQUERY references, you can easily skip this part-->
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<script src="//code.jquery.com/jquery-latest.min.js" type="text/javascript"> </script>
	<!---JQUERY REFERENCE ENDS FOR DMLMAP-->
</head>

<body>
	<!-- MAP EDIT DIV STARTS-->
	<!-- THIS CODE LINE IS MANDATORY-->
	<!-- myMap1Edit DIV is important. The value of this div determines that you are admin or not.  -->
	<!-- By default it is 1 now. So, you can play with map as admin  -->
	<!-- But I strongly recommend that yu should bind this value to a login system.  -->
	<!-- You can find a sample page named as SampleLogin.php at the root directory.  -->
	<div id="myMap1Edit" style="display: none;">1</div>
	<!-- MAP EDIT DIV ENDS -->
	<div style="text-align: center;">
					<h2>DML Google Map plugin for PHP</h2>
					<p>This free version of the plugin is designed for installation tests. Most of the features are disabled/removed.</p>
					<p>You can simply activate you map using Google Maps API key, center the map and create new primitive pins on the map.</p>
					<p>
						<a href="https://codecanyon.net/item/dml-google-map-for-php/18859172" target="_blank" class="btn btn-success">Buy Now!</a>
					</p>
				</div>
	<div class="container">
		<!-- INCLUDES DML MAP STARTS-->
		<!-- THESE TWO CODE LINES ARE MANDATORY -->
		<!-- IMPORTANT!!!! Be sure that you entered a valid relative path to the config file -->
		<?php 
				require_once("dmlmap/config.php");
			include(ROOT_PATH . "dmlmap/dmlmap.php");
		?>
		<!-- INCLUDES DML MAP ENDS-->
	</div>
	<br /><br /><br />
	
	<!---BOOTSTRAP REFERENCE STARTS FOR DMLMAP-->
	<link href="//netdna.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.css" rel="stylesheet" />
	<script src="<?php echo BASE_URL; ?>dmlmap/js/bootstrap.min.js"> </script>
	<!-- DML MAP SCRIPTS -->
	<script src="<?php echo BASE_URL; ?>dmlmap/js/dmlmap.js"></script>
	<script src="<?php echo BASE_URL; ?>dmlmap/js/markerclusterer.js"></script>
	<link href="<?php echo BASE_URL; ?>dmlmap/css/bootstrap.css" rel="stylesheet" type="text/css">
	<link href="<?php echo BASE_URL; ?>dmlmap/css/map-icons.css" rel="stylesheet" type="text/css">
</body>
</html>