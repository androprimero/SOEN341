function Controller(){
	this.verifyProduct=function(modelNumber,fn){
		var theUrl = '/verifyProduct/byModelNumber/'+modelNumber;
		ajaxGET(theUrl,function(result){
			fn(result)
		})
	}
	this.insertItem = function(product,fn){
		var theUrl = '/insertProduct';
		var el ={};
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
		var data={}
		data.p = p;
		data.token = localStorage.getItem("token");
		var mData = JSON.stringify(data,null,"\t");
		ajaxPOST("/wishlistAdd",mData,function(result){
			fn(result);
		})
	}
	this.wishlistDelete=function(model,fn){
		var data={}
		data.p = p;
		data.token = localStorage.getItem("token");
		var mData = JSON.stringify(data,null,"\t");
		ajaxPOST("/wishlistDelete",mData,function(status,result){
			fn(status,result);
		})
	}
	this.getMyWishlist = function(fn){
		data = localStorage.getItem("token");
		ajaxPOST("/getWishlist",data,function(status,result){
			fn(status,result);
		})
	}
	this.commitWishlist = function(fn){
		var data={}
		data.token = localStorage.getItem("token");
		var mData = JSON.stringify(data,null,"\t");
		ajaxPOST("/commitWishlist",mData,function(result){
			fn(result);
		})
	}
	this.signIn = function(email, pass, fn){
		var theUrl = '/signin';
		var prop = {}
	    prop.email = email;
	    prop.pass = pass;
	    var data = JSON.stringify(prop, null, "\t")
		ajaxPOST(theUrl,data,function(status,token){
			console.log(token);
			if (!status){
				//alert("Wrong")
				fn(null);
			}
			else{
				//alert("Wrong//")
				//alert(JSON.stringify(token));
				var real=token.split(" ");
				console.log(token)
				if(real[1]==="true"){
					fn(real[0],true);
				}
				else{
					fn(real[0],false)
				}
			}
		})
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
				//alert("System couldn't add the item to the catalog. Please try again later!")
			}
		});

	}
}

