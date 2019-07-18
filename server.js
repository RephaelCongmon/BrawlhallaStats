const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

var TOKEN = process.env.brawlhallaKEY;
const bh = require('brawlhalla-api')(`${TOKEN}`);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

// ROUTES FOR OUR API
// =============================================================================
router.get('/', function(req, res) {
    //res.json({ message: 'hooray! welcome to our api!'});
    console.log("here");
});



// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// more routes will happen here

router.get('/submit-form', async function(req, res) {
    console.log("Form submitted");

    console.log("Req = ", req.query.player);

    let jsonn;

    var x = req.query.player;

    await fetch(`https://api.brawlhalla.com/player/${x}/stats?api_key=${TOKEN}`)
        .then(res => res.json())
        .then(json => {

            res.json(json);
        
        });
});

router.get('/leaderboards/1v1Ranked', async function(req, res) {
    console.log("Button clicked submitted");

    var keys = [];

    for (var key in req.query) {
        if (req.query.hasOwnProperty(key)) {
            keys.push(key);
        }
    }

    console.log(`keys[0] = ${keys[0]}`);

    await fetch(`https://api.brawlhalla.com/rankings/${keys[0]}/all/1?api_key=${TOKEN}`)
        .then(res => res.json())
        .then(json => {

            res.json(json);
        
    });

});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.get('/submit-form', async function( req, res) {
    console.log("Form submitted");

    console.log("req = ", req.query.player);

    var x = req.query.player;
  
    let jsonn;

    await fetch(`https://api.brawlhalla.com/player/${x}/stats?api_key=${TOKEN}`)
        .then(res => res.json())
        .then(json => {
            // console.log("JSON = ", json.error.code);
            
            if ((json.error) && (json.error.code == 404) ){

                res.send('User not found!');
                //jsonn = json;
            }
            else {
                jsonn = json;
                //res.send('User not found!');
            }
        });
   
    console.log(jsonn.name);
    res.send(`${jsonn.name}\n
    ${jsonn.level}\n
    Total games: ${jsonn.games}\n
    Total Wins:  ${jsonn.wins}\n
    Total Losses: ${jsonn.games-jsonn.wins}`);
 
});

app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
});




function getInput(){
    var res = "";

    res = document.formxml.player.value;
    return res;
}

function clickButton(){
    console.log("Running clickButton");
    var x = getInput();
    console.log("x = " + x);

    fetch(`https://api.brawlhalla.com/player/${x}/stats?api_key=${TOKEN}`)
        .then(res => res.json())
        .then(json => console.log(json));

}