var path = require('path');
var express = require('express');
var exphbs= require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 9991;

var petData = require('./petData');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.json());


//Page shows all pets for sale
app.get('/', function(req, res, next){
	res.render('productPage', petData);
});


app.get('/:species', function (req, res, next){
	var pet = req.params.species;
	if (petData[pet]){
		res.status(200).render('productPage', petData[pet]);
	}
	else{
		next();
	}
});

app.get('*', function(req,res){
	res.status(404).render('errorPage');
});

//User needs to fill out:
//photoURL, petName, petSpecies, petColor, userID

app.post('/sellPet', function (req, res){
	if(req.body && req.body.petname && req.body.petcolor && req.body.species && req.body.url && req.body.petprice){
		console.log("Pet is now for sale!");
		var specie = req.body.species;
		petData[specie].products.push({
			petname: req.body.petname,
			petcolor: req.body.petcolor,
			petprice: req.body.petprice,
			url: req.body.url
		})
		console.log("==== NEW", petData[req.body.species].products);
		res.status(200).send("Pet succesfully listed!");
	}

	else{
		res.status(400).send("Requests must be filled out entirely!");
	}
});

app.listen(port, function (err) {
  if (err) {
    throw err;
  }
  console.log("== Server listening on port", port);
});
