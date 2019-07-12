const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
var TOKEN = process.env.brawlhallaKEY;
const bh = require('brawlhalla-api')('XOQ64KYMCXKEANE7JCAQYS10CFYNS');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static(__dirname + '/public'))

app.use(express.urlencoded());

app.get('/submit-form', function( req, res) {
    console.log("Form submitted");
    // res.send('hello world');

    console.log("req = ", req);
    console.log("res = ", res);

    var x = document.formxml.player.value;
    console.log("x = ", x);
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