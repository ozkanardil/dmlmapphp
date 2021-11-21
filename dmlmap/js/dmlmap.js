
// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
var map;
var markers = []; //It's core array and used to locate markers on the map
var DbMarkers = []; //It's temporary array and used to clear all db markers on the map
var MarkerArr = [];
var myArr = [];
var DbStatus = 0;
var dmlApiStatus = 0;

var dmlServer = document.location.protocol + "//" + document.location.host;
var infoWinimagePath = dmlServer + '/dmlmap/images/';

// Variables for distance between two points
var dmlDistLocation1_lat;
var dmlDistLocation1_lng;
var dmlDistLocation2_lat;
var dmlDistLocation2_lng;
var dmlDistStatus = 0;
var directionsDisplay; //will be used to clear distance route
var dmlDistmarker1; //will be used to clear distance marker1
var dmlDistmarker2; //will be used to clear distance marker2
var dmlDistline; //will be used to clear distance straight line
var newMarker = ""; //will be used to clear temporary marker

var inherits = function (childCtor, parentCtor) {
	/** @constructor */
	function tempCtor() { };
	tempCtor.prototype = parentCtor.prototype;
	childCtor.superClass_ = parentCtor.prototype;
	childCtor.prototype = new tempCtor();
	childCtor.prototype.constructor = childCtor;
};

$(document).ready(function () {
	var myLocation = $(location).attr('href');
	CallHandler(myLocation);
	if ($("#myMap1Edit").html() == 1) {
		var DmlSupportLinks = '<a href="https://codecanyon.net/item/dml-google-map-for-php/18859172" target="blank">Buy PRO Version</a> | <a href="https://dotnetsite.site/documentation/dmlmapphp/documentation.html" target="blank">Documentation</a> | <a href="https://codecanyon.net/user/ard-soft" target="blank">Support</a>';
		$("#dmlsupportbuttons").html( DmlSupportLinks );
	} else {
		$("#dmlsupportbuttons").html();
	}

	// End of Document Ready

});

