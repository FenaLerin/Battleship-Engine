const { GameManager } = require('./gameManager');
const { Player } = require('./player');
const express = require('express');

const app = express();
const port = 3000;
app.use(express.json());

const gameManager = new GameManager();

app.get('/', (req, res) => {
    res.send(gameManager.startGame());
});

app.get('/game/:gameId', (req, res) => {
    res.send(gameManager.gameStatus(req.params['gameId']));
});

app.post('/game/:gameId/shoot', (req, res) => {
    res.send(gameManager.shoot(req.params['gameId'], req.body['x'], req.body['y']));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});