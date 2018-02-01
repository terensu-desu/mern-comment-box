"use strict";

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var Comment = require("./model/comments");

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;

//db config
mongoose.connect("mongodb://admin:admin@ds215388.mlab.com:15388/comment-box");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, HEAD, OPTIONS, POST, PUT, DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
	);

	res.setHeader("Cache-Control", "no-cache");
	next();
});

//now we can set the route path & initialize the API
router.get("/", function(req, res) {
	res.json({ message: "API Initialized!" });
});

//adding the /comments route to our /api router
router
	.route("/comments")
	//retrieve all comments from database
	.get(function(req, res) {
		//looks at our Comment Schema
		Comment.find(function(err, comments) {
			if (err) res.send(err);
			//responds with a json object of our database comments
			res.json(comments);
		});
	})
	//post new comment to database
	.post(function(req, res) {
		var comment = new Comment();
		//body parser lets us use the req.body
		comment.author = req.body.author;
		comment.text = req.body.text;

		comment.save(function(err) {
			if (err) res.send(err);
			res.json({ message: "Comment successfully added!" });
		});
	});

//Use our router configuration when we call /api
app.use("/api", router);

app.listen(port, function() {
	console.log(`api running on port ${port}`);
});
