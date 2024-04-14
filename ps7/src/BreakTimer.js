import React, { useState, useEffect } from "react";
import './BreakTimer.css';

function BreakTimer({ y }) {
  const [timerText, setTimerText] = useState(y);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerText((previousTimeLeft) => {
        if (previousTimeLeft <= 0) {
          clearInterval(interval);
          return 0;
        } else {
          return previousTimeLeft - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div id = "break">
      <p>Break</p>
      <p>{timerText}</p>
    </div>
  );
}

export default BreakTimer;