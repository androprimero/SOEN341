/**
 * Wishlist for client users (identity map of wishlist client)
 */
var path = require('path');
var Product = require(path.join(__dirname, '..', 'Products/Product.js'));
var Wishlist=function(clients_pool){
	var Wish_list = clients_pool;
	this.addToWishlist=function(userID,product){
		var c = this.find(userID);
		//console.log("USER FOUND")
		if(c!=null){
			console.log(c);
			wishlistAdd(c,product);	
			return true;
		}
		return false;
	}
	this.deleteFromWishlist = function (userID,model_number){
		var c = this.find(userID);
		if(c!=null){
			wishlistDelete(c,model_number);
			return true;
		}
		else{
			return false;
		}
	}
	this.find = function (userID){
		var found = null;
		for(var i =0;i<Wish_list.length;i++){
			console.log(Wish_list[i].Id+"  ||| "+ userID)
			console.log(Wish_list[i].Id===userID)
			if(Wish_list[i].Id === userID){
				found = Wish_list[i];
				//arrayProducts.splice(i,1);
				break;
			}
		}
		return found;
	}
	wishlistAdd = function (c,product){
		c.myWishlist.push(product);
	}
	this.printArray=function(){
		console.log(Wish_list)
		console.log("////////////////////");
	}
	wishlistDelete = function (c, model_number){
		for(var i =0;i<c.myWishlist.length;i++){
			console.log(c.myWishlist[i].Model_Number+"  ||| "+ model_number)
			console.log(c.myWishlist[i].Model_Number===model_number)
			if(c.myWishlist[i].Model_Number === model_number){
				c.myWishlist.splice(i,1);
				return true;
				//arrayProducts.splice(i,1);
				break;
			}
		}
		return false;
	}
}
module.exports = Wishlist;

