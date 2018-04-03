require("dotenv").config();
var request = require("request");
var fs = require("fs");

var keys = require("./keys");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);
var client = new twitter(keys.twitter);

var command = process.argv[2];

if(command === "my-tweets"){
	my_tweets();
}
else if(command === "spotify-this-song"){
	var song = process.argv[3];
	spotify_this_song(song);
}
else if(command === "movie-this"){
	var movie = process.argv[3];
	movie_this(movie);
}
else if(command === "do-what-it-says"){
	do_what_it_says();
}
else{
	console.log("Please enter a valid command")
}

function my_tweets(){
	var params = {screen_name: "kiln_licker"};
	client.get("statuses/user_timeline", params, function(error, tweets, response){
		if(error){
			console.log(error)
		}
		for(i = 0; i<20; i++){
			console.log("");
			console.log(tweets[i].text);
			console.log("created on: " + tweets[i].created_at);
			
		}
	
});	
}

function spotify_this_song(song){
	if(song === undefined){
		spotify.request("https://api.spotify.com/v1/search?q=track:The%20Sign%20artist:Ace%20of%20Base&type=track&limit=1")
		.then(function(data){
			console.log("\n");
			console.log("Artist:");
			console.log(data.tracks.items[0].artists[0].name + "\n");
			console.log("Song Name:");
			console.log(data.tracks.items[0].name + "\n");
			console.log("Preview URL:");
			console.log(data.tracks.items[0].preview_url + "\n");
			console.log("Album:");
			console.log(data.tracks.items[0].album.name + "\n");

		})
	}
	else{
		spotify.search({type: "track", query: song, limit: 1}, function(error, data){
			if(error){
				return console.log("Not a valid song name; please try again");
			}
			var artistCount = data.tracks.items[0].artists.length;
			console.log("");
			console.log("Artist(s):");
				for(i = 0; i< artistCount; i++){
					console.log("-" + data.tracks.items[0].artists[i].name);
				}
			console.log("");
			console.log("Song Name:");
			console.log(data.tracks.items[0].name + "\n");
			console.log("Preview URL:");
			console.log(data.tracks.items[0].preview_url + "\n");
			console.log("Album:");
			console.log(data.tracks.items[0].album.name + "\n");
		});	
	}
}

function movie_this(movie){
	if(movie === undefined){
		var queryURL = "https://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy";
		request(queryURL, function(error, response, body){
			if(error){
				return console.log("error: " + error);
			}
			// body = JSON.stringify(body);
			else {
				console.log("");
				console.log("Movie:");
				console.log(JSON.parse(body).Title + "\n");
				console.log("Release Year:");
				console.log(JSON.parse(body).Year + "\n");
				console.log("IMDB Rating:");
				console.log(JSON.parse(body).imdbRating + "\n");
				console.log("Rotten Tomatoes Rating:");
				console.log(JSON.parse(body)["Ratings"][1].Value + "\n");
				console.log("Country of Production:");
				console.log(JSON.parse(body).Country + "\n");
				console.log("Language:");
				console.log(JSON.parse(body).Language + "\n");
				console.log("Plot:");
				console.log(JSON.parse(body).Plot + "\n");
				console.log("Actors:");
				console.log(JSON.parse(body).Actors + "\n");
			}

		})
	}
	else{
		var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
		request(queryURL, function(error, response, body){
			if(error){
				return console.log("error: " + error);
			}
			// body = JSON.stringify(body);
			else{
				console.log("");
				console.log("Movie:");
				console.log(JSON.parse(body).Title + "\n");
				console.log("Release Year:");
				console.log(JSON.parse(body).Year + "\n");
				console.log("IMDB Rating:");
				console.log(JSON.parse(body).imdbRating + "\n");
				console.log("Rotten Tomatoes Rating:");
				console.log(JSON.parse(body)["Ratings"][1].Value + "\n");
				console.log("Country of Production:");
				console.log(JSON.parse(body).Country + "\n");
				console.log("Language:");
				console.log(JSON.parse(body).Language + "\n");
				console.log("Plot:");
				console.log(JSON.parse(body).Plot + "\n");
				console.log("Actors:");
				console.log(JSON.parse(body).Actors + "\n");
			}
			
		})
	}
}

function do_what_it_says(){
	fs.readFile("random.txt", "utf8", function(error, data){
		if(error){
			return console.log(error);
		}
		var text = data.split(",");
		var action = text[0];
		var thing = text[1];

		if(action === "my-tweets"){
			my_tweets();
		}
		else if(action === "spotify-this-song"){
			var song = thing;
			spotify_this_song(song);
		}
		else if(action === "movie-this"){
			var movie = thing;
			movie_this(movie);
		}
		else if(action === "do-what-it-says"){
			console.log("Invalid; this will cause an infinte loop!")
		}
		else{
			console.log("Please type a valid command in random.txt")
		}

	})
}

