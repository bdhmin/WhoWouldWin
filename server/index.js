// import { url } from './../config';
const config = require('./../config');
const express = require('express')
const axios = require('axios')
const cors = require('cors');
const app = express()
const port = 4000

const summonerURL = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
var summoner = "";

app.get('/api/summoner', cors(), (request, response) => {

  // This is temp data if you don't have API Key
  // const users = [
  //     {id: 1, name: 'Bryan', gamertag: 'Piece of Paper'},
  // ];
  // response.json(users);

  // Piece%20of%20Paper
  // nate025


  // Hardcoded summoner object
  // response.json([config.hard_coded_summoner]);

  summoner = request.query.summonerName;

  console.log("Query Names:", request.query.summonerName, "and", request.query.summonerName2);
  
  var dataArray = [];

  // It works, but is there a better way to do this? - not make it nested?
  axios.get(summonerURL + request.query.summonerName + "?api_key=" + config.api_key)
    .then((dataPiece) => {
      dataArray.push(dataPiece.data);
      axios.get(summonerURL + request.query.summonerName2 + "?api_key=" + config.api_key)
        .then((dataPiece2) => {
          dataArray.push(dataPiece2.data);
          response.json(dataArray);
        })
    })
    .catch((error) => {
      response.sendStatus(500);
    })

})

app.listen(port, () => {
  console.log("URL:", summonerURL + summoner + "?api_key=" + config.api_key);
  console.log(`Example app listening at http://localhost:${port}/api/summoner`)
})
