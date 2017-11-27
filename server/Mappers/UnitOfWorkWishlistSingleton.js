/**
 * Unit Of Work for Client Wishlist users using the singleton pattern
 */
var path = require('path');
var Product = require(path.join(__dirname, '..', 'Products/Product.js'));
var identityMapSingleton = require('./IdentityMap.js');
var clientWork = require('./clientWork.js');
var UnitOfWorkWishlistSinlgeton = (function(){
	var instance=null;
	//private Class
	function UnitOfWorkWishlist(mapper){
		var work = [];
		var Mapper;
		//public methods
		this.registerNewWishlist = function (userID,model_number){
			w = find(userID);
			w.add(model_number);
			
		};
		this.addClient = function(id){
			work.push ( new clientWork(id) );
		}
		this.printArray=function(){
			console.log(work)
		}
		this.registerDelete = function (userID, model_number){
			w = find(userID);
			w.remove(model_number);
		};
		find = function(id){
			var found = null;
			for(var i =0;i<work.length;i++){
				if(work[i].Id === id){
					found = work[i];
					//work.splice(i,1);
					break;
				}
			}
			return found;
		};
		this.getArray=function(){
			console.log(work)
		}
		this.setMapper=function(map){
			Mapper=map;
		}
		this.commitWishlist= function(id,fn){
			console.log("88888888")
			var user = find(id);
			console.log(Mapper)
			w=find(id)
			Mapper.saveWislistNew(id,w.insert,function(result){
				if(result){
					user.insert=[];
				}
				Mapper.deleteWishlistProduct(id,w.remove_,function(result_1){
					if(result_1){
						user.remove_=[];
					}
					if(result && result_1){
						fn (true);
					}
					else{
						fn(false)
					}
				})
			})
		}
	}
	//public method
	return{
		// addProduct: function (product){
			// if(product.hasOwnProperty('Model_Number')){
				// if(work.length === 0){
					// work = new Array(product);
				// }else{
					// work.push(product);
				// }
			// }else{
				// console.log("Attemp to add products only");
			// }
		// },
		// deleteProduct: function(ModelNumber){
			// var i = 0;
			// var found = false;
			// var pos = 0;
			// while((i < work.length) && (work[i].Model_Number !== ModelNumber)){
				// i++;
				// if((i < work.length)&&(work[i].Model_Number == ModelNumber)){
					// found = true;
					// pos = i;
				// }
			// }
			// if(found){
				// work.splice(pos,1);
			// }
			// return found;
		// },
		// findProduct: function (ModelNumber){
			// var i = 0;
			// while((i < work.length)&&(work[i].Model_Number != ModelNumber)){
				// i++;
			// }
			// if(i >= work.length){
				// console.log("Product " + ModelNumber+" does not exists");
				// return null;
			// }
			// return work[i];
		// },
		getInstance: function(){
			// console.log("from Here")
			if(instance === null){
				// console.log("creating New");
				instance = new UnitOfWorkWishlist();
				//instance.constructor = null;
			}
			return instance
		}
	}	
})();
module.exports = UnitOfWorkWishlistSinlgeton;
