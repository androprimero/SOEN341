//Enable Express Framework
var express = require('express');
var app = express();
app.get("/",function(req,res){
	res.send("Team 1, 341 fall 2017 -- Sample Home Page");
})

app.listen(process.env.PORT || 3000);