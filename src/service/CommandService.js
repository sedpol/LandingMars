import Planet from "./Planet";
import Robot from "./Robot";

export const runCommand = (coordinatesAndDirection, commands, mars) => {
    const extractedCoordinatesAndDirection = coordinatesAndDirection.split(" ");

    let direction = extractedCoordinatesAndDirection[2];
    let coordinates = { x: +extractedCoordinatesAndDirection[0], y: +extractedCoordinatesAndDirection[1] };

    const robot = new Robot(coordinates, direction, mars, commands);
    return robot.command();
}

/*
* TODO
* add inputCommands validations
* handler validation errors
*/
export const runCommands = (inputCommands) => {
    const commands = inputCommands.split("\n");
    const borders = commands[0].split(" ");

    const mars = new Planet({ x: +borders[0], y: +borders[1] })
    const result = []
    for (let i = 1; i < commands.length; i += 3) {
        result.push([runCommand(commands[i], commands[i + 1], mars)]);
    }
    return result;
}