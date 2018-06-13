const mongoose = require('mongoose');
const fs = require('fs');
const model = require('./model');
const calculator = require('./calculator');

const ModelDeliveries = model.ModelDeliveries;
const ModelMatch = model.ModelMatch;
const startSeason = 2008;
const endSeason = (new Date()).getFullYear();
const matchIds = {};

function createJsonFile(jsonObject, fileName) {
  let stringified = JSON.stringify(jsonObject);
  fs.writeFile(`./${fileName}.json`, stringified, (err) => {
    if (err) console.log(err);
    else console.log(`Created JSON file ${fileName}.json in appData`);
  });
};

mongoose.connect('mongodb://localhost/ipl');

let db = mongoose.connection;

db.once('open', () => {
  console.log('Mongo active')
  updateMatchIds();
  setTimeout(updateNavTree,5000);
});

function updateMatchIds(){
  for(let season = startSeason; season<endSeason; season++){
    let ids = calculator.getMatchIds(ModelMatch,season);
    ids.catch(errLogger);
    ids.then((ids)=>{
      matchIds[season]=ids;
    });
  };
}

function updateNavTree() {
  let navTree = {};
  let seasonsRemaining = Object.keys(matchIds).length;

  for(let season= startSeason; season<endSeason; season++) {
    navTree[season]={}
  }
  
  let seasons = Object.keys(matchIds);
  seasons.forEach(season=>{
    calculator.getBowlersEachTeam(ModelDeliveries,matchIds[season],season)
    .then(updater)
    .catch(errLogger);
  });
  
  function updater(bowlerEachTeam) {
    let bowlerEachTeamRemaining = bowlerEachTeam.length;
    seasonsRemaining--;
    bowlerEachTeam.forEach((doc)=>{
      let season = doc.season;
      let team = doc._id;
      let bowlers = doc.bowlers;
      navTree[season][team] = bowlers;
      bowlerEachTeamRemaining--;
      if(!seasonsRemaining && !bowlerEachTeamRemaining) createJsonFile(navTree,'navTree');
    });
  }
}

// updateNavTree();

function errLogger(err){
  console.log(err);
}