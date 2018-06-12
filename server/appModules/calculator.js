function getMatchIds(ModelMatch, season) {
  return new Promise((resolve, reject) => {
    ModelMatch.aggregate([{ $match: { season: season } },
    { $group: { _id: '$id' } }], (err, data) => {
      if (err) reject(err);
      idList = data.map(ele=>ele._id);
      resolve(idList);
    });
  });
}

// function getTeamsPlayedEachYear(ModelMatch) {
//   return new Promise((resolve, reject) => {
//     ModelMatch.aggregate([{
//       $group: { _id: '$season', teams: { $addToSet: '$team1' }},
//     }], (err, data) => {
//       if (err) reject(err);
//       resolve(data);
//     });
//   });
// }

function getBowlersEachTeam(ModelDeliveries, matchIds,season) {
  return new Promise((resolve, reject) => {
    ModelDeliveries.aggregate([
      { $match: { match_id: { $in: matchIds } } },
      { $group: {_id:'$bowling_team', bowlers: {$addToSet:'$bowler'}}}],
      (err, data) => {
        if (err) reject(err);
        let result = data.map((doc)=>{
          doc.season = season;
          return doc;
        })
        resolve(result);
      });
  });
}

module.exports.getMatchIds = getMatchIds;
// module.exports.getTeamsPlayedEachYear = getTeamsPlayedEachYear;
module.exports.getBowlersEachTeam = getBowlersEachTeam;