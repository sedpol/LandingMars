import './App.css';
import { useState } from 'react';
import CommandInput from './components/CommandInput';
import ResultList from './components/ResultList';

function App() {
  const [results, setResults] = useState([])

  return (
    <div className="App">
      <CommandInput setResults={setResults} />
      <ResultList results={results} />
    </div>
  );
}

export default App;
