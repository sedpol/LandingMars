export default class Robot {
    constructor(coordinates, direction, planet, commands) {
        this.coordinates = coordinates;
        this.direction = direction;
        this.planet = planet;
        this.commands = commands;
    }

    command() {
        // if initial coordinates out of borders
        if (isRobotLost(this.coordinates, this.planet.borders)) {
            return "NOT LANDED";
        }

        for (const c of this.commands) {
            switch (c) {
                case "F":
                    moveForward(this.direction, this.coordinates);
                    break;
                default:
                    //TODO change direction
                    break;
            }
            if (isRobotLost(this.coordinates, this.planet.borders)) {
                const previousCoordinates = getPreviousCoordinates(this.coordinates, this.planet.borders)
                return `${previousCoordinates.x} ${previousCoordinates.y} ${this.direction} LOST`;
            }
        }
        return `${this.coordinates.x} ${this.coordinates.y} ${this.direction}`;
    }
}

const isRobotLost = (coordinates, borderCoordinates) => coordinates.x < 0
    || coordinates.x > borderCoordinates.x
    || coordinates.y < 0
    || coordinates.y > borderCoordinates.y;

const getPreviousCoordinates = (coordinates, borderCoordinates) => {
    const previousCoordinates = {
        x: coordinates.x > borderCoordinates.x
            ? borderCoordinates.x
            : coordinates.x < 0
                ? 0 : coordinates.x,
        y: coordinates.y > borderCoordinates.y
            ? borderCoordinates.y
            : coordinates.y < 0
                ? 0 : coordinates.y
    }
    return previousCoordinates;
}

const moveForward = (direction, coordinate) => {
    switch (direction) {
        case "N":
            coordinate.y++
            break;
        case "S":
            coordinate.y--
            break;
        case "E":
            coordinate.x++
            break;
        case "W":
            coordinate.x--
            break;
        default:
            break;
    }
}