//****GET DATA AJAX START
function CallHandler(myLocation) {
	myArr = [];
	var mySaveString = dmlServer + "/dmlmap/dmlmapfunctions.php?SaveType=start&url=" + myLocation + "&CntID=1";
	var savecenter = {};
	savecenter.url = mySaveString;
	savecenter.type = "POST";
	savecenter.data = {};
	savecenter.cache = false;
	savecenter.processData = false;
	savecenter.success = function (result) {
		if (result == 1) {
			// There is table without data. So, shows API panel
			$("#dmlMapContainer").hide();
			$("#dmlApiDiv").show();
		} else if (result == 0) {
			alert("Unknown error");
		} else {
			myArr = $.parseJSON(result);
			console.log(myArr);
			var myLenght = myArr.length;
			if (myLenght == 0) {
				// There is table without data. So, shows API panel
				$("#dmlMapContainer").hide();
				$("#dmlApiDiv").show();
			} else {
				if (dmlApiStatus == 0) {
					LoadDmlMapApi(myArr[0].CntField3);
				} else {
					dmlLoadMap();
				}

				$("#dmlMapContainer").show();
				$("#dmlApiDiv").hide();
			}
		}
	};
	savecenter.error = function (err) { alert(err.statusText); };
	$.ajax(savecenter);
	event.preventDefault();
}
function LoadDmlMapApi(myApi) {
	var script = document.createElement("script");
	script.src = "https://maps.googleapis.com/maps/api/js?key=" + myApi + "&libraries=drawing&callback=dmlLoadMap";
	script.id = "dmlMapApi";
	//script.type = "text/javascript";
	document.getElementsByTagName("head")[0].appendChild(script);
	dmlApiStatus = 1;
}
function dmlLoadMap() {
	var myMapType = myArr[0].CntField5;
	if (myMapType == "1" || myMapType == "2" || myMapType == "3") {
		initMap(myMapType);
	} else {
		loadJSON2(myMapType);
	}
}
function loadJSON2(myStyleNu) {
	if (myStyleNu == 0) {
		var myStyleCode = myArr[0].CntField7;
		try {
			var c = $.parseJSON(myStyleCode);
			initMap(myStyleCode);
		}
		catch (err) {
			alert('Please reload the map. If you continue receiving this message, please refer to the documentation');
			initMap(1);
		}
		//initMap(myStyleCode);
	} else {
		var myStyleFile = dmlServer + "/dmlmap/styles/style" + myStyleNu + ".json";
		var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
		xobj.open('GET', myStyleFile, true); // Replace 'my_data' with the path to your file
		xobj.onreadystatechange = function () {
			if (xobj.readyState == 4 && xobj.status == "200") {
				initMap(xobj.responseText);
			}
		};
		xobj.send(null);
	}
}
function initMap(myStyle) {
	if (DbStatus == 0) {
		$("#map").attr('style', 'width: 100%; height: ' + myArr[0].CntField4 + 'px; margin: 0; padding: 0;');
		var haightAshbury = { lat: parseFloat(myArr[0].CntField1), lng: parseFloat(myArr[0].CntField2) };


		if (myStyle == "1" || myStyle == "2" || myStyle == "3") {
			map = new google.maps.Map(document.getElementById('map'), {
				zoom: parseInt(myArr[0].CntField8),
				center: haightAshbury,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
			});

			// Determines map type
			if (myStyle == "1") {
				//Displays a normal, default 2D map
				map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
			} else if (myStyle == "2") {
				//Displays a photographic map
				map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
			} else if (myStyle == "3") {
				//Displays a map with mountains, rivers, etc.
				map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
			}
		} else {
			map = new google.maps.Map(document.getElementById('map'), {
				zoom: parseInt(myArr[0].CntField8),
				center: haightAshbury,
				styles: JSON.parse(myStyle),
			});
		}

		DbStatus = 1;

		map.addListener('click', function (event) {
			addMarker(event.latLng);
		});

		// This event listener will call addMarker() when the map is clicked.
		if ($("#myMap1Edit").html() == 1) {

			$("#dmlmapaddressbar").show();

			document.getElementById('dmlmapSubmitAddress').addEventListener('click', function () {
				dml_Find_From_Address();
			});

		

		}

		//FILLING MAPHOLDER_ID
		$("#Map1idHolder").html(myArr[0].CntID + '_0_7_' + myArr[0].CntField3 + '_' + myArr[0].CntField4 + '_' + myArr[0].CntField5 + '_' + myArr[0].CntField6 + '_' + myArr[0].CntField8);

		//CLICK ON THE MAP WHEN LOGGEDIN
		google.maps.event.addListener(map, 'click', function (e) {
			$("#LblSonuc").html("");
			if ($("#myMap1Edit").html() == 1) {
				myDeger1 = e.latLng.lat();
				myDeger2 = e.latLng.lng();
				$("#Text1").val(myDeger1);
				$("#Text2").val(myDeger2);


				var position = $("#Repeater1Map").position();

				var y1 = position.top + 32;
				var x1 = position.left + 208;
				$("#BtnSettings").css({ position: "absolute", top: y1 + "px", left: x1 + "px" }).show();
				var y2 = position.top + 44;
				var x2 = position.left + 64;
				$("#BtnDmlMapRefresh").css({ position: "absolute", top: y2 + "px", left: x2 + "px" }).show();

				$("#idholder").html(myArr[0].CntID + "_0_7");
			}
		});
	}

	var dmlLayerStatusArr = [];
	dmlLayerStatusArr = myArr[0].CntField6.split("_");

	// Traffic layer activation
	if (dmlLayerStatusArr[0] == 1) {
		var trafficLayer = new google.maps.TrafficLayer();
		trafficLayer.setMap(map);
	}

	// Transit layer activation
	if (dmlLayerStatusArr[1] == 1) {
		var transitLayer = new google.maps.TransitLayer();
		transitLayer.setMap(map);
	}

	// Bicycle layer activation
	if (dmlLayerStatusArr[2] == 1) {
		var bikeLayer = new google.maps.BicyclingLayer();
		bikeLayer.setMap(map);
	}

	// Adds a markers and shaoes on the map.
	dml_add_Cluster_Markers();
}


