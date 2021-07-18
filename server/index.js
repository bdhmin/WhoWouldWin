// // import { url } from './../config';
// const config = require('./../config');
// const express = require('express')
// const axios = require('axios')
// const cors = require('cors');
// // var async = require('async');
// const app = express()
// const port = 4000


// const summonersURL = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
// // const summonerRanks = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/";
// // const hardcoded = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/lZwJbgQERvzzMsxC7a7B2PfhUfVwfgmwIsG8MdCxQnQepcE?api_key=RGAPI-a90bff61-da04-466c-a913-1709aabd0d54";

// var summoner = "";

// // const apiRouter = express.Router();

// // Fetch data of the 2 summoners
// // apiRouter.route('/api/summoners')
// //   .get((request, response) => {
// //     summoner = request.query.summonerName1;

// //     console.log("Query Names:", request.query.summonerName1, "and", request.query.summonerName2);
    
// //     var dataArray = [];

// //     // It works, but is there a better way to do this? - not make it nested?
// //     axios.get(summonersURL + request.query.summonerName1 + "?api_key=" + config.api_key)
// //       .then((dataPiece1) => {
// //         dataArray.push(dataPiece1.data);
// //         axios.get(summonersURL + request.query.summonerName2 + "?api_key=" + config.api_key)
// //           .then((dataPiece2) => {
// //             dataArray.push(dataPiece2.data);
// //             response.json(dataArray);
// //             console.log("Summoner Array", dataArray);
// //           })
// //       })
// //       .catch((error) => {
// //         response.sendStatus(500);
// //       })
// //   })

// // Remove this, and throw it all into /api/summoners
// // Fetch data of summoners' ranks and ranked winrate
// // apiRouter.route('/api/summonerRanks')
// //   .get((request, response) => {
// //     var dataArray = [];
// //     axios.get(summonerRanks + request.query.summoner1.id + "?api_key=" + config.api_key)
// //       .then((dataPiece1) => {
// //         dataArray.push(dataPiece1.data);
// //         axios.get(summonerRanks + request.query.summoner2.id + "?api_key=" + config.api_key)
// //           .then((dataPiece2) => {
// //             dataArray.push(dataPiece2.data);
// //             response.json(dataArray);
// //             console.log("SummonerRanks Array", dataArray);
// //           })
// //       })
// //       .catch((error) => {
// //         response.sendStatus(500);
// //       })
// //   })

// app.get('/api', cors(), (request, response) => {

//   // Get the 2 users
//   // Promise.all([
//   //   // API Call of two summoners
//   //   axios.get(summonersURL + 'nate025' + "?api_key=" + config.api_key),
//   //   axios.get(summonersURL + 's3b0' + "?api_key=" + config.api_key)
//   //   // axios.get(summonersURL + request.query.summonerName1 + "?api_key=" + config.api_key),
//   //   // axios.get(summonersURL + request.query.summonerName2 + "?api_key=" + config.api_key)
//   // ]).then((results) => {
//   //   // Return User data as form of array
//   //   return Promise.all(results.map(function (result) {
//   //     return result.json();
//   //   }))
//   // }).then(function (data) {
//   //   console.log('Users:', data);
//   // }).catch((error) => {
//   //   console.log('error')
//   //   response.sendStatus(500);
//   // })

//   var dataArray = [];
//   // response.json('Bryan was here.')
//   console.log('Trying to fetch')
//   // It works, but is there a better way to do this? - not make it nested?
//   axios.get(summonersURL + 's3b0' + "?api_key=" + config.api_key)
//   .then((dataPiece1) => {
//     dataArray.push(dataPiece1.data);
//     console.log(dataArray);
//     response.json(dataArray);
//     // axios.get(summonersURL + 'nate025' + "?api_key=" + config.api_key)
//     //   .then((dataPiece2) => {
//     //     dataArray.push(dataPiece2.data);
//     //     response.json(dataArray);
//     //     console.log("Summoner Array", dataArray);
//     //   })
//   })
//   .catch((error) => {
//     response.sendStatus(500);
//   })

// })

// app.listen(port, () => {
//   // console.log("URL:", summonersURL + summoner + "?api_key=" + config.api_key);
//   console.log(`Example app listening at http://localhost:${port}/api`)
// })

// import { url } from './../config';
const config = require('./../config');
const express = require('express')
const axios = require('axios')
const cors = require('cors');
const app = express()
const port = 4000

const summonerURL = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
var summoner = "";

app.get('/api/summoners', cors(), (request, response) => {

  // This is temp data if you don't have API Key
  // const users = [
  //     {id: 1, name: 'Bryan', gamertag: 'Piece of Paper'},
  // ];
  // response.json(users);

  // Piece%20of%20Paper
  // nate025


  // Hardcoded summoner object
  // response.json([config.hard_coded_summoner]);
  // summoner = request.query.summonerName1;

  console.log("Query Names:", request.query.summonerName1, "and", request.query.summonerName2);
  
  var dataArray = [];

  Promise.all([
    axios.get(summonerURL + request.query.summonerName1 + "?api_key=" + config.api_key),
    axios.get(summonerURL + request.query.summonerName2 + "?api_key=" + config.api_key)
  ]).then((results) => {
    console.log("Result:", results[0].data, results[1].data);
    // Return User data as form of an array
    response.json(results.map(result => {
      return result.data;
    }))
  }).catch((error) => {
    response.sendStatus(500);
  })

  // // It works, but is there a better way to do this? - not make it nested?
  // axios.get(summonerURL + request.query.summonerName1 + "?api_key=" + config.api_key)
  //   .then((dataPiece1) => {
  //     dataArray.push(dataPiece1.data);
  //     axios.get(summonerURL + request.query.summonerName2 + "?api_key=" + config.api_key)
  //       .then((dataPiece2) => {
  //         dataArray.push(dataPiece2.data);
  //         console.log("Array", dataArray);
  //         response.json(dataArray);
  //       })
  //     })
  //     .catch((error) => {
  //       response.sendStatus(500);
  //     })

})

app.listen(port, () => {
  console.log("URL:", summonerURL + summoner + "?api_key=" + config.api_key);
  console.log(`Example app listening at http://localhost:${port}/api/summoners`)
})
