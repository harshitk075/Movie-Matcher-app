var express = require('express');
var app= express();
var request = require('request');
var bodyparser= require('body-parser');
const ejsLint = require('ejs-lint');

ejsLint("res.ejs","-d");
ejsLint("page.ejs","-d");
ejsLint("infopage.ejs","-d");

//linking the css files to main 
app.use(express.static("decfiles"));

//making our routes
app.get("/",(req,res)=>{
	res.render("page.ejs");
});

app.get("/aboutpage",(req,res)=>{
	res.render("aboutme.ejs");
});

app.get("/infopage",(req,res)=>{
    var a= req.query.t;
	var b= req.query.type;
	var c= req.query.y;
	var d= req.query.plot;	
	
	var url= "http://omdbapi.com/?t="+a+"&type="+b+"&y="+c+"&plot="+d+"&apikey=thewdb";
	//i will place my api request here
	request(url,(error,response,body)=>{
		if(!error && response.statusCode==200){
			var fetch=  JSON.parse(body);
			 
			res.render("infopage.ejs",{fetch:fetch});	
			//res.send(data["Search"]);
		}
		else{
			res.send("Check FoR ErrOR");
     }
	});
});


// make an array to store video trailer IDS to be renderd
app.get("/movie",(req,res)=>{
	var x= req.query.k;
	var y= req.query.t;
	var z= req.query.y;
	
	var url= "http://omdbapi.com/?s="+x+"&type="+y+"&y="+z+"&apikey=thewdb";
	//i will place my api request here
	request(url,(error,response,body)=>{
		if(!error && response.statusCode==200){
			var data=  JSON.parse(body);
		
			res.render("res.ejs",{data:data});	
			//res.send(data["Search"]);
		}
		else{
			res.send("Check FoR ErrOR");
     }
	});
});



app.listen(process.env.PORT,()=>{
	console.log("server started");
});