function Marker(options) {
	google.maps.Marker.apply(this, arguments);

	if (options.map_icon_label) {
		this.MarkerLabel = new MarkerLabel({
			map: this.map,
			marker: this,
			text: options.map_icon_label
		});
		this.MarkerLabel.bindTo('position', this, 'position');
	}
}
// 3.2 - Custom Marker SetMap
Marker.prototype.setMap = function () {
	google.maps.Marker.prototype.setMap.apply(this, arguments);
	(this.MarkerLabel) && this.MarkerLabel.setMap.apply(this.MarkerLabel, arguments);
};
// 3.3 - Marker Label Overlay
var MarkerLabel = function (options) {
	var self = this;
	this.setValues(options);

	// Create the label container
	this.div = document.createElement('div');
	this.div.className = 'map-icon-label';

	// Trigger the marker click handler if clicking on the label
	google.maps.event.addDomListener(this.div, 'click', function (e) {
		(e.stopPropagation) && e.stopPropagation();
		google.maps.event.trigger(self.marker, 'click');
	});
};
function dml_add_Cluster_Markers() {
	var infowindow = new google.maps.InfoWindow({});
	var marker, i;
	var imagePath = dmlServer + '/dmlmap/icons/';

	var dmlClusterArr = [];

	// Apply the inheritance
	inherits(Marker, google.maps.Marker);

	// Create MarkerLabel Object
	MarkerLabel.prototype = new google.maps.OverlayView;

	// Marker Label onAdd
	MarkerLabel.prototype.onAdd = function () {
		var pane = this.getPanes().overlayImage.appendChild(this.div);
		var self = this;

		this.listeners = [
			google.maps.event.addListener(this, 'position_changed', function () { self.draw(); }),
			google.maps.event.addListener(this, 'text_changed', function () { self.draw(); }),
			google.maps.event.addListener(this, 'zindex_changed', function () { self.draw(); })
		];
	};

	// Marker Label onRemove
	MarkerLabel.prototype.onRemove = function () {
		this.div.parentNode.removeChild(this.div);

		for (var i = 0, I = this.listeners.length; i < I; ++i) {
			google.maps.event.removeListener(this.listeners[i]);
		}
	};

	// Implement draw
	MarkerLabel.prototype.draw = function () {
		var projection = this.getProjection();
		var position = projection.fromLatLngToDivPixel(this.get('position'));
		var div = this.div;

		this.div.innerHTML = this.get('text').toString();

		div.style.zIndex = this.get('zIndex'); // Allow label to overlay marker
		div.style.position = 'absolute';
		div.style.display = 'block';
		div.style.left = (position.x - (div.offsetWidth / 2)) + 'px';
		div.style.top = (position.y - div.offsetHeight) + 'px';

	};

	for (var i = 0; i < myArr.length; i++) {
		if (myArr[i].CntField5 == "M") {
			dmlClusterArr.push({
				CntID: myArr[i].CntID,
				CntField1: myArr[i].CntField1,
				CntField2: myArr[i].CntField2,
				CntField3: myArr[i].CntField3,
				CntField4: myArr[i].CntField4,
				CntField6: myArr[i].CntField6,
				CntField7: myArr[i].CntField7,
				CntField8: myArr[i].CntField8,
				CntField9: myArr[i].CntField9,
				CntField10: myArr[i].CntField10
			});
		}
	}
	var markers = dmlClusterArr.map(function (location, i) {

		if (dmlClusterArr[i].CntField6 < 200) {
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(dmlClusterArr[i].CntField1, dmlClusterArr[i].CntField2),
				map: map,
				icon: imagePath + dmlClusterArr[i].CntField6 + ".png"
			});
		} else {

			MarkerArr = dmlClusterArr[i].CntField6.split("_");
			marker = new Marker({
				map: map,
				position: new google.maps.LatLng(dmlClusterArr[i].CntField1, dmlClusterArr[i].CntField2),
				icon: {
					path: dml_Container_Path(MarkerArr[1]),
					fillColor: '#' + MarkerArr[2],
					fillOpacity: 1,
					strokeColor: '',
					strokeWeight: 0
				},
				map_icon_label: '<span id="' + dmlClusterArr[i].CntID + '_Label" class="map-icon i' + MarkerArr[0] + '"></span>'
			});
		}

		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				if (jQuery("#myMap1Edit").html() == 1) {

					infowindow.setContent('<strong><span id="' + dmlClusterArr[i].CntID + '_H">' + dmlClusterArr[i].CntField3 + '</span></strong>' + dmlWriteInfoImageHelper(dmlClusterArr[i].CntID, dmlClusterArr[i].CntField7) + dmlWriteInfoVideoHelper(dmlClusterArr[i].CntID, dmlClusterArr[i].CntField10) + '<div id="' + dmlClusterArr[i].CntID + '_D" style="width:250px;">' + dmlClusterArr[i].CntField4 + '</div>' + dmlWriteInfoLink(dmlClusterArr[i].CntID, dmlClusterArr[i].CntField8, dmlClusterArr[i].CntField9) + '<br><div onclick="EditMarkerDescription(' + dmlClusterArr[i].CntID + ');" class="button btn btn-success btn-sm fontawesome-pencil"></div><div onclick="DeleteDbMarker(' + dmlClusterArr[i].CntID + ', 1);" class="btn btn-danger btn-sm fontawesome-trash" style="margin-left:2px;"></div><div onclick="FillMarkerSettings(' + dmlClusterArr[i].CntID + ', \'' + dmlClusterArr[i].CntField6 + '\');" class="btn btn-primary btn-sm fontawesome-picture" style="margin-left:2px;"></div><div class="btn btn-default btn-sm" style="display:none;"><span class="badge">' + dmlClusterArr[i].CntID + '</span></div><br /><div class="dmlselectdistancediv" style="color: blue; text-decoration: underline; cursor: pointer;"  onclick="dml_add_for_distance(' + dmlClusterArr[i].CntField1 + ', ' + dmlClusterArr[i].CntField2 + ');">Calculate distance</div>');

				} else {
					infowindow.setContent('<strong>' + dmlClusterArr[i].CntField3 + '</strong>' + dmlWriteInfoImageHelper(dmlClusterArr[i].CntID, dmlClusterArr[i].CntField7) + dmlWriteInfoVideoHelper(dmlClusterArr[i].CntID, dmlClusterArr[i].CntField10) + '<div style="width: 250px;">' + dmlClusterArr[i].CntField4 + '</div>' + dmlWriteInfoLink(dmlClusterArr[i].CntID, dmlClusterArr[i].CntField8, dmlClusterArr[i].CntField9) + '');
				}
				infowindow.open(map, marker);
			}
		})(marker, i));

		DbMarkers.push(marker);

		return marker;
	});

	var clusterStyles = [
		{
			textColor: 'black',
			url: dmlServer + '/dmlmap/icons/m1.png',
			height: 52,
			width: 53,
			textSize: 12
		},
		{
			textColor: 'black',
			url: dmlServer + '/dmlmap/icons/m2.png',
			height: 56,
			width: 55,
			textSize: 12
		},
		{
			textColor: 'black',
			url: dmlServer + '/dmlmap/icons/m3.png',
			height: 66,
			width: 65,
			textSize: 12
		}
	];
	var mcOptions = {
		gridSize: 50,
		styles: clusterStyles,
		maxZoom: 15
	};
	var markerCluster = new MarkerClusterer(map, markers, mcOptions);

	google.maps.event.addListener(map, "idle", function () {
		var myCount = 0;
		var myMarkerID;
		for (var i = 0; i < markers.length; i++) {
			var mrkr = markers[i];
			if (mrkr.getMap() != null) {
				//myCount++;
			}
			else {
				myCount++;
				myMarkerID = myMarkerID + '_' + dmlClusterArr[i].CntID;
				jQuery('#' + dmlClusterArr[i].CntID + '_Label').hide();
			}
		}
	});
}
function dml_Container_Path(myContainerName) {
	var myPath;
	//if (myContainerName == 'DmlMarkerSquarePin') {
	if (myContainerName == 191) {
		// 191 Marker Pin
		myPath = 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z';
	} else if (myContainerName == 192) {
		// 192 Square Pin
		myPath = 'M22-48h-44v43h16l6 5 6-5h16z';
	} else if (myContainerName == 193) {
		// 193 Shield
		myPath = 'M18.8-31.8c.3-3.4 1.3-6.6 3.2-9.5l-7-6.7c-2.2 1.8-4.8 2.8-7.6 3-2.6.2-5.1-.2-7.5-1.4-2.4 1.1-4.9 1.6-7.5 1.4-2.7-.2-5.1-1.1-7.3-2.7l-7.1 6.7c1.7 2.9 2.7 6 2.9 9.2.1 1.5-.3 3.5-1.3 6.1-.5 1.5-.9 2.7-1.2 3.8-.2 1-.4 1.9-.5 2.5 0 2.8.8 5.3 2.5 7.5 1.3 1.6 3.5 3.4 6.5 5.4 3.3 1.6 5.8 2.6 7.6 3.1.5.2 1 .4 1.5.7l1.5.6c1.2.7 2 1.4 2.4 2.1.5-.8 1.3-1.5 2.4-2.1.7-.3 1.3-.5 1.9-.8.5-.2.9-.4 1.1-.5.4-.1.9-.3 1.5-.6.6-.2 1.3-.5 2.2-.8 1.7-.6 3-1.1 3.8-1.6 2.9-2 5.1-3.8 6.4-5.3 1.7-2.2 2.6-4.8 2.5-7.6-.1-1.3-.7-3.3-1.7-6.1-.9-2.8-1.3-4.9-1.2-6.4z';
	} else if (myContainerName == 194) {
		// 194 Square
		myPath = 'M-24-48h48v48h-48z';
	} else if (myContainerName == 195) {
		// 195 Route
		myPath = 'M24-28.3c-.2-13.3-7.9-18.5-8.3-18.7l-1.2-.8-1.2.8c-2 1.4-4.1 2-6.1 2-3.4 0-5.8-1.9-5.9-1.9l-1.3-1.1-1.3 1.1c-.1.1-2.5 1.9-5.9 1.9-2.1 0-4.1-.7-6.1-2l-1.2-.8-1.2.8c-.8.6-8 5.9-8.2 18.7-.2 1.1 2.9 22.2 23.9 28.3 22.9-6.7 24.1-26.9 24-28.3z';
	} else if (myContainerName == 196) {
		// 196 Square rounded
		myPath = 'M24-8c0 4.4-3.6 8-8 8h-32c-4.4 0-8-3.6-8-8v-32c0-4.4 3.6-8 8-8h32c4.4 0 8 3.6 8 8v32z';
	}

	return myPath;
}
function dmlShapeInfoWindowContent(myDescription, myImageUrl, myVideoCode, myLinkText, myLinkUrl) {
	var myResult = '<div style="width: 250px;">' + myDescription + '</div>' + dmlWriteShapeInfoImageHelper(myImageUrl) + dmlWriteShapeInfoVideoHelper(myVideoCode) + dmlWriteShapeInfoLink(myLinkText, myLinkUrl) + '';
	return myResult;
}

