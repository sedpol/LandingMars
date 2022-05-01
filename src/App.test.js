import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
const inputCommand = 
`5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`;

describe('processing command for a planet has a border of "5, 3" coordinate', () => {
  test('result should be 1 1 E, 3 3 N LOST" and 2 3 S respectively', () => {
    render(<App />);
    const inputArea = screen.getByTestId("commandInput");

    fireEvent.change(inputArea, {
      target: {
        value: inputCommand
      }
    });

    const runCommandButton = screen.getByTestId("runCommands");
    fireEvent.click(runCommandButton);

    const resultList = screen.getByTestId("resultList");
    expect(resultList).toHaveTextContent("1 1 E");
    expect(resultList).toHaveTextContent("3 3 N LOST");
    expect(resultList).toHaveTextContent("2 3 S"); // last robot wont lost since there is a scent from second robot.
  });
})
