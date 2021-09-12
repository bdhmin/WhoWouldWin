# WhoWouldWin

This project aims to settle the heated debates between two players who think they are better than each other.

## How to run

### Generate Riot API to Run Remotely
1. You must generate a temporary 24 hour Riot API. You can generate yours [here](https://developer.riotgames.com).
2. In `/WhoWouldWin`, create a `config.js` file and paste below code in:

```
// Riot API Key
const api_key = "<paste-your-Riot-API-here>";

module.exports = { api_key };
```
4. Navigate to `WhoWouldWin/config.js` and paste your Riot API to the variable where requested.

### Command Line
1. `npm run server` to run the backend server
2. `npm run client` to run the frontend client

### Enjoy! :D

## Home Page
<img width="400" alt="WWW Home" src="https://user-images.githubusercontent.com/43192371/133006418-6d624506-840b-45d9-bbdf-f6307430d745.png">

## Search Result
<img width="400" alt="WWW Result" src="https://user-images.githubusercontent.com/43192371/133006429-6f43b2cf-5398-4145-964c-604a0138416b.png">


