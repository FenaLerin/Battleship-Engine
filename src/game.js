const { Player } = require('./player');

class Game {
    player;
    turn;
    gameId;
    gameOver;

    constructor(player, gameId) {
        this.player = player; // TODO: Implementar 2 jogadores e máquina vs jogador
        this.gameId = gameId;
        this.turn = 0;
        this.gameOver = false;
    }

    shoot(x, y) {
        this.turn++;
        const shoot = this.player.getShoot(x, y);
        if(this.getShipsLeft == 0)
            this.gameOver = true;
        return shoot;
    }

    getPlayer() {
        return this.player;
    }

    getShipsLeft() {
        return this.player.getShipsLeft();
    }

    getBoardText() {
        return this.player.board.toString();
    }
}

module.exports = {
    Game
};