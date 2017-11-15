$.getScript("js/Product.js");
function userWebInteraction(control){
	controller = control;
	var latest_res;
	// functions
	this.startMonitoring = function (){
		// verify Item
		$('#modelNumberSubmit').on('click', function(){
			$("#type_action").show();
			$("#description_option").show();
			var model_number = $('.modelNumberField').val();
			controller.verifyItem(model_number,function(result){
				displayInputShow();
				//model found
				if(!jQuery.isEmptyObject(result)){
					var theItem = Item.JSONToObject(result);
					$("#item_option").show();
					$("#add_option").hide();
					alert(JSON.stringify(theItem,null,"\t"));
					switch(theItem.typeInt){
						case 1 : placeDesktopInForm(theItem);break;
						case 2 : placeMonitorInForm(theItem);break;
						case 3 : placeLaptopInForm(theItem);break;
						case 4 : placeTabletInForm(theItem);break;
					}
					//placeMonitorInForm(theItem);
				}
				//model not found
				else{
					defaultForm();
					alert("empty");
				}
			})
		});
		//delete Item
		$("#DeleteSubmit").on('click',function(){
			var model_number = $('#model_number').val();
			controller.deleteItem(model_number,function(result){
				if(result){
					alert("Item Delete");
					displayInputShow();
					defaultForm();
					
				}
				else{
					alert("Error in Deleting the Item")
				}
			});
		})
		// Update Item
		$("#modifyItemSubmit").on('click',function(){
			var myItem = formToItem();
			controller.modifyItem(myItem,function(result){
				if(result){
					alert("Item Updated");
				}
				else{
					alert("Error in Updating the Item")
				}
			})
		})
		// add Item 
		$("#add_item").on('click',function(){
			var myItem = formToItem();
			controller.insertItem(myItem,function(result){
				if(result){
					$("#item_option").show();
					$("#add_option").hide();
					alert("Item added");
				}
				else{
					alert("Error in Adding the Item");
				}
			});
		})
		//adapt to type
		$("#typeInput").change(function(){
			var myModel = $("#model_number").val();
			if($(this).val()=="Desktop"){
				alert("IN")
				displayInputShow();
				var emptyDesktop = new Desktop(myModel,"","","","","",""," x  x ","");
				placeDesktopInForm(emptyDesktop);
				alert("OUT")
			}
			else if($(this).val()=="Monitor") {
				displayInputShow();
				var emptyMonitor=new Monitor(myModel,"","","","");
				placeMonitorInForm(emptyMonitor)
			}
			else if($(this).val()=="laptop") {
				displayInputShow();
				var emptyLaptop=new laptop(myModel,"","","","","","","","","","","");
				placeLaptopInForm(emptyLaptop)
			}
			else if($(this).val()=="Tablet") {
				displayInputShow();
				var emptyTablet=new Tablet(myModel,"","","","","",""," x  x ","","","","","") ;
				placeTabletInForm(emptyTablet)
			}
		})
		//catalog hide/show function
		$("#results").hide();
		$("#filtertablets").hide();
		$("#filterdesktops").hide();
		$("#filtermonitors").hide();
		$("#filterlaptops").hide();
	  	$("#specifications").hide();
	   	$("#submit").on('click',function(){
	        if ($("#categories").val()=="tablet"){
	        	$("#filtertablets").show();
	     	   	$("#filterdesktops").hide();
	     		$("#filtermonitors").hide();
	     		$("#filterlaptops").hide();
	          	$("#specifications").show();
	          	$("#results").show();
	        }
	        else if ($("#categories").val()=="desktop"){
	        	$("#filterdesktops").show();
	        	$("#filtertablets").hide();
				$("#filtermonitors").hide();
				$("#filterlaptops").hide();
	       		$("#specifications").show();
	      		$("#results").show();
	        }
	        else if ($("#categories").val()=="monitor"){
	        	$("#filtermonitors").show();
	        	$("#filtertablets").hide();
				$("#filterdesktops").hide();
				$("#filterlaptops").hide();
	       		$("#specifications").show();
	       		$("#results").show();
	        }
	        else if ($("#categories").val()=="laptop"){
	        	$("#filterlaptops").show();
	        	$("#filtertablets").hide();
				$("#filterdesktops").hide();
				$("#filtermonitors").hide();
	       		$("#specifications").show();
	       		$("#results").show();
	        }
	        controller.ViewInventory($("#categories").val(), function(results){
	        	alert(JSON.stringify(results, null, "\t"));
	        	latest_res= results;
	        	$("#displayResults").empty();
	        	$("#displayResults").append("<tr><th>#</th><th>Brand</th><th>ModelNumber</th><th>Price</th></tr>");
	        	if (results.rows.length>0) {
	        		for (var i = 0; i < results.rows.length; i++) {
	        			$("#displayResults").append("<tr class='res'><td class='indexNumber'>"+(i + 1)+"</td><td>"+ results.rows[i].BrandName +"</td><td>"+ results.rows[i].Model_Number +"</td><td>"+ results.rows[i].price +"</td></tr>");
	        		}
	        	}
	        })
	    });
	    $("#displayResults").delegate("tr.res", "click", function(){
	    	var myIndex =$(this).find(".indexNumber").html();
	    	var myItem = latest_res.rows[myIndex-1]
	    	myItem= Item.JSONToObject(myItem);
	    	alert(JSON.stringify(myItem));
	    	displayInputShow();
	    	 switch (myItem.typeInt){
	    	 	case 1 : placeDesktopInForm(myItem);break;
						case 2 : placeMonitorInForm(myItem);break;
						case 3 : placeLaptopInForm(myItem);break;
						case 4 : placeTabletInForm(myItem);break;
	    	 }
	    })
	    

	   //end of monitor

	}
	this.test = function(){
		alert("fromt lisnter");
	}
	function formToDesktopItem(){
		var dimension = ($("#widthInput").val()).substring(0, $("#widthInput").val().lastIndexOf(" ") ) + " x "+($("#heightInput").val()).substring(0, $("#heightInput").val().lastIndexOf(" ") ) ;
		dimension += " x "+$("#depthInput").val();
		return new Desktop(		$("#model_number").val(),
								$("#priceInput").val(),
								$("#weightInput").val(),
								$("#brandInput").val(),
								$("#hardDriveSizeInput").val(),
								$("#ramInput").val(),
								$("#cpuCoreInput").val(),
								dimension,
								$("#processorInput").val()
							)
	}
	function placeDesktopInForm(desktop){
		alert("from desktop form")
		$("#model_number").val(desktop.Model_Number);
		$("#typeInput").val(desktop.Type);
		$("#priceInput").val(desktop.price);
		$("#weightInput").val(desktop.weight);
		$("#brandInput").val(desktop.BrandName);
		$("#hardDriveSizeInput").val(desktop.HardDriveSize);
		$("#ramInput").val(desktop.RAM);
		$("#cpuCoreInput").val(desktop.CPUCores);
		$("#processorInput").val(desktop.ProcessorType);
		var dimension = desktop.dimension.split(" x ");
		$("#widthInput").val(dimension[0]+dimension[2].substring( dimension[2].indexOf(" ") ));
		$("#heightInput").val(dimension[1]+dimension[2].substring( dimension[2].indexOf(" ") ));
		$("#depthInput").val(dimension[2]);
		$("#battery").hide();
		$("#os").hide();
		$("#camera").hide();
		$("#screen_size").hide();
		
	}
	function formToMonitorItem(){
		return new Monitor(	$("#model_number").val(),
							$("#priceInput").val(),
							$("#weightInput").val(),
							$("#brandInput").val(),
							$("#sizeInput").val()
						);

    }
	function placeMonitorInForm(monitor){
		alert("from monitor form");
		$("#model_number").val(monitor.Model_Number);
		$("#typeInput").val(monitor.Type);
		$("#priceInput").val(monitor.price);
		$("#weightInput").val(monitor.weight);
		$("#brandInput").val(monitor.BrandName);
		alert(monitor.Size+"theSize");
		$("#sizeInput").val(monitor.Size);
		$("#cpu_core").hide();
		$("#battery").hide();
		$("#os").hide();
		$("#camera").hide();
		$("#ram").hide();
		$("#processor").hide();
		$("#hard_drive_size").hide();
		$("#width").hide();
		$("#height").hide();
		$("#depth").hide();
		
	}
	function formToLaptopItem(){
		return new laptop(	$("#model_number").val(),
							$("#priceInput").val(),
							$("#weightInput").val(),
							$("#brandInput").val(),
							$("#hardDriveSizeInput").val(),
							$("#ramInput").val(),
							$("#cpuCoreInput").val(),
							"N/A",
							$("#processorInput").val(),
							$("#sizeInput").val(),
							$("#batteryInput").val(),
							$("#osInput").val()
						);
    }
	function placeLaptopInForm(laptop){
		alert("from laptop form")
		$("#model_number").val(laptop.Model_Number);
		$("#typeInput").val(laptop.Type);
		$("#priceInput").val(laptop.price);
		$("#weightInput").val(laptop.weight);
		$("#brandInput").val(laptop.BrandName);
		$("#sizeInput").val(laptop.DisplaySize);
		$("#hardDriveSizeInput").val(laptop.HardDriveSize);
		$("#ramInput").val(laptop.RAM);
		$("#cpuCoreInput").val(laptop.CPUCores);
		$("#cpuCoreInput").val(laptop.CPUCores);
		$("#processorInput").val(laptop.ProcessorType);
		$("#batteryInput").val(laptop.BatteryInformation);
		$("#osInput").val(laptop.OperativeSystem);
		$("#camera").hide();
		$("#width").hide();
		$("#height").hide();
		$("#depth").hide();
	}
	function formToTabletItem(){
		var dimension = ($("#widthInput").val()).substring(0, $("#widthInput").val().lastIndexOf(" ") ) + " x " + ($("#heightInput").val()).substring(0, $("#heightInput").val().lastIndexOf(" ") ) ;
		dimension += " x " + $("#depthInput").val();
		return new Tablet(		$("#model_number").val(),
								$("#priceInput").val(),
								$("#weightInput").val(),
								$("#brandInput").val(),
								$("#hardDriveSizeInput").val(),
								$("#ramInput").val(),
								$("#cpuCoreInput").val(),
								dimension,
								$("#processorInput").val(),
								$("#sizeInput").val(),
								$("#batteryInput").val(),
								$("#osInput").val(),
								$("#cameraInput").val()
						)
	}
	function placeTabletInForm(tablet){
		alert("from tablet form")
		$("#model_number").val(tablet.Model_Number);
		$("#typeInput").val(tablet.Type);
		$("#priceInput").val(tablet.price);
		$("#weightInput").val(tablet.weight);
		$("#brandInput").val(tablet.BrandName);
		$("#sizeInput").val(tablet.DisplaySize);
		$("#hardDriveSizeInput").val(tablet.HardDriveSize);
		$("#ramInput").val(tablet.RAM);
		$("#cpuCoreInput").val(tablet.CPUCores);
		$("#processorInput").val(tablet.ProcessorType);
		$("#batteryInput").val(tablet.BatteryInformation);
		$("#osInput").val(tablet.OperativeSystem);
		$("#cameraInput").val(tablet.CameraInformation);
		var dimension = tablet.dimension.split(" x ");
		$("#widthInput").val(dimension[0]+dimension[2].substring( dimension[2].indexOf(" ") ));
		$("#heightInput").val(dimension[1]+dimension[2].substring( dimension[2].indexOf(" ") ));
		$("#depthInput").val(dimension[2]);
	}
	function displayInputShow(){
		$("#model_number, #typeInput").val("");
		$("#priceInput").val("");
		$("#weightInput").val("");
		$("#brandInput").val("");
		$("#sizeInput").val("");
		$("#hardDriveSizeInput").val("");
		$("#ramInput").val("");
		$("#cpuCoreInput").val("");
		$("#processorInput").val("");
		$("#batteryInput").val("");
		$("#osInput").val("");
		$("#cameraInput").val("");
		$("#widthInput").val("");
		$("#heightInput").val("");
		$("#depthInput").val("");
		$("#weight").show();
		$("#brand").show();
		$("#screen_size").show();
		$("#cpu_core").show();
		$("#battery").show();
		$("#os").show();
		$("#camera").show();
		$("#ram").show();
		$("#processor").show();
		$("#hard_drive_size").show();
		$("#width").show();
		$("#height").show();
		$("#depth").show();
	}
	function formToItem(){
		var type = $("#typeInput").val();
		alert(type);
		var myItem;
		switch(type){
			case "Desktop" : myItem = formToDesktopItem();break;
			case "Monitor" : myItem = formToMonitorItem();break;
			case "laptop" : myItem = formToLaptopItem();break;
			case "Tablet" : myItem = formToTabletItem();break;
		}
		alert("check this > "+JSON.stringify(myItem,null,"\t"))
		return myItem;
	}
	function defaultForm(){
		var myModel= $(".modelNumberField").val();
		$("#add_option").show();
		$("#item_option").hide();
		var emptyDesktop = new Desktop(myModel,"","","","","",""," x  x ","");
		placeDesktopInForm(emptyDesktop);
	}
}
$('.addDeleteButton').on('click', function(){
});
$('.modifyItemSubmit').on('click', function(){
});