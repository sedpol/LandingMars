import { runCommand } from "./CommandService"
import Planet from "./Planet";

describe('Martian Robot', () => {
    describe('on initial (0,0) coordinate with forward moving only', () => {
        it('should not move when empty command passed', () => {
            const result = runCommand("0 0 N", "", new Planet({ x: 50, y: 50 }))
            expect(result).toBe("0 0 N");
        });

        it('should move forward 1 grid on "y" coordinate when North faced and command "F" passed', () => {
            const result = runCommand("0 0 N", "F", new Planet({ x: 50, y: 50 }))
            expect(result).toBe("0 1 N");
        });

        it('should be LOST when South faced and command "FFFFF" passed', () => {
            const result = runCommand("0 0 S", "FFFFF", new Planet({ x: 50, y: 50 }))
            expect(result).toBe("0 0 S LOST");
        });

        it('should move forward 2 grid on "x" coordinate when East faced and command "FF" passed', () => {
            const result = runCommand("0 0 E", "FF", new Planet({ x: 50, y: 50 }))
            expect(result).toBe("2 0 E");
        });

        it('should be at 0 0 W when West faced and command "F" passed', () => {
            const result = runCommand("0 0 W", "F", new Planet({ x: 50, y: 50 }))
            expect(result).toBe('0 0 W LOST');
        });
    });

    describe.each([
        ["1 5 N", "RFFF", "4 5 E"],
        ["1 5 S", "LFFF", "4 5 E"],
        ["0 0 N", "FRFRFRFR", "0 0 N"],
        ["0 0 E", "FLFLFLFL", "0 0 E"],
        ["1 1 W", "FLFL", "0 0 E"],
        ["4 49 N", "F", "4 50 N"],
        ["49 33 E", "F", "50 33 E"]
    ])('on given coordinates and direction %p', (givenCoordinatesAndDirection, givenCommands, expectedResult) => {
        it(`should be at ${expectedResult} when given command is ${givenCommands} and planet border coordinates "50 50"`, () => {
            const result = runCommand(givenCoordinatesAndDirection, givenCommands, new Planet({ x: 50, y: 50 }))
            expect(result).toBe(expectedResult);
        });
    });

    describe.each([
        ["1 5 N", "LFFF", "0 5 W LOST"],
        ["1 52 N", "F", "NOT LANDED"],
        ["100 5 N", "F", "NOT LANDED"],
        ["4 49 N", "FF", "4 50 N LOST"],
        ["49 33 E", "FF", "50 33 E LOST"],
        ["-3 -3 W", "F", "NOT LANDED"],
        ["1 -1 S", "RFRF", "NOT LANDED"]
    ])('on given coordinates and direction %p', (givenCoordinatesAndDirection, givenCommands, expectedResult) => {
        it(`should be ${expectedResult} when given command is ${givenCommands} and planet border coordinates "50 50"`, () => {
            const result = runCommand(givenCoordinatesAndDirection, givenCommands, new Planet({ x: 50, y: 50 }))
            expect(result).toBe(expectedResult);
        });
    });

    describe('on given coordinates and direction "49 3 N" two robots at same planet with border coordinates "50 50"', () => {
        const planet = new Planet({ x: 50, y: 50 });

        it(`second robot should not be lost at "50 3" coordinates when first robot was lost at "50 3" coordinates`, () => {
            const resultLost = runCommand("49 3 N", "RFFF", planet)
            expect(resultLost).toBe("50 3 E LOST");

            const result = runCommand("49 3 N", "RFFF", planet)
            expect(result).toBe("50 3 E");
        });

        it(`second robot should not be lost at "49 0" coordinates when first robot was lost at "49 0" coordinates`, () => {
            const resultLost = runCommand("49 3 E", "RFFFF", planet)
            expect(resultLost).toBe("49 0 S LOST");

            const result = runCommand("49 3 E", "RFFFF", planet)
            expect(result).toBe("49 0 S");
        });
    });
});