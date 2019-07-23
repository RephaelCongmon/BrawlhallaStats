const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const parse = require("pg-connection-string");
const { Pool } = require ('pg');   

var TOKEN = process.env.brawlhallaKEY;
const bh = require('brawlhalla-api')(`${TOKEN}`);

const cn = {
    connectionString: process.env.DATABASE_URL.parse,
    port: 5432,

    host: process.env.dbHost,
    user: process.env.dbUserName,
    password: process.env.dbPassword,
    database: process.env.db,
    ssl: true,

}

const pool = new Pool(cn);
pool.connect(err => {
    if(err) console.log(err);
    console.log('Connected to PostgresSQL!');
});


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

router.get('/submit-form2', async function(req, res) {

    var inserted = 0;

    console.log("Button click submitted");

    var keys = [];

    for (var key in req.query) {
        if (req.query.hasOwnProperty(key)) {
            keys.push(key);
        }
    }

    console.log(`keys[0] = ${keys[0]}`);

    let searchQueryData = `SELECT * FROM brawlhalla WHERE brawlhallaid = $1`;
    let searchQueryValues = [keys[0]];

    const data = await new Promise((res, rej) => pool.query(searchQueryData, searchQueryValues, (err, data) => err ? rej(err) : res(data)));

    let searchQueryData2 = `SELECT * FROM brawlhalla WHERE brawlhallaid = $1`;
    let searchQueryValues2 = ['totals'];

    const data2 = await new Promise((res, rej) => pool.query(searchQueryData2, searchQueryValues2, (err, data2) => err ? rej(err) : res(data2)));
    console.log("Data = ", data);
    
    let numLookups;
    let totalLookups;

    totalLookups = data2.rows[0].lookups*1;

    totalLookups += 1;
    let updateTotalQueryData = `UPDATE brawlhalla SET lookups = $1 WHERE brawlhallaid = $2`;
    let updateTotalQueryValues = [totalLookups, 'totals'];

    pool.query(updateTotalQueryData, updateTotalQueryValues, err => {
        if (err) console.log("Failed to update total lookups! ", err);
        else {
            console.log("Update totals success!");
        }
    });

    if (data.rows.length == 0){
        inserted = 1;
        let insertQueryData = `INSERT INTO brawlhalla (brawlhallaid, brawlhallaname, lookups) VALUES ($1, $2, $3)`;
        let insertQueryValues = [keys[0], 'default', 1];

        await pool.query(insertQueryData, insertQueryValues, err => {
            if (err) console.log("Failed to insert player into database!");
            else {
                console.log("Insert success!");
            }
        });


    }
    else {
        inserted = 0;
        numLookups = data.rows[0].lookups*1;
 
        numLookups += 1;

        let updateQueryData = `UPDATE brawlhalla SET lookups = $1 WHERE brawlhallaid = $2`;
        let updateQueryValues = [numLookups, data.rows[0].brawlhallaid];
        await pool.query(updateQueryData, updateQueryValues, err => {
            if (err) console.log("Failed to update upon lookup! ", err);
            else {
                console.log("Update success!");
            }
        });

    }

    let searchQueryData3 = `SELECT * FROM brawlhalla WHERE brawlhallaid = $1`;
    let searchQueryValues3 = [keys[0]];

    const data3 = await new Promise((res, rej) => pool.query(searchQueryData3, searchQueryValues3, (err, data3) => err ? rej(err) : res(data3)));

    await fetch(`https://api.brawlhalla.com/player/${keys[0]}/stats?api_key=${TOKEN}`)
        .then(res => res.json())
        .then(json => {

            //console.log("This json = ", json);

            if (inserted){
                let updateNameQueryData = `UPDATE brawlhalla SET brawlhallaname = $1 WHERE brawlhallaid = $2`;
                let updateNameQueryValues = [json.name, keys[0]];
                pool.query(updateNameQueryData, updateNameQueryValues, err => {
                    if (err) console.log("Failed to update name! ", err);
                    else {
                        console.log("Update Name success!");
                    }
                });
            }

            
            let newLookups = data3.rows[0].lookups;

            var json2 = json;

            json2.lookups = newLookups;
            console.log("Json2 = ", json2);

            res.json(json);
        
        });
});

router.get('/search', async function(req, res){
    console.log("Search submitted");

    console.log("Req = ", req.query.player);

    var x = req.query.player;

    await fetch(`https://api.brawlhalla.com/rankings/1v1/us-e/1?name=${x}&api_key=${TOKEN}`)
        .then(res => res.json())
        .then(async json => {
            console.log("JSON = ", json);
            if (!json[0]){
                var error = '{ "error" : { "code": 404}}';
                
                var obj = JSON.parse(error);
                console.log("obj = ", obj);
                console.log("obj.error = ", obj.error);
                console.log("obj.error.code = ", obj.error.code);
                console.log("obj.error['code'] = ", obj.error['code']);
                //console.log("obj.error[0].code = ", obj.error[0].code);
                
                res.json(obj);
            }
            else {
                res.json(json);
            }
        })
});

router.get('/submit-form', async function(req, res) {
    console.log("Form submitted");

    console.log("Req = ", req.query.player);

    let jsonn;

    var x = req.query.player;
    var y;
    await fetch(`https://api.brawlhalla.com/rankings/1v1/us-e/1?name=${x}&api_key=${TOKEN}`)
        .then(res => res.json())
        .then(async json => {

            console.log("JSON = ", json);
            
            if (!json[0]){
                var error = '{ "error" : { "code": 404}}';
                
                var obj = JSON.parse(error);
                console.log("obj = ", obj);
                console.log("obj.error = ", obj.error);
                console.log("obj.error.code = ", obj.error.code);
                console.log("obj.error['code'] = ", obj.error['code']);
                //console.log("obj.error[0].code = ", obj.error[0].code);
                
                res.json(obj);
            }
            else {
                y = json[0].brawlhalla_id;
            

                console.log("y now equals = ", y);
                //y = toString(y);

                await fetch(`https://api.brawlhalla.com/player/${y}/stats?api_key=${TOKEN}`)
                    .then(res2 => res2.json())
                    .then(json2 => {

                        console.log("JSON2 = ", json2);
                        res.json(json2);
                
                });
            }
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