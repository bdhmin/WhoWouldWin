const express = require('express')
const axios = require('axios')
const cors = require('cors');
const app = express()
const port = 4000

app.get('/user', cors(), (req, res) => {

    // This is temp data if you don't have API Key
    // const users = [
    //     {id: 1, name: 'Bryan', gamertag: 'Piece of Paper'},
    // ];
    // res.json(users);

    axios.get('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Piece%20of%20Paper?api_key=RGAPI-d3632f7d-cc43-46bf-bc59-40335e140449')
        .then((dataPiece) => {
            res.json([dataPiece.data]);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/user`)
})

// const express = require('express');
// const cors = require('cors');

// const app = express();

// app.get('/users', cors(), (req, res) => {
//   const customers = [
//     {id: 1, firstName: 'John', lastName: 'Doe'},
//     {id: 2, firstName: 'Brad', lastName: 'Traversy'},
//     {id: 3, firstName: 'Mary', lastName: 'Swanson'},
//   ];

//   res.json(customers);
// });

// const port = 4000;

// app.listen(port, () => `Server running on port ${port}/users`);