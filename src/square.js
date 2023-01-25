class Square {
    x;
    y;
    status;
    ship;
    constructor(x, y, status) {
        this.x = x;
        this.y = y;
        this.status = status;
    }

    setShip(ship) {
        this.ship = ship;
    }
}

const SquareStatusEnum = Object.freeze({
    "Water": 0,
    "Ship": 1,
    "Miss": 2,
    "Hit": 3,
});

module.exports = {
    Square,
    SquareStatusEnum
};