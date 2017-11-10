    
	var $operationMenu = $('<select name="operationType"><option value="addItem">Add Item</option><option value="modifyItem">Modify Item</option><option value="deleteItem">Delete Item</option>');
	var $newInputs = $('<p>Type: <input id="typeInput" type="text" name="type" placeholder="Enter Item Type"> Price: <input id="priceInput" type="text" name="price" placeholder="Enter Item Price">  Weight: <input id="weightInput" type="text" name="weight" placeholder="Enter Item Weight"></p><p>  Brand: <input id="brandInput" type="text" name="brand" placeholder="Enter Item Brand">  Model: <input id="modelInput" type="text" name="model" placeholder="Enter Item Model">  CPU Core: <input id="cpuCoreInput" type="text" name="cpuCore" placeholder="Enter Item CPU Core"></p><p>Battery: <input id="batteryInput" type="text" name="Battery" placeholder="Enter Item Battery">  OS: <input id="osInput" type="text" name="os" placeholder="Enter Item OS">  Camera: <input id="cameraInput" type="text" name="camera" placeholder="Enter Item Camera"></p><p>  Ram: <input id="ramInput" type="text" name="ram" placeholder="Enter Item Ram">  Processor: <input id="processorInput" type="text" name="processor" placeholder="Enter Item Processor">  Hard Drive Size: <input id="hardDriveSizeInput" type="text" name="hardDriveSize" placeholder="Enter Item Hard Drive Size"></p><p>Screen Size: <input type="text" name="screenSize" placeholder="Enter Item Screen Size">  Width: <input id="widthInput" type="text" name="width" placeholder="Enter Item Width">  Height: <input id="heightInput" type="text" name="height" placeholder="Enter Item Height">  Depth: <input id="depthInput" type="text" name="depth" placeholder="Enter Item Depth"></p>  ');
	var $modifyButton = $('<input id="modifyItemSubmit" type="button" value="Modify">');
	var $addDeleteButton = $('<input id="addDeleteSubmit" type="button" value="Add Delete">');
	var $type = $('#typeInput');
	var $price = $('#priceInput');
	var $weight = $('#weightInput');
	var $brand = $('#brandInput');
	var $model = $('#modelInput');
	var $cpuCore = $('#cpuCoreInput');
	var $Battery = $('#batteryInput');
	var $os = $('#osInput');
	var $camera = $('#cameraInput');
	var $ram = $('#ramInput');
	var $processor = $('#processorInput');
	var $hardDriveSize = $('#hardDriveSizeInput');
	var $screenSize = $('#screenSizeInput');
	var $width = $('#widthInput');
	var $height = $('#heightInput');
	var $depth = $('#depthInput');
	var $modelNumberField = $('.modelNumberField');
	var urlObj='';
	var object;

	var l="laptop";
	var m="monitor";
	var d="desktop";
	var t="tablet";

	/* ***====AJAX GET===*** */
	function ajaxGET(){
		return $.ajax({
			type: 'GET',
			url: urlObj,
			success: function(jsonobject){
				object = JSON.parse(jsonobject);


			},
			error: function(){

				alert("Error on Verifying!")
			}



		});
	}

	function ajaxPOST(post){

		$.ajax({
			type: 'POST',
			url: '/insertProduct',
			data: post,
			success: function(){
				alert(post.type()+ " has been added to the catalog!");

			},
			error: function(){

				alert("System couldn't add the item to the catalog. Please try again later!")
			}



		});

	}


	$('#modelNumberSubmit').on('click', function(){
	urlObj = 'verifyProduct/byModelNumber/'+$modelNumberField.val();
	console.log(urlObj);
	//ajaxGET();

	
	$('fieldset').append($operationMenu).append($newInputs).append($modifyButton).append($addDeleteButton);
	

});


$('.addDeleteButton').on('click', function(){

	

});



$('.modifyItemSubmit').on('click', function(){

});

