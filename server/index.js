const express = require('express')
const axios = require('axios')
const cors = require('cors');
const app = express()
const port = 4000

app.get('/api/summoner', cors(), (req, res) => {

  // This is temp data if you don't have API Key
  // const users = [
  //     {id: 1, name: 'Bryan', gamertag: 'Piece of Paper'},
  // ];
  // res.json(users);

  // Piece%20of%20Paper
  // nate025
  axios.get('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/s3b0?api_key=RGAPI-d3632f7d-cc43-46bf-bc59-40335e140449')
    .then((dataPiece) => {
      res.json([dataPiece.data]);
    })
    .catch((error) => {
      res.sendStatus(500);
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/api/summoner`)
})
