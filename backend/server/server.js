const app = require("express")();
const http = require("http").Server(app);
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Embarc";


app.get('/getListJourneys', (req, res) => {
	MongoClient.connect(url, (err, db) => {
		if (err) throw err;
		
		db.collection("Journeys").find({}).toArray((err2, result) => {
			if (err2) throw err2;
			
			resdata = [];
			for (let i = 0; i < result.length;i++) {
				resdata.push({id: result[i].journeyId, name: result[i].name, image: result[i].image});

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

app.post('/createJournalEntry', function(req, res) {
	console.log(req);
});



app.get('/', function (req, res) {
	console.log("someone here");
	res.send("Code for Good -- Team 14!");
});


app.listen(3000, () => {
    console.log("Starting Hackathon server...");
});
