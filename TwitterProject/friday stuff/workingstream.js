var Twit = require("twit");
var config = require("./config");

var express = require("express");
var app = express();

var tweets = {"tweets": [],"tweet": []};

twit_bot = {
	run : function() {
		console.log("the bot is starting");
		var T = new Twit(config);

		var stream = T.stream('statuses/filter', {track: ["beach", "bernie","trump","hillary","cat"]})

		stream.on("tweet", function(tweet) {
			if (tweet.coordinates != null) {
				console.log(tweet.text);
				if (tweet.coordinates.type === 'Point') {
					console.log(tweet.coordinates);
					tweets.tweets.push(tweet.coordinates.coordinates);
					tweets.tweet.push(tweet.text);
				} else {
					console.log(tweet.coordinates.type + ' unimplemented.');
				}
				
				console.log("----");
			}
			
		});
	}
}

twit_bot.run();

var allowCrossDomain = function(req, res, callback) {	
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', 'json,jsonp');

    callback();
}

app.get('/tweets', function(req, res) {
	allowCrossDomain(req, res, function() {
		res.end(JSON.stringify(tweets));
		tweets.tweets = [];
		tweets.tweet = [];
	});
});

var server = app.listen(8081, function() {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("Twit Server listening at http://%s:%s", host, port);	
});

 
/*  
function gotData(err, data, response) {
	var tweets = data.statuses;

	
	for (var i = 0; i < tweets.length; i++){
		console.log(tweets[i].text, tweets[i].coordinates);
	}
};*/