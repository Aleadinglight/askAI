const unirest = require('unirest');
const fs = require("fs");
const express = require('express');
const app = express();
const path = require('path');  

app.use(express.json());
app.use(express.static('./public'));

var key = fs.readFileSync("./key.txt", function(err, data) {console.log("Loaded WordsAPI")});
key = key.toString();

app.get('/', (req, res) => {	
	res.sendFile(path.join(__dirname + './index.html'));
});

app.get('/search', (req, res) => {
	unirest.get("https://wordsapiv1.p.mashape.com/words/"+req.query.name+"/definitions")
		.header("X-Mashape-Key", key)
		.header("X-Mashape-Host", "wordsapiv1.p.mashape.com")
		.end(function (result) {
			if (result.status!=200){
				console.log("Bad response!\n", result.body);
				res.send("Bad response from server!")
			}
			else{
				console.log(result.body);
				res.send(result.body);
			}
		}
	);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
