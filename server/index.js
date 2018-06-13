const express = require('express');
const updateData = require('./appModules/updateData');
const app = express();
const fs = require('fs');

app.use(express.static('./'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, X-Custom-Header, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, XMODIFY");
    next();
});

app.get('/', (req, res) => {
    res.sendfile('./index.html');
});

app.get('/navTree', (req, res) => {
    fs.readFile('./appData/navTree.json', 'utf8', (err, data) => {
        console.log('request');
        if (err) res.sendStatus(404);
        res.json(data);
    });
});

app.get('/stats/:id', (req, res) => {
    let statsInfo = (req.params.id).split('_');
    let season = statsInfo[0];
    let team = statsInfo[1].replace(/-/g, ' ');
    let player = statsInfo[2].replace(/-/g, ' ');
    updateData.statsCalc(season, team, player, (data) => {
        res.json(data);
    });
});



app.listen(3030);
console.log('serverlistening at 3030');

