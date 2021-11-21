<?php
	// 1 - CODEBEHIND STARTS
	// Checks the call type
	$type = $_GET['SaveType'];
	
	$servername = "localhost"; //CHANGE THIS INFORMATION
	$username = "root"; //CHANGE THIS INFORMATION
	$password = "root"; //CHANGE THIS INFORMATION
	$dbname = "dmlmap"; //CHANGE THIS INFORMATION


	$conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	// Runs first on page is loaded.
	if($type == "start"){
		//Checks if the tbldmlmapcontent table exists
		$sql = "SHOW TABLES LIKE 'tbldmlmapcontent'";
		$res = $conn->query($sql);

		if($res->num_rows > 0) {
			// Table is exists. Gets data.
			$url = $_GET['url'];
			$CntID = $_GET['CntID'];
			GetData($url, $CntID);
		} else {
			// Table doesn' exists so creates a new table
			//echo "Status: 0 (Tablo yok)<br />";
			CreateTable ();
		}
		$conn->close();
	} elseif($type == "cmap"){
		$api = $_GET['api'];
		$url = $_GET['url'];
		CreateDefaultMap($api, $url);
	} elseif($type == "gicons"){
		GeticonData();
	} elseif($type == "ins"){
		$myControlID = $_GET['CntID'];
		$myLink = $_GET['p2'];
		$myField1 = $_GET['p3'];
		$myField2 = $_GET['p4'];
		$myField3 = $_GET['p5'];
		$myField4 = $_GET['p6'];
		$myField5 = $_GET['p7'];
		$myField6 = $_GET['p8'];
		$myField7 = $_GET['p9'];
		$myField8 = $_GET['p10'];
		$myField9 = $_GET['p11'];
		insertData($myControlID, $myLink, $myField1, $myField2, $myField3, $myField4, $myField5, $myField6, $myField7, $myField8, $myField9);
	} elseif ($type == "del1"){
		$CntID = $_GET['CntID'];
		DeleteRecord($CntID);
	} elseif ($type == "res"){
		$CntID = $_GET['CntUsrCtrlID'];
		$url = $_GET['url'];
		ResetMap($CntID, $url);
		//SELECT DATA_TYPE FROM information_schema.COLUMNS WHERE TABLE_NAME = 'my_table' AND COLUMN_NAME = 'my_column'
	} elseif ($type == "coltype"){
		CheckChangeColumnType();
	} else {
		if($type == "1") {
			$myCntID = $_GET['CntID'];
			$myField1 = $_GET['myField1'];
            $myDeger1 = $_GET['myDeger1'];
            $sql = "UPDATE tbldmlmapcontent SET $myField1='$myDeger1' WHERE CntID = $myCntID ";
		} elseif($type == "2") {
			$myCntID = $_GET['CntID'];
			$myField1 = $_GET['myField1'];
            $myDeger1 = $_GET['myDeger1'];
            $myField2 = $_GET['myField2'];
            $myDeger2 = $_GET['myDeger2'];
			$sql = "UPDATE tbldmlmapcontent SET $myField1='$myDeger1', $myField2='$myDeger2' WHERE CntID = $myCntID ";
		} elseif($type == "3") {
			$myCntID = $_GET['CntID'];
			$myField1 = $_GET['myField1'];
            $myDeger1 = $_GET['myDeger1'];
            $myField2 = $_GET['myField2'];
            $myDeger2 = $_GET['myDeger2'];
			$myField3 = $_GET['myField3'];
            $myDeger3 = $_GET['myDeger3'];
			$sql = "UPDATE tbldmlmapcontent SET $myField1='$myDeger1', $myField2='$myDeger2', $myField3='$myDeger3' WHERE CntID = $myCntID ";
		} elseif($type == "4") {
			$myCntID = $_GET['CntID'];
			$myField1 = $_GET['myField1'];
            $myDeger1 = $_GET['myDeger1'];
            $myField2 = $_GET['myField2'];
            $myDeger2 = $_GET['myDeger2'];
			$myField3 = $_GET['myField3'];
            $myDeger3 = $_GET['myDeger3'];
			$myField4 = $_GET['myField4'];
            $myDeger4 = $_GET['myDeger4'];
			$sql = "UPDATE tbldmlmapcontent SET $myField1='$myDeger1', $myField2='$myDeger2', $myField3='$myDeger3', $myField4='$myDeger4' WHERE CntID = $myCntID ";
		} elseif($type == "5") {
			$myCntID = $_GET['CntID'];
			$myField1 = $_GET['myField1'];
            $myDeger1 = $_GET['myDeger1'];
            $myField2 = $_GET['myField2'];
            $myDeger2 = $_GET['myDeger2'];
			$myField3 = $_GET['myField3'];
            $myDeger3 = $_GET['myDeger3'];
			$myField4 = $_GET['myField4'];
            $myDeger4 = $_GET['myDeger4'];
			$myField5 = $_GET['myField5'];
            $myDeger5 = $_GET['myDeger5'];
			$sql = "UPDATE tbldmlmapcontent SET $myField1='$myDeger1', $myField2='$myDeger2', $myField3='$myDeger3', $myField4='$myDeger4', $myField5='$myDeger5' WHERE CntID = $myCntID ";
		} elseif($type == "6") {
			$myCntID = $_GET['CntID'];
			$myField1 = $_GET['myField1'];
            $myDeger1 = $_GET['myDeger1'];
            $myField2 = $_GET['myField2'];
            $myDeger2 = $_GET['myDeger2'];
			$myField3 = $_GET['myField3'];
            $myDeger3 = $_GET['myDeger3'];
			$myField4 = $_GET['myField4'];
            $myDeger4 = $_GET['myDeger4'];
			$myField5 = $_GET['myField5'];
            $myDeger5 = $_GET['myDeger5'];
			$myField6 = $_GET['myField6'];
            $myDeger6 = $_GET['myDeger6'];
			$sql = "UPDATE tbldmlmapcontent SET $myField1='$myDeger1', $myField2='$myDeger2', $myField3='$myDeger3', $myField4='$myDeger4', $myField5='$myDeger5', $myField6='$myDeger6' WHERE CntID = $myCntID ";
		} elseif($type == "7") {
			$myCntID = $_GET['CntID'];
			$myField1 = $_GET['myField1'];
            $myDeger1 = $_GET['myDeger1'];
            $myField2 = $_GET['myField2'];
            $myDeger2 = $_GET['myDeger2'];
			$myField3 = $_GET['myField3'];
            $myDeger3 = $_GET['myDeger3'];
			$myField4 = $_GET['myField4'];
            $myDeger4 = $_GET['myDeger4'];
			$myField5 = $_GET['myField5'];
            $myDeger5 = $_GET['myDeger5'];
			$myField6 = $_GET['myField6'];
            $myDeger6 = $_GET['myDeger6'];
			$myField7 = $_GET['myField7'];
            $myDeger7 = $_GET['myDeger7'];
			$sql = "UPDATE tbldmlmapcontent SET $myField1='$myDeger1', $myField2='$myDeger2', $myField3='$myDeger3', $myField4='$myDeger4', $myField5='$myDeger5', $myField6='$myDeger6', $myField7='$myDeger7' WHERE CntID = $myCntID ";
		} elseif($type == "postjson"){
			$myCntID = $_POST['CntID'];
			$myField1 = $_POST['myField1'];
			$myDeger1 = $_POST['myDeger1'];
			$sql = "UPDATE tbldmlmapcontent SET $myField1='$myDeger1' WHERE CntID = $myCntID ";
		} 

		// returns of the update result
		if ($conn->query($sql) === TRUE) {
			echo "Record updated successfully";
		} else {
			echo "Error updating record: " . $conn->error;
		}
		$conn->close();
	}
	
	
	// 2 - ACTION FUNCTIONS
	// 2.1
	//Gets the data
	function GetData($url, $CntID){
		// Create connection
		$conn = new mysqli($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
		// Check connection
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		} 

		$sql = "SELECT * FROM tbldmlmapcontent WHERE CntUsrCtrlID = $CntID AND CntLink = '$url' ";
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
			// There are valid data for current page. So, shows the map
			$array = array();
			while($row = $result->fetch_assoc()) {
				$array[] = $row;
			}
			echo json_encode($array);
		} else {
			// There are no available data for current page. So, shows API panel.
			echo "1";
		}
		$conn->close();
	}
	// 2.2
	// Creates new table
	function CreateTable (){
		$conn = new mysqli($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
		// Check connection
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		} 

		// sql to create table
		$sql = "CREATE TABLE tbldmlmapcontent (
		CntID INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
		CntUsrCtrlID INT(6) NOT NULL,
		CntLink TEXT NOT NULL,
		CntField1 TEXT,
		CntField2 TEXT,
		CntField3 TEXT,
		CntField4 VARCHAR(200),
		CntField5 VARCHAR(200),
		CntField6 VARCHAR(200),
		CntField7 MEDIUMTEXT,
		CntField8 VARCHAR(200),
		CntField9 VARCHAR(200),
		CntField10 VARCHAR(200)
		)";

		if ($conn->query($sql) === TRUE) {
			// There are no available data for current page. So, shows API panel.
			echo "1";
		} else {
			echo "0";
		}

		$conn->close();
	}
	// 2.3
	// Creates Map with default values for current page
	function CreateDefaultMap($api, $url){
		$conn = new mysqli($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
		// Check connection
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		} 
		$fieldlink = $url;
		$field1 = "-37.817564805286814";
		$field2 = "144.9440860748291";
		$field3 = $api;
		$field4 = "650";	
		$field5 = "1";
		$field6 = "0_0_0";
		$field8 = "12";
		$sql = "INSERT INTO tbldmlmapcontent (CntUsrCtrlID, CntLink, CntField1, CntField2, CntField3, CntField4, CntField5, CntField6, CntField8)
		VALUES ('1', '$fieldlink', '$field1', '$field2', '$field3', '$field4', '$field5', '$field6', '$field8')";

		if ($conn->query($sql) === TRUE) {
			echo "New map records created successfully";
		} else {
			echo "Error: " . $sql . "<br>" . $conn->error;
		}
		
	}
	// 2.4 
	// Inserts new record to the database 
	function insertData ($myControlID, $myLink, $myField1, $myField2, $myField3, $myField4, $myField5, $myField6, $myField7, $myField8, $myField9) {
		$conn = new mysqli($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
		// Check connection
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		} 
		
		$sql = "INSERT INTO tbldmlmapcontent (CntUsrCtrlID, CntLink, CntField1, CntField2, CntField3, CntField4, CntField5, CntField6, CntField7, CntField8, CntField9, CntField10)
		VALUES ('$myControlID', '$myLink', '$myField1', '$myField2', '$myField3', '$myField4', '$myField5', '$myField6', '$myField7', '$myField8', '$myField9', '.')";

		if ($conn->query($sql) === TRUE) {
			echo "Content has been added successfully";
		} else {
			echo "Error: " . $sql . "<br>" . $conn->error;
		}
	}
	// 2.5 
	// Deletes one record based on the CntID 
	function DeleteRecord ($CntID) {
		$conn = new mysqli($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
		// Check connection
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		} 
		
		$sql = "DELETE FROM tbldmlmapcontent WHERE CntID = $CntID ";

		if ($conn->query($sql) === TRUE) {
			echo "Content has been deleted successfully";
		} else {
			echo "Error: " . $sql . "<br>" . $conn->error;
		}
	}
	// 2.6 
	// Resets map for current page 
	function ResetMap ($CntID, $url) {
		$conn = new mysqli($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
		// Check connection
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		} 
		
		$sql = "DELETE FROM tbldmlmapcontent WHERE CntUsrCtrlID = $CntID AND CntLink = '$url' ";

		if ($conn->query($sql) === TRUE) {
			echo "Map has been reseted successfully";
		} else {
			echo "Error: " . $sql . "<br>" . $conn->error;
		}
	}
	// 2.7 
	// Checks Column7 data type and change it into TEXT_MIDDLE 
	function CheckChangeColumnType() {
		// Create connection
		$conn = new mysqli($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
		// Check connection
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		} 

		$sql = "SELECT DATA_TYPE FROM information_schema.COLUMNS WHERE TABLE_NAME = 'tbldmlmapcontent' AND COLUMN_NAME = 'CntField7'";
		$result = $conn->query($sql);

		// There are valid data for current page. So, shows the map
			
		$array = array();
		while($row = $result->fetch_assoc()) {
			$array[] = $row;
		}
		
		$myResult;
		$myColumnType = $array[0]['DATA_TYPE'];
		if ( $myColumnType == 'mediumtext' || $myColumnType == 'MEDIUMTEXT' ) {
			// The type of the column is OK. Runs saving data to the database
			$myResult = 1;
		} else {
			$myResult = dmlChangeColumnType();
		}
		echo $myResult;

		$conn->close();
	}
	// 2.8 Change CntField7 column type into mediumtext
	function dmlChangeColumnType () {
		// Create connection
		$conn = new mysqli($GLOBALS['servername'], $GLOBALS['username'], $GLOBALS['password'], $GLOBALS['dbname']);
		// Check connection
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		} 

		$sql = "ALTER TABLE tbldmlmapcontent MODIFY CntField7 MEDIUMTEXT";

		if ($conn->query($sql) === TRUE) {
			echo 1;
		} else {
			echo 0;
		}
		
		$conn->close();
	}

	// 3 - HELPERS
	
	// 3.1 - Common PHP Database FUNCTION 
	function PhpDbCommonFunction($sql, $successtext){
		$conn = new mysqli($servername, $username, $password, $dbname);
		// Check connection
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		} 

		if ($conn->query($sql) === TRUE) {
			echo $successtext;
		} else {
			echo "Error : " . $conn->error;
		}

		$conn->close();
	}
	
	?>