import './ColorGuesser.css';
import Slider from './Slider';
import React from "react";

const MIN = 0;
const MAX = 255;

function App() {
  const [red, setRed]     = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [green, setGreen] = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [blue, setBlue]   = React.useState(getRandomIntegerBetween(MIN, MAX));

  const [guessRed, setGuessRed]     = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [guessGreen, setGuessGreen] = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [guessBlue, setGuessBlue]   = React.useState(getRandomIntegerBetween(MIN, MAX));
  const [cheatingMode, setCheatingMode] = React.useState(false);
  const [showingFeedback, setShowingFeedback] = React.useState(false);

  const doGuess = React.useCallback(() => {
    setShowingFeedback(true);
  }, []);
  const doAdvance = React.useCallback(() => {
    setRed(getRandomIntegerBetween(MIN, MAX));
    setGreen(getRandomIntegerBetween(MIN, MAX));
    setBlue(getRandomIntegerBetween(MIN, MAX));
    setGuessRed(getRandomIntegerBetween(MIN, MAX));
    setGuessBlue(getRandomIntegerBetween(MIN, MAX));
    setGuessGreen(getRandomIntegerBetween(MIN, MAX));
    setShowingFeedback(false);
  }, []);
  const onChangeCheatingMode = React.useCallback((e) => {
    setCheatingMode(e.target.checked);
  }, []);
  const showRightColor = cheatingMode || showingFeedback;

  return (
    <div className="App">
      <label id="cheating-mode">Cheating mode <input type="checkbox" value={cheatingMode} onChange={onChangeCheatingMode} /></label>
      <div id="color-preview" style={{backgroundColor: `rgb(${red}, ${green}, ${blue})`}} />
      {showRightColor && <div id="color-preview"   style={{backgroundColor: `rgb(${guessRed}, ${guessGreen}, ${guessBlue})`}} /> }
      {showingFeedback && <p>Your guess: rgb({guessRed}, {guessGreen}, {guessBlue}). Actual: <strong>rgb({red}, {green}, {blue})</strong></p>}
      {!showingFeedback && <p>Guess the color of the rectangle</p>}
      {!showingFeedback && <div id="color-picker">
        <div className="row">
          <span className="component-color-preview" style={{backgroundColor: `rgb(255, 0, 0, ${red/MAX})`  }}>Red:</span>
          {!showingFeedback && <Slider min={MIN} max={MAX} startingValue={guessRed} onChange={r => setGuessRed(r)} />}
        </div>
        <div className="row">
          <span className="component-color-preview" style={{backgroundColor: `rgb(0, 255, 0, ${green/MAX})`}}>Green:</span>
          {!showingFeedback && <Slider min={MIN} max={MAX} startingValue={guessGreen} onChange={g => setGuessGreen(g)} />}
        </div>
        <div className="row">
          <span className="component-color-preview" style={{backgroundColor: `rgb(0, 0, 255, ${blue/MAX})` }}>Blue:</span>
          {!showingFeedback && <Slider min={MIN} max={MAX} startingValue={guessBlue} onChange={b => setGuessBlue(b)} />}
        </div>
      </div>}
      {!showingFeedback && <button onClick={doGuess}>Guess</button> }
      {showingFeedback && <button onClick={doAdvance}>Next</button>}
    </div>
  );
}

export default App;

function getRandomIntegerBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}