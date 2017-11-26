/**
 * IdentityMap for administrator users using the singleton pattern
 */
var path = require('path');
var Product = require(path.join(__dirname, '..', 'Products/Product.js'));
var identityMapSingleton = require('./IdentityMap.js');
var IdentityMapSinlgeton = (function(){
	var instance=null;
	//private Class
	function IdentityMap(){
		var arrayProducts = [];
		//public methods
		this.addProduct = function (product){
			if(product.hasOwnProperty('Model_Number')){
				if(arrayProducts.length === 0){
					arrayProducts = new Array(product);
					return true;
				}else{
					arrayProducts.push(product);
					return true;
				}
			}else{
				console.log("Attemp to add products only");
				return false;
			}
		};
		this.deleteProduct = function (ModelNumber){
			var found = null;
			for(var i =0;i<arrayProducts.length;i++){
				if(arrayProducts[i].Model_Number === ModelNumber){
					found = arrayProducts[i];
					arrayProducts.splice(i,1);
					break;
				}
			}
			return found;
		};
		this.findProduct = function(ModelNumber){
			var found = null;
			for(var i =0;i<arrayProducts.length;i++){
				if(arrayProducts[i].Model_Number === ModelNumber){
					found = arrayProducts[i];
					//arrayProducts.splice(i,1);
					break;
				}
			}
			return found;
		};
		this.updateProduct=function(product){
			this.deleteProduct(product.Model_Number);
			this.addProduct(product);
			return true;
		}
		this.getArray=function(){
			console.log(arrayProducts)
		}
	}
	//public method
	return{
		// addProduct: function (product){
			// if(product.hasOwnProperty('Model_Number')){
				// if(arrayProducts.length === 0){
					// arrayProducts = new Array(product);
				// }else{
					// arrayProducts.push(product);
				// }
			// }else{
				// console.log("Attemp to add products only");
			// }
		// },
		// deleteProduct: function(ModelNumber){
			// var i = 0;
			// var found = false;
			// var pos = 0;
			// while((i < arrayProducts.length) && (arrayProducts[i].Model_Number !== ModelNumber)){
				// i++;
				// if((i < arrayProducts.length)&&(arrayProducts[i].Model_Number == ModelNumber)){
					// found = true;
					// pos = i;
				// }
			// }
			// if(found){
				// arrayProducts.splice(pos,1);
			// }
			// return found;
		// },
		// findProduct: function (ModelNumber){
			// var i = 0;
			// while((i < arrayProducts.length)&&(arrayProducts[i].Model_Number != ModelNumber)){
				// i++;
			// }
			// if(i >= arrayProducts.length){
				// console.log("Product " + ModelNumber+" does not exists");
				// return null;
			// }
			// return arrayProducts[i];
		// },
		getInstance: function(){
			// console.log("from Here")
			if(instance === null){
				// console.log("creating New");
				instance = new IdentityMap();
				//instance.constructor = null;
			}
			return instance
		}
	}	
})();
module.exports = IdentityMapSinlgeton;
