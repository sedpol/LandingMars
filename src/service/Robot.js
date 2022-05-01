export default class Robot {
    constructor(coordinates, direction, planet, commands) {
        this.coordinates = coordinates;
        this.direction = direction;
        this.planet = planet;
        this.commands = commands;
    }

    command() {
        // initial coordinates out of planet borders
        if (isRobotLost(this.coordinates, this.planet.borders)) {
            return "NOT LANDED";
        }

        for (const command of this.commands) {
            switch (command) {
                case "F":
                    moveForward(this.direction, this.coordinates);
                    break;
                default:
                    this.direction = changeDirection(this.direction, command);
                    break;
            }
            if (isRobotLost(this.coordinates, this.planet.borders)) {
                const scentCoordinates = getScentCoordinates(this.coordinates, this.planet.borders);
                if (this.planet.hasScent(scentCoordinates)) {
                    this.coordinates = scentCoordinates;
                } else {
                    this.planet.addScent(scentCoordinates)
                    return `${scentCoordinates.x} ${scentCoordinates.y} ${this.direction} LOST`;
                }
            }
        }
        return `${this.coordinates.x} ${this.coordinates.y} ${this.direction}`;
    }
}

const isRobotLost = (coordinates, planetBorders) => coordinates.x < 0
    || coordinates.x > planetBorders.x
    || coordinates.y < 0
    || coordinates.y > planetBorders.y;

const directions = ["N", "E", "S", "W"];

const getScentCoordinates = (coordinates, planetBorders) => {
        const scentCoordinates = {
            x: coordinates.x > planetBorders.x
                ? planetBorders.x
                : coordinates.x < 0
                    ? 0 : coordinates.x,
            y: coordinates.y > planetBorders.y
                ? planetBorders.y
                : coordinates.y < 0
                    ? 0 : coordinates.y
        }
        return scentCoordinates;
    }

const changeDirection = (direction, command) => {
    let newDirection = direction;
    switch (command) {
        case "L": {
            const newDirectionIndex = directions.indexOf(direction) - 1;
            newDirection = directions[newDirectionIndex < 0 ? directions.length - 1 : newDirectionIndex];
            break;
        }
        case "R": {
            const newDirectionIndex = (directions.indexOf(direction) + 1) % (directions.length);
            newDirection = directions[newDirectionIndex];
            break;
        }
        default:
            break;
    }
    return newDirection

}

const moveForward = (direction, coordinates) => {
    switch (direction) {
        case "N":
            coordinates.y++
            break;
        case "S":
            coordinates.y--
            break;
        case "E":
            coordinates.x++
            break;
        case "W":
            coordinates.x--
            break;
        default:
            break;
    }
}