import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import List from './List';
import BreakTimer from './BreakTimer';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <link href='https://fonts.googleapis.com/css?family=Quicksand' rel='stylesheet'></link>
    <h1>what do you want to do?</h1>
    <List />
  </React.StrictMode>
);