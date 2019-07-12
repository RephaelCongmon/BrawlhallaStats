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

app.get('/submit-form', async function( req, res) {
    console.log("Form submitted");
    // res.send('hello world');

    console.log("req = ", req.query.player);
    //console.log("res = ", );
    var x = req.query.player;
  
    let jsonn;


    // bh.getBhidByName(x)
    //     .then(function(users){
    //         console.log("Users = ", users);
    //     }).catch(function(error){
    //         console.log(error);
    //     });

    await fetch(`https://api.brawlhalla.com/player/${x}/stats?api_key=${TOKEN}`)
        .then(res => res.json())
        .then(json => {
            console.log("JSON = ", json.error);
            
            if (json){
                // console.log(json.name);
                // console.log(json.level);
                // console.log(json.games);
                // console.log("Wins = " + json.wins);
                // console.log("Losses = " + (json.games-json.wins) );
                
                jsonn = json;
            }
            else {
                res.send('User not found!');
            }
        });

   
    console.log(jsonn.name);
    res.send(`${jsonn.name}\n
    ${jsonn.level}\n
    Total games: ${jsonn.games}\n
    Total Wins:  ${jsonn.wins}\n
    Total Losses: ${jsonn.games-jsonn.wins}`);
    //var x = document.formxml.player.value;
    //console.log("x = ", x);
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