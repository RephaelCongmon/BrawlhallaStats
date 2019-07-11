const bh = require('brawlhalla-api')('XOQ64KYMCXKEANE7JCAQYS10CFYNS');

var x = "ruprep444";
var TOKEN = process.env.brawlhallaKEY;

bh.getSteamId(`https://steamcommunity.com/id/${x}/`)
    .then(function(steamID){
        console.log("steamID = ", steamID);
    }).catch(function(error){
        console.log("Error: ", error);
    });


