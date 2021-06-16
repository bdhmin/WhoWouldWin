// import { url } from './../config';
const config = require('./../config');
const express = require('express')
const axios = require('axios')
const cors = require('cors');
const app = express()
const port = 4000

const summonerURL = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
const summoner = "Piece%20of%20Paper";

app.get('/api/summoner', cors(), (req, res) => {

  // This is temp data if you don't have API Key
  // const users = [
  //     {id: 1, name: 'Bryan', gamertag: 'Piece of Paper'},
  // ];
  // res.json(users);

  // Piece%20of%20Paper
  // nate025


  // Hardcoded summoner object
  // res.json([config.hard_coded_summoner]);
  

  axios.get(summonerURL + summoner + "?api_key=" + config.api_key)
    .then((dataPiece) => {
      res.json([dataPiece.data]);
    })
    .catch((error) => {
      res.sendStatus(500);
    })
})

app.listen(port, () => {
  console.log("URL:", summonerURL + summoner + "?api_key=" + config.api_key);
  console.log(`Example app listening at http://localhost:${port}/api/summoner`)
})
