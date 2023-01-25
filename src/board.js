const { SquareStatusEnum } = require('./square');
const { Square } = require('./square');

class Board {
    board_array;
    constructor(lenght) {
        this.board_array = [];
        for (let y = 0; y < lenght; y++) {
            this.board_array.push([]);
            for (let x = 0; x < lenght; x++) {
                this.board_array[y].push(new Square(x, y, SquareStatusEnum.Water));
            }
        }
    }

    getSquare(x, y) {
        // console.log("x = " + x + "\ny = " + y);
        return this.board_array[y][x];
    }

    setSquareStatus(x, y, status) {
        this.board_array[y][x].status = status;
        if (status == SquareStatusEnum.Hit)
            this.board_array[y][x].ship.getShoot();
        return true;
    }
    setSquareShip(x, y, ship) {
        this.board_array[y][x].status = SquareStatusEnum.Ship;
        this.board_array[y][x].ship = ship;
        return true;
    }

    validateCoordenate(x, y) {
        return (y < this.board_array.length && x < this.board_array[0].length);
    }

    toString() {
        var formatted = "";
        for (let y = 0; y < this.board_array.length; y++) {
            for (let x = 0; x < this.board_array.length; x++) {
                switch (this.getSquare(x, y).status) {
                    case SquareStatusEnum.Water:
                    case SquareStatusEnum.Ship:
                        formatted += "_ ";
                        break;
                    case SquareStatusEnum.Miss:
                        formatted += "0 ";
                        break;
                    case SquareStatusEnum.Hit:
                        formatted += "X ";
                        break;
                }
            }
            formatted += "\n";
        }
        return formatted;
    }
}

module.exports = {
    Board
};