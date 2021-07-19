var express = require('express');
var request = require('request');
var bodyparser = require('body-parser');
const ejsLint = require('ejs-lint');

var app = express();

ejsLint("res.ejs", "-d");
ejsLint("page.ejs", "-d");
ejsLint("infopage.ejs", "-d");

//serve static from decfiles
app.use(express.static("decfiles"));
//making our routes
app.get("/", (req, res) => {
	res.render("page.ejs");

});

app.get("/aboutpage", (req, res) => {
	res.render("aboutme.ejs");
});

app.get("/infopage", (req, res) => {
	var a = req.query.t;
	var b = req.query.type;
	var c = req.query.y;
	var d = req.query.plot;

	var url = "https://omdbapi.com/?t=" + a + "&type=" + b + "&y=" + c + "&plot=" + d + "&apikey=thewdb";
	//i will place my api request here
	request(url, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			var fetch = JSON.parse(body);

			res.render("infopage.ejs", { fetch: fetch });
			//res.send(data["Search"]);
		}
		else {
			res.send("Check FoR ErrOR");
		}
	});
});

//url to redirect from res page to info page with data
app.get("/explore", (req, res) => {
	var a = req.query.title;
	//console.log(a);
	var url = "https://omdbapi.com/?t=" + a + "&apikey=thewdb";
	//i will place my api request here
	request(url, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			var fetch = JSON.parse(body);

			res.render("infopage.ejs", { fetch: fetch });
			//res.send(data["Search"]);
		}
		else {
			res.send("Check FoR ErrOR");
		}	
	});
});

app.get("/movie", (req, res) => {
	var x = req.query.k;
	var y = req.query.t;
	var z = req.query.y;

	var url = "https://omdbapi.com/?s=" + x + "&type=" + y + "&y=" + z + "&apikey=thewdb";
	//i will place my api request here
	request(url, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("res.ejs", { data: data });
			//res.send(data["Search"]);
		}
		else {
			res.send("Check FoR ErrOR");
		}
	});
});

//  https://movie-matcher-ml-api.herokuapp.com/
app.get("/recommend", (req, res) => {
	var a = req.query.movie_name;
	var url = `https://movie-matcher-ml-api.herokuapp.com/?movie_title=${a}`;
	//console.log(url);
	//i will place my api request here
	request(url, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);

			// console.log(response.statusCode);
			//console.log(data); 
			res.render("recommended.ejs", { data: data });
		}
		else {
			res.send("Check FoR ErrOR");
		}
	});
	// res.render("recommended.ejs");
});

app.listen(process.env.PORT, () => {
	console.log("server started");
});
//process.env.PORT