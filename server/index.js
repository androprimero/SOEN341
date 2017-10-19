var express = require('express');
var app = express();
var cors = require('cors');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var passage = 'yet_the_Beast_look_after_Neverthless';
//implement libraries to Express
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mysql = require("mysql");
//MySQL Connection Statement
class ConnectMySQL{
	constructor(){
		// this.conn = mysql.createConnection({
			// host: "soen341-project.col3eyfiffm2.us-east-1.rds.amazonaws.com",
			// port: 3306,
			// user: "administrator",
			// password: "administrator",
			// database: "project"
		// })
		this.name_table="items",
		this.login_table="clients"
	}
	test(){
		this.conn.connect(function(err){
			if(err)throw err
			console.log("good");
		})
	}
	select_query(sql_script,callback){
		//solve, var query undefined
		var conn = mysql.createConnection({
			host: "soen341-project.col3eyfiffm2.us-east-1.rds.amazonaws.com",
			port: 3306,
			user: "administrator",
			password: "administrator",
			database: "project"
		})
		conn.connect(function(err){
			if(err){throw err};
			conn.query(sql_script,function(err,result,fields){
				if(err) {throw err};
				return callback(result);
			})
		})
	}
	execute_desktop_select(skip, amountPerPage,type, processor, ram,cores, hard_drive_size,brand,orderBy,callBack){
		var sql = "select id,width,height,depth,weight,processor,ram,`cpu cores`,`hard drive size`, brand,model,price from "+this.name_table+" where type='"+type+"'";
		if(processor!=="*") sql+=" and processor='"+processor+"'";
		if(ram!=="*") sql+=" and ram='"+ram+"'";
		if(cores!=="*") sql+=" and `cpu cores`='"+cores+"'";
		if(hard_drive_size!=="*") sql+=" and `hard drive size`='"+hard_drive_size+"'";
		if(brand!=="*") sql+=" and brand='"+brand+"'";
		if(orderBy==="low_high_price")sql +=" order by price";
		else if(orderBy==="high_low_price")sql +=" order by price desc";
		else if(orderBy==="order_alpha")sql +=" order by brand";
		else if(orderBy==="reverse_order_alpha")sql +=" order by brand desc";
		sql+=" limit "+skip*amountPerPage+", "+amountPerPage;
		//return sql
		this.select_query(sql,function(result){
			return callBack(result);
		});
		//console.log(result);
	}
	///:skip/:amountPerPage/monitor/:screen_size/:brand/:orderBy
	execute_monitor_select(skip, amountPerPage,type, screen_size, brand, orderBy,callBack){
		var sql = "select id,`screen size`,weight,brand,model,price from "+this.name_table+" where type='"+type+"'";
		if(screen_size!=="*") sql+=" and `screen size`='"+screen_size+"'";
		if(brand!=="*") sql+=" and brand='"+brand+"'";
		if(orderBy==="low_high_price")sql +=" order by price";
		else if(orderBy==="high_low_price")sql +=" order by price desc";
		else if(orderBy==="order_alpha")sql +=" order by brand";
		else if(orderBy==="reverse_order_alpha")sql +=" order by brand desc";
		sql+=" limit "+skip*amountPerPage+", "+amountPerPage;
		//return sql
		this.select_query(sql,function(result){
			return callBack(result);
		});
		//console.log(result);
	}
	execute_laptop_select(skip, amountPerPage,type, screen_size,processor,ram,cores,hard_drive_size,battery, brand, os, orderBy,callBack){
		var sql = "select id,`screen size`,weight,processor,ram,`cpu cores`,`hard drive size`,battery,brand,model,os,price from "+this.name_table+" where type='"+type+"'";
		if(screen_size!=="*") sql+=" and `screen size`='"+screen_size+"'";
		if(processor!=="*") sql+=" and processor='"+processor+"'";
		if(ram!=="*") sql+=" and ram='"+ram+"'";
		if(cores!=="*") sql+=" and `cpu cores`='"+cores+"'";
		if(hard_drive_size!=="*") sql+=" and `hard drive size`='"+hard_drive_size+"'";
		if(battery!=="*") sql+=" and battery='"+battery+"'";
		if(brand!=="*") sql+=" and brand='"+brand+"'";
		if(os!=="*") sql+=" and os='"+os+"'";
		if(orderBy==="low_high_price")sql +=" order by price";
		else if(orderBy==="high_low_price")sql +=" order by price desc";
		else if(orderBy==="order_alpha")sql +=" order by brand";
		else if(orderBy==="reverse_order_alpha")sql +=" order by brand desc";
		sql+=" limit "+skip*amountPerPage+", "+amountPerPage;
		//return sql
		this.select_query(sql,function(result){
			return callBack(result);
		});
		//console.log(result);
	}
	execute_tablet_select(skip, amountPerPage,type, screen_size,processor,ram,cores,hard_drive_size,battery, brand, os, camera, orderBy,callBack){
		var sql = "select * from "+this.name_table+" where type='"+type+"'";
		if(screen_size!=="*") sql+=" and `screen size`='"+screen_size+"'";
		if(processor!=="*") sql+=" and processor='"+processor+"'";
		if(ram!=="*") sql+=" and ram='"+ram+"'";
		if(cores!=="*") sql+=" and `cpu cores`='"+cores+"'";
		if(hard_drive_size!=="*") sql+=" and `hard drive size`='"+hard_drive_size+"'";
		if(battery!=="*") sql+=" and battery='"+battery+"'";
		if(brand!=="*") sql+=" and brand='"+brand+"'";
		if(os!=="*") sql+=" and os='"+os+"'";
		if(camera!=="*") sql+=" and camera='"+camera+"'";
		if(orderBy==="low_high_price")sql +=" order by price";
		else if(orderBy==="high_low_price")sql +=" order by price desc";
		else if(orderBy==="order_alpha")sql +=" order by brand";
		else if(orderBy==="reverse_order_alpha")sql +=" order by brand desc";
		sql+=" limit "+skip*amountPerPage+", "+amountPerPage;
		console.log(sql);
		//return sql
		this.select_query(sql,function(result){
			return callBack(result);
		});
		//console.log(result);
	}
	execute_match(email,password,callBack){
		var sql="select id,first,last,email, privilege from "+this.login_table+" where email='"+email+"' and password='"+password+"'";
		console.log(sql);
		this.select_query(sql,function(result){
			return callBack(result);
		});
	}
	//desktop/:processor/:ram/:cores/:hard_drive_size/:brand/:price
	execute_insert_desktop(type,processor,ram,cores,hard_drive_size,brand,price,callBack){
		var sql="insert into "+this.name_table+" ( type";
		if(processor!=="*") sql+=", processor";
		if(ram!=="*") sql+=", ram";
		if(cores!=="*") sql+=", `cpu cores`";
		if(hard_drive_size!=="*")sql+=", `hard drive size`";
		if(brand!=="*") sql+=", brand";
		if(price!=="*") sql+=", price";
		sql+=") values ( '"+type+"'";
		if(processor!=="*") sql+=", '"+processor+"'";
		if(ram!=="*") sql+=", '"+ram+"'";
		if(cores!=="*") sql+=", "+cores+"";
		if(hard_drive_size!=="*") sql+=", '"+hard_drive_size+"'";
		if(brand!=="*") sql+=", '"+brand+"'";
		if(price!=="*") sql+=", "+price+"";
		sql+=")"
		console.log(sql);
		this.select_query(sql,function(result){
			return callBack(result);
		});
	}
	execute_insert_monitor(type,screen_size,brand,price,callBack){
		var sql="insert into "+this.name_table+" ( type";
		if(screen_size!=="*") sql+=", `screen size`";
		if(brand!=="*") sql+=", brand";
		if(price!=="*") sql+=", price";
		sql+=") values ( '"+type+"'";
		if(screen_size!=="*") sql+=", "+screen_size+"";
		if(brand!=="*") sql+=", '"+brand+"'";
		if(price!=="*") sql+=", "+price+"";
		sql+=")"
		console.log(sql);
		this.select_query(sql,function(result){
			return callBack(result);
		});
	}
	//laptop/:screen_size/:processor/:ram/:cores/:hard_drive_size/:battery/:brand/:os/:price
	execute_insert_laptop(type,screen_size,processor,ram,cores,hard_drive_size,battery,brand,os,price,callBack){
		var sql="insert into "+this.name_table+" ( type";
		if(screen_size!=="*") sql+=", `screen size`";
		if(processor!=="*") sql+=", processor";
		if(ram!=="*") sql+=", ram";
		if(cores!=="*") sql+=", `cpu cores`";
		if(hard_drive_size!=="*")sql+=", `hard drive size`";
		if(battery!=="*")sql+=", battery";
		if(brand!=="*") sql+=", brand";
		if(os!=="*") sql+=", os";
		if(price!=="*") sql+=", price";
		sql+=") values ( '"+type+"'";
		if(screen_size!=="*") sql+=", "+screen_size+"";
		if(processor!=="*") sql+=", '"+processor+"'";
		if(ram!=="*") sql+=", '"+ram+"'";
		if(cores!=="*") sql+=", "+cores+"";
		if(hard_drive_size!=="*") sql+=", '"+hard_drive_size+"'";
		if(battery!=="*") sql+=",    "+battery+"";
		if(brand!=="*") sql+=", '"+brand+"'";
		if(os!=="*") sql+=", '"+os+"'";
		if(price!=="*") sql+=", "+price+"";
		sql+=")"
		console.log(sql);
		this.select_query(sql,function(result){
			return callBack(result);
		});
	}
	//tablet/:screen_size/:processor/:ram/:cores/:hard_drive_size/:battery/:brand/:os/:camera/:price
	execute_insert_tablet(type,screen_size,processor,ram,cores,hard_drive_size,battery,brand,os,camera,price,callBack){
		var sql="insert into "+this.name_table+" ( type";
		if(screen_size!=="*") sql+=", `screen size`";
		if(processor!=="*") sql+=", processor";
		if(ram!=="*") sql+=", ram";
		if(cores!=="*") sql+=", `cpu cores`";
		if(hard_drive_size!=="*")sql+=", `hard drive size`";
		if(battery!=="*")sql+=", battery";
		if(brand!=="*") sql+=", brand";
		if(os!=="*") sql+=", os";
		if(camera!=="*") sql+=", camera";
		if(price!=="*") sql+=", price";
		sql+=") values ( '"+type+"'";
		if(screen_size!=="*") sql+=", "+screen_size+"";
		if(processor!=="*") sql+=", '"+processor+"'";
		if(ram!=="*") sql+=", '"+ram+"'";
		if(cores!=="*") sql+=", "+cores+"";
		if(hard_drive_size!=="*") sql+=", '"+hard_drive_size+"'";
		if(battery!=="*") sql+=",    "+battery+"";
		if(brand!=="*") sql+=", '"+brand+"'";
		if(os!=="*") sql+=", '"+os+"'";
		if(camera!=="*") sql+=", "+camera+"";
		if(price!=="*") sql+=", "+price+"";
		sql+=")"
		console.log(sql);
		this.select_query(sql,function(result){
			return callBack(result);
		});
	}
}
function json_result(page,type,orderBy,result){
	var objs={}
	objs["status"]="ok";
	objs["type"]=type;
	objs["numberOfItems"]=result.length;
	objs["orderBy"]=orderBy;
	objs["currentPage"]=page;
	objs["items"]=result
	// var objs = JSON.stringify(result);
	return JSON.stringify(objs,null,"\t")
}
function json_login_result(result){
	var objs={};
	objs["status"]="ok";
	objs["id"]=result[0]["id"];
	objs["first"]=result[0]["first"];
	objs["last"]=result[0]["last"];
	objs["email"]=result[0]["email"];
	objs["privilege"]=result[0]["privilege"];
	return objs;
	
}
let con = new ConnectMySQL();
//request Desktop
app.get("/:skip/:amountPerPage/desktop/:processor/:ram/:cores/:hard_drive_size/:brand/:orderBy",function(req, res){
	res.setHeader('Content-Type','text/json');
	res.writeHead(200);
		con.execute_desktop_select(req.params.skip,req.params.amountPerPage,"desktop",req.params.processor,req.params.ram,req.params.cores,req.params.hard_drive_size,req.params.brand,req.params.orderBy,function(result){
			console.log(result)
			console.log("------------------------------------------");
			var obj = json_result((parseInt(req.params.skip)+1),"desktop",req.params.orderBy,result);
			res.end(obj);
		});
})
//request Monitor
app.get("/:skip/:amountPerPage/monitor/:screen_size/:brand/:orderBy",function(req, res){
	res.setHeader("Content-Type","text/json")
	res.writeHead(200);
	// skip, amountPerPage,type, screen_size, brand, orderBy,callBack
	con.execute_monitor_select(req.params.skip,req.params.amountPerPage,"monitor",req.params.screen_size,req.params.brand,req.params.orderBy,function(result){
		console.log(result)
		console.log("------------------------------------------");
		var obj = json_result((parseInt(req.params.skip)+1),"monitor",req.params.orderBy,result);
		res.end(obj);
	})
})
//request Laptop
app.get("/:skip/:amountPerPage/laptop/:screen_size/:processor/:ram/:cores/:hard_drive_size/:battery/:brand/:os/:orderBy",function(req, res){
	res.setHeader("Content-Type","text/json")
	res.writeHead(200);
	
	con.execute_laptop_select(req.params.skip,req.params.amountPerPage,"laptop",req.params.screen_size,req.params.processor,req.params.ram,req.params.cores,req.params.hard_drive_size,req.params.battery,req.params.brand,req.params.os,req.params.orderBy,function(result){
		console.log(result)
		console.log("------------------------------------------");
		var obj = json_result((parseInt(req.params.skip)+1),"laptop",req.params.orderBy,result);
		res.end(obj);
	})
})
//request tablet
app.get("/:skip/:amountPerPage/tablet/:screen_size/:processor/:ram/:cores/:hard_drive_size/:battery/:brand/:os/:camera/:orderBy",function(req, res){
	res.setHeader("Content-Type","text/json")
	res.writeHead(200);
	
	con.execute_tablet_select(req.params.skip,req.params.amountPerPage,"tablet",req.params.screen_size,req.params.processor,req.params.ram,req.params.cores,req.params.hard_drive_size,req.params.battery,req.params.brand,req.params.os,req.params.camera,req.params.orderBy,function(result){
		console.log(result)
		console.log("------------------------------------------");
		var obj = json_result((parseInt(req.params.skip)+1),"tablet",req.params.orderBy,result);
		res.end(obj);
	})
})
//create token
app.post("/authenticate",function(req,res){
	res.setHeader("Content-Type","text/json")
	var objs={};
	con.execute_match(req.body.email,req.body.password,function(result){
		if(result.length!=1){
			res.writeHead(401);
			res.end(JSON.stringify({"status":"auth_no_match"},null,"\t"))
		}
		else{
			res.writeHead(200);
			var rslt=json_login_result(result);
			var token = jwt.sign(rslt, passage,{ expiresIn: 60*60*12 })
			var without_id_result=JSON.stringify({"status":"ok","first":result[0]["first"],"last":result[0]["last"],"token":token,"privilege":result[0]["privilege"]},null,"\t");
			res.end( without_id_result );
		}
	})
	// console.log("ok to");
})
//insert Desktop
app.post("/item_insert/desktop/:processor/:ram/:cores/:hard_drive_size/:brand/:price",function(req,res){
	res.setHeader("Content-Type","text/json")
	jwt.verify(req.body.token, passage, function(err,decoded){
		if(err){
			res.writeHead(401);
			res.end(JSON.stringify({"status":"no_element_inserted","message":"Token does not exists or is not valid"},null,"\t"));
		}
		else{
			con.execute_insert_desktop("desktop",req.params.processor,req.params.ram,req.params.cores,req.params.hard_drive_size,req.params.brand,req.params.price,function(result){
				if(result["affectedRows"]==1){
					res.writeHead(200);
					var rslt=JSON.stringify({"status":"ok","message":"item inserted"},null,"\t");
					res.end(rslt);
				}
				else{
					res.writeHead(400);
					var rslt=JSON.stringify({"status":"no_element_inserted","message":"parameters or server side error"},null,"\t");
					res.end(rslt);
				}
			})
		}
	})
})
//insert Monitor
app.post("/item_insert/monitor/:screen_size/:brand/:price",function(req,res){
	res.setHeader("Content-Type","text/json")
	jwt.verify(req.body.token, passage, function(err,decoded){
		if(err){
			res.writeHead(401);
			res.end(JSON.stringify({"status":"no_element_inserted","message":"Token does not exists or is not valid"},null,"\t"));
		}
		else{
			con.execute_insert_monitor("monitor",req.params.screen_size,req.params.brand,req.params.price,function(result){
				if(result["affectedRows"]==1){
					res.writeHead(200);
					var rslt=JSON.stringify({"status":"ok","message":"item inserted"},null,"\t");
					res.end(rslt);
				}
				else{
					res.writeHead(401);
					var rslt=JSON.stringify({"status":"no_element_inserted","message":"parameters or server side error"},null,"\t");
					res.end(rslt);
				}
			})
		}
	})
})
//insert Laptop
app.post("/item_insert/laptop/:screen_size/:processor/:ram/:cores/:hard_drive_size/:battery/:brand/:os/:price",function(req,res){
	res.setHeader("Content-Type","text/json")
	jwt.verify(req.body.token, passage, function(err,decoded){
		if(err){
			res.writeHead(401);
			res.end(JSON.stringify({"status":"no_element_inserted","message":"Token does not exists or is not valid"},null,"\t"));
		}
		else{
			con.execute_insert_laptop("laptop",req.params.screen_size,req.params.processor,req.params.ram,req.params.cores,req.params.hard_drive_size,req.params.battery,req.params.brand,req.params.os,req.params.price,function(result){
				if(result["affectedRows"]==1){
					res.writeHead(200);
					var rslt=JSON.stringify({"status":"ok","message":"item inserted"},null,"\t");
					res.end(rslt);
				}
				else{
					res.writeHead(400);
					var rslt=JSON.stringify({"status":"no_element_inserted","message":"parameters or server side error"},null,"\t");
					res.end(rslt);
				}
			})
		}
	})
})
//insert Tablet
app.post("/item_insert/tablet/:screen_size/:processor/:ram/:cores/:hard_drive_size/:battery/:brand/:os/:camera/:price",function(req,res){
	res.setHeader("Content-Type","text/json")
	jwt.verify(req.body.token, passage, function(err,decoded){
		if(err){
			res.writeHead(401);
			res.end(JSON.stringify({"status":"no_element_inserted","message":"Token does not exists or is not valid"},null,"\t"));
		}
		else{
			con.execute_insert_tablet("tablet",req.params.screen_size,req.params.processor,req.params.ram,req.params.cores,req.params.hard_drive_size,req.params.battery,req.params.brand,req.params.os,req.params.camera,req.params.price,function(result){
				if(result["affectedRows"]==1){
					res.writeHead(200);
					var rslt=JSON.stringify({"status":"ok","message":"item inserted"},null,"\t");
					res.end(rslt);
				}
				else{
					res.writeHead(400);
					var rslt=JSON.stringify({"status":"no_element_inserted","message":"parameters or server side error"},null,"\t");
					res.end(rslt);
				}
			})
		}
	})
})
app.post("/logout",function(req,res){
	res.setHeader("Content-Type","text/json")
	res.writeHead(200);
	res.end(JSON.stringify({"status":"no_action_by_server"},null,'\t'))
})

app.listen(process.env.PORT || 3000);