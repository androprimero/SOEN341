function Controller(){
	this.verifyProduct=function(modelNumber,fn){
		var theUrl = '/verifyProduct/byModelNumber/'+modelNumber;
		ajaxGET(theUrl,function(result){
			fn(result)
		})
	}
	this.insertItem = function(product,fn){
		var theUrl = '/insertProduct';
		var data = JSON.stringify(product);
		ajaxPOST(theUrl,data,function(result){
			fn(result);
		})
	}
	this.modifyItem = function(product,fn){
		var theUrl = '/updateProduct';
		var data = JSON.stringify(product);
		alert(data);
		ajaxPOST(theUrl,data,function(result){
			if(result){
				fn(true);
			}
			else{
				fn(false);
			}
		})
	}
	this.deleteItem = function(modelNumber,fn){
		var theUrl = '/deleteProduct/byModelNumber/'+modelNumber;
		ajaxPOST(theUrl,"",function(result){
			fn(result);
		})
	}
	this.commitAdmin = function(fn){
		ajaxPOST("/commitAdmin","{}",function(result){
			fn(result);
		})
	}
	this.wishlistAdd=function(p,fn){
		var data = JSON.stringify(p);
		ajaxPOST("/wishlistAdd",data,function(result){
			fn(result);
		})
	}
	this.wishlistDelete=function(model,fn){
		var data = p;
		ajaxPOST("/wishlistDelete",data,function(result){
			fn(result);
		})
	}
	this.commitWishlist = function(fn){
		ajaxPOST("/commitWishlist","{}",function(result){
			fn(result);
		})
	}
	this.signIn = function(email, password, fn){
		var theUrl = '/signin';
		var prop = {}
	    prop.email = email;
	    prop.password = password;
	    var data = JSON.stringify(prop, null, "\t")
		ajaxPOST(theUrl,data,function(result){
			if (result){
				fn(true);
			}
			else{
				fn(false);
			}
		}
	}
	this.ViewInventory = function(type, minSettings, maxSettings, fn) {
	    var theUrl;
	    switch (type) {
	        case 'tablet':
	            theUrl = "/get/tablets";
	            break;
	        case 'desktop':
	            theUrl = "/get/desktops";
	            break;
	        case 'monitor':
	            theUrl = "/get/monitors";
	            break;
	        case 'laptop':
	            theUrl = "/get/laptops";
	            break;
	    }
	    var prop = {}
	    prop.minSettings = minSettings;
	    prop.maxSetting = maxSettings;
	    prop.type = type;
	    var data = JSON.stringify(prop, null, "\t")
	    ajaxPOST(theUrl, data, function(success,result) {
	        alert(JSON.stringify(result));
	        fn(result);
	    })
	}

	this.test=function(){
		alert("oke_2")
	}
	function ajaxGET(url_get,fn){
		$.ajax({
			type: 'GET',
			url: url_get,
			success: function(result){
				fn(result);
			},
			error: function(){
				alert("Error on Verifying!");
			}
		});
	}
	function ajaxPOST(url_post,theData,fn){
		$.ajax({
			type: 'POST',
			url: url_post,
			ContentType: "text/json",
			data: {'data':theData},
			success: function(result){
				// alert(JSON.stringify(result));
				fn(true,result)
			},
			error: function(result){
				fn(false,result);
				alert("System couldn't add the item to the catalog. Please try again later!")
			}
		});

	}
}

