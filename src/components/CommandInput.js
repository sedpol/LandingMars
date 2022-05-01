import React, { useState } from 'react'
import { runCommands } from '../service/CommandService';
const initialCommand = 
`5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL
`
function CommandInput(props) {
    const [inputCommand, setInputCommand] = useState(initialCommand);
    const handleRunCommands = () => {
        props.setResults(runCommands(inputCommand));
    }
    return (
        <div style={{display:"inline-block"}}>
            <textarea data-testid="commandInput" rows={10} cols={50} value={inputCommand} onChange={(e) => setInputCommand(e.target.value)} />
            <button style={{display:"block"}} data-testid="runCommands" onClick={handleRunCommands}>Run Commands</button>
        </div>
    )
}

export default CommandInput