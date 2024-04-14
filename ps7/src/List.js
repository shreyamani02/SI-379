import React, { useState, useRef, useEffect } from 'react';
import './List.css';
import Timer from './Timer';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [inputValue, setInputValue] = useState(25);
  const [breakValue, setBreakValue] = useState(5);
  const [activeTimerIndex, setActiveTimerIndex] = useState(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  
  const handleBreakChange = (event) => {
    setBreakValue(event.target.value);
  };

  const addTextField = () => {
    setTasks([...tasks, { text: '', isEditing: true }]);
  };

  const handleTextFieldChange = (index, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = value;
    setTasks(updatedTasks);
  };

  const toggleEditing = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isEditing = !updatedTasks[index].isEditing;
    setTasks(updatedTasks);
  };

  const startTimer = (index) => {
    setActiveTimerIndex(index);
  };

  const stopTimer = () => {
    setActiveTimerIndex(null);
  };

  const handleBreakTimerFinish = () => {
    setActiveTimerIndex(null); 
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    if (activeTimerIndex === index) {
      stopTimer();
    }
  };

  return (
    <div>
      <div id="buttonContainer">
        <button id="clickButton" onClick={addTextField}>+ add task</button>
      </div>
      {tasks.map((task, index) => (
        <div key={index} className="timer-container">
          {task.isEditing ? (
            <input
              type="text"
              value={task.text}
              onChange={(e) => handleTextFieldChange(index, e.target.value)}
              onBlur={() => toggleEditing(index)}
              ref={(ref) => inputRefs.current[index] = ref}
            />
          ) : (
            <p onClick={() => toggleEditing(index)}>{task.text}</p>
          )}
          <Timer
            x={inputValue * 60}
            y={breakValue * 60}
            startTimer={() => startTimer(index)}
            active={activeTimerIndex === index}
            onStop={stopTimer}
            index={index}
            activeTimerIndex={activeTimerIndex}
            onBreakTimerFinish={handleBreakTimerFinish} 
          />
          <button onClick={() => deleteTask(index)}>🗑️</button>
        </div>
      ))}
      <div id="work-interval">
        <p>Work Interval (minutes)</p>
        <input type="number" id="quantity" name="quantity" min="1" max="120" value={inputValue} onChange={handleInputChange}></input>
      </div>
      <div id="break-interval">
        <p>Break Interval (minutes)</p>
        <input type="number" id="quantity" name="quantity" min="1" max="120" value={breakValue} onChange={handleBreakChange}></input>
      </div>
    </div>
  );
}

export default App;
