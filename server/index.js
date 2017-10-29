//Enable Express Framework
var express = require('express');
var app = express();
//Item Desktop
var Monitor = require("./Products/Monitor.js");
var myMonitor = new Monitor("A_Model_Number", "39.99","1,2kg","Acs","22\"");
app.get("/",function(req,res){
	res.setHeader("Content-Type","text/html");
	res.write("Team 1, 341 fall 2017 -- Sample Home Page <br>");
	res.write(JSON.stringify(myMonitor));
	res.end();
})

app.listen(process.env.PORT || 3000);