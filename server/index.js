const express = require('express');
const updateData = require('./appModules/updateData');
const app = express();
const fs = require('fs');

app.use(express.static('./'));

app.get('/', (req, res) => {
    res.sendfile('./index.html');
});

app.get('/navTree', (req, res) => {
    fs.readFile('./appData/navTree.json', 'utf8', (err, data) => {
        console.log('request');
        if(err) res.sendStatus(404);
        res.json(data);
    });
});

app.get('/stats/:id', (req,res)=>{
    let statsInfo = (req.params.id).split('_');
    let season = statsInfo[0];
    let team = statsInfo[1].replace(/-/g, ' ');
    let player = statsInfo[2].replace(/-/g, ' ');
    updateData.statsCalc(season,team,player,(data)=>{
        res.json(data);
    });
});



app.listen(3000);
console.log('serverlistening at 3000');

