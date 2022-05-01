export default class Planet {
    constructor(borders) {
        this.borders = borders;
        this.scents = [];
    }
    addScent(scent) {
        this.scents.push(scent);
    }
    hasScent(coordinates) {
        return this.scents.find(scent => scent.x === coordinates.x && scent.y === coordinates.y)
    }
}