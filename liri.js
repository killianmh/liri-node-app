require("dotenv").config();
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
	movie_this();
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
		song = "The Sign";
	}
	spotify.search({type: "track", query: song, limit: 1}, function(error, data){
		if(error){
			return console.log(error);
		}
		var result = JSON.stringify(data);
		var artistCount = data.tracks.items[0].artists.length;
		console.log("");
		console.log("Artist(s):");
			for(i = 0; i< artistCount; i++){
				console.log("-" + data.tracks.items[0].artists[i].name);
			}
		console.log("");
		console.log("Song Name:");
		console.log(data.tracks.items[0].name);
		console.log(data.tracks);
		// console.log(data.tracks.items[0].artists[0].name);
	});
}

function movie_this(){

}

function do_what_it_says(){

}

