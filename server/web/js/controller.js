function Controller(){
	this.verifyItem=function(modelNumber,fn){
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
				fn(true)
			},
			error: function(result){
				fn(false);
				alert("System couldn't add the item to the catalog. Please try again later!")
			}
		});

	}
}

