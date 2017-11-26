var path = require('path');
var {Desktop, Monitor, laptop, Tablet} = require(path.join(__dirname, '..', 'Products/Product.js'));
var Client = require(path.join(__dirname, '..', 'Users/User.js'));
var Admin = require(path.join(__dirname, '..', 'Users/Administrator.js'));
//Class TableDataGateway
function TableDataGateway(connection){
	conn=connection;
};
//Static Methods
TableDataGateway.test=function(connection){
	conn=connection;
}
TableDataGateway.setConnection = function(connection){
	conn = connection
}
TableDataGateway.connect = function(){
	conn.connect()
}
TableDataGateway.closeConnection = function(){
	conn.end();
}
TableDataGateway.informationProduct = function(Model_Number,fn){
	conn.query("select specification_id from items where model_number = '"+Model_Number+"'",function(err,res){
		if(err){
			console.log(err)
			fn(null);
		}
		//Not Part of Database
		else if (res.rows.length==0){
			console.log("Product Not Part Of Database");
			fn(null)
		}
		//Part of Database
		else if(res.rows.length==1){
			console.log("IN")
			var typeInt = Math.floor((res.rows[0].specification_id)/10000);
			var key = (res.rows[0].specification_id)%10000;
			getProductSpecification(typeInt,key,function(pg_row_result){
				if(pg_row_result==null){
					console.log("Product Specification Not Found");
					fn(null);
				}
				else {
					var product = pgRowResultToObjectProduct(Model_Number,typeInt, pg_row_result);
					//console.log(product);
					fn(product);
				}
			})
			
			
		}
		//Multiple Product found
		else{
			console.log("Error in Database, Duplicate(s) Model Found in Database");
			fn(null);
		}
	})
}
function typeIntToTableString(type){
	var typeInt
	switch(type){
		case 1 : typeInt="desktops";break;
		case 2 : typeInt="monitors";break;
		case 3 : typeInt="laptops";break;
		case 4 : typeInt="tablets";break;
	}
	return typeInt
}
function tableStringToTypeInt(type){
	var typeInt
	switch(type){
		case 'desktops' : typeInt=1;break;
		case 'monitors' : typeInt=2;break;
		case 'laptops' : typeInt=3;break;
		case 'tablets' : typeInt=4;break;
	}
	return typeInt
}
function getProductSpecification(typeInt,key,fn){
	conn.query("select * from "+typeIntToTableString(typeInt)+" where specification_key = "+key,function(err,res){
		if(err){
			console.log(err);
			fn(null);
		}
		else if (res.rows.length==1){
			console.log("okay");
			fn(res.rows[0]);
		}
		else{
			console.log("Error in database entries, duplicate record of specification key found");
			fn(null)
		}
	})
}
function pgRowResultToObjectProduct(Model_Number,typeInt,pg_row_result){
	console.log("///////////////////////////////////")
	console.log(pg_row_result);
	switch(typeInt){
		case 1 : return new Desktop(Model_Number,pg_row_result.price,pg_row_result.weight,pg_row_result.brand,pg_row_result.hard_drive_size,pg_row_result.ram,pg_row_result.cpu_core,pg_row_result.width+" x "+pg_row_result.height+" x "+pg_row_result.depth+" cm",pg_row_result.processor);
		case 2 : return new Monitor(Model_Number, pg_row_result.price,pg_row_result.weight,pg_row_result.brand,pg_row_result.screen_size);
		case 3 : return new laptop(Model_Number,pg_row_result.price,pg_row_result.weight,pg_row_result.brand,pg_row_result.hard_drive_size,pg_row_result.ram,pg_row_result.cpu_core,"N/A",pg_row_result.processor,pg_row_result.screen_size,pg_row_result.battery,pg_row_result.operating_system);
		case 4 : return new Tablet(Model_Number,pg_row_result.price,pg_row_result.weight,pg_row_result.brand,pg_row_result.hard_drive_size,pg_row_result.ram,pg_row_result.cpu_core,pg_row_result.width+" x "+pg_row_result.height+" x "+pg_row_result.depth+" cm",pg_row_result.processor,pg_row_result.screen_size,pg_row_result.battery,pg_row_result.operating_system,pg_row_result.camera) ;
	}
}
// TableDataGateway.typeStringToInt(type){
	// switch(type){
		// case "Tablet" : return 4;break
		// case "Desktop" : return 1;break
		// case "Monitor" : return 2;break
		// case "Laptop" : return 3;break
	// }
