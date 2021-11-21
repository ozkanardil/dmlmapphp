
	<!-- MAP PANEL STARTS -->
	<div id="Map1idHolder" style="display:none;"></div>
	<div id="MapScriptHolder"></div>
	<div id="dmlMapContainer">
		<div id="Repeater1Container">
			<div class="row">
				<div id="distance_road"></div>
				<div id="distance_direct"></div>
				<div id="dmlmapaddressbar" class="input-group" style="display: none;">
					<input id="dmlmapAddressInput" type="text" class="form-control" placeholder="Enter the address of the location...">
					<span class="input-group-btn">
						<button id="dmlmapSubmitAddress" class="btn btn-default" type="button" ><i class="fa fa-map-marker" aria-hidden="true"></i> Show</button>
					</span>
				</div><!-- /input-group -->
				<div id="Repeater1Map">
					<div id="dmlsupportbuttons"></div>
					<div id="map" class="container-fluid"></div>
				</div>
			</div>
		</div>
	</div>
	<!-- MAP PANEL ENDS -->

	<!-- MAP ACTIVATION API PANEL STARTS -->
	<div id="dmlApiDiv" class="container" style="text-align: center; display: none;">
		<div id="dmlApiEnterPanel">
			<h3>PLEASE ENTER YOUR API KEY</h3>
			<p>To take your key, follow <a href="https://developers.google.com/maps/documentation/javascript/get-api-key#get-an-api-key"
					target="_blank">this link</a> and click on the <b>GET A KEY</b></p>
			<input id="dmlTxtApiKey" type="text" />
			<h3>
				<div id="dmlBtnSaveApiKey" onclick="dmlCreateMap();" class="btn btn-success">Save</div>
			</h3>
		</div>
		<div id="dmlApiKeyError"></div>
	</div>
	<div style="clear: both;"></div>
	<!-- MAP ACTIVATION PANEL ENDS -->

	<!--NON CONTENT AND HOVER BUTTON STARTS-->
	<div id="BtnSettings" data-target="#mySettings" data-toggle="modal" class="btn btn-primary fontawesome-cogs " onclick="FillSettings();"
		style="display: none;"> Map Settings</div>
	<!--NON CONTENT AND HOVER BUTTON STARTS-->

	