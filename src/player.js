const { Ship } = require('./ship');
const { Board } = require('./board');
const { SquareStatusEnum } = require('./Square');

class Player {
    board;
    ships;
    constructor(board, ships) {
        this.board = board;
        this.ships = ships;
    }

    static BasePlayer() {
        var board = new Board(8);
        const ships = [
            new Ship("Destroyer", 2, Math.round(Math.random()) == 0),
            new Ship("Cruiser", 3, Math.round(Math.random()) == 0),
            new Ship("Battleship", 4, Math.round(Math.random()) == 0)
        ];
        for (let i = 0; i < ships.length; i++) {
            const ship = ships[i];
            ship.setRandomPosition(board);
        }
        return new Player(board, ships);
    }

    getShoot(x, y) {
        if (this.board.getSquare(x, y).status == SquareStatusEnum.Water) {
            this.board.setSquareStatus(x, y, SquareStatusEnum.Miss);
            return false;
        }
        if (this.board.getSquare(x, y).status == SquareStatusEnum.Ship) {
            this.board.setSquareStatus(x, y, SquareStatusEnum.Hit);
            return true;
        }
        return null; // Square already got shooted
    }

    getShipsLeft() {
        var count = 0;
        this.ships.forEach(ship => {
            if (!ship.destroyed)
                count++;
        });
        return count;
    }
}

module.exports = {
    Player
};