// }
function insertSpecification(data,fn){
	// dataToInsertValue(data,function(table,typeInt,columns, values){
		conn.query("insert into "+data.category+" ("+data.getFields()+") values ("+data.toInsertValues()+") returning specification_key",function(err,res){
			if(err){
				console.log(err);
				fn(-1);
			}else{
				fn(res.rows[0].specification_key);
			}
		})
	// })
}
function insertItem(typeInt, model_number,key,fn){
	conn.query("insert into items (model_number, specification_id) values ('"+model_number+"',"+(10000*typeInt+key)+")",function(err,res){
		if(err){
			console.log(err);
			fn(false)
		}
		else{
			console.log("Item Inserted");
			fn(true);
		}
	})
}
TableDataGateway.saveNewProduct = function(product,fn){
	// dataToWhereClause(data,function(table, typeInt,whereClause){
		console.log("select * from "+product.category+" where "+product.toWhereClauseValues());
		conn.query(("select * from "+product.category+" where "+product.toWhereClauseValues()),function(err,res){
			if(err){
				console.log(err);
				fn(false);
			}
			//create new specifiaction
			else if (res.rows.length==0){
				console.log("New Specification");
				insertSpecification(product,function(key){
					if(key<0){
						fn(false);
					}
					else{
						insertItem(product.typeInt,product.Model_Number,key,function(status){
							fn(status);
						})
					}
					
				})
			}
			//specification exist
			else if (res.rows.length==1){
				console.log("Specification exist");
				insertItem(product.typeInt,product.Model_Number,res.rows[0].specification_key,function(status){
					fn(status);
				})
			}
			else{
				console.log("Error in database entries, more than one reccord of the description found")
				fn(false);
			}
		});
	// })
}
function deleteFromItems(Model_Number,fn){
	conn.query("delete from items where model_number = '"+Model_Number+"'",function(err,res){
		if(err){
			console.log(err);
			fn(false)
		}
		else{
			console.log(res);
			fn(true);
		}
	})
}
function deleteFromSpecification (category,key,fn){
	conn.query("delete from "+category+" where specification_key ="+key,function(err,res){
		if(err){
			console.log(err);
			fn(false);
		}
		else{
			fn(true);
		}
	})
}
TableDataGateway.deleteProduct =  function(Model_Number,fn){
	conn.query("select specification_id from items where model_number = '"+Model_Number+"' ",function(err,res){
		if(err){
			console.log(err);
			fn(false);
		}
		else if (res.rows.length>0){
			console.log(res);
			conn.query("select specification_id from items where specification_id = "+res.rows[0].specification_id,function(err,res){
				if(err){
					console.log(err);
					fn(false);
				}
				else if (res.rows.length>1){
					deleteFromItems(Model_Number,function(status){
						if(status){
							console.log("Item delete");
							fn(true)
						}
						else{
							console.log("Deletion Not Made")
							fn(false);
						}
					})
				}
				else if(res.rows.length==1){
					var category = typeIntToTableString(Math.floor(res.rows[0].specification_id/10000));
					var key = res.rows[0].specification_id%10000;
					console.log(key)
					deleteFromSpecification(category,key,function(status){
						if(status){
							console.log("Item specification delete")
							deleteFromItems(Model_Number,function(status){
								if(status){
									console.log("Item Delete");
									fn(true)
								}
								else{
									console.log("Deletion not made");
									fn(false);
								}
							})
						}
					})
				}
				else{
					console.log("Element Not Found")
					fn(false)
				}
			})
		}
		else{
			console.log("Element Not Part Of Database");
		}
	})
}
function getSpecification(product,fn){
	conn.query("select * from "+product.category+" where "+product.toWhereClauseValues(),function(err,res){
		if(err){
			console.log(err);
			fn(null);
		}
		else if (res.rows.length==1){
			fn(res.rows[0].specification_key);
		}
		else if (res.rows.length>1){
			console.log("Error in database, multiple rows found");
			fn(-1)
		}
		else{
			console.log("Element not found");
			fn(-1);
		}
	})
}
function updateItem(Model_Number, specification_id,fn){
	conn.query("update items set specification_id="+specification_id+" where model_number='"+Model_Number+"'",function(err,res){
		if(err){
			console.log(err);
			fn(false);
		}
		else{
			console.log("Item Update");
			fn(true)
		}
	})
}
TableDataGateway.updateProduct = function(product,fn){
	conn.query("select * from items where model_number = '"+product.Model_Number+"'",function(err,res){
		console.log(res);
		if(err){
			console.log(err);
			fn(false);
		}
		else if (res.rows.length==1){
			//console.log(product);
			getSpecification(product,function(key){
				if(key==-1){
					console.log("create new specification");
					insertSpecification(product,function(key){
						var specification_id=product.typeInt*10000+key;
						updateItem(product.Model_Number,specification_id,function(status){
							fn(status)
						})
					})
				}
				else{
					console.log("Specification exist")
					var specification_id=product.typeInt*10000+key;
					console.log(res.rows[0].specification_id);
					console.log(specification_id);
					if(res.rows[0].specification_id==specification_id){
						console.log("No changes to the product, No update made")
						fn(false);
					}
					else{
						updateItem(product.Model_Number,specification_id,function(status){
							fn(status)
						})
					}
				}
			})
		}
		else{
			//console.log(res);
			console.log("Product Not Part Of Database or Error in Database");
			fn(false)
		}
	})
}
TableDataGateway.getCatalog = function(category,fn){
	var typeInt="";
	switch(category){
		case 'desktops' : typeInt=1;break;
		case 'monitors' : typeInt=2;break;
		case 'laptops' : typeInt=3;break;
		case 'tablets' : typeInt=4;break;
	}
	//console.log(typeInt);
	console.log("type chosen is " + typeInt);
	var resultSet={};
	resultSet.type=category
	resultSet.typeInt= typeInt
	conn.query("SELECT * FROM items WHERE CAST(specification_id AS TEXT) LIKE '"+typeInt+"%'",function(err,res){
		if(err){
			console.log(err);
			fn(null);
		}
		else{
			conn.query("select * from "+category,function(err_1,res_1){
				console.log(res.rows);
				console.log("/////From spec/////////");
				console.log(res_1.rows);
				assembleItemWithSpecification(res.rows,res_1.rows,typeInt,function(result){
					//console.log("//////////////////////////////////////////////////////")
					//console.log(result);
					resultSet.rows=result;
					fn(resultSet);
				})
			})
			
		}
	})
}
function assembleItemWithSpecification (items,specifiactions,typeInt,fn){
	var assembled = [];
	for(var i = 0; i<items.length;i++){
		var key = items[i].specification_id%10000;
		var index = searchLocalSpecification(specifiactions,key)
		if(key>-1){
			var product = pgRowResultToObjectProduct(items[i].model_number,typeInt,specifiactions[index]);
			assembled.push(product);
		}
	}
	//var index = searchLocalSpecification(specifiactions,4)
	//console.log(index);
	fn(assembled);
}
function searchLocalSpecification(specifiactions,key){
	for(var i=0; i<specifiactions.length;i++){
		if(specifiactions[i].specification_key==key){
			return i;
		}
	}
	return -1;
}
TableDataGateway.saveWislistNew=function(id,wish,fn){
	if(wish.length>0){
		//insert into wishlistrecords values ('123','44444');
		var sql="";
		for(var i =0;i<wish.length;i++){
			sql+="( '"+id+"', '"+wish[i]+"' ) "
			if(i<(wish.length-1)){
				sql+=", "
			}
		}
		conn.query("insert into wishlistrecords values "+sql,function(err,res){
			if(err){
				console.log(err);
				fn(false)
			}
			else{
				fn(true)
			}
		})
	}
	else{
		fn(true)
	}
}
TableDataGateway.deleteWishlistProduct=function(id,wish,fn){
	if(wish.length>0){
		//delete from wishlistrecords where user_id IN ('3', '3') AND model_number IN ('ELMO','TEDD');
		var sql="";
		var sql_0="";
		var sql_1=""
		for(var i =0;i<wish.length;i++){
			sql_0+="'"+id+"'"
			sql_1+="'"+wish[i]+"'"
			if(i<(wish.length-1)){
				sql_0+=", "
				sql_1+=", "
			}
		}
		console.log("delete from wishlistrecords where user_id IN ("+sql_0+") AND model_number IN ("+sql_1+")")
		conn.query("delete from wishlistrecords where user_id IN ("+sql_0+") AND model_number IN ("+sql_1+")",function(err,res){
			if(err){
				console.log(err);
				fn(false)
			}
			else{
				fn(true)
			}
		})
		console.log("DESLYTE"+wish)
	}
	else{
		fn(true)
	}
}
TableDataGateway.login= function (email,pass,fn){
	conn.query("select * from users where email = '"+email+"' and password = '"+pass+"'",function(err,result){
		if(err || result.rows.length<1){
			fn(null)
		}
		else{
			//IdNumber,FirstName,LastName,Address,EmailAddress,PhoneNumber,Password
			if(result.rows[0].admin){
				var admin = new Admin(result.rows[0].id, result.rows[0].firstname, result.rows[0].lastname,result.rows[0].homeaddress, result.rows[0].email, result.rows[0].phonenumber,result.rows[0].password)
				console.log("isAdmin");
				//console.log(admin);
				fn(admin,true)
			}
			else{
				var client = new Client(result.rows[0].id, result.rows[0].firstname, result.rows[0].lastname,result.rows[0].homeaddress, result.rows[0].email, result.rows[0].phonenumber,result.rows[0].password)
				console.log("is not");
				fn(client,false);
			}
		}
	})
}
// function addSpecifications(conn, resultSet, rows, typeInt, fn){
	// for(var i =0; i<rows.length;i++){
		// var key = (rows[i].specification_id)%10000;
		// var model_number = rows[i].model_number
		// getProductSpecification(conn,typeInt,key,function(pg_row_result){
			// if(pg_row_result!=null) {
				// var product = pgRowResultToObjectProduct(model_number,typeInt,key, pg_row_result);
//				console.log(product);
				// resultSet.rows.push(product);
				// console.log("DURING CPROCESS");
				// console.log(resultSet.rows);
			// }
		// })
	// }
	// fn(resultSet);
// }
module.exports = TableDataGateway;