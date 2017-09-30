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



app.get('/getListJourneys', (req, res) => {
	MongoClient.connect(url, (err, db) => {
		if (err) throw err;
		
		db.collection("Journeys").find({}).toArray((err2, result) => {
			if (err2) throw err2;
			
			resdata = {};
			for (let i = 0; i < result.length;i++) {
				resdata[parseInt(result[i].journeyId)] = {name: result[i].name, image: result[i].image};
			}
			res.send(resdata);
		});

	});
});



var handleJourneyStudent = (journey, studentID) => {
	let student_journal = journey.journal_entries[`studentid_${studentID}`];

	if (student_journal) {
		return {result:"already_made_journal", rating: student_journal.rating, diary: student_journal.diary};
	} else {
		return {result:"create_journal"};
	}
};

var handleJourneyTeacher = (journey) => {
	var result = {students: [], averageRating: journey.averageRating};
	
	console.log(journey);
	for (var key in journey.journal_entries) {
		let currStudent = journey.journal_entries[key];
		result["students"].push({name:currStudent.name, answers:currStudent.answers});
	}

	return result;

};

app.get('/getJourney', (req, res) => {
	MongoClient.connect(url, (err, db) => {
		if (err) throw err;

		db.collection("Journeys").find({journeyId:parseInt(req.query.id)}).toArray((err2, result) => {
			if (err2) throw err2;

			if (result.length == 0) {
				res.send({result:"Error, no valid journey."});
			} else if (req.query.type == "student") {
				res.send(handleJourneyStudent(result[0], req.query.userid));
			} else if (req.query.type == "teacher") {
				res.send(handleJourneyTeacher(result[0]));
			}
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
