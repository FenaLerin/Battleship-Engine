const { Player } = require('./player');
const { Game } = require('./game');

class GameManager {
    games = [];

    startGame() {
        const gameId = this.games.length;
        var game = new Game(Player.BasePlayer(), gameId);
        const boardText = game.getBoardText();
        this.games.push(game);
        return {
            "game_id": gameId,
            "board": boardText
        };
    }

    shoot(id, x, y) {
        const game = this.games[id];
        if (!game.getPlayer().board.validateCoordenate(x, y))
            return { "error": "Choose a valid coordenate!" };

        const result = game.shoot(x, y);
        if (result === null)
            return { "error": "This square was already shooted!" };

        const shipsLeft = game.getShipsLeft();

        return {
            "result": result ? "hit" : "miss",
            "ships_left": shipsLeft,
            "board": game.getBoardText()
        };
    }

    gameStatus(id) {
        return this.games[id].getPlayer().board;
    }
}

module.exports = {
    GameManager
};