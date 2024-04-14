import './Timer.css';
import BreakTimer from './BreakTimer';
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLemon } from '@fortawesome/free-solid-svg-icons';

function Timer({ x, y, startTimer, active, onStop, index, activeTimerIndex, onBreakTimerFinish }) {
  const [timeLeft, setTimeLeft] = useState(x);
  const [lemons, setLemons] = useState([]);
  const [buttonText, setButtonText] = useState("start");
  const [breakOn, setBreakOn] = useState(false);

  const intervalRef = React.useRef();

  const handleStartClick = () => {
    if (buttonText === "cancel/reset") {
      clearInterval(intervalRef.current);
      setTimeLeft(x);
      setLemons([]);
      setButtonText("start");
      onStop(); 
      return;
    }
  
    startTimer(); 
    setButtonText("cancel/reset");
    intervalRef.current = setInterval(() => {
      setTimeLeft((previousTimeLeft) => {
        if (previousTimeLeft <= 0) {
          clearInterval(intervalRef.current);
          setBreakOn(true); 
          return x; 
        } else {
          return previousTimeLeft - 1;
        }
      });
    }, 1000);
  }

  useEffect(() => {
    if (breakOn) {
      const breakTimer = setTimeout(() => {
        setBreakOn(false);
        setLemons([...lemons, <FontAwesomeIcon icon={faLemon} />]);
        setButtonText("start"); // Reset button text after break
        onBreakTimerFinish(); // Callback to reset active timer index
      }, y * 1000);
      return () => clearTimeout(breakTimer);
    }
  }, [breakOn, lemons, y, onBreakTimerFinish]);

  const isDisabled = activeTimerIndex !== null && activeTimerIndex !== index;
  
  return (
    <div id="timeElem">
      {!breakOn && <p>{timeLeft}</p>}
      {lemons.map((lemon, index) => (
        <div key={index}>{lemon}</div>
      ))}
      {!breakOn && <button onClick={handleStartClick} disabled={isDisabled}>{buttonText}</button>}
      {breakOn && <BreakTimer y={y}/>}
    </div>
  );
}

export default Timer;