function PutHashtags(myText) {
	myText = myText.replace("hashtag", "#");
	return myText;
}
function ClearAllDbMarkers() {
	for (var i = 0; i < DbMarkers.length; i++) {
		DbMarkers[i].setMap(null);
	}
	$('.map-icon').remove();

}

// **** POPUP FUNCTIONS


// **** MARKER FUNCTIONS
// Adds a marker to the map and push to the array.
function addMarker(location) {
	//1) Firstly clears all temporary markers
	deleteMarkers();
	//2) Adds a new marker to the map
	var newMarker = new google.maps.Marker({
		position: location,
		map: map
	});
	//3)Push new marker to the array
	markers.push(newMarker);
	//4) Adds info window for newMarker if user loggedin
	if ($("#myMap1Edit").html() == 1) {
		var newinfowindow = new google.maps.InfoWindow({});
		google.maps.event.addListener(newMarker, 'click', (function (newMarker) {
			return function () {
				newinfowindow.setContent('<div onclick="CenterMap(' + location.lat() + ', ' + location.lng() + ');" class="btn btn-success fontawesome-screenshot buttonhover" style="margin-left:2px;"></div><div id="Map1AddMarkerBtn" onclick="CreateNewMarker(' + location.lat() + ', ' + location.lng() + ', 1, 1);" class="btn btn-primary fontawesome-map-marker" style="margin-left:2px;"></div><div id="dmlClearTempMarker" onclick="deleteMarkers();" class="btn btn-danger fontawesome-trash" style="margin-left:2px;"></div><br/><div class="dmlselectdistancediv" style="color: blue; text-decoration: underline; cursor: pointer;"  onclick="dml_add_for_distance(' + location.lat() + ', ' + location.lng() + ');">Calculate distance</div>');
				newinfowindow.open(map, newMarker);
			}
		})(newMarker));
	} else {
		var newinfowindow = new google.maps.InfoWindow({});
		google.maps.event.addListener(newMarker, 'click', (function (newMarker) {
			return function () {
				newinfowindow.setContent('<div class="dmlselectdistancediv" style="color: blue; text-decoration: underline; cursor: pointer;"  onclick="dml_add_for_distance(' + location.lat() + ', ' + location.lng() + ');">Calculate distance</div>');
				newinfowindow.open(map, newMarker);
			}
		})(newMarker));
	}
}
function dml_Find_From_Address() {

	var geocoder = new google.maps.Geocoder(); // creating a new geocode object
	var location1;

	// getting the address valuE
	address1 = jQuery("#dmlmapAddressInput").val();

	if (!address1) {
		alert("Please enter the address!");
	} else {
		// finding out the coordinates
		if (geocoder) {
			geocoder.geocode({ 'address': address1 }, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					//location of first address (latitude + longitude)
					location1 = results[0].geometry.location;
					//alert(location1.lat() + " 1");
					map.setCenter({ lat: parseFloat(location1.lat()), lng: parseFloat(location1.lng()) });
					addMarker(location1);
				} else {
					alert("Geocode was not successful for the following reason: " + status);
				}
			});
		}
	}
}
function CenterMap(myLat, myLng) {
	// Centers map according to location of newMarker
	var r = confirm("Do you want to center map according to this location?");
	if (r == true) {
		//1) Updates database
		var myCntID = myArr[0].CntID;
		var myField1 = "CntField1";
		var myDeger1 = myLat;
		var myField2 = "CntField2";
		var myDeger2 = myLng;
		var mySaveString = dmlServer + "/dmlmap/dmlmapfunctions.php?SaveType=2&CntID=" + myCntID + "&myField1=" + myField1 + "&myDeger1=" + myDeger1 + "&myField2=" + myField2 + "&myDeger2=" + myDeger2 + " ";
		//2) calls AJAX method to update database
		var savecenter = {};
		savecenter.url = mySaveString;
		savecenter.type = "POST";
		savecenter.data = {};
		savecenter.processData = false;
		savecenter.success = function (result) {
			//3) Update map array myArr center coordinates
			myArr[0].CntField1 = myLat;
			myArr[0].CntField2 = myLng;
			//4) Centers map
			map.setCenter({ lat: parseFloat(myLat), lng: parseFloat(myLng) });
			//5) Ckears marker
			deleteMarkers();
		};
		savecenter.error = function (err) { alert(err.statusText); };
		$.ajax(savecenter);
		event.preventDefault();
	}
}
function CreateNewMarker(myLat, myLng, myShapeID, myMarkerType) {
	//1) Adds new marker record to the database
	var myUrl = $(location).attr('href');
	var myiconUrl;
	var myCornerType;
	var myString;
	if (myMarkerType == 1) {
		//Adds marker icon
		myiconUrl = "0";
		myCornerType = "M";
		myString = dmlServer + "/dmlmap/dmlmapfunctions.php?SaveType=ins&CntID=1&p2=" + myUrl + "&p3=" + myLat + "&p4=" + myLng + "&p5=Place Name&p6=Place Description&p7=" + myCornerType + "&p8=" + myiconUrl + "&p9=.&p10=.&p11=.";
	} else if (myMarkerType == 2) {
		var myNewLat;
		var myNewLng;
		for (var i = 0; i < myArr.length; i++) {
			if (myArr[i].CntID == myShapeID) {
				myNewLat = myArr[i].CntField1 + "_" + myLat;
				myNewLng = myArr[i].CntField2 + "_" + myLng;
			}
		}
		myString = dmlServer + "/dmlmap/dmlmapfunctions.php?SaveType=2&CntID=" + myShapeID + "&myField1=CntField1&myDeger1=" + myNewLat + "&myField2=CntField2&myDeger2=" + myNewLng + " ";
	}

	// 2) Calls AJAX method to update database
	var addMarker = {};
	addMarker.url = myString;
	addMarker.type = "POST";
	addMarker.data = {};
	addMarker.processData = false;
	addMarker.success = function (result) {
		ClearAllDbMarkers();
		var myLocation = $(location).attr('href');
		CallHandler(myLocation);
		//5) Clears marker
		deleteMarkers();
		if (myMarkerType != 1) {
			$("#mySettings").modal("toggle");
		}
	};
	addMarker.error = function (err) { alert(err.statusText); };
	$.ajax(addMarker);
	event.preventDefault();
}



