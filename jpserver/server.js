const app = require("express")();
const http = require("http").Server(app);
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Embarc";

/*
MongoClient.connect(url, function(err, db) {
	if (err) throw err;

	var journey_1 = {
		name: "brooklyn boulders",
		participants: {
			id_1: {
				name: "John Peters",
            		rating: 5,
				diary: "I loved this trip!",
				pics:["www.google.com"],
				answers:[
					"I gave the journey this rating because I loved the trip!",
					"I like rock climbing",
					"I would make sure we go past 6 feet",
					"I learned to face my fears!",
					"The instructor was great and really helpful!",
					"I learned about some really cool career choices."
				]
			},
			id_2: {
				name: "Bob Jones",
            		rating: 1,
				diary:"I hated this trip!!!",
				pics: ["www.google.com"],
				answers:[
					"I gave this trip this rating because I hate rock climbing!",
					"I hate rock climbing",
					"I want to go past 6 feet next time!!!",
					"I did not learn any	thing!",
					"I enjoyed meeting the instructor",
					"I learned how to rock climb."
				]
			}
	  	},
		date: "December 29, 2017",
		loc: "Brooklyn Boulders",
		pictures: [],
		messages: [],
		averageRating: 3.2
	};

	db.collection("Journeys").insertOne(journey_1, function(err, res) {
        if (err) throw err;
		console.log(res);
        console.log("1 document inserted");
        db.collection("Journeys").find({}).toArray((err, res) => {
			console.log(res);
		});
		db.close();
    });
});
*/


app.get('/getJourney', (req, res) => {
		MongoClient.connect(url, function(err, db) {
			if (err) throw err;

			db.collection("Journeys").find({"journeyId":req.query.id}).toArray((err, result) => {
				console.log(result);
				db.close();
			});

		});

});



app.get('/', function (req, res) {
    console.log("someone here");
    res.send("hello world!!");
});


app.listen(3000, () => {
    console.log("Starting Hackathon server...");
});
