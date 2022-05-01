import { runCommand } from "./CommandService"
import Planet from "./Planet";

describe('Martian Robot', () => {
    describe('on initial (0,0) coordinate', () => {
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
});