// Saving functions

// Show functions
function dmlMarkerShowEmptyHelper(myDeger) {
	var myResult;
	if (myDeger == '' || myDeger == 'null' || myDeger == '.') {
		myResult = '';
	} else {
		myResult = myDeger;
	}
	return myResult;
}

// InfoWindow functions
function dmlWriteInfoImageHelper(myId, myValue) {
	var myResult;
	if (myValue == '.') {
		myResult = '<br><span id="' + myId + '_IMG" style="display: none;">' + myValue + '</span><br>';
	} else {
		myResult = '<br><span id="' + myId + '_IMG" style="display: none;">' + myValue + '</span><image width="250" height="150" src="' + myValue + '" /><br>';
	}
	return myResult;
}


// ****MAP CONTENT FUNCTIONS
function setMapOnAll(map) {
	// Sets the map on all markers in the array.
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}
function clearMarkers() {
	// Removes the markers from the map, but keeps them in the array.
	setMapOnAll(null);
	MarkerArr = [];
}
function showMarkers() {
	// Shows any markers currently in the array.
	setMapOnAll(map);
}
function deleteMarkers() {
	// Deletes all markers in the array by removing references to them.
	clearMarkers();
}


// Changes map type
function Map1ChangeType(myValue) {

	if (myValue == 1) {
		map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
	}
	else if (myValue == 2) {
		map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
	}
	else if (myValue == 3) {
		map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
	}
	//UPDATING SETTING PARAMETERS
	myArr[0].CntField5 = myValue;
}

