var path = require('path');
var express = require('express');
var exphbs= require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 9991;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function(req, res, next){
	res.render('productPage');
});

app.get('*', function(req,res){
	res.status(404).render('errorPage');
});

//User needs to fill out:
//photoURL, petName, petSpecies, petColor, userID

/*
app.post('/pets/:species/sellPet', function (req, res){
	if(req.body && req.body.photoURL && req.body.petName && req.body.petSpecies && req.body.petColor && req.body.userID){
		console.log("Pet is now for sale!");
		res.status(200).send("Pet succesfully listed!");
	}
	else{
		res.status(400).send("Requests must be filled out entirely!");
	}
});
*/
app.listen(port, function (err) {
  if (err) {
    throw err;
  }
  console.log("== Server listening on port", port);
});