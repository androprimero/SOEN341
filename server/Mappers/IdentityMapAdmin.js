/**
 * IdentityMap for administrator users
 */
var path = require('path');
var Product = require(path.join(__dirname, '..', 'Products/Product.js'));
var arrayProducts = [];
function IdentityMap(){}
IdentityMap.addProduct = function (product){
	if(product.hasOwnProperty('Model_Number')){
		if(arrayProducts.length === 0){
			arrayProducts = new Array(product);
		}else{
			arrayProducts.push(product);
		}
	}else{
		console.log("Attemp to add products only");
	}
};
IdentityMap.deleteProduct = function (ModelNumber){
	var i = 0;
	var found = false;
	var pos = 0;
	while((i < arrayProducts.length) && (arrayProducts[i].Model_Number !== ModelNumber)){
		i++;
		if((i < arrayProducts.length)&&(arrayProducts[i].Model_Number == ModelNumber)){
			found = true;
			pos = i;
		}
	}
	if(found){
		arrayProducts.splice(pos,1);
	}
	return found;
};
IdentityMap.findProduct = function(ModelNumber){
	var i = 0;
	while((i < arrayProducts.length)&&(arrayProducts[i].Model_Number != ModelNumber)){
		i++;
	}
	if(i >= arrayProducts.length){
		console.log("Product " + ModelNumber+" does not exists");
		return null;
	}
	return arrayProducts[i];
};
module.exports = IdentityMap;