import logo from './logo.svg';
import './App.css';
import Search from './Search';
import MonthlyBook from './MonthlyBook';
import React, { useState } from 'react';


function App() {
  const [monthlyBookClicked, setMonthlyBookClicked] = React.useState(false);

  function bookOfMonthClicked(){
    setMonthlyBookClicked(true);
  }

  return (
    <div>
      <link href="https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@300;400;500;600;700;800;900&family=Inria+Serif:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet"/>
      <div id = "nav">
        <a href = "">Home 🏠</a>
        <button onClick = {bookOfMonthClicked}>Book of the Month</button>
      </div>
      {!monthlyBookClicked && <Search/>}
      {monthlyBookClicked && <MonthlyBook/>}
    </div>
  );
}

export default App;
