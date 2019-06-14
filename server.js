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
			console.log("== people:", pets);
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
			console.log(pets);
			res.status(200).render('productPage', {
				products: pets
			});
		}
	});
});


function findObject(test, name, obj){
	for (var i=0; i<test.length; i++) {
		var nameFind = test[i].petname;
		if (name === nameFind) {
			var priceFind = test[i].petprice;
			var urlFind = test[i].url;
			var colorFind = test[i].petcolor;
			var speciesFind = test[i].petspecies;
			obj = {
				petname: nameFind,
				petprice: priceFind,
				petcolor: colorFind,
				petspecies: speciesFind,
				url: urlFind
			};
			count = 1;
		}
	}
	return obj;
};

app.get('/:name', function (req, res) {
	var name = req.params.name;
	content = fs.readFileSync("petData.json");
	var jsonContent = JSON.parse(content);
	var test1 = jsonContent.dog.products;
	var test2 = jsonContent.cat.products;
	var test3 = jsonContent.hedgehog.products;
	var test4 = jsonContent.fish.products;

	var obj = {
		petname: '',
		petprice: '',
		petcolor: '',
		petspecies: '',
		url: ''
	}

		obj = findObject(test1, name, obj);
		obj = findObject(test2, name, obj);
		obj = findObject(test3, name, obj);
		obj = findObject(test4, name, obj);

		if (count == 1){
			res.status(200).render('singleProductPage', obj);
			count = 0;
		}
		else{
			res.status(404).render('errorPage');
		}
});

//User needs to fill out:
//photoURL, petName, petSpecies, petColor, userID

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
