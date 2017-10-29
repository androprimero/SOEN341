//Enable Express Framework
var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, 'web')));
app.get("/Hello",function(req,res){
	res.setHeader("Content-Type","text/html");
	res.write("Team 1, 341 fall 2017 -- Sample Home Page <br>");
	res.end();
})

app.listen(process.env.PORT || 3000);
