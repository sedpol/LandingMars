import Robot from "./Robot";

export const runCommand = (coordinatesAndDirection, commands, mars) => {
    const extractedCoordinatesAndDirection = coordinatesAndDirection.split(" ");

    let direction = extractedCoordinatesAndDirection[2];
    let coordinates = { x: +extractedCoordinatesAndDirection[0], y: +extractedCoordinatesAndDirection[1] };

    const robot = new Robot(coordinates, direction, mars, commands);
    return robot.command();
}