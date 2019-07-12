const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static(__dirname + '/public'))

app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
});