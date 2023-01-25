const { Board } = require('./board');
const { SquareStatusEnum } = require('./square');
const { Helper } = require('./Helpers/helper');

class Ship {
    name;
    size;
    horizontal;
    position;
    hits;
    destroyed;

    constructor(name, size, horizontal) {
        this.name = name;
        this.size = size;
        this.horizontal = horizontal;

        this.hits = 0;
        this.destroyed = false;
    }

    setRandomPosition(board) {
        var valid_board = [];
        const verticalLenght = board.board_array.length - (this.horizontal ? 0 : (this.size - 1)); // Board limit
        const horizontalLenght = board.board_array[0].length - (this.horizontal ? (this.size - 1) : 0); // Board limit
        for (let y = 0; y < verticalLenght; y++) {
            for (let x = 0; x < horizontalLenght; x++) {
                if (board.board_array[y][x].status == SquareStatusEnum.Water) { // Validate first square
                    valid_board.push([x, y]);
                }
            }
        }
        var positionIndex = Helper.getRndInteger(0, valid_board.length);
        while (!this.isValidPosition(board, valid_board[positionIndex][0], valid_board[positionIndex][1])) {
            valid_board.splice(positionIndex, 1);
            positionIndex = Helper.getRndInteger(0, valid_board.length);
        }
        this.setPosition(board, valid_board[positionIndex][0], valid_board[positionIndex][1]);
    }

    setPosition(board, x, y) {
        for (let i = 0; i < this.size; i++) {
            if (this.horizontal)
                board.setSquareShip(x + i, y, this);
            else
                board.setSquareShip(x, y + i, this);
        }
    }

    getShoot() {
        this.hits++;
        if (this.hits >= this.size) {
            this.destroyed = true;
        }
    }

    isValidPosition(board, x, y) {
        var isValid = true;
        for (let i = 1; i < this.size; i++) {
            if (this.horizontal) {
                if (board.board_array[y][x + i].status != SquareStatusEnum.Water) { // Validate subsequence of squares
                    isValid = false;
                    break;
                }
            }
            else {
                if (board.board_array[y + i][x].status != SquareStatusEnum.Water) { // Validate subsequence of squares
                    isValid = false;
                    break;
                }
            }
        }
        return isValid;
    }
}


module.exports = {
    Ship
};