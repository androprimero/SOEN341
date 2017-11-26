/**
 * Wishlist for client users (identity map of wishlist client)
 */
var path = require('path');
var Product = require(path.join(__dirname, '..', 'Products/Product.js'));
function Wishlist(){
	var Wish_list = [];
	function addToWishlist(userID,product){
		var c = Wishlist.find(userID);
		wishlistAdd(userID,product);	
	}
	function deleteFromWishlist(userID,model_number){
		var c = Wishlist.find(userID);
		wishlistDelete(c,model_number);
	}
	function find(userID){
		var i = 0;
		while((i < Wish_list.length) && (Wish_list[i].Id !== userID)){
			i++;
			if(Wish_list[i].Id === userID){
				return Wish_list[i];				
			}
		}
		return null;	
	}
	function wishlistAdd(c,product){
		var i = 0;
		if(c.myWishlist.length === 0){
			c.myWishlist = new Array(product);
		}
		else{
			while((i < c.myWishlist.length) && (c.myWishlist[i] !== product)){
				i++;
			}
			if(c.myWishlist[i-1] !== product){
					c.myWishlist.push(product);
					console.log("Product has been Added to the Wishlist");
			}
			else{
				console.log("Wishlist Has Already that product");
			}
		}
	}
	function wishlistDelete(c, model_number){
	var i = 0;
	var found = false;
	var pos = 0;
	while((i < c.myWishlist.length) && (c.myWishlist[i].Model_Number !== product.Model_Number)){
		if((i < c.myWishlist.length)&&(c.myWishlist[i].Model_Number == product.Model_Number)){
			found = true;
			pos = i;
		}
		i++;
	}
	if(found){
		c.myWishlist.splice(pos,1);
	}
	return found;
	}
}
module.exports = Wishlist;
