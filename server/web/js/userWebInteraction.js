$.getScript("js/Product.js");
function userWebInteraction(control){
	controller = control;
	var latest_res;
	var defaultSettings = {
	    width: "#widthInput",
	    height: "#heightInput",
	    depth: "#depthInput",
	    price: "#priceInput",
	    weight: "#weightInput",
	    brand: "#brandInput",
	    hard_drive_size: "#hardDriveSizeInput",
	    ram: "#ramInput",
	    cpu: "#cpuCoreInput",
	    processor: "#processorInput",
	    screen_size: "#sizeInput",
	    battery: "#batteryInput",
	    os: "#osInput",
	    camera: "#cameraInput"
	};
	//used for filtering
	var minSettings = {
	    width: "#minWidth",
	    height: "#minHeight",
	    depth: "#minDepth",
	    price: "#minPrice",
	    weight: "#minWeight",
	    brand: "#FilterBrand",
	    hard_drive_size: "#minHDD",
	    ram: "#minRAM",
	    cpu: "#minCPU",
	    processor: "#FilterProcessor",
	    screen_size: "#minScreenSize",
	    battery: "#minBattery",
	    os: "#FilterOs",
	    camera: "#minCamera"
	};
	//used for filtering
		var maxSettings = {
	    width: "#maxWidth",
	    height: "#maxHeight",
	    depth: "#maxDepth",
	    price: "#maxPrice",
	    weight: "#maxWeight",
	    brand: "#FilterBrand",
	    hard_drive_size: "#maxHDD",
	    ram: "#maxRAM",
	    cpu: "#maxCPU",
	    processor: "#FilterProcessor",
	    screen_size: "#maxScreenSize",
	    battery: "#maxBattery",
	    os: "#FilterOs",
	    camera: "#maxCamera"
	};
	//Local storage check
	if (typeof(Storage) === "undefined") {
		alert("Web Browser Storage not Supported in you chosen Navigation. Login and related task will not work")
	}
	// functions
	this.startMonitoring = function (){
		// verify Item
		$('#modelNumberSubmit').on('click', function(){
			//LOCAL VERIFICATION, SHOULD BE DONE ON THE SERVER, because time...
			if(localStorage.getItem("isAdmin")==null || localStorage.getItem("isAdmin")==="false" || localStorage.getItem("isAdmin")==="undefined"){
				alert("Please log in as admin");
				return;
			}
			$("#type_action").show();
			$("#description_option").show();
			var model_number = $('.modelNumberField').val();
			controller.verifyProduct(model_number,function(result,isAdmin){
				if(result && isAdmin){
					displayInputShow();
				}
				if(!result && !isAdmin){
					alert("Please Be Login As Admin To use this function");
				}
				//model found
				else if(!jQuery.isEmptyObject(result)){
					var theItem = Item.JSONToObject(result);
					$("#item_option").show();
					$("#add_option").hide();
					//alert(JSON.stringify(theItem,null,"\t"));
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
			//LOCAL VERIFICATION, SHOULD BE DONE ON THE SERVER, because time...
			if(localStorage.getItem("isAdmin")==null || localStorage.getItem("isAdmin")==="false" || localStorage.getItem("isAdmin")==="undefined"){
				alert("Please log in as admin");
				return;
			}
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
			//LOCAL VERIFICATION, SHOULD BE DONE ON THE SERVER, because time...
			if(localStorage.getItem("isAdmin")==null || localStorage.getItem("isAdmin")==="false" || localStorage.getItem("isAdmin")==="undefined"){
				alert("Please log in as admin");
				return;
			}
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
			//LOCAL VERIFICATION, SHOULD BE DONE ON THE SERVER, because time...
			if(localStorage.getItem("isAdmin")==null || localStorage.getItem("isAdmin")==="false" || localStorage.getItem("isAdmin")==="undefined"){
				alert("Please log in as admin");
				return;
			}
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
		//commit Save
		$("#commitSave").on('click',function(){
			//LOCAL VERIFICATION, SHOULD BE DONE ON THE SERVER, because time...
			if(localStorage.getItem("isAdmin")==null || localStorage.getItem("isAdmin")==="false" || localStorage.getItem("isAdmin")==="undefined"){
				alert("Please log in as admin");
				return;
			}
			controller.commitAdmin(function(result){
				alert(result);
			})
		})
		//addToWishlist
		$("#addWishlist").on("click",function(){
			//LOCAL VERIFICATION, SHOULD BE DONE ON THE SERVER, because time...
			//alert(localStorage.getItem("isAdmin"))
			if((localStorage.getItem("isAdmin")==null) || localStorage.getItem("isAdmin")==="true" || localStorage.getItem("isAdmin")==="undefined"){
				alert("Please log in as client");
				return;
			}
			product = formToItem();
			controller.wishlistAdd(product,function(res){
				alert(res)
			})
		})
		//removeFromWishlist
		$("#removeWishlist").on('click',function(){
			//LOCAL VERIFICATION, SHOULD BE DONE ON THE SERVER, because time...
			if((localStorage.getItem("isAdmin")==null) || localStorage.getItem("isAdmin")==="true" || localStorage.getItem("isAdmin")==="undefined"){
				alert("Please log in as client");
				return;
			}
			p = $("#model_number").val();
			controller.wishlistDelete(p,function(status,result){
				if(status){
					alert("Item Deleted");
					controller.getMyWishlist(function(status,results){
						console.log("IN");
						if(status){
							console.log(results);
							defaultForm();
							latest_res= results;
							$("#specifications").show();
							$("#results").show()
							$("#displayResults").empty();
							$("#displayResults").append("<tr><th>#</th><th>Brand</th><th>ModelNumber</th><th>Price</th></tr>");
							if (results.rows.length>0) {
								for (var i = 0; i < results.rows.length; i++) {
									$("#displayResults").append("<tr class='res'><td class='indexNumber'>"+(i + 1)+"</td><td>"+ results.rows[i].BrandName +"</td><td>"+ results.rows[i].Model_Number +"</td><td>"+ results.rows[i].price +"</td></tr>");
								}
							}
						}
						else{
							alert("Error In Fetching WIshlist")
						}
					})
				}
			})
		})
		//Commit Wish
		$("#commitWish").on('click',function(){
			//LOCAL VERIFICATION, SHOULD BE DONE ON THE SERVER, because time...
			if((localStorage.getItem("isAdmin")==null) || localStorage.getItem("isAdmin")==="true" || localStorage.getItem("isAdmin")==="undefined"){
				alert("Please log in as client");
				return;
			}
			controller.commitWishlist(function(res){
				alert(res);
			})
		})
		//log out
		$("#out").on('click',function(){
			//LOCAL LOGT OUT, SHOULD ALSO BE DONE ON SERVER, because time....
			localStorage.clear();
			alert("Log out succesfull");
		})
		//Login
		$("#logSubmit").on('click',function(){
			var email = $("#emailLog").val();
			var pass = $("#passLog").val();
			console.log("perfomred")
			controller.signIn(email,pass,function(token,admin){
				if(token!=null){
					localStorage.setItem("token",token);
					localStorage.setItem("isAdmin",admin)
					if(admin){
						alert("Admin Login Successfull");
					}
					else{
						alert("Client Login Succesfull");
					}
				}
				else{
					alert("Wrong Credential or User does not exists!")
				}
			})
		})
		//adapt to type
		$("#typeInput").change(function(){
			var myModel = $("#model_number").val();
			if($(this).val()=="Desktop"){
				//alert("IN")
				displayInputShow();
				var emptyDesktop = new Desktop(myModel,"","","","","",""," x  x ","");
				placeDesktopInForm(emptyDesktop);
				//alert("OUT")
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
		$("#filtertablets").show();
		$("#filterdesktops").hide();
		$("#filtermonitors").hide();
		$("#filterlaptops").hide();
	  	$("#specifications").hide();
	  	$("#categories").change(function(){
			if ($("#categories").val()=="tablet"){
	        	$("#filtertablets").show();
	     	   	$("#filterdesktops").hide();
	     		$("#filtermonitors").hide();
	     		$("#filterlaptops").hide();
	          	//$("#specifications").show();
	          	$("#results").show();
	        }
	        else if ($("#categories").val()=="desktop"){
	        	$("#filterdesktops").show();
	        	$("#filtertablets").hide();
				$("#filtermonitors").hide();
				$("#filterlaptops").hide();
	       		//$("#specifications").show();
	      		$("#results").show();
	        }
	        else if ($("#categories").val()=="monitor"){
	        	$("#filtermonitors").show();
	        	$("#filtertablets").hide();
				$("#filterdesktops").hide();
				$("#filterlaptops").hide();
	       		//$("#specifications").show();
	       		$("#results").show();
	        }
	        else if ($("#categories").val()=="laptop"){
	        	$("#filterlaptops").show();
	        	$("#filtertablets").hide();
				$("#filterdesktops").hide();
				$("#filtermonitors").hide();
	       		//$("#specifications").show();
	       		$("#results").show();
	        }
	  	})
	   	$("#submitSet").on('click',function(){
	   		$("#specifications").show();
	   		$("#results").show();
	   		var MyMinProduct;
	   		var MyMaxProduct;
	   		if ($("#categories").val()=="tablet"){
	   			MyMinProduct= formToTabletItem(minSettings, "#filtertablets");
	   			MyMaxProduct= formToTabletItem(maxSettings, "#filtertablets");
	   			
	        }
	        else if ($("#categories").val()=="desktop"){
	        	MyMinProduct= formToDesktopItem(minSettings,"#filterdesktops");
	        	MyMaxProduct= formToDesktopItem(maxSettings,"#filterdesktops");

	        }
	        else if ($("#categories").val()=="monitor"){
	        	MyMinProduct= formToMonitorItem(minSettings, "#filtermonitors");
	        	MyMaxProduct= formToMonitorItem(maxSettings, "#filtermonitors");
	        }
	        else if ($("#categories").val()=="laptop"){
	        	MyMinProduct= formToLaptopItem(minSettings, "#filterlaptops");
	        	MyMaxProduct= formToLaptopItem(maxSettings, "#filterlaptops");

	        }
			//alert(JSON.stringify(MyMaxProduct));
	        	 controller.ViewInventory($("#categories").val(), MyMinProduct, MyMaxProduct, function(results){
	         	//alert(JSON.stringify(results, null, "\t")+" AAAAAAA");
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
		//Get Wishlist
		$("#getWish").on('click',function(){
			//LOCAL VERIFICATION, SHOULD BE DONE ON THE SERVER, because time...
			//alert( localStorage.getItem("isAdmin")==="true" );
			if((localStorage.getItem("isAdmin")==null) || localStorage.getItem("isAdmin")==="true" || localStorage.getItem("isAdmin")==="undefined"){
				alert("Please log in as client");
				return;
			}
			controller.getMyWishlist(function(status,results){
				if(status){
					console.log(results);
					latest_res= results;
					$("#specifications").show();
					$("#results").show()
					$("#displayResults").empty();
					$("#displayResults").append("<tr><th>#</th><th>Brand</th><th>ModelNumber</th><th>Price</th></tr>");
					if (results.rows.length>0) {
						for (var i = 0; i < results.rows.length; i++) {
							$("#displayResults").append("<tr class='res'><td class='indexNumber'>"+(i + 1)+"</td><td>"+ results.rows[i].BrandName +"</td><td>"+ results.rows[i].Model_Number +"</td><td>"+ results.rows[i].price +"</td></tr>");
						}
					}
				}
				else{
					alert("Error In Fetching WIshlist")
				}
			})
		})
	    $("#displayResults").delegate("tr.res", "click", function(){
	    	var myIndex =$(this).find(".indexNumber").html();
	    	var myItem = latest_res.rows[myIndex-1]
	    	myItem= Item.JSONToObject(myItem);
	    	//alert(JSON.stringify(myItem));
	    	displayInputShow();
	    	 switch (myItem.typeInt){
	    	 	case 1 : placeDesktopInForm(myItem);break;
						case 2 : placeMonitorInForm(myItem);break;
						case 3 : placeLaptopInForm(myItem);break;
						case 4 : placeTabletInForm(myItem);break;
	    	 }
	    })
	    

	   //end of monitor

//filtring
$("#filter").on('click',function(){
		var array = [];
		var headers = ["Index", "BrandName", "Model_Number", "price"];

	$('#results tr').has('td').each(function() {
    	var arrayItem = {};
   	 $('td', $(this)).each(function(index, item) {
        arrayItem[headers[index]] = $(item).html();
    });
    array.push(arrayItem);
});
if ($("#categories").val()=="tablet"){
	   			MyMinProduct= formToTabletItem(minSettings, "#filtertablets");
	   			MyMaxProduct= formToTabletItem(maxSettings, "#filtertablets");
	   			
	        }
	        else if ($("#categories").val()=="desktop"){
	        	MyMinProduct= formToDesktopItem(minSettings,"#filterdesktops");
	        	MyMaxProduct= formToDesktopItem(maxSettings,"#filterdesktops");

	        }
	        else if ($("#categories").val()=="monitor"){
	        	MyMinProduct= formToMonitorItem(minSettings, "#filtermonitors");
	        	MyMaxProduct= formToMonitorItem(maxSettings, "#filtermonitors");
	        }
	        else if ($("#categories").val()=="laptop"){
	        	MyMinProduct= formToLaptopItem(minSettings, "#filterlaptops");
	        	MyMaxProduct= formToLaptopItem(maxSettings, "#filterlaptops");

	        }

var FilteredArray = [];
if (MyMinProduct.price==""){
	MyMinProduct.price=0;
}
if (MyMaxProduct.price==""){
	MyMaxProduct.price=9999999;
}
//alert(MyMinProduct.BrandName=="")
for (var k = 0; k < array.length; k++) {
	if (MyMinProduct.BrandName!=""){
		//alert("inside");
	if (array[k].BrandName==MyMinProduct.BrandName & array[k].price>MyMinProduct.price & array[k].price<MyMaxProduct.price){
		FilteredArray.push(array[k]);
	}}
}

$("#displayResults").empty();
	$("#displayResults").append("<tr><th>#</th><th>Brand</th><th>ModelNumber</th><th>Price</th></tr>");
	        		for (var k = 0; k < FilteredArray.length; k++) {
	        			//alert(k);
	        			$("#displayResults").append("<tr class='res'><td class='indexNumber'>"+FilteredArray[k].Index+"</td><td>"+ FilteredArray[k].BrandName +"</td><td>"+ FilteredArray[k].Model_Number +"</td><td>"+ FilteredArray[k].price +"</td></tr>");
	        		}
})



	   //random ordering
	   $("#random").on('click',function(){
		var array = [];
		var headers = ["Index", "BrandName", "Model_Number", "price"];

	$('#results tr').has('td').each(function() {
    	var arrayItem = {};
   	 $('td', $(this)).each(function(index, item) {
        arrayItem[headers[index]] = $(item).html();
    });
    array.push(arrayItem);
});
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
array= shuffle(array);
//alert(JSON.stringify(array, null, "\t"));
	$("#displayResults").empty();
	$("#displayResults").append("<tr><th>#</th><th>Brand</th><th>ModelNumber</th><th>Price</th></tr>");
	        		for (var k = 0; k < array.length; k++) {
	        			$("#displayResults").append("<tr class='res'><td class='indexNumber'>"+array[k].Index+"</td><td>"+ array[k].BrandName +"</td><td>"+ array[k].Model_Number +"</td><td>"+ array[k].price +"</td></tr>");
	        		}
	})



///////
	}
	this.test = function(){
		alert("fromt lisnter");
	}
	function formToDesktopItem(settings,body){
		var dimension = ($(body +" "+ settings.width).val()).substring(0, $(body +" "+ settings.width).val().lastIndexOf(" ")) + " x " + ($(body +" "+ settings.height).val()).substring(0, $(body +" "+ settings.height).val().lastIndexOf(" "));
		dimension += " x " + $(body +" "+ settings.depth).val();
		return new Desktop($("#model_number").val(),
		    $(body +" "+ settings.price).val(),
		    $(body +" "+ settings.weight).val(),
		    $(body +" "+ settings.brand).val(),
		    $(body +" "+ settings.hard_drive_size).val(),
		    $(body +" "+ settings.ram).val(),
		    $(body +" "+ settings.cpu).val(),
		    dimension,
		    $(body +" "+ settings.processor).val()
		)
	}
	function placeDesktopInForm(desktop){
		//alert("from desktop form")
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
	function formToMonitorItem(settings, body){
		return new Monitor(	$("#model_number").val(),
							$(body +" "+ settings.price).val(),
							$(body +" "+ settings.weight).val(),
							$(body +" "+ settings.brand).val(),
							$(body +" "+ settings.screen_size).val()
						);
    }

	function placeMonitorInForm(monitor){
		//alert("from monitor form");
		$("#model_number").val(monitor.Model_Number);
		$("#typeInput").val(monitor.Type);
		$("#priceInput").val(monitor.price);
		$("#weightInput").val(monitor.weight);
		$("#brandInput").val(monitor.BrandName);
		//alert(monitor.Size+"theSize");
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
	function formToLaptopItem(settings, body){
		return new laptop(	$("#model_number").val(),
							$(body +" "+ settings.price).val(),
							$(body +" "+ settings.weight).val(),
							$(body +" "+ settings.brand).val(),
							$(body +" "+ settings.hard_drive_size).val(),
							$(body +" "+ settings.ram).val(),
							$(body +" "+ settings.cpu).val(),
							"N/A",
							$(body +" "+ settings.processor).val(),
							$(body +" "+ settings.screen_size).val(),
							$(body +" "+ settings.battery).val(),
							$(body +" "+ settings.os).val()
						);
    }
	function placeLaptopInForm(laptop){
		//alert("from laptop form")
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
	function formToTabletItem(settings, body) {
    var dimension = ($(body +" "+ settings.width).val()).substring(0, $(body +" "+ settings.width).val().lastIndexOf(" ")) + " x " + ($(body +" "+ settings.height).val()).substring(0, $(body +" "+ settings.height).val().lastIndexOf(" "));
		dimension += " x " + $(body +" "+ settings.depth).val();
	    return new Tablet($("#model_number").val(),
	        $(body +" "+ settings.price).val(),
	        $(body +" "+ settings.weight).val(),
	        $(body +" "+ settings.brand).val(),
	        $(body +" "+ settings.hard_drive_size).val(),
	        $(body +" "+ settings.ram).val(),
	        $(body +" "+ settings.cpu).val(),
	        dimension,
	        $(body +" "+ settings.processor).val(),
	        $(body +" "+ settings.screen_size).val(),
	        $(body +" "+ settings.battery).val(),
	        $(body +" "+ settings.os).val(),
	        $(body +" "+ settings.camera).val()
	    )
	}
	function placeTabletInForm(tablet){
		//alert("from tablet form")
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
			case "Desktop" : myItem = formToDesktopItem(defaultSettings, "");break;
			case "Monitor" : myItem = formToMonitorItem(defaultSettings, "");break;
			case "laptop" : myItem = formToLaptopItem(defaultSettings, "");break;
			case "Tablet" : myItem = formToTabletItem(defaultSettings, "");break;
		}
		//alert("check this > "+JSON.stringify(myItem,null,"\t"))
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