// ****DATABASE AJAX FUNCTIONS
function CallSaveHandler(mySaveString, myModalToggle) {
	if (myModalToggle == 1) {
		$("#mySettings").modal("toggle");
	}
	var choice = {};
	choice.url = mySaveString;
	choice.type = "POST";
	choice.data = {};
	choice.processData = false;
	choice.success = function (result) {
		ClearAllDbMarkers();
		var myLocation = $(location).attr('href');
		CallHandler(myLocation);
		deleteMarkers();
	};
	choice.error = function (err) { alert(err.statusText); };
	$.ajax(choice);
	event.preventDefault();
}
function ClearHashtags(myText) {
	// Clears HASHTAGs before saving to database
	myText = myText.replace("#", "hashtag");
	return myText;
}
function DeleteDbMarker(myMarkerID) {
	var r = confirm("Do you want to delete this marker?");
	if (r == true) {
		myDeleteStr = dmlServer + "/dmlmap/dmlmapfunctions.php?SaveType=del1&CntID=" + myMarkerID + " ";
		CallSaveHandler(myDeleteStr, 0);

	}
}
function ResetControl() {
	var myButtonText = $("#BtnReset").val();
	var myDecisionText;
	var myResetStr;

	if (myButtonText == "Reset Map") {
		// Resets the control by deleting all data from database
		myDecisionText = "Do you want to reset the map for this page?";
		var myUrl = $(location).attr('href');
		myResetStr = dmlServer + "/dmlmap/dmlmapfunctions.php?SaveType=res&CntUsrCtrlID=1&url=" + myUrl + " ";
	} else if (myButtonText == "Delete Line") {
		// Deletes one record from the database based on the ID number
		var myLineID = $("#dmlLineSettingsIdValue").text();
		myDecisionText = "Do you want to delete line?";
		myResetStr = dmlServer + "/dmlmap/dmlmapfunctions.php?SaveType=del1&CntID=" + myLineID + " ";
	} else if (myButtonText == "Delete Polygon") {
		// Deletes one record from the database based on the ID number
		var myPolygonID = $("#dmlPolygonSettingsIdValue").text();
		myDecisionText = "Do you want to delete polygon?";
		myResetStr = dmlServer + "/dmlmap/dmlmapfunctions.php?SaveType=del1&CntID=" + myPolygonID + " ";
	} else if (myButtonText == "Delete Circle") {
		// Deletes one record from the database based on the ID number
		var myCircleID = $("#dmlCircleSettingsIdValue").text();
		myDecisionText = "Do you want to delete circle?";
		myResetStr = dmlServer + "/dmlmap/dmlmapfunctions.php?SaveType=del1&CntID=" + myCircleID + " ";
	}

	var r = confirm(myDecisionText);
	if (r == true) {
		CallSaveHandler(myResetStr, 1);
	}
}

//******INSERT STARTS*******
function dmlCreateMap() {
	var myApi = $("#dmlTxtApiKey").val();
	var myUrl = $(location).attr('href');
	var choice = {};
	choice.url = dmlServer + "/dmlmap/dmlmapfunctions.php?SaveType=cmap&api=" + myApi + "&url=" + myUrl;
	choice.type = "POST";
	choice.data = {};
	choice.processData = false;
	choice.success = function (result) {
		document.getElementById("dmlApiKeyError").innerHTML = "<h3>" + result + "</h3><p>Please click on the button below to activate your map.</p><br /><div id='dmlBtnActivateMap' onclick='FncDmlActivateMap();' class='btn btn-success'>Activate Map</div>";
		$("#dmlApiEnterPanel").hide();
	};
	choice.error = function (err) { alert(err.statusText + "KK"); };
	$.ajax(choice);
	event.preventDefault();
}

//******ACTIVATE MAPS STARTS*******
function FncDmlActivateMap() {
	location.reload();
}


//****** DISTANCE CALCULATING ******
