var express = require('express');
var app = express(); 
var mongoose = require('mongoose');
var port = 3000;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/mainDB' , {useNewUrlParser : true});

var testSchema = new mongoose.Schema({
	name : String ,
	image : String ,
	summery : String
});

var testModel = mongoose.model('movies' ,testSchema);

app.get('/v', function(req1 , res1){
	
	testModel.find()
		.then(doc=>{
			res1.send(doc + 'read data successfully')
		})
		.catch(err=>{
			res1.send(err)
		})
});

app.get('/e' ,function (req , res) {
	testModel.insertMany([{
		name: "Harry Potter and the Order of the Phoenix",
		image: "https://bit.ly/2IcnSwz",
		summery: "Harry Potter and Dumbledore's warning about the return of Lord Voldemort is not heeded by the wizard authorities who, in turn, look to undermine Dumbledore's authority at Hogwarts and discredit Harry."
		},{
		name: "The Lord of the Rings: The Fellowship of the Ring",
		image: "https://bit.ly/2tC1Lcg",
		summery: "A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey with eight companions to Mount Doom, the only place where it can be destroyed."
		},{
		name: "Avengers: Endgame",
		image: "https://bit.ly/2Pzczlb",
		summery: "Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe."
	}])
	.then(doc=>{
		res.send(doc + 'Entered data successfully')
	})
	.catch(err=>{
		res.send(err)
	})
});

app.listen(port, function(){
	console.log('listening to ' + ' ' + port);
})
