var fs = require("fs");
var path = require('path');
var express = require('express');
var exphbs= require('express-handlebars');
var bodyParser = require('body-parser');
var content = fs.readFileSync("petData.json");
var MongoClient = require('mongodb').MongoClient;

var app = express();
var port = process.env.PORT || 9991;

var count = 0;

var mongoHost = process.env.MONGO_HOST; //classmongo.engr.oregonstate.edu
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER; //cs290_dongrog
var mongoPassword = process.env.MONGO_PASSWORD; //rogers
var mongoDBName = process.env.MONGO_DB_NAME; //cs290_dongrog

var mongoUrl = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDBName}`;
var db = null;

console.log("=== YO ", mongoUrl);

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.json());


//Page shows all pets for sale
app.get('/', function(req, res, next){
	var collection = db.collection('pets');
	collection.find({}).toArray(function (err, pets){
		if(err){
			res.status(500).send({
				error: "Error fetching pet data from database!"
			});
		}
		else {
			res.status(200).render('productPage', {
				products: pets
			});
		}
	});
});


app.get('/:species', function (req, res, next){
	var pet = req.params.species.toLowerCase();
	var collection = db.collection('pets');
  collection.find({ petspecies: pet }).toArray(function (err, pets){
		if(err){
			res.status(500).send({
				error: "Error fetching pet data from database!"
			});
		}
		else{
			res.status(200).render('productPage', {
				products: pets
			});
		}
	});
});


app.get('/:species/:name', function (req, res) {
	var pet = req.params.name;
	console.log("=== LOOKING FOR: ", pet);
	var collection = db.collection('pets');
  collection.find({ petname: pet }).toArray(function (err, pets){
		if(err){
			res.status(500).send({
				error: "Error fetching pet data from database!"
			});
		}
		else{
			console.log("===:", pets[0].petname);
			res.status(200).render('singleProductPage', {
				petname: pets[0].petname,
				petprice: pets[0].petprice,
				petcolor: pets[0].petcolor,
				petspecies: pets[0].petspecies,
				url: pets[0].url
			});
		}
	});
});

app.post('/sellPet', function (req, res){
	if(req.body && req.body.petname && req.body.petcolor && req.body.petspecies && req.body.url && req.body.petprice){
		console.log("Pet is now for sale!");

		var specie = req.body.petspecies;

		console.log("species: ", specie);
		petData[specie].products.push({
			petname: req.body.petname,
			petcolor: req.body.petcolor,
			petprice: req.body.petprice,
			petspecies: req.body.petspecies,
			url: req.body.url
		});

		fs.writeFileSync("petData.json",JSON.stringify(petData));
		res.status(200).send("Pet succesfully listed!");
	}

	else{
		res.status(400).send("Requests must be filled out entirely!");
	}
});

app.get('*', function(req,res){
	res.status(404).render('errorPage');
});

MongoClient.connect(mongoUrl, function (err, client) {
  if (err) {
    throw err;
  }
  db = client.db(mongoDBName);
  app.listen(port, function () {
    console.log("== Server listening on port", port);
  });
});
